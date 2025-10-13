# Proyecto Medusse IoT

**Ecosistema IoT completo y profesional** para monitoreo ambiental con ESP32, MQTT, InfluxDB, Grafana, API REST y App móvil Flutter. **Instalación automática en un solo clic.**

## 📋 Descripción

**Sistema IoT de nivel profesional** que incluye simulación realista de sensores ESP32, pipeline de datos moderno, dashboard web con branding personalizado, API REST robusta y aplicación móvil Flutter multiplataforma. **Completamente automatizado** con scripts de instalación y verificación. Sistema preparado para migración directa a hardware real con comunicación LoRa Mesh.

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
│   ├── medusse_simulator.py   # ✅ Simulador principal (4 ubicaciones)
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
├── gateway/                   # Gateway avanzado con múltiples fuentes
├── instalar_proyecto.bat     # 🚀 Instalación automática completa
├── setup_rapido.bat          # ⚡ Setup rápido (Docker ya instalado)
├── sistema_completo.bat      # 🌟 Ecosistema completo con diagnósticos
├── demo.bat                  # 🚀 Solo dashboard Grafana
├── iniciar_api.bat          # 🚀 API REST + WebSocket
├── ejecutar_flutter.bat     # 📱 App móvil Flutter
├── verificar.bat            # 🔍 Verificación completa
├── verificar_rapido.bat     # ⚡ Verificación rápida (30s)
├── probar_api.bat           # 🧪 Testing automático API
├── INSTALACION.md           # 📖 Guías de instalación
├── QUICK_START.md           # ⚡ Inicio rápido (5 minutos)
├── MIGRACION.md             # 🔄 Migración a LoRa Mesh
└── README.md                # Esta documentación
```

## 🚀 Características

### 🤖 Automatización Avanzada
- **Instalación automática** de Docker y dependencias
- **Scripts de verificación** con diagnósticos inteligentes
- **Setup completo** en un solo comando
- **Detección automática** de problemas y soluciones

### 🏗️ Sistema IoT Completo
- **Simulador de sensores** con datos realistas por ubicación
- **Gateway MQTT avanzado** con múltiples fuentes
- **Base de datos InfluxDB v2** con configuración persistente
- **Dashboard Grafana profesional** con filas colapsables, filtros avanzados y branding personalizado
- **API REST robusta** con cache inteligente
- **App móvil Flutter** multiplataforma con Material Design 3

### ⚡ Performance Optimizado
- **Cache automático** en API (30 segundos)
- **Pipeline sin pérdidas** con retry automático
- **Agregación inteligente** de datos (30s)
- **Networking Docker** optimizado

### Sensores Monitoreados
- 🌡️ **Temperatura** (°C)
- 💧 **Humedad** (%)
- 🌬️ **CO₂** (ppm)
- 📊 **Presión atmosférica** (hPa)

### Ubicaciones
- 📍 **Aula 20**
- 📍 **Aula 21**
- 📍 **Gimnasio**
- 📍 **Laboratorio**

### 📱 Aplicación Móvil Avanzada
- **Flutter app** con Material Design 3 y Google Fonts
- **3 pantallas completas:** Home, Detalle por ubicación, Gráficos históricos
- **WebSocket en tiempo real** para updates automáticos
- **Gráficos interactivos** con fl_chart y animaciones
- **Sistema de alertas** inteligente por umbrales
- **Provider pattern** para gestión de estado reactiva
- **Multiplataforma:** Windows, Web, Android, iOS

## 🎉 Estado: ECOSISTEMA COMPLETO ✅

### ✅ Funcionalidades Implementadas

**🤖 Automatización Total:**
- **Instalación en un clic** para equipos nuevos (`instalar_proyecto.bat`)
- **Setup rápido** para equipos con Docker (`setup_rapido.bat`)
- **Verificación automática** con diagnósticos (`verificar.bat`)
- **Ecosistema completo** con monitoreo (`sistema_completo.bat`)

**🏗️ Core IoT System:**
- **4 ubicaciones monitoreadas:** Aula 20 (22°C), Aula 21 (24°C), Gimnasio (23°C), Laboratorio (21°C)
- **4 tipos de sensores:** Temperatura, Humedad, CO2, Presión
- **Dashboard Grafana profesional** con filas colapsables, sección de resumen, filtros avanzados y branding personalizado
- **Pipeline optimizado** MQTT → Telegraf → InfluxDB → Grafana
- **Simulador inteligente** con datos realistas por ubicación

**🔌 API REST & Mobile Avanzados:**
- **API REST Node.js** con 6 endpoints y cache inteligente
- **WebSocket Server** para streaming en tiempo real (puerto 3002)
- **App Flutter completa** con 3 pantallas y gráficos interactivos
- **Sistema de alertas** automático por umbrales de CO2
- **Arquitectura híbrida** HTTP + WebSocket para mejor UX

**⚙️ Infraestructura Productiva:**
- **4 contenedores Docker** con networking interno optimizado
- **Volúmenes persistentes** para todos los servicios
- **Configuración InfluxDB v2** con tokens y organización
- **MQTT Mosquitto 2.0** con WebSocket habilitado
- **Restart policies** automáticas para alta disponibilidad

## 🚀 Inicio Ultra Rápido

### 🤖 Instalación Automática (Recomendada)

**Para equipos nuevos (instala Docker automáticamente):**
```cmd
instalar_proyecto.bat
```
*Instala Docker Desktop, Python, dependencias y configura todo automáticamente.*

**Para equipos con Docker ya instalado:**
```cmd
setup_rapido.bat
```
*Setup completo en menos de 2 minutos.*

### ⚡ Ejecución Inmediata

**Opción 1: Ecosistema Completo (Recomendada)**
```cmd
sistema_completo.bat
```
*Dashboard + API + preparación para Flutter + diagnósticos*

**Opción 2: Solo Dashboard Grafana**
```cmd
demo.bat
```
*Inicio rápido solo con visualización*

**Opción 3: Componentes Individuales**
```cmd
iniciar_api.bat        # Solo API REST + WebSocket
ejecutar_flutter.bat   # Solo App móvil Flutter
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

