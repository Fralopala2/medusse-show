# Stack Docker - Proyecto Medusse

Stack completo de servicios para el proyecto Medusse IoT.

## 🏗️ Arquitectura

```
ESP32 Nodes → Gateway → MQTT → Telegraf → InfluxDB → Grafana
                ↓
            Mosquitto
```

## 📦 Servicios Incluidos

### 🔌 Mosquitto (MQTT Broker)
- **Puerto:** 1883 (MQTT), 9001 (WebSocket)
- **Función:** Recibe mensajes del Gateway
- **Topics:** `iescelia/{location}/{sensor_type}`

### 💾 InfluxDB (Base de Datos)
- **Puerto:** 8086
- **Función:** Almacena datos de sensores
- **Credenciales:** admin/medusse2025
- **Bucket:** sensors

### 📊 Telegraf (Pipeline)
- **Función:** MQTT → InfluxDB
- **Configuración:** Automática
- **Topics monitoreados:** `iescelia/+/+`

### 📈 Grafana (Visualización)
- **Puerto:** 3000
- **Credenciales:** admin/medusse2025
- **Dashboard:** Auto-configurado

## 🚀 Inicio Rápido

### 1. Prerequisitos
```bash
# Verificar Docker
docker --version
docker-compose --version
```

### 2. Iniciar Stack
```bash
cd docker
python start_stack.py
```

### 3. Acceder a Servicios
- **Grafana:** http://localhost:3000 (admin/medusse2025)
- **InfluxDB:** http://localhost:8086 (admin/medusse2025)
- **MQTT:** localhost:1883

## 🔧 Comandos Manuales

### Iniciar servicios
```bash
cd docker
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener servicios
```bash
docker-compose down
```

### Reiniciar un servicio
```bash
docker-compose restart grafana
```

## 📊 Testing del Stack

### 1. Verificar MQTT
```bash
# Instalar cliente MQTT
pip install paho-mqtt

# Publicar mensaje de prueba
python -c "
import paho.mqtt.client as mqtt
import json
client = mqtt.Client()
client.connect('localhost', 1883)
data = {'value': 25.5, 'sensor': 'test', 'node_id': 'TEST_NODE'}
client.publish('iescelia/test/temperature', json.dumps(data))
"
```

### 2. Verificar InfluxDB
- Acceder a http://localhost:8086
- Login: admin/medusse2025
- Verificar bucket "sensors"

### 3. Verificar Grafana
- Acceder a http://localhost:3000
- Login: admin/medusse2025
- Ver dashboard "Medusse IoT Sensors"

## 🔗 Integración con Gateway

### Conectar Gateway Real
```bash
cd ../gateway
python medusse_gateway.py --broker localhost --port 1883
```

### Con Simuladores
```bash
# Terminal 1: Stack Docker
cd docker && python start_stack.py

# Terminal 2: Gateway
cd gateway && python medusse_gateway.py --broker localhost

# Terminal 3: Simuladores  
cd arduino && python test_multiple_nodes.py
```

## 📁 Estructura de Archivos

```
docker/
├── docker-compose.yml          # Configuración principal
├── start_stack.py             # Script de inicialización
├── mosquitto/
│   └── config/
│       └── mosquitto.conf     # Config MQTT
├── telegraf/
│   └── telegraf.conf          # Config pipeline
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/       # Auto-config InfluxDB
│   │   └── dashboards/        # Auto-config dashboards
│   └── dashboards/
│       └── medusse-sensors.json # Dashboard principal
└── README_DOCKER.md           # Esta documentación
```

## 🔍 Troubleshooting

### Docker no arranca
```bash
# Verificar Docker Desktop está corriendo
docker ps

# Si no funciona, reiniciar Docker Desktop
```

### Servicios no responden
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs grafana
```

### Puerto ocupado
```bash
# Ver qué usa el puerto
netstat -an | findstr :3000

# Cambiar puerto en docker-compose.yml si necesario
```

### Datos no llegan a Grafana
1. Verificar MQTT: `docker-compose logs mosquitto`
2. Verificar Telegraf: `docker-compose logs telegraf`
3. Verificar InfluxDB: http://localhost:8086

### Reset completo
```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar directorios de datos
rm -rf mosquitto/data influxdb/data grafana/data

# Reiniciar
python start_stack.py
```

## 📈 Métricas Esperadas

### Topics MQTT
```
iescelia/aula20/temperature
iescelia/aula20/humidity
iescelia/aula20/pressure
iescelia/aula20/co2
iescelia/aula20/system
iescelia/aula21/temperature
...
```

### Datos en InfluxDB
- **Measurements:** temperature, humidity, pressure, co2, system
- **Tags:** location, sensor, node_id
- **Fields:** value, free_heap, uptime

### Dashboard Grafana
- Gráficos de temperatura por ubicación
- Niveles de CO2 con alertas
- Humedad y presión
- Estado del sistema (memoria)

## ✅ Estado del Stack

- ✅ **Docker Compose** configurado
- ✅ **Mosquitto** con config optimizada
- ✅ **InfluxDB v2** con setup automático
- ✅ **Telegraf** con pipeline MQTT→InfluxDB
- ✅ **Grafana** con dashboard pre-configurado
- ✅ **Script de inicialización** automática
- ✅ **Documentación** completa

**Listo para recibir datos del Gateway Medusse**