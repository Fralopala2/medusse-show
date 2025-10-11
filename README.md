# Proyecto Medusse IoT

Sistema IoT completo para monitoreo ambiental con ESP32, MQTT, InfluxDB, Grafana, API REST y App móvil Flutter.

## 📋 Descripción

Proyecto IoT completo que incluye simulación de sensores ESP32, pipeline de datos moderno, dashboard web profesional, API REST y aplicación móvil Flutter. Sistema preparado para migración a hardware real con comunicación LoRa Mesh.

## 🏗️ Arquitectura Completa

```
ESP32 Simulators → MQTT → Telegraf → InfluxDB → Grafana Dashboard
                     ↓
                 API REST ← Flutter Mobile App
                     ↓
                WebSocket (Real-time)
```

## 📁 Estructura del Proyecto

```
proyecto-medusse/
├── arduino/                    # Simuladores y firmware ESP32
│   ├── medusse_simulator.py   # ✅ Simulador principal (3 ubicaciones)
│   └── src/                   # Código ESP32 real
├── docker/                    # Stack completo Docker
│   ├── docker-compose.yml     # Servicios: MQTT, InfluxDB, Grafana, Telegraf
│   ├── grafana/              # Configuración y dashboards
│   ├── telegraf/             # Pipeline de datos MQTT→InfluxDB
│   └── mosquitto/            # Broker MQTT
├── api/                       # ✅ API REST Node.js
│   ├── server.js             # Servidor API con WebSocket
│   ├── package.json          # Dependencias Node.js
│   └── README.md             # Documentación API
├── medusse_app/               # ✅ App móvil Flutter
│   ├── lib/                  # Código fuente Flutter
│   ├── pubspec.yaml          # Dependencias Flutter
│   └── README_FLUTTER.md     # Documentación app
├── gateway/                   # Gateway avanzado (opcional)
├── demo.bat                   # 🚀 Ejecutar demo completa
├── iniciar_api.bat           # 🚀 Iniciar API REST
├── ejecutar_flutter.bat      # 📱 Ejecutar app Flutter
├── verificar.bat             # 🔍 Verificar sistema
└── README.md                 # Esta documentación
```

## 🚀 Características

### Sistema IoT Completo
- **Simulador de sensores** con datos realistas
- **Gateway MQTT** para comunicación
- **Base de datos InfluxDB** para almacenamiento
- **Dashboard Grafana** para visualización
- **API REST** para integración
- **App móvil Flutter** para monitoreo

### Sensores Monitoreados
- 🌡️ **Temperatura** (°C)
- 💧 **Humedad** (%)
- 🌬️ **CO₂** (ppm)
- 📊 **Presión atmosférica** (hPa)

### Ubicaciones
- 📍 **Aula 20**
- 📍 **Aula 21** 
- 📍 **Laboratorio**

### Aplicación Móvil
- 📱 **Flutter app** con Material Design 3
- 📊 **Dashboard en tiempo real**
- 📈 **Gráficos históricos interactivos**
- 🔄 **Sincronización con Grafana**
- 📍 **Vista por ubicaciones**

## 🎉 Estado: SISTEMA COMPLETO ✅

### ✅ Funcionalidades Implementadas

**Core IoT System:**
- **3 ubicaciones monitoreadas:** Aula 20, Aula 21, Laboratorio
- **4 tipos de sensores:** Temperatura, Humedad, CO2, Presión
- **Dashboard Grafana** en tiempo real con visualización optimizada
- **Pipeline completo** MQTT → Telegraf → InfluxDB → Grafana
- **Simulador realista** con datos variables por ubicación

**API REST & Mobile:**
- **API REST Node.js** con endpoints para datos históricos y tiempo real
- **WebSocket** para streaming de datos en vivo
- **App móvil Flutter** con gráficos interactivos y alertas
- **Arquitectura preparada** para migración a LoRa Mesh

## 🚀 Inicio Rápido

### Instalación Automática (Recomendada)

**Para equipos nuevos (instala Docker automáticamente):**
```cmd
instalar_proyecto.bat
```

**Para equipos con Docker ya instalado:**
```cmd
setup_rapido.bat
```

### Uso del Sistema Completo

**1. Verificar Sistema:**
```cmd
verificar.bat              # Verificación completa
verificar_rapido.bat        # Verificación rápida (30 segundos)
```

**2. Ejecutar Ecosistema Completo:**
```cmd
sistema_completo.bat        # Ecosistema completo (recomendado)
sistema_completo_debug.bat  # Con diagnósticos detallados
```

**3. Ejecutar Componentes Individuales:**
```cmd
demo.bat                    # Solo Dashboard Grafana
iniciar_api.bat            # Solo API REST
ejecutar_flutter.bat       # Solo App Flutter
```

### Acceso a Interfaces

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Grafana Dashboard** | http://localhost:3000 | admin / medusse2025 |
| **API REST** | http://localhost:3001 | - |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |
| **App Flutter** | Ejecutar con script | - |