## 📊 Servicios y Tecnologías

| Servicio        | Puerto | Descripción                        | Versión |
| --------------- | ------ | ---------------------------------- | ------- |
| **Grafana**     | 3000   | Dashboard profesional con branding personalizado | 10.2.0 |
| **InfluxDB**    | 8086   | Base de datos series temporales con configuración v2 | 2.7 |
| **MQTT Broker** | 1883   | Mosquitto con WebSocket habilitado | 2.0 |
| **WebSocket MQTT** | 9001 | Comunicación web en tiempo real | 2.0 |
| **Telegraf**    | -      | Pipeline optimizado con múltiples consumers | 1.28 |
| **API REST**    | 3001   | Node.js con cache inteligente y 6 endpoints | Express 4.18.2 |
| **WebSocket**   | 3002   | Streaming datos en tiempo real para Flutter | ws 8.14.2 |
| **Flutter App** | -      | App multiplataforma con Material Design 3 | Flutter 3.9+ |

### 🔧 Stack Tecnológico Completo
- **Backend:** Node.js + Express + InfluxDB Client
- **Frontend Móvil:** Flutter + Provider + fl_chart + Google Fonts
- **Base de Datos:** InfluxDB 2.7 (series temporales)
- **Comunicación:** MQTT + WebSocket + HTTP REST
- **Visualización:** Grafana 10.2.0 + Dashboard personalizado
- **Contenedores:** Docker Compose con networking optimizado
- **Automatización:** Scripts batch para Windows

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

## 📈 Dashboard Profesional Personalizado

