<p align="center">
  <picture>
    <source srcset="https://github-production-user-asset-6210df.s3.amazonaws.com/184574372/516561483-85c75066-09b4-435a-a48c-f828e673410b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260525%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260525T215418Z&X-Amz-Expires=300&X-Amz-Signature=756adc09f457828587c57ca5abc289a9bd36f63b8ddba2c9ca9d824bc987c665&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng">
    <img src="web/public/images/medusse-logo.svg" alt="meduse" width="220" />
  </picture>
</p>


# Proyecto Medusse IoT

**Ecosistema IoT completo y profesional** para monitoreo ambiental con ESP32, MQTT, InfluxDB, Grafana, API REST, Web Next.js y App móvil Flutter. **Instalación automática en un solo clic.**

## 📋 Descripción

**Sistema IoT de nivel profesional** que incluye simulación realista de sensores ESP32, pipeline de datos moderno, dashboard web con branding personalizado, API REST robusta, aplicación web Next.js y aplicación móvil Flutter multiplataforma. **18 tipos de sensores monitoreados** incluyendo ambientales, calidad de agua, energía solar y gestión de batería. **Completamente automatizado** con scripts de instalación y verificación. Sistema preparado para migración directa a hardware real con comunicación LoRa Mesh.

## 🏗️ Arquitectura Completa

<p align="center">
   <img src="https://github.com/user-attachments/assets/79836c85-868f-495e-a32d-41b25f71af3b" alt="Diagrama proyecto Medusse" style="max-width:100%;height:auto;">
</p>

## 📁 Estructura del Proyecto

```
medusse-show/
├── arduino/                    # Simuladores y firmware ESP32
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
├── api/                       # API REST Node.js + Express
│   ├── server.js             # Servidor principal (1075 líneas)
│   ├── db.js                 # Conexión MySQL
│   ├── auth.js               # Lógica de autenticación
│   ├── auth-routes.js        # Rutas de autenticación
│   ├── admin-routes.js       # Rutas de administración
│   ├── package.json          # Dependencias Node.js
│   ├── .env                  # Variables de entorno
│   └── README.md             # Documentación API completa
├── web/                       # Aplicación Web Next.js 16
│   ├── src/                  # Código fuente TypeScript
│   │   ├── app/             # App Router de Next.js
│   │   │   ├── page.tsx     # Página principal
│   │   │   ├── login/       # Página de login
│   │   │   └── dashboard/   # Dashboard protegido
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
├── medusse_app/              # Aplicación Móvil Flutter
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
├── Scripts Windows (raíz):  # Scripts de automatización
│   ├── medusse.bat          # 🎯 Menú principal unificado
│   ├── sistema_completo.bat # 🚀 Sistema completo
│   ├── verificar.bat        # 🔍 Verificación completa
│   ├── full_setup.bat       # ⚙️ Setup inicial automático
│   └── detener.bat          # 🛑 Detener servicios
├── README.md                # Esta documentación
├── requirements.txt         # Dependencias Python
└── Medusse.code-workspace   # Workspace de VS Code
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

### 🎉 Estado: ECOSISTEMA COMPLETO ✅

(archivo recortado en la copia para no exceder tamaño)
