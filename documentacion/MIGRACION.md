# Migración a Hardware Real con LoRaMesh

Guía completa para migrar el **Proyecto Medusse** desde simulación a dispositivos ESP32 reales con comunicación LoRaMesh.

## 📋 Resumen de la Migración

**Estado Actual:** Ecosistema IoT completo con simulación (Dashboard + API REST + App Flutter)
**Objetivo:** Red de sensores ESP32 reales con comunicación LoRaMesh
**Tiempo Estimado:** 4-6 semanas
**Costo Hardware:** ~150-200€ para 3 nodos + gateway

### 🎯 Ventaja de la Nueva Arquitectura

**✅ API REST y App Flutter seguirán funcionando SIN CAMBIOS:**
- Solo se cambia el gateway (de simulador a LoRa)
- API REST mantiene mismos endpoints
- App Flutter no necesita modificaciones
- Pipeline de datos idéntico (MQTT → InfluxDB → Grafana)
- WebSocket tiempo real sigue funcionando

---

## 🛒 FASE 1: Adquisición de Hardware

### 1.1 Nodos Sensores (3 unidades)

**Opción A: ESP32 + Módulo LoRa Separado**
- ESP32 DevKit V1 (x3) - ~8€ c/u
- Módulo LoRa SX1276/SX1262 (x3) - ~12€ c/u
- Sensores por nodo:
  - DHT22 (temperatura/humedad) - ~3€
  - BME280 (presión/temp/hum) - ~5€
  - MQ-135 o CCS811 (CO2/gas) - ~8€
- Protoboard y cables - ~5€ por nodo

**Opción B: Placas Integradas (Recomendada)**
- TTGO T-Beam o Heltec WiFi LoRa 32 (x3) - ~25€ c/u
- Sensores (mismos que Opción A)
- Menos cableado, más confiable

### 1.2 Gateway Central

**Hardware Gateway:**
- Raspberry Pi 4 (4GB) - ~70€
- Módulo LoRa para RPi (SX1276) - ~15€
- MicroSD 32GB - ~10€
- Fuente alimentación - ~10€
- Carcasa - ~8€

### 1.3 Accesorios

- Antenas LoRa 868MHz (x4) - ~5€ c/u
- Cables y conectores - ~15€
- Fuentes de alimentación para nodos - ~30€

**Total Estimado: ~180-220€**

---

## 🔧 FASE 2: Preparación del Entorno

### 2.1 Configuración Arduino IDE

```bash
# Instalar librerías necesarias
# En Arduino IDE > Library Manager:
```

**Librerías Requeridas:**
- `RadioLib` (para LoRa)
- `Meshtastic` (protocolo mesh)
- `DHT sensor library`
- `Adafruit BME280 Library`
- `Adafruit CCS811 Library`
- `ArduinoJson`

### 2.2 Configuración PlatformIO

Actualizar `arduino/platformio.ini`:

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200

lib_deps = 
    adafruit/DHT sensor library@^1.4.4
    adafruit/Adafruit Unified Sensor@^1.1.9
    adafruit/Adafruit BME280 Library@^2.2.2
    adafruit/Adafruit CCS811 Library@^1.0.4
    bblanchon/ArduinoJson@^6.21.3
    jgromes/RadioLib@^6.4.2
    meshtastic/Meshtastic@^2.3.2

build_flags = 
    -DCORE_DEBUG_LEVEL=3
    -DRADIOLIB_GODMODE

[env:ttgo-lora32-v1]
platform = espressif32
board = ttgo-lora32-v1
framework = arduino
lib_deps = ${env:esp32dev.lib_deps}
build_flags = ${env:esp32dev.build_flags}

[env:heltec_wifi_lora_32_V2]
platform = espressif32
board = heltec_wifi_lora_32_V2
framework = arduino
lib_deps = ${env:esp32dev.lib_deps}
build_flags = ${env:esp32dev.build_flags}
```

### 2.3 Configuración Raspberry Pi

**Instalar Raspbian y dependencias:**

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Python y dependencias
sudo apt install python3-pip git -y
pip3 install paho-mqtt requests pyserial

# Instalar Meshtastic CLI
pip3 install meshtastic

# Habilitar SPI para módulo LoRa
sudo raspi-config
# Interface Options > SPI > Enable
```