## 📊 Servicios Incluidos

| Servicio        | Puerto | Descripción                        |
| --------------- | ------ | ---------------------------------- |
| **Grafana**     | 3000   | Dashboard y visualización          |
| **InfluxDB**    | 8086   | Base de datos de series temporales |
| **MQTT Broker** | 1883   | Comunicación IoT                   |
| **Telegraf**    | -      | Pipeline de datos                  |
| **API REST**    | 3001   | API para datos históricos         |
| **WebSocket**   | 3002   | Streaming tiempo real              |
| **Flutter App** | -      | App móvil multiplataforma          |

## 🛠️ Uso Manual

### Ejecutar Solo el Simulador

```cmd
python arduino/medusse_simulator.py
```

### Iniciar Solo los Servicios Docker

```cmd
docker compose -f docker/docker-compose.yml up -d
```

### Ver Logs de Servicios

```cmd
docker logs medusse_grafana
docker logs medusse_influxdb
docker logs medusse_telegraf
```

## 📈 Características del Dashboard

- **Panel de Temperatura:** Gráfico de líneas por ubicación
- **Panel de CO2:** Niveles con alertas por colores
- **Panel de Humedad:** Tendencias por ubicación
- **Panel de Presión:** Valores por ubicación
- **Gauges de CO2:** Valores actuales con umbrales
- **Actualización:** Cada 30 segundos
- **Agregación:** Datos promediados cada 30 segundos

<img width="960" height="465" alt="dashboard" src="https://github.com/user-attachments/assets/5bf163d6-6181-49fd-bcd1-c4f810237f97" />


## 🔧 Configuración Avanzada

### Modificar Frecuencia de Datos

Editar `arduino/medusse_simulator.py`:

```python
time.sleep(15)  # Cambiar intervalo entre ciclos
```

### Agregar Nueva Ubicación

En `medusse_simulator.py`, agregar a la lista `locations`:

```python
{"name": "nueva_aula", "node": "ESP32_NODE_04", "temp_base": 23}
```

### Personalizar Dashboard

- Editar: `docker/grafana/dashboards/medusse-clean.json`
- Reiniciar: `docker compose restart grafana`

## 🐛 Solución de Problemas

### No aparecen datos en Grafana

1. Verificar que el simulador esté corriendo
2. Comprobar logs: `docker logs medusse_telegraf`
3. Verificar conexión MQTT: `docker logs medusse_mosquitto`

### Error "bucket not found"

```cmd
docker compose down
docker volume prune -f
docker compose up -d
```

### Servicios no inician

```cmd
verificar.bat
```

## 📝 Desarrollo

### Conectar ESP32 Real

1. Modificar `gateway/medusse_gateway.py`
2. Cambiar source de `simulator` a `serial`
3. Especificar puerto: `--port COM3`

### Agregar Nuevos Sensores

1. Modificar simulador para incluir nuevos campos
2. Actualizar configuración Telegraf
3. Crear nuevos paneles en Grafana

## 📄 Licencia

Este proyecto está bajo la licencia "All Rights Reserved".

Para consultas de licencia o permisos, contacta al autor.

## 👨‍💻 Autor

**Francisco Manuel López Alarte**

---

## 📱 App Móvil Flutter

### Características
- **Tiempo real** con WebSocket
- **Gráficos interactivos** con fl_chart
- **Sistema de alertas** inteligente
- **3 pantallas:** Home, Detalle ubicación, Gráficos históricos
- **Multiplataforma:** Windows, Web, Android, iOS

### Uso
```cmd
ejecutar_flutter.bat
```

Ver documentación completa en: [README_FLUTTER.md](README_FLUTTER.md)

## 🌐 API REST

### Endpoints Principales
- `GET /health` - Estado de servicios
- `GET /api/locations` - Ubicaciones disponibles
- `GET /api/summary` - Resumen de todas las ubicaciones
- `GET /api/latest/:location` - Últimos valores por ubicación
- `GET /api/data/:location/:sensor` - Datos históricos
- `WebSocket ws://localhost:3002` - Tiempo real

### Uso
```cmd
iniciar_api.bat
```

Ver documentación completa en: [api/README.md](api/README.md)

## 🔮 Migración a LoRa Mesh

El sistema está **completamente preparado** para migración a hardware real:

- **Arquitectura compatible** - Solo cambiar gateway
- **Formato de datos idéntico** - Sin modificar API/Flutter
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación completa** - Ver [MIGRACION.md](MIGRACION.md)

## 🎯 Próximos Pasos

- [x] ✅ API REST para datos
- [x] ✅ App móvil de monitoreo
- [x] ✅ Sistema de alertas automáticas
- [ ] Integración con ESP32 físicos
- [ ] Comunicación LoRa mesh
- [ ] Notificaciones push móviles

---

_Proyecto desarrollado para IES José Rodrigo Botet - Curso 2025/2026_
