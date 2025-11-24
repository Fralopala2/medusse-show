# Changelog - Proyecto Medusse IoT

## [2.5.0] - 2025-11-24 - SISTEMA DE AUTENTICACION COMPLETO ✅

### 🔐 Gestion de Usuarios con Sesiones (Reto 9)

#### ✅ Backend de Autenticacion
- **Modulo MySQL** (db.js) con pool de conexiones
- **Modulo de autenticacion** (auth.js) con bcrypt
- **4 endpoints REST** para autenticacion completa
- **Middleware de proteccion** para rutas privadas
- **Middleware de roles** para control de acceso
- **Integracion con procedimientos almacenados** MySQL

#### ✅ Endpoints de Autenticacion
- **POST /api/auth/login**: Autenticar usuario y crear sesion
- **POST /api/auth/logout**: Cerrar sesion activa
- **GET /api/auth/validate**: Validar token de sesion
- **GET /api/auth/profile**: Obtener perfil del usuario autenticado

#### ✅ Seguridad Implementada
- **Tokens UUID** para sesiones seguras
- **Expiracion automatica** de sesiones (24 horas)
- **Registro de IP y User-Agent** en sesiones
- **Validacion de credenciales** con procedimientos almacenados
- **Proteccion de rutas** con Bearer Token
- **Control de acceso** por roles (admin/user/viewer)

#### ✅ Testing Automatizado
- **Script de testing** (test-auth.js) con 8 tests
- **Script batch** (probar_autenticacion.bat) para Windows
- **Tests de login** con credenciales correctas/incorrectas
- **Tests de validacion** de sesion
- **Tests de logout** y expiracion de sesion
- **Tests con 4 usuarios** diferentes (admin, paco, profesor, alumno)

#### ✅ Dependencias Agregadas
- **mysql2**: Cliente MySQL para Node.js (v3.6.5)
- **bcrypt**: Hashing de contraseñas (v5.1.1)

#### 📊 Progreso de Retos TFG
- **Reto 9 completado**: Gestion de usuarios con sesiones ✅
- **10/16 retos completados** (62.5%)
- **6 retos pendientes**

---

## [2.4.0] - 2025-11-24 - BASE DE DATOS MYSQL Y WEB NEXT.JS ✅

### 🗄️ Base de Datos MySQL Completa

#### ✅ Esquema de Base de Datos (Reto 2)
- **MySQL 8.0** integrado en Docker Compose
- **9 tablas** con relaciones y claves foraneas
- **users**: Gestion de usuarios con roles (admin/user/viewer)
- **sessions**: Tokens UUID con expiracion automatica
- **user_preferences**: Configuracion personalizada por usuario
- **locations**: 4 ubicaciones con colores corporativos
- **sensors**: 18 tipos de sensores con umbrales
- **alerts**: Sistema de alertas con resolucion
- **user_alerts**: Notificaciones N:M
- **activity_log**: Auditoria completa del sistema
- **system_config**: Configuracion clave-valor

#### ✅ Procedimientos Almacenados (Reto 3)
- **10 procedimientos** para logica de negocio
- **Autenticacion**: sp_authenticate_user, sp_validate_session, sp_logout_user
- **Alertas**: sp_create_alert, sp_resolve_alert, sp_get_user_alerts, sp_mark_alert_read
- **Estadisticas**: sp_get_system_stats, sp_get_location_stats
- **Mantenimiento**: sp_cleanup_expired_sessions

#### ✅ Datos Iniciales
- **4 usuarios** con roles diferenciados
- **4 ubicaciones** configuradas (Aula 20, 21, Gimnasio, Lab)
- **18 sensores** con umbrales de warning/danger
- **20+ configuraciones** del sistema

### 🌐 Aplicacion Web Next.js

#### ✅ Fase 1 - Adaptacion de Branding (Reto 4 y 5)
- **Next.js 16** con TypeScript y Tailwind CSS 4
- **Metadata** actualizada a Medusse IoT
- **6 hero sections** con informacion del proyecto
- **Colores corporativos** configurados (4 ubicaciones)
- **Contenido adaptado**: productos hardware/software, servicios, tecnologia
- **Variables de entorno** configuradas (.env.local)