---

## 💻 FASE 3: Desarrollo del Firmware LoRaMesh

### 3.1 Crear Nuevo Firmware

Crear `arduino/src/main_lora.cpp`:

```cpp
#include <Arduino.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>
#include <RadioLib.h>

// LoRa Configuration
#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_CS 18
#define LORA_DIO0 26
#define LORA_RST 14
#define LORA_DIO1 33

// Sensor pins (same as before)
#define DHT_PIN 4
#define DHT_TYPE DHT22
#define GAS_SENSOR_PIN A0
#define I2C_SDA 21
#define I2C_SCL 22

// LoRa module instance
SX1276 radio = new Module(LORA_CS, LORA_DIO0, LORA_RST, LORA_DIO1);

// Sensor instances
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_BME280 bme;

// Node configuration
const String NODE_ID = "ESP32_NODE_01";  // Cambiar por nodo
const String LOCATION = "aula20";        // Cambiar por ubicación
const float FREQUENCY = 868.0;          // EU frequency
const float BANDWIDTH = 125.0;
const uint8_t SPREADING_FACTOR = 7;
const uint8_t CODING_RATE = 5;
const int8_t OUTPUT_POWER = 10;

unsigned long lastReading = 0;
const unsigned long READING_INTERVAL = 30000; // 30 seconds

struct SensorData {
  float temperature_dht;
  float humidity_dht;
  float temperature_bme;
  float humidity_bme;
  float pressure;
  int gas_level;
  unsigned long timestamp;
  String node_id;
  String location;
};

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("=== Medusse ESP32 LoRa Node Starting ===");
  Serial.println("Node ID: " + NODE_ID);
  Serial.println("Location: " + LOCATION);
  
  // Initialize LoRa
  Serial.print("Initializing LoRa... ");
  int state = radio.begin(FREQUENCY, BANDWIDTH, SPREADING_FACTOR, CODING_RATE, OUTPUT_POWER);
  
  if (state == RADIOLIB_ERR_NONE) {
    Serial.println("success!");
  } else {
    Serial.print("failed, code ");
    Serial.println(state);
    while (true);
  }
  
  // Initialize I2C
  Wire.begin(I2C_SDA, I2C_SCL);
  
  // Initialize sensors
  dht.begin();
  Serial.println("DHT22 initialized");
  
  if (!bme.begin(0x76)) {
    Serial.println("Could not find BME280 sensor!");
  } else {
    Serial.println("BME280 initialized");
  }
  
  pinMode(GAS_SENSOR_PIN, INPUT);
  Serial.println("Gas sensor initialized");
  
  Serial.println("=== All systems ready ===");
  delay(1000);
}

void loop() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastReading >= READING_INTERVAL) {
    SensorData data = readSensors();
    
    if (isValidReading(data)) {
      sendLoRaData(data);
    }
    
    lastReading = currentTime;
  }
  
  delay(100);
}

SensorData readSensors() {
  SensorData data;
  
  // Read sensors (same as original)
  data.temperature_dht = dht.readTemperature();
  data.humidity_dht = dht.readHumidity();
  data.temperature_bme = bme.readTemperature();
  data.humidity_bme = bme.readHumidity();
  data.pressure = bme.readPressure() / 100.0F;
  
  int gasRaw = analogRead(GAS_SENSOR_PIN);
  data.gas_level = map(gasRaw, 0, 4095, 300, 2000);
  
  data.timestamp = millis();
  data.node_id = NODE_ID;
  data.location = LOCATION;
  
  return data;
}

bool isValidReading(const SensorData& data) {
  return !isnan(data.temperature_dht) && !isnan(data.humidity_dht) &&
         data.temperature_dht > -40 && data.temperature_dht < 80 &&
         data.humidity_dht >= 0 && data.humidity_dht <= 100;
}

void sendLoRaData(const SensorData& data) {
  // Create JSON (same structure as original)
  StaticJsonDocument<512> doc;
  
  doc["node_id"] = data.node_id;
  doc["location"] = data.location;
  doc["timestamp"] = data.timestamp;
  
  doc["sensors"]["dht22"]["temperature"] = round(data.temperature_dht * 10) / 10.0;
  doc["sensors"]["dht22"]["humidity"] = round(data.humidity_dht * 10) / 10.0;
  doc["sensors"]["bme280"]["temperature"] = round(data.temperature_bme * 10) / 10.0;
  doc["sensors"]["bme280"]["humidity"] = round(data.humidity_bme * 10) / 10.0;
  doc["sensors"]["bme280"]["pressure"] = round(data.pressure * 10) / 10.0;
  doc["sensors"]["gas"]["co2_ppm"] = data.gas_level;
  doc["system"]["free_heap"] = ESP.getFreeHeap();
  doc["system"]["uptime"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Send via LoRa
  Serial.print("Sending LoRa packet... ");
  int state = radio.transmit(jsonString);
  
  if (state == RADIOLIB_ERR_NONE) {
    Serial.println("success!");
    Serial.println("📡 LoRa: " + jsonString);
  } else {
    Serial.print("failed, code ");
    Serial.println(state);
  }
  
  // Debug info
  Serial.println("--- Sensor Reading ---");
  Serial.printf("DHT22 - Temp: %.1f°C, Humidity: %.1f%%\n", 
                data.temperature_dht, data.humidity_dht);
  Serial.printf("BME280 - Temp: %.1f°C, Pressure: %.1f hPa\n", 
                data.temperature_bme, data.pressure);
  Serial.printf("Gas Sensor - CO2: %d ppm\n", data.gas_level);
  Serial.println("---------------------");
}
```

