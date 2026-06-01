# Puertos del sistema Medusse (desarrollo local)

En **Windows con Hyper-V / Docker Desktop**, varios rangos TCP están reservados por el sistema (aprox. 2951–3550). Por eso el proyecto **no usa** los puertos 3000–3307 en el host.

## Tabla de servicios

| Servicio | URL / host | Puerto host | Notas |
|----------|------------|-------------|--------|
| **Web Next.js** | http://localhost:4003 | 4003 | Portal, login, centro de control (`/control`) |
| **API REST** | http://localhost:4001 | 4001 | Health: `/health` |
| **WebSocket** | ws://localhost:4002 | 4002 | `PORT + 1` en `api/server.js` |
| **Grafana** | http://localhost:4000 | 4000 | admin / medusse2025 |
| **InfluxDB** | http://localhost:8086 | 8086 | admin / medusse2025 |
| **MySQL** | localhost:13306 | 13306 | medusse_user / medusse2025 |
| **MQTT** | localhost:1883 | 1883 | Mosquitto |
| **MQTT WebSocket** | localhost:9001 | 9001 | Mosquitto |

## Variables de entorno

**API** (`api/.env` o `api/.env.example`):

```env
PORT=4001
MYSQL_PORT=13306
```

**Web** (`web/.env.local` recomendado en desarrollo):

```env
NEXT_PUBLIC_API_URL=http://localhost:4001
NEXT_PUBLIC_WS_URL=ws://localhost:4002
NEXT_PUBLIC_GRAFANA_URL=http://localhost:4000
```

## App Flutter (`medusse_app`)

Por defecto en emulador Android: `http://10.0.2.2:4001` y `ws://10.0.2.2:4002`.  
En dispositivo físico o PC: usar la IP de la máquina con puerto **4001** / **4002**.

## Comprobar puertos reservados en Windows

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

## Historial (puertos antiguos — no usar en este equipo)

| Antes | Ahora |
|-------|-------|
| 3003 (web) | 4003 |
| 3001 (API) | 4001 |
| 3002 (WS) | 4002 |
| 3000 (Grafana host) | 4000 |
| 3600 (Grafana host, bloqueado por Hyper-V) | 4000 |
| 3307 (MySQL host) | 13306 |

## Alertas del panel admin en Grafana

Las alertas creadas en la web se envían a Grafana como **anotaciones** en el dashboard `medusse-clean`:

1. Al crear → marca vertical «Alerta registrada».
2. Si indicas **umbral** → la API comprueba InfluxDB cada ~30 s; al superarse → anotación «ALERTA ACTIVADA».

En Grafana: abre el dashboard, pasa el ratón por la línea temporal o el icono de bandera. No es un popup del navegador; es la anotación nativa de Grafana.

MySQL ya creado: aplicar migración:

```powershell
Get-Content docker\mysql\migrations\004_alerts_grafana.sql | docker exec -i medusse_mysql mysql -u medusse_user -pmedusse2025 medusse_db
```

Variables en `api/.env`: `GRAFANA_URL`, `GRAFANA_ADMIN_USER`, `GRAFANA_ADMIN_PASSWORD`.

## Grafana muestra "No data"

1. Comprueba que Docker esté en marcha: `docker ps` debe listar `medusse_mosquitto`, `medusse_influxdb`, `medusse_telegraf`, `medusse_grafana`.
2. Tras `docker compose restart` o reiniciar Docker Desktop, **reinicia el simulador** (la conexión MQTT del proceso anterior queda rota):

   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\restart-simulator.ps1
   ```

3. En Grafana, usa rango **Last 15 minutes** (o más) y recarga; con auto-refresh 15s deberían aparecer los paneles en menos de un ciclo (~15 s).
4. Si MQTT no responde en el host: `Test-NetConnection localhost -Port 1883` debe devolver `TcpTestSucceeded : True`.
