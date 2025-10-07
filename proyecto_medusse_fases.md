# Plan de Desarrollo Proyecto Medusse con LoRa Mesh

## FASE 1: Configuración del Entorno de Desarrollo

### 1.1 Emuladores y Herramientas

**Para Arduino/ESP32:**
- **Wokwi** (https://wokwi.com) - Emulador online ESP32 + sensores
- **Proteus Design Suite** - Simulador profesional
- **Tinkercad Circuits** - Simulador básico de Arduino

**Para Raspberry Pi:**
- **QEMU** - Emulador ARM para Raspbian
- **Docker** - Contenedores con Raspbian para servicios
- **VirtualBox** - Máquina virtual con Raspberry Pi Desktop

**Herramientas de Desarrollo:**
- Arduino IDE / PlatformIO
- Visual Studio Code con extensiones IoT
- MQTT Explorer (para debugging)

### 1.2 Instalación de Dependencias
- Librerías Arduino: Meshtastic, sensores DHT/BME280/MQ-135
- Mosquitto MQTT Broker (local)
- Telegraf, InfluxDB, Grafana (Docker Compose)

---

## FASE 2: Desarrollo Nodos Arduino (Sensores)

### 2.1 Hardware Virtual
**Componentes a emular en Wokwi:**
- ESP32 con módulo LoRa (SX1262/SX1276)
- Sensor DHT22 (temperatura y humedad)
- Sensor BME280 (temperatura, humedad, presión)
- Sensor MQ-135 o CCS811 (CO2)

### 2.2 Firmware Arduino
**Tareas:**
1. Lectura de sensores (temperatura, CO2)
2. Formateo de datos (JSON/Protobuf)
3. Configuración Meshtastic:
   - Inicialización del módulo LoRa
   - Configuración de red mesh
   - Envío de mensajes por mesh
4. Gestión de energía (deep sleep)
5. Manejo de errores y reintentos

**Topics MQTT simulados:**
- `iescelia/aula20/temperature`
- `iescelia/aula21/temperature`
- `iescelia/aula20/co2`
- `iescelia/aula21/co2`

### 2.3 Testing
- Pruebas unitarias de lectura de sensores
- Validación de payloads
- Simulación de envío mesh (usando serial/MQTT local)

---

## FASE 3: Gateway Raspberry Pi

### 3.1 Configuración Base
**En emulador (QEMU/Docker):**
- Sistema operativo Raspbian/Raspberry Pi OS
- Instalación de dependencias (Python, MQTT client)
- Configuración Meshtastic en Raspberry

### 3.2 Software Gateway
**Funcionalidades:**
1. Recepción de mensajes Meshtastic desde nodos
2. Parsing de datos de sensores
3. Publicación a MQTT Broker:
   - Topic: `iescelia/#`
   - Formato: JSON con timestamp, sensor_id, valor
4. Log de mensajes y errores
5. Monitorización del estado de la mesh

### 3.3 MQTT Broker
**Mosquitto configuración:**
- Puerto 1883 (local) o 8883 (TLS)
- ACLs y autenticación básica
- Persistencia de mensajes
- QoS configurado para IoT

---

## FASE 4: Pipeline de Datos (Telegraf → InfluxDB)

### 4.1 Telegraf
**Configuración:**
- Input plugin: MQTT Consumer
  - Suscripción a `iescelia/#`
  - Parsing de JSON
- Output plugin: InfluxDB
- Procesamiento: tags (aula, sensor_type), fields (valor)

### 4.2 InfluxDB
**Setup:**
- Base de datos: `iescelia_sensors`
- Retention policy: 30 días (ajustable)
- Mediciones:
  - `temperature`
  - `co2`
  - `humidity`

### 4.3 Docker Compose
```yaml
version: '3.8'
services:
  mosquitto:
    image: eclipse-mosquitto
  telegraf:
    image: telegraf
  influxdb:
    image: influxdb:2.7
  grafana:
    image: grafana/grafana
```

---

## FASE 5: Visualización con Grafana

### 5.1 Configuración Grafana
- Data source: InfluxDB
- Organización de dashboards por aulas

### 5.2 Dashboards
**Panel 1: Temperatura en tiempo real**
- Gráfico de líneas por aula
- Alertas para umbrales

**Panel 2: CO2 en tiempo real**
- Gauge con código de colores
- Histórico 24h

**Panel 3: Estado de la red Mesh**
- Nodos activos/inactivos
- Calidad de señal (RSSI)

### 5.3 Alertas
- Configuración de notificaciones (Telegram/Email)
- Umbrales críticos (temperatura >30°C, CO2 >1000ppm)

---

## FASE 6: Red Meshtastic (Integración Real)

### 6.1 Configuración Mesh
**Parámetros Meshtastic:**
- Región: EU_868 MHz
- Modo: Long Range / Fast
- Hop limit: 3-7 saltos
- Encryption: habilitada

### 6.2 Testing de Red
**Pruebas:**
1. Alcance entre nodos (indoor/outdoor)
2. Latencia de mensajes
3. Pérdida de paquetes
4. Consumo energético
5. Escalabilidad (añadir más nodos)

### 6.3 Optimización
- Ajuste de potencia de transmisión
- Configuración de duty cycle
- Priorización de mensajes

---

## FASE 7: Integración y Testing Completo

### 7.1 Testing End-to-End
**Flujo completo:**
1. Sensor → Arduino → Meshtastic
2. Meshtastic → Gateway Raspberry
3. Gateway → MQTT Broker
4. MQTT → Telegraf → InfluxDB
5. InfluxDB → Grafana

### 7.2 Pruebas de Estrés
- Múltiples nodos simultáneos
- Alta frecuencia de muestreo
- Fallos de red simulados
- Recuperación automática

### 7.3 Documentación
- Diagramas de flujo finales
- Manual de instalación
- Guía de troubleshooting
- Código comentado y versionado

---

## CRONOGRAMA PRE-FEBRERO

**Semana 1-2:**
- Fase 1: Setup entorno de desarrollo
- Fase 2.1-2.2: Firmware básico Arduino

**Semana 3-4:**
- Fase 2.3: Testing sensores
- Fase 3: Gateway Raspberry (emulado)

**Semana 5-6:**
- Fase 4: Pipeline Telegraf/InfluxDB
- Fase 5: Dashboards básicos Grafana

**Semana 7-8:**
- Fase 6.1-6.2: Testing mesh real (si hay hardware)
- Fase 7: Integración y ajustes finales

---

## ENTREGABLES

✅ Firmware Arduino funcional con sensores  
✅ Gateway Raspberry operativo  
✅ Pipeline MQTT → InfluxDB funcionando  
✅ Dashboards Grafana configurados  
✅ Red Meshtastic estable (mínimo 2-3 nodos)  
✅ Documentación completa  
✅ Repositorio Git con código versionado