### 3.2 Configuración por Nodo

Crear archivos de configuración específicos:

**arduino/src/config_node01.h:**
```cpp
#define NODE_ID "ESP32_NODE_01"
#define LOCATION "aula20"
```

**arduino/src/config_node02.h:**
```cpp
#define NODE_ID "ESP32_NODE_02"
#define LOCATION "aula21"
```

**arduino/src/config_node03.h:**
```cpp
#define NODE_ID "ESP32_NODE_03"
#define LOCATION "laboratorio"
```

---

## 🌐 FASE 4: Gateway LoRa en Raspberry Pi

### 4.1 Crear Gateway LoRa

Crear `gateway/lora_gateway.py`:

```python
#!/usr/bin/env python3
"""
LoRa Gateway - Recibe datos de nodos ESP32 via LoRa y los publica en MQTT
"""

import json
import time
import threading
from datetime import datetime
import paho.mqtt.client as mqtt

# Importar librería LoRa para Raspberry Pi
try:
    from SX127x.LoRa import *
    from SX127x.board_config import BOARD
    LORA_AVAILABLE = True
except ImportError:
    print("⚠️  Librería SX127x no disponible. Instalar con:")
    print("   git clone https://github.com/rpsreal/pySX127x")
    print("   cd pySX127x && sudo python3 setup.py install")
    LORA_AVAILABLE = False

class LoRaGateway(LoRa):
    def __init__(self, mqtt_broker="localhost", mqtt_port=1883, base_topic="iescelia"):
        super(LoRaGateway, self).__init__()
        
        self.mqtt_broker = mqtt_broker
        self.mqtt_port = mqtt_port
        self.base_topic = base_topic
        self.mqtt_client = None
        self.running = False
        
        # LoRa configuration (same as ESP32)
        self.set_mode(MODE.SLEEP)
        self.set_dio_mapping([0] * 6)
        self.set_freq(868.0)
        self.set_bw(BW.BW125)
        self.set_coding_rate(CODING_RATE.CR4_5)
        self.set_spreading_factor(7)
        self.set_pa_config(pa_select=1, output_power=10)
        self.set_sync_word(0x12)
        self.set_rx_crc(True)
        
        print("✅ LoRa Gateway configurado")
        
    def connect_mqtt(self):
        """Conecta al broker MQTT"""
        try:
            self.mqtt_client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
            self.mqtt_client.connect(self.mqtt_broker, self.mqtt_port, 60)
            self.mqtt_client.loop_start()
            print(f"✅ Conectado a MQTT {self.mqtt_broker}:{self.mqtt_port}")
            return True
        except Exception as e:
            print(f"❌ Error conectando MQTT: {e}")
            return False
    
    def on_rx_done(self):
        """Callback cuando se recibe un paquete LoRa"""
        try:
            # Leer payload
            payload = self.read_payload(nocheck=True)
            rssi = self.get_pkt_rssi_value()
            snr = self.get_pkt_snr_value()
            
            # Convertir bytes a string
            message = bytes(payload).decode('utf-8', errors='ignore')
            
            print(f"📡 LoRa recibido (RSSI: {rssi}, SNR: {snr}): {message}")
            
            # Procesar datos JSON
            self.process_lora_data(message, rssi, snr)
            
        except Exception as e:
            print(f"❌ Error procesando LoRa: {e}")
        
        # Volver a modo recepción
        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
    
    def process_lora_data(self, json_data, rssi, snr):
        """Procesa datos JSON recibidos por LoRa"""
        try:
            data = json.loads(json_data)
            
            node_id = data.get("node_id", "unknown")
            location = data.get("location", "unknown")
            timestamp = data.get("timestamp", int(time.time() * 1000))
            
            # Añadir información de radio
            data["radio"] = {
                "rssi": rssi,
                "snr": snr,
                "gateway_timestamp": int(time.time() * 1000)
            }
            
            # Publicar datos por sensor (compatible con pipeline existente)
            sensors = data.get("sensors", {})
            
            if "dht22" in sensors:
                dht_data = sensors["dht22"]
                if "temperature" in dht_data:
                    self.publish_sensor_value(
                        location, "temperature", "dht22",
                        dht_data["temperature"], node_id, timestamp
                    )
                if "humidity" in dht_data:
                    self.publish_sensor_value(
                        location, "humidity", "dht22",
                        dht_data["humidity"], node_id, timestamp
                    )
            
            if "bme280" in sensors:
                bme_data = sensors["bme280"]
                if "pressure" in bme_data:
                    self.publish_sensor_value(
                        location, "pressure", "bme280",
                        bme_data["pressure"], node_id, timestamp
                    )
            
            if "gas" in sensors:
                gas_data = sensors["gas"]
                if "co2_ppm" in gas_data:
                    self.publish_sensor_value(
                        location, "co2", "gas",
                        gas_data["co2_ppm"], node_id, timestamp
                    )
            
            # Publicar datos completos
            self.publish_complete_data(location, data, node_id)
            
        except Exception as e:
            print(f"❌ Error procesando datos LoRa: {e}")
    
    def publish_sensor_value(self, location, sensor_type, sensor_name, value, node_id, timestamp):
        """Publica valor individual (compatible con formato actual)"""
        topic = f"{self.base_topic}/{location}/{sensor_type}"
        
        payload = {
            "value": value,
            "sensor": sensor_name,
            "node_id": node_id,
            "timestamp": timestamp,
            "location": location
        }
        
        self.mqtt_publish(topic, payload)
    
    def publish_complete_data(self, location, data, node_id):
        """Publica datos completos"""
        topic = f"{self.base_topic}/{location}/raw"
        self.mqtt_publish(topic, data)
    
    def mqtt_publish(self, topic, payload):
        """Publica en MQTT"""
        try:
            json_payload = json.dumps(payload)
            self.mqtt_client.publish(topic, json_payload)
            print(f"📤 MQTT {topic}: {json_payload}")
        except Exception as e:
            print(f"❌ Error publicando MQTT: {e}")
    
    def start_listening(self):
        """Inicia escucha LoRa"""
        print("🔄 Iniciando escucha LoRa...")
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        self.running = True
        
        try:
            while self.running:
                time.sleep(0.1)
        except KeyboardInterrupt:
            print("\n⏹️  Deteniendo gateway...")
        finally:
            self.set_mode(MODE.SLEEP)
            if self.mqtt_client:
                self.mqtt_client.loop_stop()
                self.mqtt_client.disconnect()

def main():
    if not LORA_AVAILABLE:
        print("❌ Librerías LoRa no disponibles")
        return
    
    # Configurar GPIO
    BOARD.setup()
    
    # Crear gateway
    gateway = LoRaGateway()
    
    # Conectar MQTT
    if not gateway.connect_mqtt():
        return
    
    print("🚀 LoRa Gateway iniciado")
    print("   Frecuencia: 868.0 MHz")
    print("   Esperando datos de nodos ESP32...")
    
    # Iniciar escucha
    gateway.start_listening()

if __name__ == "__main__":
    main()
```