#### ✅ Fase 2 - Integracion API REST (Reto 8 y 12)
- **Cliente API TypeScript** (400+ lineas, 10+ funciones)
- **Hook WebSocket** con reconexion automatica (5 intentos)
- **Dashboard en tiempo real** con 4 ubicaciones
- **Sistema de alertas** visual (CO2, bateria)
- **18 tipos de sensores** mostrados con iconos
- **Indicador de conexion** WebSocket
- **Auto-refresh** cada 30 segundos

### 🔧 Mejoras Tecnicas

#### ✅ Integracion Docker
- **Servicio MySQL** añadido a docker-compose.yml
- **Puerto 3306** expuesto
- **Volumen persistente** para datos
- **Auto-inicializacion** con scripts SQL
- **Red interna** medusse_network

#### ✅ Documentacion
- **DATABASE_DOCUMENTATION.md**: Documentacion tecnica completa de MySQL
- **README.md**: Consolidacion de toda la documentacion general
- **CHANGELOG.md**: Actualizacion con cambios significativos
- **Eliminacion** de archivos de documentacion redundantes

### 📊 Estadisticas de Version

#### Archivos Creados
- `docker/mysql/init/01-schema.sql` (350+ lineas)
- `docker/mysql/init/02-seed-data.sql` (150+ lineas)
- `docker/mysql/init/03-stored-procedures.sql` (400+ lineas)
- `docker/mysql/DATABASE_DOCUMENTATION.md` (600+ lineas)
- `web/src/lib/api.ts` (400+ lineas)
- `web/src/hooks/use-websocket.ts` (200+ lineas)
- `web/src/components/sections/DashboardSection.tsx` (300+ lineas)

#### Retos TFG Completados
- ✅ **Reto 2**: Base de datos (InfluxDB + MySQL)
- ✅ **Reto 3**: Procedimientos almacenados
- ✅ **Reto 4**: Diseno de bocetos
- ✅ **Reto 5**: Interfaces HTML/CSS
- ✅ **Reto 8**: Transferencia Front-end/Back-end
- ✅ **Reto 12**: Comunicacion asincrona

#### Progreso Total
- **9 de 16 retos completados** (56.25%)
- **~6100 lineas de codigo** en total
- **50+ archivos de codigo**
- **10+ scripts de automatizacion**

---

## [2.3.0] - 2025-10-14 - DASHBOARD PROFESIONAL CON FILTROS AVANZADOS ✅

### 📊 Dashboard Reorganizado y Optimizado

#### ✅ Expansión Completa de Sensores
- **18 tipos de sensores implementados**: Expansión desde 4 sensores básicos a sistema completo
- **Sensores ambientales**: Temperatura, Humedad, CO₂, Presión, VOC, IAQ
- **Sensores de calidad de agua**: Humedad suelo, pH, Flujo agua, TDS, Oxígeno disuelto
- **Sistema de energía solar**: Voltaje batería, Voltaje solar, Porcentaje batería, Consumo energía
- **Gestión inteligente**: Estado carga, Modo bajo consumo, Contador wake-ups
- **Simulación realista**: Datos coherentes con variaciones por ubicación y condiciones ambientales

#### ✅ Reorganización Profesional del Dashboard
- **Filas colapsables**: Los 18 paneles organizados en secciones lógicas expandibles/colapsables
- **Sección de Resumen**: KPIs principales (temperatura promedio, humedad, CO₂) en la parte superior
- **Navegación mejorada**: Estructura jerárquica clara con títulos descriptivos
- **Experiencia de usuario**: Reducción del clutter visual y mejor organización

#### ✅ Sistema de Filtrado Avanzado
- **Filtro de ubicación multi-select**: Variables personalizadas para aula20, aula21, gimnasio, laboratorio
- **Aplicación universal**: Filtro implementado en todos los 18 paneles del dashboard
- **Consultas Flux optimizadas**: Todas las queries incluyen `contains(set: ${location:csv}, value: r.location)`
- **Funcionamiento correcto**: Corregido problema de "sin datos" eliminando `allValue=".*"`

