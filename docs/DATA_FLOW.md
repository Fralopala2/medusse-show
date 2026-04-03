# Data Flow / Flujo de Datos

## ES — Flujo de datos
1. El simulador/nodos generan lecturas (JSON) cada X segundos.
2. Publicación en MQTT (tópicos por ubicación/sensor).
3. Telegraf se suscribe a MQTT, parsea JSON y agrega por ventanas.
4. Escritura en InfluxDB (series temporales).
5. MySQL guarda configuración/usuarios/alertas (si aplica).
6. Grafana consulta Influx/MySQL para visualización.
7. La API expone endpoints **solo lectura** y WebSocket para tiempo real.
8. Web y App consumen API/WebSocket.

## EN — Data flow
1. Simulator/nodes generate readings (JSON) every X seconds.
2. Publish to MQTT (topics per location/sensor).
3. Telegraf subscribes to MQTT, parses JSON, aggregates by windows.
4. Write to InfluxDB (time-series).
5. MySQL stores relational config/users/alerts (if applicable).
6. Grafana queries Influx/MySQL for visualization.
7. API exposes **read-only** endpoints + WebSocket for realtime.
8. Web and App consume API/WebSocket.