### 4.2 Instalar Dependencias LoRa en Raspberry Pi

```bash
# Instalar librería LoRa para Raspberry Pi
git clone https://github.com/rpsreal/pySX127x
cd pySX127x
sudo python3 setup.py install

# Configurar SPI
sudo raspi-config
# Interface Options > SPI > Enable

# Reiniciar
sudo reboot
```

---

## 🔌 FASE 5: Conexiones Hardware

### 5.1 Conexiones ESP32 + Módulo LoRa SX1276

```
ESP32          SX1276
-----          ------
3.3V     -->   VCC
GND      -->   GND
GPIO5    -->   SCK
GPIO19   -->   MISO
GPIO27   -->   MOSI
GPIO18   -->   NSS (CS)
GPIO26   -->   DIO0
GPIO14   -->   RST
GPIO33   -->   DIO1
```

### 5.2 Conexiones Sensores (por nodo)

```
ESP32          DHT22
-----          -----
3.3V     -->   VCC
GND      -->   GND
GPIO4    -->   DATA

ESP32          BME280
-----          ------
3.3V     -->   VCC
GND      -->   GND
GPIO21   -->   SDA
GPIO22   -->   SCL

ESP32          MQ-135
-----          ------
3.3V     -->   VCC
GND      -->   GND
A0       -->   AOUT
```

