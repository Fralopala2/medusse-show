<p align="center">
  <img width="300" height="300" alt="meduse" src="https://github.com/user-attachments/assets/85c75066-09b4-435a-a48c-f828e673410b" />
</p>

# Proyecto Medusse IoT

**Ecosistema IoT completo y profesional** para monitoreo ambiental con ESP32, MQTT, InfluxDB, Grafana, API REST, Web Next.js y App movil Flutter. **Instalacion automatica en un solo clic.**

## 📋 Descripcion

**Sistema IoT de nivel profesional** que incluye simulacion realista de sensores ESP32, pipeline de datos moderno, dashboard web con branding personalizado, API REST robusta, aplicacion web Next.js y aplicacion movil Flutter multiplataforma. **18 tipos de sensores monitoreados** incluyendo ambientales, calidad de agua, energia solar y gestion de bateria. **Completamente automatizado** con scripts de instalacion y verificacion. Sistema preparado para migracion directa a hardware real con comunicacion LoRa Mesh.

## 🏗️ Arquitectura Completa

```
ESP32 Simulators → MQTT → Telegraf → InfluxDB → Grafana Dashboard
                     ↓                              ↓
                 API REST ← Web Next.js      MySQL Database
                     ↓
              WebSocket (Real-time)
                     ↓
              Flutter Mobile App
```

## 📁 Estructura del Proyecto

```
proyecto-medusse/
├── arduino/                    # Simuladores y firmware ESP32
│   ├── medusse_simulator.py   # Simulador principal (4 ubicaciones)
│   └── src/                   # Codigo ESP32 real
├── docker/                    # Stack completo Docker
│   ├── docker-compose.yml     # Servicios: MQTT, InfluxDB, Grafana, Telegraf, MySQL
│   ├── grafana/              # Configuracion y dashboards
│   ├── telegraf/             # Pipeline de datos MQTT→InfluxDB
│   ├── mosquitto/            # Broker MQTT
│   └── mysql/                # Base de datos MySQL
│       ├── init/             # Scripts SQL de inicializacion
│       └── DATABASE_DOCUMENTATION.md
├── api/                       # API REST Node.js
│   ├── server.js             # Servidor API con WebSocket
│   ├── package.json          # Dependencias Node.js
│   └── README.md             # Documentacion API
├── web/                       # Aplicacion Web Next.js
│   ├── src/                  # Codigo fuente TypeScript
│   │   ├── app/             # App Router de Next.js
│   │   ├── components/      # Componentes React
│ ─ iniciar_api.bat          # 🚀 API REST + WebSocket
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
- **18 sensores monitoreados** simultáneamente

### Sensores Monitoreados
- 🌡️ **Temperatura** (°C)
- 💧 **Humedad** (%)
- 🌬️ **CO₂** (ppm)
- 📊 **Presión atmosférica** (hPa)
- 🌿 **VOC** (Compuestos Orgánicos Volátiles - ppb)
- 🏠 **IAQ** (Calidad del Aire Interior - índice)
- 🌱 **Humedad del suelo** (%)
- ⚗️ **pH** (nivel de pH del agua)
- 💦 **Flujo de agua** (L/min)
- 🧪 **TDS** (Sólidos Disueltos Totales - ppm)
- 🐟 **Oxígeno disuelto** (mg/L)
- 🔋 **Voltaje de batería** (V)
- ☀️ **Voltaje solar** (V)
- 🔋 **Porcentaje de batería** (%)
- ⚡ **Consumo de energía** (mA)
- 🔌 **Estado de carga** (booleano)
- 🌙 **Modo bajo consumo** (booleano)
- 🔄 **Contador de wake-ups** (conteo)

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
- **18 tipos de sensores:** Temperatura, Humedad, CO2, Presión, VOC, IAQ, Humedad suelo, pH, Flujo agua, TDS, Oxígeno disuelto, Voltaje batería, Voltaje solar, Porcentaje batería, Consumo energía, Estado carga, Modo bajo consumo, Wake count
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

### ⚡ Ejecución del Sistema

**1. Verificar Sistema:**
```cmd
verificar.bat              # Verificación completa
verificar_rapido.bat       # Verificación rápida (30 segundos)
```

**2. Ejecutar Ecosistema Completo (Recomendado):**
```cmd
sistema_completo.bat       # Dashboard + API + Simulador + diagnósticos
```

**3. Ejecutar Componentes Individuales:**
```cmd
demo.bat                   # Solo Dashboard Grafana
iniciar_api.bat           # Solo API REST + WebSocket
ejecutar_flutter.bat      # Solo App móvil Flutter
ejecutar_web.bat          # Solo Web Next.js
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