#### ✅ Mejoras de Visualización y Colores
- **Esquema de colores actualizado**: Aula21 cambiado de azul a púrpura para mejor visibilidad
- **Consistencia visual**: 16 cambios aplicados sistemáticamente en todos los overrides
- **Diferenciación clara**: Rojo (aula20), Púrpura (aula21), Naranja (gimnasio), Verde (laboratorio)
- **Overrides por regex**: Sistema robusto de field overrides usando patrones `.*aula21.*`

#### ✅ Paneles de Resumen Funcionales
- **Gauge panels**: Temperatura, humedad y CO₂ promedio en tiempo real
- **Datos coherentes**: Conexión correcta con variables de filtrado
- **Métricas principales**: Visibilidad inmediata del estado general del sistema
- **Actualización automática**: Datos en tiempo real con refresh automático

### 🔧 Mejoras Técnicas Implementadas

#### ✅ Arquitectura de Variables Grafana
- **Variable custom multi-select**: Opciones predefinidas sin valores "All"
- **CSV export**: Configuración `${location:csv}` para consultas Flux
- **Regex matching**: Overrides condicionales por ubicación usando expresiones regulares
- **JSON válido**: Todas las modificaciones verificadas y validadas

#### ✅ Optimización de Consultas
- **Filtro universal**: Todas las queries Flux incluyen filtrado por ubicación
- **Performance**: Consultas optimizadas sin impacto en rendimiento
- **Escalabilidad**: Preparado para futuras ubicaciones adicionales
- **Mantenibilidad**: Sistema consistente y fácil de mantener

### 📈 Impacto en la Experiencia de Usuario

#### ✅ Usabilidad Mejorada
- **Navegación intuitiva**: Paneles organizados lógicamente
- **Filtrado dinámico**: Cambio instantáneo de vista por ubicación
- **Información jerárquica**: Resumen primero, detalles expandibles
- **Visual clarity**: Colores diferenciados y consistentes

#### ✅ Funcionalidad Completa
- **18 paneles funcionales**: Todos con filtrado aplicado correctamente
- **Datos en tiempo real**: Actualización automática de todas las métricas
- **Interactividad**: Filtros que afectan todos los gráficos simultáneamente
- **Profesionalismo**: Dashboard de nivel empresarial

## [2.2.0] - 2025-10-13 - NUEVA UBICACIÓN: GIMNASIO ✅

### 🏟️ Nueva Ubicación Añadida

