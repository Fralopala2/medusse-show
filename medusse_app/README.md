# Medusse App (Flutter)

Aplicacion movil/multiplataforma del proyecto Medusse IoT para visualizar sensores en tiempo real y consultar historico por ubicacion y tipo de sensor.

## Requisitos

- Flutter instalado (`flutter doctor` sin errores criticos).
- API Medusse activa en `http://localhost:4001`.
- WebSocket API activo en `ws://localhost:4002`.

## Ejecucion rapida (Windows)

Desde la raiz del proyecto:

```cmd
cd medusse_app
flutter pub get
flutter run -d windows
```

## Configuracion de backend

La app consume URLs desde `ConfigService`:

- API base por defecto: `http://localhost:4001`
- WebSocket por defecto: `ws://localhost:4002`

Si cambias host/puertos, actualiza la configuracion de la app antes de ejecutar.

## Funcionalidad principal

- Resumen por ubicacion (`aula20`, `aula21`, `gimnasio`, `laboratorio`).
- Actualizacion en tiempo real por WebSocket.
- Consulta de historicos por sensor y ventana temporal.
- Indicadores de alerta por umbrales locales de cada sensor (valores fuera de rango en tiempo real).
- **Alertas del panel admin** (MySQL): las creadas en el dashboard web se listan en inicio y en el detalle de cada ubicacion; los sensores afectados se resaltan en la rejilla.

## Alertas del sistema (panel admin)

La app consume las alertas operativas que un administrador registra en el panel web (`/dashboard` → Alertas). No requieren login en la app: usan el mismo endpoint publico que el resumen de sensores.

### Donde se ven en la app

| Pantalla | Que muestra |
|----------|-------------|
| **Inicio** | Bloque «Alertas del sistema» con todas las alertas no resueltas |
| **Detalle de ubicacion** | Misma lista filtrada por esa ubicacion |
| **Tarjeta de ubicacion** | Badge con el numero de alertas activas |
| **Tarjeta de sensor** | Icono de aviso si hay alerta del panel para ese sensor (ademas del umbral local) |

### Cuando se actualizan

- Al abrir la app, al volver de **Configuracion** y al usar **Actualizar** / pull-to-refresh.
- No hay notificaciones push: hay que refrescar para ver alertas nuevas o cambios de estado.

### Estados mostrados

| Estado en API | Significado |
|---------------|-------------|
| `registrada` | Alerta creada en el panel; aun no se ha disparado por umbral |
| `activada` | El monitor de la API detecto que el valor supero el umbral (`triggered_at`) |
| `resuelta` | Marcada como resuelta en el panel (no aparece si `unresolved=true`) |

Requisitos en el servidor: API con MySQL y migracion `004_alerts_grafana.sql` aplicada. Las anotaciones en Grafana son independientes de la app movil.

## Notas recientes

- La pantalla de historicos y graficos respeta ahora el area segura inferior en Android para evitar que el contenido quede bajo la barra de navegacion.

## Contrato API relevante

- `GET /api/summary`
- `GET /api/system-alerts` — alertas operativas (sin autenticacion)
- `GET /api/latest/:location`
- `GET /api/data/:location/:sensor?hours=&interval=`
- `GET /api/stats/:location/:sensor?hours=`

### `GET /api/system-alerts`

Parametros opcionales:

| Parametro | Default | Descripcion |
|-----------|---------|-------------|
| `unresolved` | `true` | Si es `false`, incluye alertas resueltas |
| `limit` | `50` | Maximo de filas (tope 100) |

Ejemplo de respuesta:

```json
{
  "success": true,
  "count": 1,
  "alerts": [
    {
      "id": 12,
      "alert_type": "threshold",
      "message": "CO2 elevado en aula",
      "value": null,
      "threshold": 800,
      "is_resolved": false,
      "triggered_at": null,
      "created_at": "2026-06-01T10:00:00.000Z",
      "location_name": "aula20",
      "location_label": "Aula 20",
      "sensor_type": "co2",
      "sensor_label": "CO₂",
      "sensor_unit": "ppm",
      "status": "registrada"
    }
  ]
}
```

En Flutter: `ApiService.getSystemAlerts()` → modelo `SystemAlert` → `SensorProvider.systemAlerts`.

Respuesta esperada de stats:

```json
{
  "location": "aula20",
  "sensor": "temperature",
  "hours": 24,
  "stats": {
    "min": 20.8,
    "max": 26.1,
    "avg": 23.4,
    "mean": 23.4,
    "count": 24
  }
}
```

La app soporta compatibilidad si el backend devolviera `mean` o `avg`.

## Testing basico recomendado

1. Iniciar MySQL + API (`medusse.bat` opcion 1 o 3).
2. Ejecutar app Flutter.
3. Verificar:
   - carga de ubicaciones y resumen,
   - actualizacion de valores en tiempo real,
   - carga de historicos y estadisticas.
4. **Alertas del sistema:** crear una alerta en el panel web (usuario admin), pulsar Actualizar en la app y comprobar que aparece en inicio y en la ubicacion correspondiente. Probar en el navegador: `http://localhost:4001/api/system-alerts`.

En dispositivo fisico o emulador Android, la URL de la API debe ser la IP del PC (no `localhost`), desde **Configuracion** en la app.