### ✅ **Completado (v2.3.0)**
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
- **18 tipos de sensores** simulados realísticamente
- **4 ubicaciones** monitoreadas simultáneamente

---

_**Versión actual:** 2.3.0 (Octubre 2025)_


---

## 🌐 Aplicacion Web Next.js

### Caracteristicas
- **Next.js 16** con TypeScript y Tailwind CSS
- **Dashboard en tiempo real** con datos de 4 ubicaciones
- **Integracion API REST** con 10+ funciones
- **WebSocket** para actualizacion automatica
- **Sistema de alertas** visual (CO2, bateria)
- **Responsive design** con Framer Motion

### Uso
```cmd
ejecutar_web.bat
```

La web estara disponible en: http://localhost:3100

**Nota**: Usamos puerto 3100 para evitar conflicto con Grafana (puerto 3000)

---

## 🗄️ Base de Datos MySQL

### Configuracion
- **MySQL 8.0** integrado en Docker
- **Puerto**: 3306
- **Base de datos**: medusse_db
- **Usuario**: medusse_user / medusse2025

### Esquema (9 tablas)
1. **users** - Usuarios del sistema (admin, user, viewer)
2. **sessions** - Gestion de sesiones con tokens UUID
3. **user_preferences** - Preferencias personalizadas
4. **locations** - 4 ubicaciones monitoreadas
5. **sensors** - 18 tipos de sensores configurados
6. **alerts** - Sistema de alertas
7. **user_alerts** - Notificaciones de usuarios
8. **activity_log** - Registro de actividad
9. **system_config** - Configuracion del sistema

### Procedimientos Almacenados (10)
- `sp_authenticate_user` - Autenticacion y creacion de sesion
- `sp_validate_session` - Validacion de token
- `sp_logout_user` - Cierre de sesion
- `sp_create_alert` - Crear alerta
- `sp_resolve_alert` - Resolver alerta
- `sp_get_user_alerts` - Obtener notificaciones
- `sp_mark_alert_read` - Marcar como leida
- `sp_cleanup_expired_sessions` - Limpieza automatica
- `sp_get_system_stats` - Estadisticas del sistema
- `sp_get_location_stats` - Estadisticas por ubicacion

### Usuarios Iniciales
| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@medusse.local | medusse2025 | admin |
| francisco | pacoaldev@gmail.com | medusse2025 | admin |
| profesor | profesor@medusse.local | medusse2025 | user |
| alumno | alumno@medusse.local | medusse2025 | viewer |

**Documentacion completa**: `docker/mysql/DATABASE_DOCUMENTATION.md`

---

## 📊 Estado del Proyecto TFG

### Retos Completados (9/16 - 56.25%)

✅ **Reto 2**: Base de datos (InfluxDB + MySQL)
✅ **Reto 3**: Procedimientos almacenados (10 procedimientos)
✅ **Reto 4**: Diseno de bocetos (estructura de componentes)
✅ **Reto 5**: Interfaces HTML/CSS (Next.js + Tailwind)
✅ **Reto 8**: Transferencia Front-end/Back-end (API REST completa)
✅ **Reto 12**: Comunicacion asincrona (WebSocket + Fetch API)
✅ **Reto 13**: Framework cliente (Flutter + Next.js)
✅ **Reto 15**: Framework servidor (Express + Docker)

### Retos Pendientes (7/16)

⏳ **Reto 1**: Proyecto de sostenibilidad
⏳ **Reto 6**: Plan de empresa
⏳ **Reto 7**: Validacion de formularios JS
⏳ **Reto 9**: Gestion de usuarios con sesiones
⏳ **Reto 10**: Panel de administracion
⏳ **Reto 11**: Script FTP
⏳ **Reto 14**: Diseno web avanzado (responsive/animaciones)
⏳ **Reto 16**: Documentacion final

