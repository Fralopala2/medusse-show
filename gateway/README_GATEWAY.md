# Gateway Medusse

Gateway que procesa datos de nodos ESP32 y los publica en MQTT con estructura organizada.

## ✅ Funcionalidades

### Procesamiento de Datos
- **Entrada:** JSON de nodos ESP32 (serial o simuladores)
- **Salida:** Mensajes MQTT estructurados por sensor y ubicación
- **Soporte:** Múltiples nodos simultáneos

### Topics MQTT Generados
```
iescelia/{location}/temperature  # Valores de temperatura
iescelia/{location}/humidity     # Valores de humedad  
iescelia/{location}/pressure     # Valores de presión
iescelia/{location}/co2          # Valores de CO2
iescelia/{location}/system       # Info del sistema (heap, uptime)
iescelia/{location}/raw          # Datos completos del nodo
```

### Estructura de Mensajes
```json
{
  "value": 24.1,
  "sensor": "dht22",
  "node_id": "ESP32_NODE_01", 
  "timestamp": 1759913780291,
  "location": "aula20"
}
```

## 🚀 Uso

### Con Simuladores (Recomendado para desarrollo)
```bash
# Gateway con simuladores automáticos
python medusse_gateway.py --source simulator

# Gateway con simulador específico
python medusse_gateway.py --source simulator --path ../arduino/test_multiple_nodes.py
```

### Con Puerto Serial (Hardware real)
```bash
# Gateway con ESP32 real
python medusse_gateway.py --source serial --path COM3 --baud 115200
```

### Configuración MQTT
```bash
# Broker personalizado
python medusse_gateway.py --broker 192.168.1.100 --port 1883 --topic iescelia
```

## 🧪 Testing

### Test Simple (Sin MQTT real)
```bash
python test_simple.py
```
- ✅ Procesa datos de prueba
- ✅ Valida parsing JSON
- ✅ Muestra topics generados
- ✅ No requiere broker MQTT

### Test con Broker MQTT

#### 1. Iniciar Mosquitto
```bash
# Con Docker
docker run -d --name medusse-mosquitto -p 1883:1883 eclipse-mosquitto:2.0

# O instalar localmente
# Windows: https://mosquitto.org/download/
# Linux: sudo apt install mosquitto mosquitto-clients
```

#### 2. Monitor MQTT (Terminal separada)
```bash
# Escuchar todos los mensajes
mosquitto_sub -h localhost -t "iescelia/#" -v

# O usar nuestro monitor
python mqtt_test_broker.py
```

#### 3. Ejecutar Gateway
```bash
python medusse_gateway.py
```

## 📊 Ejemplo de Salida

### Datos de Entrada (ESP32)
```json
{
  "node_id": "ESP32_NODE_01",
  "location": "aula20", 
  "timestamp": 1759913780291,
  "sensors": {
    "dht22": {"temperature": 24.1, "humidity": 45.1},
    "bme280": {"temperature": 24.2, "humidity": 44.1, "pressure": 1014.7},
    "gas": {"co2_ppm": 458}
  },
  "system": {"free_heap": 234919, "uptime": 780291}
}
```

### Mensajes MQTT Generados
```
📤 iescelia/aula20/temperature: {"value":24.1,"sensor":"dht22",...}
📤 iescelia/aula20/humidity: {"value":45.1,"sensor":"dht22",...}
📤 iescelia/aula20/temperature: {"value":24.2,"sensor":"bme280",...}
📤 iescelia/aula20/humidity: {"value":44.1,"sensor":"bme280",...}
📤 iescelia/aula20/pressure: {"value":1014.7,"sensor":"bme280",...}
📤 iescelia/aula20/co2: {"value":458,"sensor":"gas",...}
📤 iescelia/aula20/system: {"free_heap":234919,"uptime":780291,...}
📤 iescelia/aula20/raw: {datos_completos}
```

## 📈 Estadísticas

El gateway muestra estadísticas en tiempo real:
```
📊 Estadísticas del Gateway:
   Tiempo activo: 0:02:15
   Mensajes procesados: 12
   Mensajes publicados: 96
   Errores: 0
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
export MQTT_BROKER=localhost
export MQTT_PORT=1883
export MQTT_TOPIC=iescelia
```

### Argumentos Completos
```bash
python medusse_gateway.py \
  --broker localhost \
  --port 1883 \
  --topic iescelia \
  --source simulator \
  --path ../arduino/test_multiple_nodes.py
```

## ✅ Estado del Desarrollo

- ✅ **Procesamiento JSON** - Funcionando
- ✅ **Múltiples sensores** - DHT22, BME280, Gas
- ✅ **Topics estructurados** - Por ubicación y tipo
- ✅ **Simuladores integrados** - Testing sin hardware
- ✅ **Estadísticas** - Monitoreo en tiempo real
- ✅ **Error handling** - Robusto ante fallos
- 🔄 **Puerto serial** - Listo para hardware real
- ⏳ **Integración LoRa** - Próxima fase

## 🔄 Próximos Pasos

1. **Integrar con Docker Compose** - Stack completa
2. **Configurar Telegraf** - MQTT → InfluxDB  
3. **Dashboards Grafana** - Visualización
4. **Simulación LoRa Mesh** - Comunicación realista