### 🎨 Diseño y Branding Avanzado
- **Header personalizado** con logo Medusse y gradientes CSS
- **Iconos de sensores** integrados (🌡️💧🫁🌪️)
- **Colores diferenciados** por ubicación:
  - 🔴 **Aula 20:** Rojo (#E53E3E)
  - � **Aula 21:** Púrpura (#805AD5) - Optimizado para mejor visibilidad
  - 🟠 **Gimnasio:** Naranja (#FF9800)
  - 🟢 **Laboratorio:** Verde (#38A169)

### 📊 Organización Profesional
- **Filas colapsables**: 18 paneles organizados en secciones lógicas expandibles
- **Sección de Resumen**: KPIs principales (temperatura, humedad, CO₂) en la parte superior
- **Navegación jerárquica**: Estructura clara con títulos descriptivos
- **Experiencia optimizada**: Reducción del clutter visual

### 🔍 Sistema de Filtrado Avanzado
- **Filtro multi-select por ubicación**: Variables personalizadas para filtrado dinámico
- **Aplicación universal**: Filtro implementado en todos los paneles
- **Consultas Flux optimizadas**: Filtrado por ubicación en tiempo real
- **Interactividad completa**: Cambio instantáneo en todos los gráficos

### 📊 Paneles Optimizados
- **🌡️ Panel Temperatura:** Gráfico de líneas con rangos adaptativos y filtrado
- **🫁 Panel CO2:** Niveles con sistema de alertas por colores (verde/amarillo/rojo)
- **🚨 Gauges CO2:** Valores actuales con umbrales visuales (400-1000+ ppm)
- **💧 Panel Humedad:** Tendencias temporales con promedios móviles
- **🌪️ Panel Presión:** Datos barométricos con variaciones naturales
- **📊 Paneles de Resumen:** KPIs principales con datos en tiempo real

### ⚡ Rendimiento y Actualización
- **Actualización automática:** Cada 30 segundos
- **Agregación inteligente:** Datos promediados cada 30 segundos
- **Cache optimizado:** Sin sobrecarga del sistema
- **Responsive design:** Adaptable a cualquier pantalla
- **Filtrado eficiente:** Consultas optimizadas sin impacto en rendimiento

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

## 🌐 API REST Robusta

### 🔌 Endpoints Completos
| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `/health` | GET | Estado de todos los servicios | - |
| `/api/locations` | GET | Lista de ubicaciones disponibles | - |
| `/api/summary` | GET | Resumen general de todas las ubicaciones | - |
| `/api/latest/:location` | GET | Últimos valores por ubicación | `location` |
| `/api/data/:location/:sensor` | GET | Datos históricos con filtros | `location`, `sensor`, `?hours`, `?interval` |
| `/api/stats/:location/:sensor` | GET | Estadísticas (min/max/avg) | `location`, `sensor` |

### ⚡ WebSocket Real-time
- **Puerto:** `ws://localhost:3002`
- **Datos:** Streaming automático de todas las ubicaciones
- **Formato:** JSON estructurado con timestamps
- **Frecuencia:** Cada 15 segundos (sincronizado con simulador)

### 🚀 Características Avanzadas
- **Cache inteligente:** 30 segundos para optimizar rendimiento
- **CORS habilitado:** Para desarrollo y testing
- **Logging detallado:** Para debugging y monitoreo
- **Manejo de errores:** Try-catch completo con mensajes descriptivos
- **Conexión directa InfluxDB:** Sin intermediarios, máximo rendimiento

### 📊 Uso y Testing
```cmd
iniciar_api.bat     # Iniciar servidor API + WebSocket
probar_api.bat      # Testing automático de todos los endpoints
```

Ver documentación completa en: [api/README.md](api/README.md)

## 🔮 Migración a LoRa Mesh

El sistema está **completamente preparado** para migración a hardware real:

- **Arquitectura compatible** - Solo cambiar gateway
- **Formato de datos idéntico** - Sin modificar API/Flutter
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación completa** - Ver [MIGRACION.md](MIGRACION.md)

## 🎯 Roadmap y Próximos Pasos

### ✅ **Completado (v2.1.0)**
- [x] ✅ **API REST robusta** con 6 endpoints y cache inteligente
- [x] ✅ **App móvil Flutter** con 3 pantallas y Material Design 3
- [x] ✅ **Sistema de alertas** automáticas por umbrales
- [x] ✅ **WebSocket real-time** para streaming de datos
- [x] ✅ **Instalación automática** con scripts inteligentes
- [x] ✅ **Dashboard profesional** con branding personalizado
- [x] ✅ **Pipeline optimizado** sin pérdidas de datos
- [x] ✅ **Documentación completa** con guías paso a paso

### 🚧 **En Desarrollo**
- [ ] 📱 **Notificaciones push** móviles para alertas críticas
- [ ] 🔔 **Sistema de alertas** por email/SMS
- [ ] 📊 **Métricas avanzadas** y analytics
- [ ] 🌍 **Interfaz web** complementaria a Grafana

### 🔮 **Migración a Hardware Real**
- [ ] 🔌 **Integración ESP32 físicos** (código preparado)
- [ ] 📡 **Comunicación LoRa Mesh** entre nodos
- [ ] 🌐 **Gateway IoT** con múltiples protocolos
- [ ] ☁️ **Cloud deployment** para producción

### 📈 **Escalabilidad Futura**
- [ ] 🏢 **Multi-sede** con geolocalización
- [ ] 📱 **App iOS/Android nativas** optimizadas
- [ ] 🤖 **ML/AI** para predicción de tendencias
- [ ] 🔐 **Autenticación y roles** de usuario

---

## 🏆 Sobre el Proyecto

**Medusse IoT** es un proyecto de **nivel profesional** que demuestra las mejores prácticas en:
- **Arquitectura de microservicios** con Docker
- **Pipeline de datos** en tiempo real (MQTT → InfluxDB → Grafana)
- **Desarrollo Full-Stack** (Node.js + Flutter + Python)
- **DevOps y automatización** con scripts inteligentes
- **UI/UX moderno** con Material Design 3

### 📊 Estadísticas del Proyecto
- **+15 scripts automatizados** para instalación y uso
- **4 tecnologías principales** (Docker, Node.js, Flutter, Python)
- **6 endpoints API** con documentación completa
- **3 pantallas móviles** con navegación fluida
- **4 tipos de sensores** simulados realísticamente
- **4 ubicaciones** monitoreadas simultáneamente

---

_Proyecto desarrollado para **IES José Rodrigo Botet** - Curso 2025/2026_
_**Versión actual:** 2.2.0 (Octubre 2025)_