#### ✅ Gimnasio Completamente Integrado
- **Nueva ubicación "gimnasio"** añadida al simulador con temperatura base 23°C
- **Node ESP32_NODE_03** asignado al gimnasio (laboratorio ahora es NODE_04)
- **Color naranja (#FF9800)** asignado para diferenciación visual
- **Integración completa** en todos los paneles de Grafana
- **Soporte completo** en API REST y App Flutter

#### ✅ Actualizaciones Realizadas
- **Simulador Python:** 4 ubicaciones con datos diferenciados
- **Dashboard Grafana:** 5 paneles actualizados con gimnasio
- **API REST:** Lista de ubicaciones ampliada
- **App Flutter:** Colores y nombres actualizados
- **Documentación:** README.md actualizado con nueva información

#### 🎨 Esquema de Colores Actualizado
- 🔴 **Aula 20:** Rojo (#E53E3E) - Temp. base 22°C
- 🔵 **Aula 21:** Azul (#3182CE) - Temp. base 24°C
- 🟠 **Gimnasio:** Naranja (#FF9800) - Temp. base 23°C
- 🟢 **Laboratorio:** Verde (#38A169) - Temp. base 21°C

### 📊 Impacto en el Sistema
- **4 ubicaciones monitoreadas** simultáneamente
- **Datos coherentes** con variaciones realistas por ubicación
- **Escalabilidad demostrada** para futuras ubicaciones
- **Compatibilidad total** con arquitectura existente

## [2.1.0] - 2025-10-13 - AUTOMATIZACIÓN Y OPTIMIZACIONES AVANZADAS ✅

### 🚀 Nuevas Funcionalidades de Automatización

#### ✅ Scripts de Instalación Automática
- **`instalar_proyecto.bat`** - Instalación completa automática para equipos nuevos
- **`setup_rapido.bat`** - Setup rápido para equipos con Docker instalado
- **`verificar_rapido.bat`** - Verificación rápida del sistema (30 segundos)
- **`sistema_completo.bat`** - Ejecución del ecosistema completo con diagnósticos

#### ✅ Sistema de Verificación Inteligente
- **Detección automática** de Docker Desktop
- **Verificación de servicios** con timeout inteligente
- **Diagnóstico de problemas** comunes automático
- **Instalación de dependencias** Python automática

#### ✅ Optimizaciones de Rendimiento
- **Cache inteligente** en API REST (30 segundos)
- **Agregación de datos** optimizada en Telegraf
- **Configuración de memoria** optimizada para contenedores
- **Pipeline de datos** sin pérdidas con retry automático

#### ✅ Documentación Completa Actualizada
- **`INSTALACION.md`** - Guías de instalación detalladas
- **`QUICK_START.md`** - Inicio rápido en menos de 5 minutos
- **`MIGRACION.md`** - Preparación para migración a LoRa Mesh
- **Troubleshooting** avanzado para problemas comunes

### 📊 Configuraciones Avanzadas Implementadas

#### ✅ Telegraf Pipeline Optimizado
- **Parsing inteligente** de topics MQTT
- **Agregación temporal** cada 30 segundos
- **Múltiples consumers** para raw data y sensores específicos
- **Procesamiento de timestamps** automático

#### ✅ Grafana Dashboard Profesional
- **Branding personalizado** con logo Medusse
- **Header estilizado** con iconos de sensores
- **Colores diferenciados** por ubicación (Rojo, Azul, Verde)
- **Umbrales de CO2** con sistema de alertas visual

#### ✅ Configuración Docker Productiva
- **Volúmenes persistentes** para todos los servicios
- **Networking interno** optimizado (medusse_network)
- **Variables de entorno** configuradas para producción
- **Restart policies** automáticas

### 🔧 Mejoras Técnicas

#### ✅ API REST Robusta
- **Manejo de errores** completo con try-catch
- **Logging detallado** para debugging
- **CORS habilitado** para desarrollo
- **Timeout configurado** para consultas InfluxDB

#### ✅ Flutter App Profesional
- **Google Fonts** (Inter) para tipografía moderna
- **Provider pattern** para gestión de estado
- **Material Design 3** con tema personalizado
- **Iconos personalizados** y assets optimizados

#### ✅ Simulador de Datos Realista
- **Variación por ubicación** (temperaturas base diferentes)
- **Datos coherentes** con rangos realistas
- **Timestamps precisos** en milisegundos
- **Node IDs diferenciados** por ESP32

### 📱 Características Móviles Avanzadas

#### ✅ Interfaz de Usuario Optimizada
- **Cards elevation** con sombras Material
- **Botones sin elevation** para diseño plano moderno
- **Border radius** consistente (12px) en toda la app
- **Color scheme** generado desde seed color

#### ✅ Navegación y UX
- **Estructura de 3 pantallas** bien definida
- **Navegación intuitiva** entre ubicaciones
- **Estados de carga** y manejo de errores
- **Actualización automática** de datos

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

### 📊 Configuración InfluxDB v2 Completa
- **Token de administración** preconfigurado: `medusse-admin-token-2025`
- **Organización** predefinida: `iescelia`
- **Bucket de sensores** automático: `sensors`
- **Usuario administrador** configurado: `admin/medusse2025`
- **Configuración persistente** con volúmenes Docker

### 🛡️ Configuración MQTT Segura
- **Broker Mosquitto 2.0** con configuración optimizada
- **WebSocket habilitado** en puerto 9001
- **Logs persistentes** para debugging
- **Configuración de retención** de mensajes

### 🎨 Personalización Visual Avanzada
- **Logo personalizado** integrado en dashboard
- **Gradientes CSS** en header de Grafana
- **Iconos emoji** para tipos de sensores (🌡️💧🫁🌪️)
- **Paleta de colores** coherente en toda la interfaz

### 🎯 Preparado para LoRa Mesh
- **Arquitectura compatible** - Solo cambiar gateway
- **Formato datos idéntico** - Sin modificar API/Flutter
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación migración** completa

### 🔌 Gateway Avanzado Implementado
- **Múltiples fuentes de datos** (serial, simuladores, archivos)
- **Procesamiento JSON estructurado** con validación
- **Estadísticas en tiempo real** de mensajes procesados
- **Reconexión automática** a MQTT en caso de fallos
- **Threading para múltiples nodos** ESP32

### 💾 Código ESP32 Producción
- **Sensores múltiples** DHT22, BME280, sensor de gas
- **Configuración I2C** optimizada (SDA/SCL en pines 21/22)
- **Validación de lecturas** con filtros anti-ruido
- **Estructura JSON** compatible con pipeline completo
- **Node ID configurable** por ubicación (`ESP32_NODE_01/02/03`)

### 📊 Características Simulador Avanzadas
- **Datos por ubicación** con bases térmicas diferentes
  - Aula 20: 22°C base
  - Aula 21: 24°C base
  - Laboratorio: 21°C base
- **Variaciones realistas** con rangos controlados
- **Publicación MQTT directa** sin intermediarios
- **Timestamps precisos** en milisegundos Unix

### 📁 Archivos Nuevos
- `api/` - Directorio completo API REST
- `medusse_app/` - Directorio completo Flutter
- `README_FLUTTER.md` - Documentación app móvil
- Scripts de ejecución y testing

### 📦 Dependencias Completas Configuradas

#### ✅ Node.js API Dependencies
- **@influxdata/influxdb-client** ^1.35.0 - Cliente InfluxDB oficial
- **express** ^4.18.2 - Framework web robusto
- **cors** ^2.8.5 - Cross-origin resource sharing
- **ws** ^8.14.2 - WebSocket server/client
- **mqtt** ^5.3.0 - Cliente MQTT moderno
- **dotenv** ^16.3.1 - Variables de entorno

#### ✅ Flutter App Dependencies
- **fl_chart** ^0.66.0 - Gráficos interactivos avanzados
- **provider** ^6.1.1 - Gestión de estado reactiva
- **go_router** ^12.1.3 - Navegación declarativa
- **http** ^1.1.0 - Cliente HTTP/REST
- **web_socket_channel** ^2.4.0 - WebSocket Flutter
- **google_fonts** ^6.1.0 - Tipografía Google Fonts
- **shared_preferences** ^2.2.2 - Almacenamiento local
- **intl** ^0.19.0 - Internacionalización

#### ✅ Python Ecosystem
- **paho-mqtt** - Cliente MQTT para Python
- **requests** - HTTP client para testing API
- **json** - Procesamiento de datos estructurados
- **threading** - Manejo de múltiples nodos simultáneos

### 🏗️ Arquitectura de Microservicios
- **4 contenedores Docker** independientes y escalables
- **Red interna** medusse_network para comunicación segura
- **Volúmenes persistentes** para cada servicio
- **Health checks** automáticos en todos los servicios

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

## [0.3.0] - 2025-10-08 - Gateway y Simuladores

### ✅ Completado
- **Gateway Medusse funcional con MQTT**
- **Simuladores múltiples nodos ESP32**
- **Procesamiento JSON estructurado**

### 📁 Archivos Gateway
- `gateway/medusse_gateway.py` - Gateway principal
- `arduino/test_multiple_nodes.py` - Simulador múltiples nodos
- `arduino/simulate_serial.py` - Simulador single node

## [0.2.0] - 2025-10-08 - Firmware ESP32

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

*Desarrollado para IES José Rodrigo Botet - Curso 2026/2026*
*Autor: Francisco Manuel López Alarte*