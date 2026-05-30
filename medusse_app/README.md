# Medusse App (Flutter)

Aplicacion movil/multiplataforma del proyecto Medusse IoT para visualizar sensores en tiempo real y consultar historico por ubicacion y tipo de sensor.

## Requisitos

- Flutter instalado (`flutter doctor` sin errores criticos).
- API Medusse activa en `http://localhost:3001`.
- WebSocket API activo en `ws://localhost:3002`.

## Ejecucion rapida (Windows)

Desde la raiz del proyecto:

```cmd
cd medusse_app
flutter pub get
flutter run -d windows
```

## Configuracion de backend

La app consume URLs desde `ConfigService`:

- API base por defecto: `http://localhost:3001`
- WebSocket por defecto: `ws://localhost:3002`

Si cambias host/puertos, actualiza la configuracion de la app antes de ejecutar.

## Funcionalidad principal

- Resumen por ubicacion (`aula20`, `aula21`, `gimnasio`, `laboratorio`).
- Actualizacion en tiempo real por WebSocket.
- Consulta de historicos por sensor y ventana temporal.
- Indicadores de alerta por umbrales de cada sensor.

## Notas recientes

- La pantalla de historicos y graficos respeta ahora el area segura inferior en Android para evitar que el contenido quede bajo la barra de navegacion.

## Contrato API relevante

- `GET /api/summary`
- `GET /api/latest/:location`
- `GET /api/data/:location/:sensor?hours=&interval=`
- `GET /api/stats/:location/:sensor?hours=`

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
