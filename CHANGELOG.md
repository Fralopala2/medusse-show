# Changelog - Proyecto Medusse IoT

## [2.0.0] - 2025-10-11 - SISTEMA COMPLETO CON API Y APP MÓVIL ✅

### 🎉 HITO PRINCIPAL: Ecosistema IoT Completo

**El proyecto Medusse IoT ahora incluye API REST y App móvil Flutter, convirtiéndose en un ecosistema IoT completo.**

### 🚀 Nuevas Funcionalidades Principales

#### ✅ API REST Node.js
- **Servidor Express** con endpoints RESTful
- **WebSocket** para datos en tiempo real
- **Conexión directa InfluxDB** con credenciales reales
- **Sincronización exacta con Grafana**
- **Parser CSV robusto** para datos InfluxDB

#### ✅ App Móvil Flutter
- **3 pantallas completas:** Home, Detalle, Gráficos
- **Tiempo real** vía WebSocket
- **Gráficos interactivos** con fl_chart
- **Sistema de alertas** inteligente
- **Multiplataforma:** Windows, Web, Android, iOS

#### ✅ Arquitectura Híbrida
- **HTTP REST** para datos históricos
- **WebSocket** para streaming tiempo real
- **Provider pattern** para gestión de estado
- **Material Design 3** UI moderna

### 📊 Endpoints API Implementados
- `GET /health` - Estado de servicios
- `GET /api/locations` - Ubicaciones disponibles
- `GET /api/summary` - Resumen general
- `GET /api/latest/:location` - Últimos valores
- `GET /api/data/:location/:sensor` - Datos históricos
- `GET /api/stats/:location/:sensor` - Estadísticas
- `WebSocket ws://localhost:3002` - Tiempo real

### 📱 Características App Flutter
- **Home Screen:** Resumen general y ubicaciones
- **Location Detail:** Sensores por ubicación con alertas
- **Sensor Charts:** Gráficos históricos interactivos
- **Real-time Updates:** Datos actualizándose automáticamente
- **Alert System:** Umbrales inteligentes por sensor

### 🔧 Scripts de Ejecución Nuevos
- `iniciar_api.bat` - Iniciar API REST
- `probar_api.bat` - Testing automático API
- `ejecutar_flutter.bat` - Ejecutar app Flutter

### 🎯 Preparado para LoRa Mesh
- **Arquitectura compatible** - Solo cambiar gateway
- **Formato datos idéntico** - Sin modificar API/Flutter
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación migración** completa

### 📁 Archivos Nuevos
- `api/` - Directorio completo API REST
- `medusse_app/` - Directorio completo Flutter
- `README_FLUTTER.md` - Documentación app móvil
- Scripts de ejecución y testing

## [1.0.0] - 2025-10-09 - PROYECTO CORE COMPLETADO ✅

### 🎉 HITO PRINCIPAL: Sistema IoT Completo Funcional

**El proyecto Medusse IoT está 100% completado y operativo.**

### ✅ Stack Completo Implementado
- **Docker Stack**: Mosquitto, InfluxDB, Telegraf, Grafana
- **Pipeline de Datos**: MQTT → Telegraf → InfluxDB → Grafana
- **Simulador Optimizado**: 3 ubicaciones, 4 sensores, datos realistas
- **Dashboard Completo**: 5 paneles con visualización optimizada

### 📊 Dashboard Final - 5 Paneles
1. **🌡️ Temperatura por Ubicación** - Gráfico de líneas
2. **🫁 Niveles de CO2 por Ubicación** - Con alertas por colores
3. **🚨 CO2 Actual por Ubicación** - Gauges con umbrales
4. **💧 Humedad por Ubicación** - Tendencias temporales
5. **🌪️ Presión Atmosférica por Ubicación** - Datos barométricos

### 🎯 Características Finales
- **3 Ubicaciones**: Aula 20, Aula 21, Laboratorio
- **4 Tipos de Sensores**: Temperatura, Humedad, CO2, Presión
- **Colores Diferenciados**: Rojo, Azul, Verde por ubicación
- **Visualización Optimizada**: Datos cada 15s, agregación 30s, refresh 30s
- **Acceso Web**: http://localhost:3000 (admin/medusse2025)

### 📁 Archivos Finales Optimizados
- `demo.bat` - ✅ Ejecutar proyecto completo automáticamente
- `verificar.bat` - ✅ Verificación completa del sistema
- `arduino/medusse_simulator.py` - ✅ Simulador optimizado 3 ubicaciones
- `docker/grafana/dashboards/medusse-clean.json` - ✅ Dashboard completo
- `README.md` - ✅ Documentación completa actualizada

### 🔧 Optimizaciones Implementadas
- **Visualización Mejorada**: Eliminado "amasijo de colores"
- **Frecuencia Optimizada**: Datos menos saturados, más legibles
- **Pipeline Estable**: Sin errores de configuración
- **Proyecto Limpio**: Eliminados archivos innecesarios

### 🚀 Uso del Proyecto
```cmd
verificar.bat    # Verificar sistema
demo.bat         # Ejecutar demo completa
```

## [0.4.0] - 2025-10-09 - Stack Docker y Pipeline

### ✅ Completado
- **Stack Docker completamente funcional**
- **Pipeline MQTT → Telegraf → InfluxDB → Grafana**
- **Dashboard Grafana con datos en tiempo real**
- **Configuración automática de servicios**

### 📁 Archivos Docker
- `docker/docker-compose.yml` - Stack completo de servicios
- `docker/grafana/provisioning/` - Configuración automática
- `docker/telegraf/telegraf.conf` - Pipeline de datos
- `docker/mosquitto/config/` - Configuración MQTT

### 🔧 Servicios Implementados
- **Mosquitto MQTT**: Puerto 1883, WebSocket 9001
- **InfluxDB 2.7**: Puerto 8086, bucket "sensors"
- **Telegraf**: Pipeline MQTT→InfluxDB
- **Grafana 10.2.0**: Puerto 3000, dashboards automáticos

## [0.3.0] - 2025-01-08 - Gateway y Simuladores

### ✅ Completado
- **Gateway Medusse funcional con MQTT**
- **Simuladores múltiples nodos ESP32**
- **Procesamiento JSON estructurado**

### 📁 Archivos Gateway
- `gateway/medusse_gateway.py` - Gateway principal
- `arduino/test_multiple_nodes.py` - Simulador múltiples nodos
- `arduino/simulate_serial.py` - Simulador single node

## [0.2.0] - 2025-01-08 - Firmware ESP32

### ✅ Completado
- **Firmware ESP32 con sensores reales**
- **PlatformIO configurado y funcionando**
- **Sensores DHT22, BME280, Gas implementados**

### 📁 Archivos Arduino
- `arduino/src/main.cpp` - Firmware completo
- `arduino/src/config.h` - Configuración modular
- `arduino/platformio.ini` - Configuración PlatformIO

## [0.1.0] - Inicial - Estructura Base

### ✅ Completado
- **Estructura básica del proyecto**
- **Configuración inicial**
- **Documentación base**

---

## 🏆 ESTADO FINAL: PROYECTO COMPLETADO

**El proyecto Medusse IoT es un sistema IoT completo y funcional que demuestra:**
- Simulación realista de sensores ESP32
- Pipeline de datos moderno (MQTT/InfluxDB/Grafana)
- Dashboard profesional en tiempo real
- Arquitectura escalable y mantenible

**Listo para producción o como base para sensores ESP32 reales.**

---

*Desarrollado para IES Celia Viñas - Curso 2024/2025*  
*Autor: Francisco Manuel López Alarte*