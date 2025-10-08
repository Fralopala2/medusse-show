# Desarrollo ESP32 con Wokwi

## Configuración de Sensores

El proyecto incluye tres sensores principales:

### DHT22 (Temperatura y Humedad)
- **Pin:** GPIO 4
- **Alimentación:** 3.3V
- **Rango Temp:** -40°C a +80°C
- **Rango Humedad:** 0-100% RH

### BME280 (Temperatura, Humedad, Presión)
- **Protocolo:** I2C
- **SDA:** GPIO 21
- **SCL:** GPIO 22
- **Dirección:** 0x76
- **Alimentación:** 3.3V

### Sensor de Gas (Simulación CO2)
- **Pin:** A0 (Analógico)
- **Rango simulado:** 300-2000 ppm CO2
- **Alimentación:** 3.3V

## Cómo usar con PlatformIO

### 1. Compilar el firmware
```bash
# Desde la terminal en la carpeta arduino/
platformio run
```

### 2. Simular salida serial
```bash
# Simular Node 1
python simulate_serial.py

# Simular Node 2
python simulate_serial.py node2

# Múltiples nodos simultáneos
python test_multiple_nodes.py
```

### 3. Para usar con Wokwi (si tienes la extensión)
```bash
# Desde la paleta de comandos
F1 -> "Wokwi: Start Simulator"
```

### 3. Monitorear salida
- Los datos se envían por Serial a 115200 baud
- Formato JSON para el gateway
- Formato legible para debugging

## Estructura de Datos JSON

```json
{
  "node_id": "ESP32_NODE_01",
  "location": "aula20",
  "timestamp": 12345,
  "sensors": {
    "dht22": {
      "temperature": 23.5,
      "humidity": 45.2
    },
    "bme280": {
      "temperature": 23.7,
      "humidity": 44.8,
      "pressure": 1013.2
    },
    "gas": {
      "co2_ppm": 456
    }
  },
  "system": {
    "free_heap": 234567,
    "uptime": 12345
  }
}
```

## Simulación de Múltiples Nodos

Para simular diferentes nodos:

1. **Node 1:** Usar `main.cpp` (aula20)
2. **Node 2:** Copiar `main_node2.cpp` a `main.cpp` (aula21)

Cada nodo tiene:
- ID único
- Ubicación diferente
- Intervalos de lectura ligeramente distintos
- Variaciones en los datos para simular condiciones reales

## Troubleshooting

### Sensor BME280 no encontrado
- Normal en simulación, el código continúa funcionando
- En hardware real, verificar conexiones I2C

### Lecturas NaN del DHT22
- El código filtra automáticamente lecturas inválidas
- En Wokwi, ajustar los valores del sensor en la interfaz

### Memoria insuficiente
- El código monitorea heap libre
- JSON optimizado para usar memoria mínima

## Próximos Pasos

1. ✅ Sensores funcionando
2. 🔄 Integración LoRa/Meshtastic
3. ⏳ Comunicación mesh simulada
4. ⏳ Gateway integration