### 5.3 Conexiones Raspberry Pi + SX1276

```
RPi Pin        SX1276
-------        ------
3.3V     -->   VCC
GND      -->   GND
GPIO11   -->   SCK
GPIO9    -->   MISO
GPIO10   -->   MOSI
GPIO8    -->   NSS
GPIO25   -->   DIO0
GPIO24   -->   RST
GPIO23   -->   DIO1
```

---

## 🧪 FASE 6: Testing y Validación

### 6.1 Test Individual de Nodos

**Paso 1: Programar primer nodo**
```bash
# En arduino/
pio run -e esp32dev -t upload -t monitor
```

**Verificar:**
- ✅ Sensores leen datos correctos
- ✅ LoRa se inicializa sin errores
- ✅ Paquetes se envían cada 30 segundos

**Paso 2: Test de Gateway**
```bash
# En Raspberry Pi
cd gateway/
python3 lora_gateway.py
```

**Verificar:**
- ✅ Gateway recibe paquetes LoRa
- ✅ Datos se publican en MQTT
- ✅ Pipeline funciona (verificar Grafana)

### 6.2 Test de Red Completa

**Programar los 3 nodos:**
1. Cambiar `NODE_ID` y `LOCATION` en cada uno
2. Programar y desplegar en ubicaciones
3. Verificar recepción en gateway

**Verificar en Grafana:**
- ✅ Datos de 3 ubicaciones
- ✅ Actualización cada 30 segundos
- ✅ Sin pérdida de paquetes significativa

### 6.3 Test de Alcance y Cobertura

**Pruebas de campo:**
1. Medir alcance máximo entre nodos
2. Verificar calidad de señal (RSSI/SNR)
3. Probar en condiciones reales (aulas/laboratorio)

**Optimización:**
- Ajustar potencia de transmisión
- Modificar spreading factor si es necesario
- Posicionar antenas óptimamente

---

## 📊 FASE 7: Integración Final

### 7.1 Actualizar Scripts de Ejecución

Modificar `demo.bat` para incluir gateway LoRa:

```batch
@echo off
echo 🚀 Iniciando Proyecto Medusse con LoRa
echo.

echo ✅ Iniciando servicios Docker...
docker compose -f docker/docker-compose.yml up -d

echo ✅ Esperando servicios...
timeout /t 10 /nobreak > nul

echo ✅ Abriendo Grafana...
start http://localhost:3000

echo ✅ Gateway LoRa debe ejecutarse en Raspberry Pi:
echo    python3 gateway/lora_gateway.py
echo.
echo 📊 Dashboard: http://localhost:3000
echo 👤 Usuario: admin / Contraseña: medusse2025
echo.
echo ⏹️  Para parar: Ctrl+C en gateway y ejecutar 'docker compose down'
pause
```

### 7.2 Actualizar Documentación

Actualizar `README.md` con información LoRa:

```markdown
## 🔄 Modo LoRa (Hardware Real)

### Requisitos Hardware
- 3x ESP32 con módulos LoRa SX1276
- 1x Raspberry Pi con módulo LoRa
- Sensores: DHT22, BME280, MQ-135

### Ejecución
1. **Programar nodos ESP32** con firmware LoRa
2. **Iniciar servicios Docker** en PC: `docker compose up -d`
3. **Ejecutar gateway LoRa** en RPi: `python3 gateway/lora_gateway.py`
4. **Acceder dashboard**: http://localhost:3000

### Configuración LoRa
- Frecuencia: 868 MHz (EU)
- Bandwidth: 125 kHz
- Spreading Factor: 7
- Coding Rate: 4/5
- Potencia: 10 dBm
```

---

## 📅 Cronograma de Implementación

### **Semana 1-2: Preparación**
- [ ] Adquirir hardware
- [ ] Configurar entorno desarrollo
- [ ] Instalar librerías

### **Semana 3-4: Desarrollo**
- [ ] Desarrollar firmware LoRa
- [ ] Crear gateway Raspberry Pi
- [ ] Testing básico comunicación

### **Semana 5: Integración**
- [ ] Conectar con pipeline existente
- [ ] Testing nodo individual
- [ ] Verificar dashboards

### **Semana 6: Despliegue**
- [ ] Programar todos los nodos
- [ ] Desplegar en ubicaciones reales
- [ ] Testing completo end-to-end
- [ ] Optimización y ajustes

---

## 🚀 COMPATIBILIDAD CON NUEVA ARQUITECTURA v2.0

### ✅ API REST y Flutter App - CERO CAMBIOS NECESARIOS

**La nueva arquitectura con API REST y App Flutter está COMPLETAMENTE preparada para LoRa Mesh:**

#### 🌐 API REST (Sin Cambios)
- **Endpoints idénticos** - Todos los endpoints seguirán funcionando
- **WebSocket tiempo real** - Continuará recibiendo datos vía MQTT
- **Formato JSON** - Exactamente el mismo que usa el simulador
- **Base de datos** - InfluxDB mantiene misma estructura

#### 📱 App Flutter (Sin Cambios)
- **Pantallas funcionarán igual** - Home, Detalle, Gráficos
- **Tiempo real vía WebSocket** - Seguirá recibiendo datos automáticamente
- **Gráficos históricos** - Mismos datos desde InfluxDB
- **Sistema de alertas** - Mismos umbrales y lógica

#### 🔄 Pipeline de Datos (Sin Cambios)
```
LoRa Nodos → Gateway LoRa → MQTT → Telegraf → InfluxDB → Grafana
                              ↓
                          API REST ← Flutter App
                              ↓
                         WebSocket (tiempo real)
```

### 🎯 Solo Cambia el Gateway

**Antes (Simulador):**
```python
# arduino/medusse_simulator.py
client.publish("iescelia/aula20/temperature", json_data)
```

**Después (LoRa Gateway):**
```python
# gateway/lora_gateway.py (ya incluido en MIGRACION.md)
self.mqtt_publish("iescelia/aula20/temperature", json_data)
```

**¡Mismo formato JSON, mismo topic MQTT, mismo resultado!**

### 📊 Beneficios de la Migración con Nueva Arquitectura

