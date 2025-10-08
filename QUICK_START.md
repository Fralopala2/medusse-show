# Quick Start - Proyecto Medusse

Guía rápida para ejecutar el proyecto completo en Windows.

## 🚀 Instalación Rápida

### 1. Clonar Repositorio
```bash
git clone <repo-url>
cd Medusse
```

### 2. Instalar Dependencias
```bash
# Python dependencies
pip install platformio paho-mqtt

# Verificar instalación
platformio --version
```

### 3. Compilar Firmware
```bash
cd arduino
platformio run
```

## 🧪 Testing Rápido

### Simuladores ESP32
```bash
# Single node
python arduino/simulate_serial.py

# Multiple nodes (15 segundos)
python arduino/test_limited.py 15

# Multiple nodes (indefinido)
python arduino/test_multiple_nodes.py
```

### Gateway Funcionando
```bash
# Gateway directo (RECOMENDADO)
python gateway/gateway_direct.py --duration 20

# Test simple sin MQTT
python gateway/test_simple.py
```

## 📊 Resultados Esperados

### Simuladores
```
[ESP32_NODE_01] {"node_id":"ESP32_NODE_01","location":"aula20",...}
[ESP32_NODE_02] {"node_id":"ESP32_NODE_02","location":"aula21",...}
[ESP32_NODE_03] {"node_id":"ESP32_NODE_03","location":"laboratorio",...}
```

### Gateway
```
📊 Procesando ESP32_NODE_01 @ aula20
📤 [11:07:28] iescelia/aula20/temperature
   {"value":26.1,"sensor":"dht22","node_id":"ESP32_NODE_01"}
📤 [11:07:28] iescelia/aula20/co2
   {"value":489,"sensor":"gas","node_id":"ESP32_NODE_01"}
```

### Estadísticas
```
📊 Estadísticas finales:
   Mensajes procesados: 18
   Mensajes MQTT generados: 108
   Promedio: 7.2 msg/s
```

## 🔧 Comandos Útiles

### Desarrollo
```bash
# Compilar firmware
cd arduino && platformio run

# Test gateway completo
cd gateway && python test_simple.py

# Debug simuladores
cd gateway && python debug_simulator.py
```

### Estructura de Datos
```json
{
  "node_id": "ESP32_NODE_01",
  "location": "aula20",
  "timestamp": 1759914448305,
  "sensors": {
    "dht22": {"temperature": 26.1, "humidity": 47.6},
    "bme280": {"temperature": 25.5, "pressure": 1014.0},
    "gas": {"co2_ppm": 489}
  },
  "system": {"free_heap": 236692, "uptime": 448305}
}
```

## ✅ Estado Actual

- ✅ **Firmware ESP32** compilando
- ✅ **Simuladores** generando datos realistas
- ✅ **Gateway** procesando múltiples nodos
- ✅ **Topics MQTT** estructurados
- 🔄 **Stack Docker** (próximo paso)

## 🆘 Troubleshooting

### Error: platformio no encontrado
```bash
pip install platformio
```

### Error: No module 'paho'
```bash
pip install paho-mqtt
```

### Sin datos en gateway
```bash
# Verificar simuladores funcionan
python arduino/test_limited.py 10

# Usar gateway directo
python gateway/gateway_direct.py
```

## 📁 Archivos Importantes

- `arduino/src/main.cpp` - Firmware principal
- `gateway/gateway_direct.py` - Gateway funcionando
- `arduino/test_multiple_nodes.py` - Simulador principal
- `gateway/GATEWAY_SUCCESS.md` - Resultados detallados