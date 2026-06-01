<p align="center">
  <img src="web/public/images/medusse-logo.svg" alt="medusse logo" width="220">
</p>

<h1 align="center">Proyecto Medusse IoT</h1>

<p align="center"><strong>Sistema IoT de monitoreo ambiental con arquitectura de microservicios</strong></p>

****

## 📋 Descripción

Medusse es una plataforma IoT integral que combina simulación ESP32, procesamiento de datos, dashboard web, API REST, interfaz Next.js y app Flutter. Vigila 18 sensores —ambientales, de calidad de agua y energía—, se instala automáticamente y está lista para migrar a dispositivos reales con LoRa Mesh.

## 🏗️ Arquitectura Completa

![Diagrama proyecto Medusse](https://github.com/user-attachments/assets/79836c85-868f-495e-a32d-41b25f71af3b)


## 📁 Estructura del Proyecto

```
medusse-show/
├── arduino/                   # Simuladores y firmware ESP32
│   ├── medusse_simulator.py   # Simulador principal (4 ubicaciones, 18 sensores)
│   ├── src/                   # Código ESP32 real (preparado para LoRa)
│   └── node2/                 # Configuración nodo secundario
├── docker/                    # Stack completo Docker
│   ├── docker-compose.yml     # 5 servicios: MQTT, InfluxDB, Grafana, Telegraf, MySQL
│   ├── grafana/              # Configuración y dashboards
│   │   ├── dashboards/       # Dashboard medusse-clean.json
│   │   └── provisioning/     # Configuración automática
│   ├── telegraf/             # Pipeline de datos MQTT→InfluxDB
│   │   └── telegraf.conf     # Configuración completa
│   ├── mosquitto/            # Broker MQTT 2.0
│   │   └── mosquitto.conf    # Configuración con WebSocket
│   ├── mysql/                # Base de datos MySQL 8.0
│   │   ├── init/             # Scripts SQL de inicialización
│   │   │   ├── 01-schema.sql           # 9 tablas
│   │   │   ├── 02-seed-data.sql        # Datos iniciales
│   │   │   └── 03-stored-procedures.sql # 10 procedimientos
│   │   └── DATABASE_DOCUMENTATION.md    # Documentación técnica
│   └── influxdb/             # Configuración InfluxDB
├── api/                      # API REST Node.js + Express
│   ├── server.js             # Servidor principal (1075 líneas)
│   ├── db.js                 # Conexión MySQL
│   ├── auth.js               # Lógica de autenticación
│   ├── auth-routes.js        # Rutas de autenticación
│   ├── admin-routes.js       # Rutas de administración
│   ├── package.json          # Dependencias Node.js
│   ├── .env                  # Variables de entorno
│   └── README.md             # Documentación API completa
├── web/                      # Aplicación Web Next.js 16
│   ├── src/                  # Código fuente TypeScript
│   │   ├── app/             # App Router de Next.js
│   │   │   ├── page.tsx     # Página principal
│   │   │   ├── login/       # Página de login
│   │   │   ├── dashboard/   # Dashboard protegido (usuarios)
│   │   │   └── control/     # Centro de control (arranque local)
│   │   ├── components/      # Componentes React
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── sections/    # Hero sections
│   │   │   └── ui/          # Componentes UI
│   │   ├── lib/             # Utilidades
│   │   │   ├── api.ts       # Cliente API (400+ líneas)
│   │   │   └── data.ts      # Datos estáticos
│   │   └── hooks/           # Custom hooks
│   │       └── use-websocket.ts # Hook WebSocket
│   ├── public/              # Recursos estáticos
│   ├── tailwind.config.ts   # Configuración Tailwind
│   └── package.json         # Dependencias
├── medusse_app/             # Aplicación Móvil Flutter
│   ├── lib/                 # Código fuente Dart
│   │   ├── main.dart        # Entry point
│   │   ├── models/          # Modelos de datos
│   │   ├── services/        # Servicios (API, WebSocket)
│   │   ├── providers/       # Providers de estado
│   │   ├── screens/         # Pantallas (Home, Detail, Charts)
│   │   └── widgets/         # Widgets reutilizables
│   ├── pubspec.yaml         # Dependencias Flutter
│   └── README.md            # Documentación Flutter
├── documentacion/           # 📖 Documentación completa del proyecto
│   ├── DOCUMENTACION_GENERAL_RETOS.md  # Documento unificado de presentación
│   ├── README_DOCUMENTACION.md         # Guía de documentación
│   ├── RETO_1_SOSTENIBILIDAD.md        # Reto 1 completo
│   ├── RETO_6_PLAN_EMPRESA.md          # Plan de empresa
│   ├── INSTALACION.md                  # Guías de instalación
│   ├── MIGRACION.md                    # Migración a LoRa Mesh
│   ├── VERCEL_DEPLOYMENT.md            # Deployment en Vercel
│   └── LINKS.md                        # Enlaces web
├── tools_linux/             # Herramientas para Linux/Lliurex (no incluidas en este fork)
│   └── (En este repositorio solo se incluyen scripts de Windows en la raíz)
├── scripts/                 # Arranque en segundo plano (sin ventanas cmd)
│   ├── start-api.vbs        # API Node oculta → logs/api.log
│   ├── start-web.vbs        # Next.js oculto → logs/web.log
│   ├── start-simulator.vbs  # Simulador Python oculto → logs/simulator.log
│   └── wait-for-url.ps1     # Espera a API y Web antes de abrir el portal
├── logs/                    # Logs de servicios (generado al arrancar, en .gitignore)
├── Scripts Windows (raíz):  # Scripts de automatización
│   ├── iniciar.bat          # ⭐ Arranque recomendado (1 clic, sin terminales)
│   ├── medusse.bat          # 🎯 Menú interactivo (tests y opciones avanzadas)
│   ├── sistema_completo.bat # 🚀 Sistema completo (consola + portal)
│   ├── verificar.bat        # 🔍 Verificación completa
│   ├── full_setup.bat       # ⚙️ Setup inicial automático
│   └── detener.bat          # 🛑 Detener todos los servicios
├── README.md                # Esta documentación
├── requirements.txt         # Dependencias Python
└── Medusse.code-workspace   # Workspace de VS Code
```

## 🚀 Características

### 🤖 Automatización Avanzada
- **Instalación automática** de Docker y dependencias
- **Arranque en un clic** con `iniciar.bat` (eliminadas ventanas de terminal)
- **Centro de control** web en `/control` (estado, logs en vivo, IoT)
- **Sumario lateral de accesos** con IP numerica y puertos activos para Web, Grafana, API e infraestructura
- **Mejora prevista**: version mas compacta del panel de accesos para vistas mobile
- **Scripts de verificación** con diagnósticos inteligentes
- **Setup completo** en un solo comando
- **Detección automática** de problemas y soluciones

### 🏗️ Sistema IoT Completo
- **Simulador de sensores** con datos realistas por ubicación
- **Gateway MQTT avanzado** con múltiples fuentes
- **Base de datos InfluxDB v2** con configuración persistente
- **Dashboard Grafana profesional** con filas colapsables, filtros avanzados y branding personalizado
- **API REST robusta** con caché inteligente
- **App móvil Flutter** multiplataforma con Material Design 3

### ⚡ Performance Optimizado
- **Caché automático** en API (30 segundos)
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
- **Multiplataforma:** Windows, Web, Android

## 🎉 Estado: ECOSISTEMA COMPLETO

### Funcionalidades Implementadas

**🤖 Automatización Total:**
- **Arranque silencioso** (`iniciar.bat`) + **Centro de control** (`http://localhost:4003/control`)
- **Setup inicial automático** (`full_setup.bat`)
- **Menú principal unificado** (`medusse.bat`) para tests y opciones parciales
- **Verificación automática** con diagnósticos (`verificar.bat`)
- **Ecosistema completo** (`sistema_completo.bat`) con consola de progreso

**🏗️ Core IoT System:**
- **4 ubicaciones monitoreadas:** Aula 20 (22°C), Aula 21 (24°C), Gimnasio (23°C), Laboratorio (21°C)
- **18 tipos de sensores:** Temperatura, Humedad, CO2, Presión, VOC, IAQ, Humedad suelo, pH, Flujo agua, TDS, Oxígeno disuelto, Voltaje batería, Voltaje solar, Porcentaje batería, Consumo energía, Estado carga, Modo bajo consumo, Wake count
- **Dashboard Grafana profesional** con filas colapsables, sección de resumen, filtros avanzados y branding personalizado
- **Pipeline optimizado** MQTT → Telegraf → InfluxDB → Grafana
- **Simulador inteligente** con datos realistas por ubicación

**🔌 API REST & Mobile Avanzados:**
- **API REST Node.js** con 11 endpoints y caché inteligente
- **WebSocket Server** para streaming en tiempo real (puerto 4002)
- **App Flutter completa** con 3 pantallas y gráficos interactivos
- **Sistema de alertas** automático por umbrales de CO2
- **Arquitectura híbrida** HTTP + WebSocket para mejor UX

**⚙️ Infraestructura Productiva:**
- **5 contenedores Docker** con networking interno optimizado
- **Volúmenes persistentes** para todos los servicios
- **Configuración InfluxDB v2** con tokens y organización
- **MQTT Mosquitto 2.0** con WebSocket habilitado
- **Restart policies** automáticas para alta disponibilidad

## 🚀 Inicio Ultra Rápido

> **Puertos (Windows):** [documentacion/PUERTOS.md](documentacion/PUERTOS.md) — no uses 3000/3001/3003/3307 en este equipo si Hyper-V los reserva.


### 🤖 Instalación Automática (Recomendada)

#### Windows

**Setup inicial recomendado:**
```cmd
full_setup.bat
```
*Instala dependencias Python/Node y levanta el stack Docker base.*

#### Linux / Lliurex

En esta rama no están operativas las instrucciones para instalar o ejecutar el proyecto en Linux/Lliurex. Este fork incluye únicamente los scripts y automatizaciones para Windows (`iniciar.bat`, `full_setup.bat`, etc.).

### ⚡ Ejecución del Sistema (Windows)

Este repositorio incluye scripts de automatización en la raíz. **No hay scripts Linux** en este fork.

#### Arranque recomendado

```cmd
iniciar.bat
```

Qué hace `iniciar.bat`:

1. Comprueba Docker, Node.js y Python (e intenta abrir Docker Desktop si hace falta).
2. Levanta el stack Docker (`docker compose up -d`).
3. Inicia **API**, **Web Next.js** y **simulador** en segundo plano (scripts VBS en `scripts/`).
4. Escribe los logs en la carpeta `logs/` (`api.log`, `web.log`, `simulator.log`).
5. Abre el navegador en el **Centro de control**: http://localhost:4003/control

No se abren ventanas `cmd` de API, Web ni simulador: todo se supervisa desde el portal.

#### Detener el sistema

```cmd
detener.bat
```

También puedes usar el botón **Detener sistema** en el Centro de control (para Docker, Python y Node en el orden correcto).

Modo silencioso (toast de Windows, sin consola):

```cmd
detener.bat /silent
```

#### Otras opciones

| Script | Uso |
|--------|-----|
| `medusse.bat` | Menú interactivo: sistema completo, servicios sueltos, tests |
| `sistema_completo.bat` | Igual que antes, con mensajes en consola y apertura de `/control` |
| `verificar.bat` | Diagnóstico de Docker, Node, Python y servicios |
| `full_setup.bat` | Primera instalación (dependencias + Docker base) |

---

### Centro de control (`/control`)

Portal de desarrollo en Next.js que sustituye las terminales al arrancar el stack local.

| Zona | Descripción |
|------|-------------|
| **Servicios** | Estado de API, Web, Grafana, InfluxDB, MQTT, MySQL y simulador |
| **Docker** | Contenedores `medusse_*` en ejecución |
| **Logs en vivo** | Pestañas API / Web / Simulador (lectura desde `logs/`) |
| **Actividad IoT** | WebSocket y resumen de sensores |
| **Acciones** | Enlaces a Grafana, web pública, login; botón detener sistema |

Requisitos: API en el puerto **4001** (endpoints `/api/dev/*` solo en entorno local, no producción).

![Centro de control](web/public/images/CentroCon1.png)

---

### Acceso a Interfaces

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Centro de control** | http://localhost:4003/control | Sin login (local) |
| **Grafana Dashboard** | http://localhost:3600 | admin / medusse2025 |
| **API REST** | http://localhost:4001 | - |
| **Web Next.js** | http://localhost:4003 | - |
| **Login web** | http://localhost:4003/login | Ver usuarios en sección MySQL |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |
| **App Flutter** | Ejecutar manualmente (`flutter run -d windows`) | - |

## 📊 Servicios y Tecnologías

- **Grafana:** Puerto `3600` (host; contenedor interno 3000). Dashboard profesional con branding personalizado. Versión: `10.2.0`.
- **InfluxDB:** Puerto `8086`. Base de datos de series temporales. Versión: `2.7`.
- **MQTT Broker (Mosquitto):** Puerto `1883` (MQTT) y `9001` (WebSocket). Versión: `2.0`.
- **Telegraf:** Pipeline optimizado con múltiples consumers. Versión: `1.28`.
- **API REST (Node.js):** Puerto `4001`. Express 4.18.2, caché inteligente.
- **WebSocket (server):** Puerto `4002`. Streaming de datos en tiempo real (ws 8.14.2).
- **Flutter App:** App multiplataforma con Material Design 3 (Flutter 3.9+).

### 🔧 Stack Tecnológico Completo
- **Backend:** Node.js + Express + InfluxDB Client
- **Frontend Móvil:** Flutter + Provider + fl_chart + Google Fonts
- **Base de Datos:** InfluxDB 2.7 (series temporales)
- **Comunicación:** MQTT + WebSocket + HTTP REST
- **Visualización:** Grafana 10.2.0 + Dashboard personalizado
- **Contenedores:** Docker Compose con networking optimizado
- **Automatización:** Scripts batch para Windows y scripts shell para Linux/Lliurex
- **Multiplataforma:** Windows, Linux, Lliurex

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
  - 🟣 **Aula 21:** Púrpura (#805AD5)
  - 🟠 **Gimnasio:** Naranja (#FF9800)
  - 🟢 **Laboratorio:** Verde (#38A169)

### 📊 Organización Profesional
- **Filas colapsables**: 18 paneles organizados en secciones lógicas expandibles
- **Sección de Resumen**: KPIs principales (temperatura, humedad, CO2) en la parte superior
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
- **Caché optimizado:** Sin sobrecarga del sistema
- **Responsive design:** Adaptable a cualquier pantalla
- **Filtrado eficiente:** Consultas optimizadas sin impacto en rendimiento

![Dashboard Principal - Panel de Resumen y Gráficos](web/public/images/graf1.png)

![Dashboard Principal - Detalle de Sensores y Métricas](web/public/images/graf2.png)


## 🔧 Configuración Avanzada

### Modificar Frecuencia de Datos

Editar `arduino/medusse_simulator.py`:

```python
time.sleep(15)  # Cambiar intervalo entre ciclos
```

### Agregar Nueva Ubicación

En `medusse_simulator.py`, agregar a la lista `locations`:

```python
{"name": "nueva_aula", "node": "ESP32_NODE_05", "temp_base": 23}
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
docker compose -f docker/docker-compose.yml down
docker volume prune -f
docker compose -f docker/docker-compose.yml up -d
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
- **Multiplataforma:** Windows, Web, Android

### Uso
```cmd
cd medusse_app
flutter run -d windows
```

### Capturas de Pantalla

- **Pantalla Principal**  
  ![Pantalla Principal](web/public/images/app-home.jpg)  
  Vista general con 4 ubicaciones monitoreadas en tiempo real

- **Detalle de Ubicación**  
  ![Detalle de Ubicación](web/public/images/app-detail.jpg)  
  18 sensores con valores actuales y alertas inteligentes

- **Visualización de Alarmas**  
  ![Visualización de Alarmas](web/public/images/app-charts.jpg)  
  Sistema de alertas con notificaciones en tiempo real

- **Configuración**  
  ![Configuración](web/public/images/app-settings.jpg)  
  Ajustes de servidor y conexión con test integrado

Ver documentación completa en: [medusse_app/README.md](medusse_app/README.md)

## 🌐 API REST Robusta

### 🔌 Endpoints de Datos
| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `/` | GET | Información de la API y endpoints disponibles | - |
| `/health` | GET | Estado de todos los servicios | - |
| `/api/locations` | GET | Lista de ubicaciones disponibles | - |
| `/api/summary` | GET | Resumen general de todas las ubicaciones | - |
| `/api/latest/:location` | GET | Últimos valores por ubicación | `location` |
| `/api/data/:location/:sensor` | GET | Datos históricos con filtros | `location`, `sensor`, `?hours`, `?interval` |
| `/api/stats/:location/:sensor` | GET | Estadísticas por sensor (`location`, `sensor`, `hours`, `stats`) | `location`, `sensor` |

### 🔐 Endpoints de Autenticación (Reto 9)
| Endpoint | Método | Descripción | Autenticación |
|----------|--------|-------------|---------------|
| `/api/auth/login` | POST | Autenticar usuario y crear sesión | No |
| `/api/auth/logout` | POST | Cerrar sesión activa | Bearer Token |
| `/api/auth/validate` | GET | Validar token de sesión | Bearer Token |
| `/api/auth/profile` | GET | Obtener perfil del usuario | Bearer Token |

### ⚡ WebSocket Real-time
- **Puerto:** `ws://localhost:4002`
- **Datos:** Streaming automático de todas las ubicaciones
- **Formato:** JSON estructurado con timestamps
- **Frecuencia:** Cada 15 segundos (sincronizado con simulador)

### 🚀 Características Avanzadas
- **Caché inteligente:** 30 segundos para optimizar rendimiento
- **CORS habilitado:** Para desarrollo y testing
- **Logging detallado:** Para debugging y monitoreo
- **Manejo de errores:** Try-catch completo con mensajes descriptivos
- **Conexión directa InfluxDB:** Sin intermediarios, máximo rendimiento

### 📊 Uso y Testing
```cmd
node api/server.js           # Iniciar API + WebSocket
node api/test-api.js         # Testing de endpoints de datos
node api/test-auth.js        # Testing de autenticacion y permisos
```

### 🔐 Sistema de Autenticación
- **Gestión de usuarios** con roles (admin, user, viewer)
- **Sesiones seguras** con tokens UUID
- **Login web** con Next.js y React
- **Dashboard protegido** con validación de sesión
- **Middleware de protección** para rutas privadas
- **Usuarios iniciales** configurados desde seed SQL (ejecutar `node api/test-auth.js` para validarlos)

**Probar login web:** abrir `http://localhost:4003/login` con API y MySQL activos.

Ver documentación completa en: [api/README.md](api/README.md)

## 🔮 Migración a LoRa Mesh

El sistema está **completamente preparado** para migración a hardware real:

- **Arquitectura compatible** - Solo cambiar gateway
- **Formato de datos idéntico** - Sin modificar API/Flutter
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación completa** - Ver [documentacion/MIGRACION.md](documentacion/MIGRACION.md)

---

## 🌐 Aplicación Web Next.js

### Características
- **Next.js 16** con TypeScript y Tailwind CSS
- **Centro de control** (`/control`) para arranque local: servicios, logs y sensores
- **Dashboard en tiempo real** con datos de 4 ubicaciones
- **Integración API REST** con 10+ funciones
- **WebSocket** para actualización automática
- **Sistema de alertas** visual (CO2, batería)
- **Responsive design** con Framer Motion
- **Botones funcionales** con navegación y enlaces externos
- **Formulario de contacto** integrado con email
- **Hero sections** con imágenes personalizadas

### Botones Funcionales
- **Ver Dashboard** - Scroll a sección dashboard
- **Acceder a Grafana** - Abre http://localhost:3600
- **Documentación** - Enlace a README.md en GitHub
- **Ver API Docs** - Enlace a documentación API
- **Ver Migración** - Enlace a MIGRACION.md
- **Contactar** - Abre cliente de correo con pacoaldev@gmail.com

### Uso

Arranque completo (recomendado):

```cmd
iniciar.bat
```

Solo la web (con Docker y API ya levantados):

```cmd
wscript //nologo scripts\start-web.vbs
```

| URL | Descripción |
|-----|-------------|
| http://localhost:4003/control | Centro de control (desarrollo) |
| http://localhost:4003 | Web pública |
| http://localhost:4003/login | Login de usuarios |
| http://localhost:4003/dashboard | Panel tras autenticación |

**Puertos en Windows:** Hyper-V reserva el rango 2951–3550; por eso la web usa **4003**, la API **4001** y Grafana **3600**. Ver [documentacion/PUERTOS.md](documentacion/PUERTOS.md).

---

## 🗄️ Base de Datos MySQL

### Configuración
- **MySQL 8.0** integrado en Docker
- **Puerto**: 13306 (mapeado desde 3306 interno; evita rangos reservados por Hyper-V en Windows)
- **Base de datos**: medusse_db
- **Usuario**: medusse_user / medusse2025

**Nota:** MySQL en el host usa el puerto **13306** (mapeo desde 3306 del contenedor).

### Esquema (9 tablas)
1. **users** - Usuarios del sistema (admin, user, viewer)
2. **sessions** - Gestión de sesiones con tokens UUID
3. **user_preferences** - Preferencias personalizadas
4. **locations** - 4 ubicaciones monitoreadas
5. **sensors** - 18 tipos de sensores configurados
6. **alerts** - Sistema de alertas
7. **user_alerts** - Notificaciones de usuarios
8. **activity_log** - Registro de actividad
9. **system_config** - Configuración del sistema

### Procedimientos Almacenados (10)
- `sp_authenticate_user` - Autenticación y creación de sesión
- `sp_validate_session` - Validación de token
- `sp_logout_user` - Cierre de sesión
- `sp_create_alert` - Crear alerta
- `sp_resolve_alert` - Resolver alerta
- `sp_get_user_alerts` - Obtener notificaciones
- `sp_mark_alert_read` - Marcar como leída
- `sp_cleanup_expired_sessions` - Limpieza automática
- `sp_get_system_stats` - Estadísticas del sistema
- `sp_get_location_stats` - Estadísticas por ubicación

### Usuarios Iniciales
| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@medusse.local | medusse2025 | admin |
| paco | pacoaldev@gmail.com | medusse2025 | admin |
| profesor | profesor@medusse.local | medusse2025 | user |
| alumno | alumno@medusse.local | medusse2025 | viewer |

**Documentación completa**: `docker/mysql/DATABASE_DOCUMENTATION.md`

---

## 📊 Estado del Proyecto TFG

### Retos Completados (16/16 - 100%) ✅

| Reto | Estado |
| ---: | :--- |
| **Reto 1** | ✅ Proyecto de sostenibilidad (ODS, impacto medible, casos de uso) |
| **Reto 2** | ✅ Base de datos (InfluxDB + MySQL) |
| **Reto 3** | ✅ Procedimientos almacenados (10 procedimientos) |
| **Reto 4** | ✅ Diseño de bocetos (estructura de componentes) |
| **Reto 5** | ✅ Interfaces HTML/CSS (Next.js + Tailwind) |
| **Reto 6** | ✅ Plan de empresa (modelo de negocio, proyecciones, estrategia) |
| **Reto 7** | ✅ Validación de formularios JS (validación en tiempo real) |
| **Reto 8** | ✅ Transferencia Front-end/Back-end (API REST completa) |
| **Reto 9** | ✅ Gestión de usuarios con sesiones (MySQL + bcrypt) |
| **Reto 10** | ✅ Panel de administración |
| **Reto 11** | ✅ Script FTP/SFTP (deployment automático) |
| **Reto 12** | ✅ Comunicación asíncrona (WebSocket + Fetch API) |
| **Reto 13** | ✅ Framework cliente (Flutter + Next.js) |
| **Reto 14** | ✅ Diseño web avanzado (responsive + animaciones Framer Motion) |
| **Reto 15** | ✅ Framework servidor (Express + Docker) |
| **Reto 16** | ✅ Documentación final (completa y profesional) |

*Leyenda:* ✅ completado · ⚠️ pendiente / no implementado

### Documentación de Retos

📖 **Documentación del Proyecto (Principal):** `documentacion/DOCUMENTACION_GENERAL_RETOS.md`  
📖 **Guía de Documentación:** `documentacion/README_DOCUMENTACION.md`  
📖 **Resumen Ejecutivo:** `documentacion/DOCUMENTACION_TFG.md`  
📖 **Reto 1 - Sostenibilidad:** `documentacion/RETO_1_SOSTENIBILIDAD.md`  
📖 **Reto 6 - Plan de Empresa:** `documentacion/RETO_6_PLAN_EMPRESA.md`

---

## 🔧 Integración de Componentes

### Web Next.js (Fase 1, 2 y 3 Completadas)

**Fase 1 - Branding**: ✅ Completado
- Metadata actualizada a Medusse IoT
- 6 hero sections con información del proyecto
- Colores corporativos configurados
- Contenido adaptado (productos, servicios, tecnología)

**Fase 2 - API REST**: ✅ Completado
- Cliente API TypeScript (400+ líneas)
- Hook WebSocket con reconexión automática
- Dashboard en tiempo real con 4 ubicaciones
- Sistema de alertas visual (CO2, batería)
- 18 tipos de sensores mostrados

**Fase 3 - Autenticación**: ✅ Completado
- Formularios de login/registro implementados
- Validación y manejo de sesiones implementados (bcrypt + MySQL)
- Integración completa con MySQL en endpoints de auth
- Protección de rutas y middleware de autorización

### Base de Datos MySQL (Reto 2 y 3 Completados)

**Implementación**: ✅ Completado
- 9 tablas con relaciones e índices
- 10 procedimientos almacenados
- 3 usuarios iniciales con roles
- 4 ubicaciones y 18 sensores configurados
- Sistema de alertas y notificaciones
- Documentación técnica completa

**Integración con API**: ⏳ Pendiente
- Instalar mysql2 en Node.js
- Endpoints de autenticación
- Middleware de validación de sesiones

---

## 📈 Estadísticas del Proyecto

### Líneas de Código
- **Python**: ~500 líneas (simulador)
- **JavaScript/Node.js**: ~1000 líneas (API REST)
- **TypeScript/React**: ~1200 líneas (Web Next.js)
- **Dart/Flutter**: ~2000 líneas (App móvil)
- **SQL**: ~900 líneas (esquema + procedimientos)
- **Configuración**: ~500 líneas (Docker, Telegraf, etc.)
- **Total**: ~6100 líneas de código

### Documentación Generada
- **Documentación unificada del proyecto**: 1200+ líneas (DOCUMENTACION_GENERAL_RETOS.md)
- **Documentación técnica**: 2500+ líneas (varios archivos)
- **Documentación general**: 1500+ líneas (README, CHANGELOG, etc.)
- **Comentarios en código**: 1000+ líneas
- **Total**: ~7000+ líneas de documentación

### Archivos del Proyecto
- **Archivos de código**: 50+
- **Archivos de configuración**: 15+
- **Scripts de automatización**: 10+
- **Archivos de documentación**: 10+

### Tecnologías Utilizadas
- **Backend**: Node.js, Express, Python
- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Mobile**: Flutter 3.9+, Dart
- **Bases de Datos**: InfluxDB 2.7, MySQL 8.0
- **Mensajería**: MQTT (Mosquitto 2.0)
- **Visualización**: Grafana 10.2.0
- **Contenedores**: Docker, Docker Compose
- **Estilos**: Tailwind CSS 4
- **Animaciones**: Framer Motion 12

---

## 🎓 Información Académica

**Proyecto**: Trabajo de Fin de Grado (TFG)
**Título**: Sistema IoT de Monitoreo Ambiental con Arquitectura de Microservicios
**Autor**: Francisco Manuel López Alarte
**Email**: pacoaldev@gmail.com
**Institución**: IES José Rodrigo Botet
**Curso Académico**: 2025/2026
**Rama de trabajo**: clase

### Objetivos del Proyecto
1. Diseñar e implementar un sistema IoT completo
2. Aplicar arquitectura de microservicios
3. Integrar múltiples tecnologías modernas
4. Preparar para migración a hardware real
5. Documentar completamente el proceso
6. Cumplir con 16 retos técnicos específicos

### Competencias Desarrolladas
- Desarrollo Full-Stack (Frontend + Backend + Mobile)
- Bases de datos relacionales y series temporales
- Comunicación IoT (MQTT, WebSocket)
- Contenedorización con Docker
- Diseño de interfaces responsive
- Gestión de proyectos de software
- Documentación técnica profesional

---

## 📄 Licencia

Este proyecto está bajo la licencia **All Rights Reserved**.

Para consultas de licencia o permisos, contacta al autor

---

_**Versión actual:** 2.7.9 (Mayo 2026)_