1. **Demostración Completa** - Puedes mostrar el ecosistema completo funcionando
2. **Testing Fácil** - App Flutter para verificar datos LoRa en tiempo real
3. **API Lista** - Endpoints para integrar con otros sistemas
4. **Escalabilidad** - Fácil añadir más nodos o sensores
5. **Profesional** - Sistema completo listo para producción

### 🧪 Testing con Nueva Arquitectura

**Proceso de Validación:**
1. **Programar nodo LoRa** → Verificar datos en terminal
2. **Iniciar gateway LoRa** → Verificar publicación MQTT
3. **Abrir Grafana** → Verificar datos en dashboard
4. **Abrir API REST** → Verificar endpoints funcionando
5. **Ejecutar Flutter App** → Verificar tiempo real y gráficos

**Scripts de Testing:**
```cmd
# 1. Iniciar servicios
sistema_completo.bat

# 2. En Raspberry Pi
python3 gateway/lora_gateway.py

# 3. Verificar todo funciona
# - Grafana: http://localhost:3000
# - API: http://localhost:3001/api/summary
# - Flutter: ejecutar_flutter.bat
```

---

## 🆘 Solución de Problemas

### Problemas Comunes LoRa

**Error: "LoRa initialization failed"**
```
Solución:
1. Verificar conexiones SPI
2. Comprobar alimentación 3.3V
3. Revisar pines DIO0/DIO1
```

**No se reciben paquetes en gateway**
```
Solución:
1. Verificar misma frecuencia (868 MHz)
2. Comprobar configuración idéntica
3. Revisar alcance y obstáculos
```

**Pérdida de paquetes alta**
```
Solución:
1. Aumentar spreading factor (7→9)
2. Reducir potencia si hay interferencias
3. Cambiar posición antenas
```

### Problemas Pipeline

**Datos no aparecen en Grafana**
```
Solución:
1. Verificar gateway publica MQTT
2. Comprobar logs Telegraf
3. Verificar formato JSON
```

---

## ✅ Checklist Final

### Hardware
- [ ] 3 nodos ESP32+LoRa programados y funcionando
- [ ] Gateway Raspberry Pi operativo
- [ ] Sensores calibrados y leyendo correctamente
- [ ] Alcance LoRa verificado en ubicaciones reales

### Software
- [ ] Firmware LoRa estable sin reinicios
- [ ] Gateway procesa y publica datos MQTT
- [ ] Pipeline Telegraf→InfluxDB funcionando
- [ ] Dashboards Grafana actualizándose

### Nueva Arquitectura v2.0
- [ ] API REST funcionando con datos LoRa
- [ ] WebSocket streaming tiempo real
- [ ] App Flutter recibiendo datos reales
- [ ] Endpoints respondiendo correctamente

### Documentación
- [ ] README.md actualizado con instrucciones LoRa
- [ ] Esquemas de conexiones documentados
- [ ] Procedimientos de troubleshooting
- [ ] Configuraciones respaldadas

---

## 🎯 Resultado Final

Al completar esta migración tendrás:

✅ **Red LoRa real** con 3 nodos ESP32 en ubicaciones físicas
✅ **Gateway centralizado** en Raspberry Pi
✅ **Pipeline completo** funcionando sin cambios
✅ **Dashboards profesionales** con datos reales
✅ **API REST completa** con datos LoRa en tiempo real
✅ **App móvil Flutter** funcionando con sensores reales
✅ **WebSocket streaming** de datos LoRa
✅ **Sistema escalable** para añadir más nodos
✅ **Documentación completa** para mantenimiento

**El proyecto Medusse evolucionará de simulación a un ecosistema IoT real completo con:**
- 🏭 **Hardware real** (ESP32 + LoRa + Sensores)
- 📊 **Dashboard profesional** (Grafana)
- 🌐 **API REST moderna** (Node.js + WebSocket)
- 📱 **App móvil multiplataforma** (Flutter)
- 🔄 **Pipeline robusto** (MQTT → InfluxDB)

**¡Ecosistema IoT profesional listo para producción!**

---

*Migración diseñada por Francisco López Alarte para IES José Rodrigo Botet - Curso 2025/2026*