---

## 🔧 Integracion de Componentes

### Web Next.js (Fase 1 y 2 Completadas)

**Fase 1 - Branding**: ✅ Completado
- Metadata actualizada a Medusse IoT
- 6 hero sections con informacion del proyecto
- Colores corporativos configurados
- Contenido adaptado (productos, servicios, tecnologia)

**Fase 2 - API REST**: ✅ Completado
- Cliente API TypeScript (400+ lineas)
- Hook WebSocket con reconexion automatica
- Dashboard en tiempo real con 4 ubicaciones
- Sistema de alertas visual (CO2, bateria)
- 18 tipos de sensores mostrados

**Fase 3 - Autenticacion**: ⏳ Pendiente
- Formularios de login/registro
- Validacion con react-hook-form + zod
- Integracion con MySQL
- Proteccion de rutas

### Base de Datos MySQL (Reto 2 y 3 Completados)

**Implementacion**: ✅ Completado
- 9 tablas con relaciones y indices
- 10 procedimientos almacenados
- 4 usuarios iniciales con roles
- 4 ubicaciones y 18 sensores configurados
- Sistema de alertas y notificaciones
- Documentacion tecnica completa

**Integracion con API**: ⏳ Pendiente
- Instalar mysql2 en Node.js
- Endpoints de autenticacion
- Middleware de validacion de sesiones

---

## 📈 Estadisticas del Proyecto

### Lineas de Codigo
- **Python**: ~500 lineas (simulador)
- **JavaScript/Node.js**: ~1000 lineas (API REST)
- **TypeScript/React**: ~1200 lineas (Web Next.js)
- **Dart/Flutter**: ~2000 lineas (App movil)
- **SQL**: ~900 lineas (esquema + procedimientos)
- **Configuracion**: ~500 lineas (Docker, Telegraf, etc.)
- **Total**: ~6100 lineas de codigo

### Archivos del Proyecto
- **Archivos de codigo**: 50+
- **Archivos de configuracion**: 15+
- **Scripts de automatizacion**: 10+
- **Documentacion**: README.md + CHANGELOG.md + docs tecnicas

### Tecnologias Utilizadas
- **Backend**: Node.js, Express, Python
- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Mobile**: Flutter 3.9+, Dart
- **Bases de Datos**: InfluxDB 2.7, MySQL 8.0
- **Mensajeria**: MQTT (Mosquitto 2.0)
- **Visualizacion**: Grafana 10.2.0
- **Contenedores**: Docker, Docker Compose
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion 12

---

## 🎓 Informacion Academica

**Proyecto**: Trabajo de Fin de Grado (TFG)
**Titulo**: Sistema IoT de Monitoreo Ambiental con Arquitectura de Microservicios
**Autor**: Francisco Manuel López Alarte
**Email**: pacoaldev@gmail.com
**Institucion**: IES José Rodrigo Botet
**Curso Academico**: 2025/2026
**Rama de trabajo**: clase

### Objetivos del Proyecto
1. Diseñar e implementar un sistema IoT completo
2. Aplicar arquitectura de microservicios
3. Integrar multiples tecnologias modernas
4. Preparar para migracion a hardware real
5. Documentar completamente el proceso
6. Cumplir con 16 retos tecnicos especificos

### Competencias Desarrolladas
- Desarrollo Full-Stack (Frontend + Backend + Mobile)
- Bases de datos relacionales y series temporales
- Comunicacion IoT (MQTT, WebSocket)
- Contenedorizacion con Docker
- Diseno de interfaces responsive
- Gestion de proyectos de software
- Documentacion tecnica profesional

---

## 📄 Licencia

Este proyecto está bajo la licencia **All Rights Reserved**.

Para consultas de licencia o permisos, contacta al autor.

---

_Proyecto desarrollado para **IES José Rodrigo Botet** - Curso 2025/2026_
_**Version actual:** 2.3.0 (Noviembre 2025)_
