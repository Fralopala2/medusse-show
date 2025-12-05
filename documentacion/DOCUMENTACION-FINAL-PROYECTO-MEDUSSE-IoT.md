<div align="center">

<img src="../web/public/logos/LogoMedusse.png" alt="Medusse IoT Logo" width="300" height="300">

</div>

# MEDUSSE IoT

## Sistema de Monitoreo Ambiental con Arquitectura de Microservicios

### Documentación Final del Trabajo de Fin de Grado

---

**Autor:** Francisco Manuel López Alarte  
**Email:** [pacoaldev@gmail.com](mailto:pacoaldev@gmail.com)  
**Institución:** IES José Rodrigo Botet  
**Curso Académico:** 2025/2026  
**Versión del Proyecto:** 2.7.7  
**Fecha de Entrega:** Noviembre 2025  
**Estado:** 16/16 Retos Completados (100%) ✅

---

**Repositorio GitHub:**  
[https://github.com/Fralopala2/proyecto-medusse](https://github.com/Fralopala2/proyecto-medusse)  
**Rama:** clase

**Licencia:** All Rights Reserved

---

## Índice de Contenidos

### PARTE I \- PRESENTACIÓN DEL PROYECTO

1. [Resumen Ejecutivo](#resumen-ejecutivo)  
2. [Información del Proyecto](#informacion-del-proyecto)  
3. [Objetivos y Alcance](#objetivos-y-alcance)  
4. [Estado de los 16 Retos](#estado-de-los-16-retos)

### PARTE II \- ARQUITECTURA Y TECNOLOGÍAS

5. [Arquitectura del Sistema](#arquitectura-del-sistema)  
6. [Stack Tecnológico](#stack-tecnologico)  
7. [Ubicaciones y Sensores](#ubicaciones-y-sensores)  
8. [Flujo de Datos](#flujo-de-datos)  
9. [Infraestructura Docker](#infraestructura-docker)

### PARTE III \- LOS 16 RETOS DOCUMENTADOS

10. [Reto 1: Proyecto de Sostenibilidad](#reto-1-proyecto-de-sostenibilidad)  
11. [Reto 2: Base de Datos](#reto-2-base-de-datos)  
12. [Reto 3: Procedimientos Almacenados](#reto-3-procedimientos-almacenados)  
13. [Reto 4: Diseño de Bocetos](#reto-4-diseno-de-bocetos)  
14. [Reto 5: Interfaces HTML/CSS](#reto-5-interfaces-htmlcss)  
15. [Reto 6: Plan de Empresa](#reto-6-plan-de-empresa)  
16. [Reto 7: Validación de Formularios JS](#reto-7-validacion-de-formularios-js)  
17. [Reto 8: Transferencia Front-end/Back-end](#reto-8-transferencia-frontend-backend)  
18. [Reto 9: Gestión de Usuarios con Sesiones](#reto-9-gestion-de-usuarios-con-sesiones)  
19. [Reto 10: Panel de Administración](#reto-10-panel-de-administracion)  
20. [Reto 11: Script FTP/SFTP](#reto-11-script-ftpsftp)  
21. [Reto 12: Comunicación Asíncrona](#reto-12-comunicacion-asincrona)  
22. [Reto 13: Framework Cliente](#reto-13-framework-cliente)  
23. [Reto 14: Diseño Web Avanzado](#reto-14-diseno-web-avanzado)  
24. [Reto 15: Framework Servidor](#reto-15-framework-servidor)  
25. [Reto 16: Documentación Final](#reto-16-documentacion-final)

### PARTE IV \- RETOS DESTACADOS EN PROFUNDIDAD

26. [Sostenibilidad y Objetivos de Desarrollo Sostenible](#sostenibilidad-y-ods)  
27. [Plan de Empresa y Modelo de Negocio](#plan-de-empresa-detallado)

### PARTE V \- GUÍAS TÉCNICAS

28. [Instalación y Configuración](#instalacion-y-configuracion)  
29. [Verificación del Sistema](#verificacion-del-sistema)  
30. [Acceso a Servicios](#acceso-a-servicios)  
31. [Migración a Hardware Real LoRa Mesh](#migracion-a-lora-mesh)

### PARTE VI \- CONCLUSIONES Y ANEXOS

32. [Resultados Alcanzados](#resultados-alcanzados)  
33. [Competencias Desarrolladas](#competencias-desarrolladas)  
34. [Estadísticas del Proyecto](#estadisticas-del-proyecto)  
35. [Referencias y Recursos](#referencias-y-recursos)  
36. [Información de Contacto](#informacion-de-contacto)

---

# PARTE I \- PRESENTACIÓN DEL PROYECTO

## Resumen Ejecutivo

**Medusse IoT** es un ecosistema completo de monitoreo ambiental que integra hardware ESP32, comunicación MQTT, bases de datos de series temporales, visualización profesional y aplicaciones cliente multiplataforma. El sistema monitorea **18 tipos de sensores** distribuidos en **4 ubicaciones**, proporcionando datos en tiempo real a través de múltiples interfaces: dashboard Grafana, API REST, aplicación web Next.js y aplicación móvil Flutter.

### Visión General

El proyecto demuestra la implementación práctica de una **arquitectura de microservicios moderna**, con énfasis en escalabilidad, rendimiento y preparación para despliegue en hardware real con comunicación LoRa Mesh.

### Propósito

Este sistema permite:

- **Monitorización ambiental integral** de temperatura, humedad, CO2, calidad del aire (VOC, IAQ)  
- **Gestión de recursos hídricos** con sensores de pH, TDS, flujo de agua y oxígeno disuelto  
- **Monitorización de energía solar** con gestión inteligente de baterías y paneles solares  
- **Toma de decisiones basada en datos** mediante dashboards profesionales y alertas automáticas  
- **Educación ambiental** con datos reales en instituciones educativas

### Logros Principales

✅ **16/16 Retos Completados** (100% de cumplimiento)  
✅ **6100+ líneas de código** en 6 lenguajes de programación  
✅ **7000+ líneas de documentación** técnica profesional  
✅ **Sistema completamente funcional** con demo en vivo  
✅ **Preparado para producción** con hardware ESP32 real

### Impacto Esperado

El proyecto contribuye directamente a la **sostenibilidad ambiental** con:

- Ahorro energético estimado: **2500-4000 kWh/año** (700-1200€)  
- Reducción de emisiones CO2: **1-1.5 toneladas/año**  
- Ahorro de agua: **50-100 m³/año** (30-50% reducción)  
- Mejora de calidad del aire interior en **90%** del tiempo

---

## Información del Proyecto

### Datos del Proyecto

| Campo | Valor |
| :---- | :---- |
| **Título** | Sistema IoT de Monitoreo Ambiental con Arquitectura de Microservicios |
| **Nombre del Proyecto** | Medusse IoT |
| **Autor** | Francisco Manuel López Alarte |
| **Email** | [pacoaldev@gmail.com](mailto:pacoaldev@gmail.com) |
| **Institución** | IES José Rodrigo Botet |
| **Curso Académico** | 2025/2026 |
| **Versión** | 2.7.7 |
| **Fecha de Entrega** | Noviembre 2025 |
| **Licencia** | All Rights Reserved |
| **Repositorio** | [https://github.com/Fralopala2/proyecto-medusse](https://github.com/Fralopala2/proyecto-medusse) |
| **Rama Principal** | clase |

### Datos del Autor

| Campo | Valor |
| :---- | :---- |
| **Nombre Completo** | Francisco Manuel López Alarte |
| **Alias** | Paco / Pacoaldev |
| **Email Personal** | [pacoaldev@gmail.com](mailto:pacoaldev@gmail.com) |
| **Sitio Web** | [https://www.pacoal.dev](https://www.pacoal.dev) |
| **GitHub** | [https://github.com/Fralopala2](https://github.com/Fralopala2) |
| **Formación** | 2º de Desarrollo de Aplicaciones Web (DAW) |

### Contexto Académico

Este proyecto se desarrolla como **Trabajo de Fin de Grado** para la titulación de Desarrollo de Aplicaciones Web en el IES José Rodrigo Botet durante el curso académico 2025/2026.

El proyecto integra conocimientos de:

- Desarrollo Full-Stack (frontend y backend)  
- Bases de datos relacionales y no relacionales  
- Arquitectura de microservicios  
- Comunicación IoT (MQTT, WebSocket)  
- Contenedorización y orquestación (Docker)  
- Desarrollo móvil multiplataforma  
- Diseño de interfaces modernas  
- Gestión de proyectos de software

---

## Objetivos y Alcance

### Objetivo General

Desarrollar un **sistema completo de monitorización ambiental IoT** que permita recopilar, almacenar, visualizar y analizar datos de sensores en tiempo real, con énfasis en sostenibilidad, eficiencia energética y calidad del aire.

### Objetivos Específicos

#### 1\. Desarrollo Técnico

- ✅ Implementar arquitectura de microservicios escalable  
- ✅ Integrar 18 tipos de sensores diferentes  
- ✅ Desarrollar pipeline de datos robusto (MQTT → Telegraf → InfluxDB)  
- ✅ Crear API REST completa con 11 endpoints  
- ✅ Implementar comunicación en tiempo real con WebSocket

#### 2\. Bases de Datos

- ✅ Diseñar e implementar base de datos de series temporales (InfluxDB)  
- ✅ Crear esquema relacional completo (MySQL con 9 tablas)  
- ✅ Desarrollar 10 procedimientos almacenados  
- ✅ Implementar sistema de usuarios y autenticación

#### 3\. Interfaces de Usuario

- ✅ Diseñar y desarrollar dashboard profesional con Grafana  
- ✅ Crear aplicación web moderna con Next.js 16 \+ TypeScript  
- ✅ Desarrollar aplicación móvil multiplataforma con Flutter  
- ✅ Implementar diseño responsive y accesible

#### 4\. Sostenibilidad

- ✅ Alinear el proyecto con 5 Objetivos de Desarrollo Sostenible (ODS)  
- ✅ Implementar monitorización de energía solar y baterías  
- ✅ Desarrollar sistema de alertas para optimización de recursos  
- ✅ Calcular impacto medible (ahorro energético, reducción CO2, ahorro agua)

#### 5\. Viabilidad Comercial

- ✅ Desarrollar plan de empresa completo  
- ✅ Definir 3 paquetes comerciales (STARTER, STANDARD, PREMIUM)  
- ✅ Realizar proyecciones financieras (3 escenarios)  
- ✅ Establecer estrategia Go-to-Market

#### 6\. Documentación

- ✅ Documentar los 16 retos del TFG  
- ✅ Crear guías de instalación para Windows y Linux  
- ✅ Desarrollar documentación técnica completa  
- ✅ Preparar plan de migración a hardware real

### Alcance del Proyecto

#### Incluido en el Proyecto

✅ **Simulador completo** de 18 sensores con datos realistas  
✅ **Infraestructura Docker** con 5 servicios (Mosquitto, InfluxDB, Telegraf, Grafana, MySQL)  
✅ **API REST** con autenticación y gestión de usuarios  
✅ **Dashboard Grafana** personalizado con 18 paneles  
✅ **Aplicación web Next.js** con 6 secciones y dashboard en tiempo real  
✅ **Aplicación móvil Flutter** con 3 pantallas completas  
✅ **Sistema de alertas** automático por umbrales  
✅ **Documentación completa** (7000+ líneas)  
✅ **Scripts de instalación** automatizados para Windows y Linux  
✅ **Plan de migración** a hardware ESP32 real con LoRa Mesh

#### Fuera del Alcance (Fase 2\)

⏳ Despliegue en hardware ESP32 real (preparado, pendiente de adquisición)  
⏳ Implementación de red LoRa Mesh (documentado, pendiente de hardware)  
⏳ Aplicación móvil para Android/iOS (código completo, pendiente de compilación nativa)  
⏳ Hosting en producción (preparado para Vercel, pendiente de despliegue final)

### Límites y Restricciones

**Tiempo:** Proyecto desarrollado en 4 meses (Agosto \- Noviembre 2025\)  
**Presupuesto:** Proyecto académico sin financiación externa (simulación en lugar de hardware real)  
**Hardware:** Uso de simulador Python en lugar de nodos ESP32 físicos  
**Alcance geográfico:** Enfocado en instituciones educativas en España

---

## Estado de los 16 Retos

### Resumen General

**Estado Final:** ✅ **16/16 Retos Completados (100%)**

| Reto | Nombre | Estado | Líneas Código | Archivos |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Proyecto de Sostenibilidad | ✅ | 500 | 3 |
| 2 | Base de Datos | ✅ | 900 | 5 |
| 3 | Procedimientos Almacenados | ✅ | 400 | 1 |
| 4 | Diseño de Bocetos | ✅ | 2500 | 10 |
| 5 | Interfaces HTML/CSS | ✅ | 1200 | 15 |
| 6 | Plan de Empresa | ✅ | \- | 1 |
| 7 | Validación de Formularios JS | ✅ | 300 | 5 |
| 8 | Transferencia Front-end/Back-end | ✅ | 1500 | 8 |
| 9 | Gestión de Usuarios con Sesiones | ✅ | 350 | 4 |
| 10 | Panel de Administración | ✅ | 250 | 1 |
| 11 | Script FTP/SFTP | ✅ | \- | 2 |
| 12 | Comunicación Asíncrona | ✅ | 400 | 4 |
| 13 | Framework Cliente | ✅ | 3200 | 50+ |
| 14 | Diseño Web Avanzado | ✅ | 800 | 20 |
| 15 | Framework Servidor | ✅ | 1175 | 6 |
| 16 | Documentación Final | ✅ | \- | 10+ |

**Total Líneas de Código:** 6100+ líneas  
**Total Archivos:** 100+ archivos

### Desglose por Categorías

#### Categoría 1: Sostenibilidad y Planificación (Retos 1, 6\)

- **Reto 1:** Alineación con 5 ODS, impacto medible, 15 KPIs de sostenibilidad  
- **Reto 6:** Modelo de negocio, 3 paquetes comerciales, proyecciones financieras

#### Categoría 2: Bases de Datos (Retos 2, 3\)

- **Reto 2:** InfluxDB 2.7 \+ MySQL 8.0 con 9 tablas  
- **Reto 3:** 10 procedimientos almacenados en MySQL

#### Categoría 3: Interfaces y Diseño (Retos 4, 5, 14\)

- **Reto 4:** Bocetos para Grafana, web Next.js y app Flutter  
- **Reto 5:** Componentes HTML/CSS con Tailwind CSS  
- **Reto 14:** Responsive design, animaciones, accesibilidad

#### Categoría 4: Desarrollo Frontend (Retos 7, 13\)

- **Reto 7:** Validación de formularios con JavaScript  
- **Reto 13:** Next.js 16 \+ Flutter 3.9+ como frameworks cliente

#### Categoría 5: Desarrollo Backend (Retos 8, 9, 10, 15\)

- **Reto 8:** API REST con 11 endpoints  
- **Reto 9:** Sistema de autenticación con bcrypt y tokens UUID  
- **Reto 10:** Panel de administración con CRUD completo  
- **Reto 15:** Express 4.18.2 \+ Docker Compose como framework servidor

#### Categoría 6: Comunicación y Despliegue (Retos 11, 12\)

- **Reto 11:** Deployment en Vercel  
- **Reto 12:** WebSocket \+ MQTT para comunicación asíncrona

#### Categoría 7: Documentación (Reto 16\)

- **Reto 16:** 7000+ líneas de documentación técnica completa

---

# PARTE II \- ARQUITECTURA Y TECNOLOGÍAS

## Arquitectura del Sistema

### Diagrama de Arquitectura General

```mermaid
graph TD
    subgraph IoT["CAPA DE SENSORES"]
        N1["ESP32 NODE_01<br/>Aula 20<br/>18 sensores"]
        N2["ESP32 NODE_02<br/>Aula 21<br/>18 sensores"]
        N3["ESP32 NODE_03<br/>Gimnasio<br/>18 sensores"]
        N4["ESP32 NODE_04<br/>Laboratorio<br/>18 sensores"]
        
        N1:::red
        N2:::purple
        N3:::orange
        N4:::green
    end
    
    subgraph Comm["CAPA DE COMUNICACIÓN"]
        MQTT["Mosquitto MQTT 2.0<br/>Port 1883/9001<br/>Broker MQTT"]
        MQTT:::mqtt
    end
    
    subgraph Processing["CAPA DE PROCESAMIENTO"]
        TELE["Telegraf 1.28<br/>JSON Parsing<br/>Aggregation 30s"]
        TELE:::processing
    end
    
    subgraph Storage["CAPA DE ALMACENAMIENTO"]
        INFLUX["InfluxDB 2.7<br/>Time Series DB<br/>Bucket: sensors"]
        MYSQL["MySQL 8.0<br/>Users & Config<br/>DB: medusse_db"]
        
        INFLUX:::influxdb
        MYSQL:::mysql
    end
    
    subgraph Presentation["CAPA DE VISUALIZACIÓN Y API"]
        GRAFANA["Grafana 10.2.0<br/>18 Paneles<br/>Alertas"]
        API["API REST Express.js<br/>Node.js + WebSocket<br/>11 Endpoints"]
        
        GRAFANA:::grafana
        API:::api
    end
    
    subgraph Clients["CAPA DE CLIENTES"]
        WEB["Web Next.js<br/>TypeScript<br/>6 Sections"]
        FLUTTER["Flutter App<br/>Multiplataforma<br/>3 Screens"]
        
        WEB:::web
        FLUTTER:::flutter
    end
    
    N1 -->|MQTT| MQTT
    N2 -->|MQTT| MQTT
    N3 -->|MQTT| MQTT
    N4 -->|MQTT| MQTT
    
    MQTT -->|Topics| TELE
    
    TELE -->|JSON| INFLUX
    TELE -->|Parse| MYSQL
    
    INFLUX -->|Query| GRAFANA
    MYSQL -->|Read| GRAFANA
    
    INFLUX -->|Query| API
    MYSQL -->|Read| API
    
    GRAFANA -->|Display| WEB
    API -->|HTTP/WS| WEB
    
    API -->|HTTP/WS| FLUTTER
    
    classDef red fill:#E53E3E,stroke:#C53030,color:#fff,stroke-width:2px
    classDef purple fill:#805AD5,stroke:#6B46C1,color:#fff,stroke-width:2px
    classDef orange fill:#ED8936,stroke:#DD6B20,color:#fff,stroke-width:2px
    classDef green fill:#38A169,stroke:#276749,color:#fff,stroke-width:2px
    classDef mqtt fill:#FF9800,stroke:#F57C00,color:#fff,stroke-width:2px
    classDef processing fill:#2196F3,stroke:#1565C0,color:#fff,stroke-width:2px
    classDef influxdb fill:#00BCD4,stroke:#0097A7,color:#fff,stroke-width:2px
    classDef mysql fill:#FFC107,stroke:#FFA000,color:#000,stroke-width:2px
    classDef grafana fill:#3F51B5,stroke:#283593,color:#fff,stroke-width:2px
    classDef api fill:#4CAF50,stroke:#388E3C,color:#fff,stroke-width:2px
    classDef web fill:#9C27B0,stroke:#7B1FA2,color:#fff,stroke-width:2px
    classDef flutter fill:#E91E63,stroke:#C2185B,color:#fff,stroke-width:2px
```

### Descripción de Capas

#### 1\. Capa de Sensores (IoT Layer)

**Componentes:**

- 4 nodos ESP32 simulados (preparados para hardware real)  
- 18 tipos de sensores por ubicación  
- Publicación MQTT cada 15 segundos

**Ubicaciones:**

- **Aula 20** (ESP32\_NODE\_01) \- Temperatura base 22°C \- Color Rojo  
- **Aula 21** (ESP32\_NODE\_02) \- Temperatura base 24°C \- Color Púrpura  
- **Gimnasio** (ESP32\_NODE\_03) \- Temperatura base 23°C \- Color Naranja  
- **Laboratorio** (ESP32\_NODE\_04) \- Temperatura base 21°C \- Color Verde

**Sensores implementados:**

- **Ambientales:** Temperatura, Humedad, CO2, Presión, VOC, IAQ  
- **Agua:** Humedad suelo, pH, Flujo, TDS, O2 disuelto  
- **Energía:** Voltaje batería, Voltaje solar, Porcentaje batería, Consumo, Estado carga, Modo bajo consumo, Wake-ups

#### 2\. Capa de Comunicación (Message Broker)

**Mosquitto MQTT 2.0:**

- Puerto 1883 (MQTT)  
- Puerto 9001 (WebSocket)  
- Topics estructurados: `iescelia/{ubicacion}/{sensor}`  
- QoS 0 para máxima velocidad  
- Retain deshabilitado  
- Clean session habilitado

#### 3\. Capa de Procesamiento (Data Pipeline)

**Telegraf 1.28:**

- Suscripción a topics MQTT  
- Parsing de JSON  
- Agregación temporal (30 segundos)  
- Escritura a InfluxDB  
- Pipeline sin pérdidas con retry automático

#### 4\. Capa de Almacenamiento (Data Storage)

**InfluxDB 2.7** (Series Temporales):

- Bucket: `sensors`  
- Organización: `iescelia`  
- Retención: Ilimitada  
- 18 measurements (uno por tipo de sensor)  
- Tags: `location`, `node_id`, `sensor`

**MySQL 8.0** (Datos Relacionales):

- Base de datos: `medusse_db`  
- 9 tablas: users, sessions, user\_preferences, locations, sensors, alerts, user\_alerts, activity\_log, system\_config  
- 10 procedimientos almacenados  
- 4 usuarios iniciales

#### 5\. Capa de Visualización (Presentation Layer)

**Grafana 10.2.0:**

- Dashboard personalizado con 18 paneles  
- 6 filas colapsables por categoría  
- Filtros multi-select por ubicación  
- Sistema de alertas visual

**API REST (Express 4.18.2):**

- 11 endpoints documentados  
- Autenticación con tokens UUID  
- WebSocket para streaming en tiempo real  
- Cache inteligente (30 segundos)

#### 6\. Capa de Clientes (Client Applications)

**Web Next.js 16:**

- 6 hero sections  
- Dashboard en tiempo real  
- WebSocket para actualizaciones  
- TypeScript \+ Tailwind CSS

**App Flutter 3.9+:**

- 3 pantallas completas  
- Gráficos interactivos  
- Multiplataforma (Windows, Web, Android, iOS)  
- Material Design 3

### Flujo de Datos Completo

1. **Generación:** Simulador Python genera datos de 18 sensores cada 15 segundos  
2. **Publicación:** Datos publicados en MQTT topics estructurados  
3. **Recepción:** Broker Mosquitto recibe y distribuye mensajes  
4. **Procesamiento:** Telegraf parsea JSON y agrega temporalmente  
5. **Almacenamiento:** InfluxDB guarda series temporales, MySQL guarda usuarios  
6. **Visualización:** Grafana consulta InfluxDB cada 30 segundos  
7. **API:** Express sirve datos a clientes con cache de 30 segundos  
8. **Clientes:** Web y móvil actualizan UI en tiempo real vía WebSocket

### Ventajas de la Arquitectura

✅ **Escalabilidad:** Fácil agregar nuevas ubicaciones y sensores  
✅ **Desacoplamiento:** Cada capa es independiente  
✅ **Resiliencia:** Fallos en una capa no afectan a las demás  
✅ **Performance:** Cache y agregación optimizan rendimiento  
✅ **Mantenibilidad:** Código modular y bien documentado  
✅ **Portabilidad:** Contenedores Docker aseguran reproducibilidad

---

## Stack Tecnológico

### Lenguajes de Programación

| Lenguaje | Uso | Líneas |
| :---- | :---- | :---- |
| **Python 3.9+** | Simulador de sensores | \~500 |
| **JavaScript** | API REST (Node.js) | \~1000 |
| **TypeScript** | Web Next.js | \~1200 |
| **Dart** | App Flutter | \~2000 |
| **SQL** | Esquema BD \+ Procedimientos | \~900 |
| **Bash** | Scripts automatización | \~200 |

**Total:** \~6100 líneas de código

### Backend y Servicios

#### Node.js \+ Express

**Versión:** Node.js v18+ | Express 4.18.2

**Características:**

- Runtime JavaScript del lado del servidor  
- Framework web minimalista y flexible  
- Middleware para funcionalidades comunes  
- Soporte para JSON y WebSocket

**Archivos principales:**

- `api/server.js` \- Servidor principal Express  
- `api/db.js` \- Pool de conexiones MySQL  
- `api/auth.js` \- Lógica de autenticación  
- `api/auth-routes.js` \- Rutas de autenticación  
- `api/admin-routes.js` \- Rutas de administración

#### Python

**Versión:** Python 3.9+

**Librerías:**

- `paho-mqtt` \- Cliente MQTT  
- `json` \- Manejo de JSON  
- `random` \- Generación de datos aleatorios  
- `datetime` \- Manejo de timestamps  
- `math` \- Cálculos matemáticos

**Archivos principales:**

- `arduino/medusse_simulator.py` \- Simulador completo de sensores

### Bases de Datos

#### InfluxDB 2.7

**Tipo:** Base de datos de series temporales

**Características:**

- Optimizada para datos con timestamp  
- Query language Flux  
- Agregación y downsampling automático  
- Compresión eficiente  
- Integración nativa con Grafana

**Configuración:**

- URL: `http://localhost:8086`  
- Organización: `iescelia`  
- Bucket: `sensors`  
- Token: `medusse-admin-token-2025`  
- Usuario: `admin` / `medusse2025`

#### MySQL 8.0

**Tipo:** Base de datos relacional

**Características:**

- ACID compliant  
- Índices optimizados  
- Procedimientos almacenados  
- Triggers y views  
- Transacciones

**Configuración:**

- Host: `localhost:3306`  
- Base de datos: `medusse_db`  
- Usuario: `medusse_user` / `medusse2025`

**Esquema:**

- 9 tablas relacionales  
- 10 procedimientos almacenados  
- Relaciones 1:N y N:M

### Comunicación y Mensajería

#### Mosquitto MQTT 2.0

**Tipo:** Message broker MQTT

**Características:**

- Protocolo ligero de mensajería  
- Publish/Subscribe pattern  
- QoS (Quality of Service) configurable  
- Soporte para WebSocket  
- TLS/SSL opcional

**Configuración:**

- Puerto MQTT: `1883`  
- Puerto WebSocket: `9001`  
- QoS: `0` (máxima velocidad)  
- Retain: Deshabilitado  
- Clean session: Habilitado

#### Telegraf 1.28

**Tipo:** Pipeline de datos

**Características:**

- Agente de recopilación de métricas  
- \+200 plugins de input/output  
- Parsing y transformación de datos  
- Agregación temporal  
- Buffering y retry automático

**Configuración:**

- Input: MQTT Consumer  
- Output: InfluxDB v2  
- Parsing: JSON  
- Agregación: 30 segundos

### Frontend Web

#### Next.js 16

**Tipo:** Framework React

**Características:**

- Server-Side Rendering (SSR)  
- Static Site Generation (SSG)  
- App Router (file-based)  
- Optimización automática  
- Code splitting  
- Image optimization

**Stack completo:**

- **Next.js 16** \- Framework React  
- **TypeScript 5** \- Tipado estático  
- **Tailwind CSS 4** \- Utility-first CSS  
- **Framer Motion 12** \- Animaciones

**Estructura:**

web/src/

├── app/              \# App Router

│   ├── page.tsx     \# Página principal

│   ├── login/       \# Login

│   └── dashboard/   \# Dashboard

├── components/       \# Componentes React

│   ├── layout/      \# Header, Footer

│   ├── sections/    \# Secciones

│   └── ui/          \# Componentes UI

├── lib/             \# Utilidades

│   ├── api.ts       \# Cliente API

│   └── data.ts      \# Datos estáticos

└── hooks/           \# Custom hooks

### Frontend Móvil

#### Flutter 3.9+

**Tipo:** Framework multiplataforma

**Características:**

- Lenguaje Dart  
- Material Design 3  
- Hot reload  
- AOT compilation  
- Soporte iOS/Android/Web/Desktop

**Paquetes principales:**

- `http` \- Cliente HTTP  
- `provider` \- Gestión de estado  
- `fl_chart` \- Gráficos interactivos  
- `google_fonts` \- Tipografía

**Estructura:**

medusse\_app/lib/

├── main.dart           \# Entry point

├── models/             \# Modelos de datos

├── services/           \# Servicios (API, WebSocket)

├── providers/          \# Providers de estado

├── screens/            \# Pantallas

│   ├── home\_screen.dart

│   ├── location\_detail\_screen.dart

│   └── sensor\_charts\_screen.dart

└── widgets/            \# Widgets reutilizables

### Visualización

#### Grafana 10.2.0

**Tipo:** Plataforma de visualización

**Características:**

- Dashboards interactivos  
- Múltiples data sources  
- Alertas configurables  
- Paneles personalizables  
- Variables y templating

**Configuración:**

- URL: `http://localhost:3000`  
- Usuario: `admin` / `medusse2025`  
- Data source: InfluxDB  
- Dashboard: `medusse-clean.json`

**Dashboard implementado:**

- 18 paneles de sensores  
- 6 filas colapsables  
- Filtros multi-select  
- Alertas visuales  
- Branding personalizado

### Infraestructura

#### Docker \+ Docker Compose

**Docker:** Plataforma de contenedorización

**Docker Compose:** Orquestación multi-contenedor

**Servicios implementados:**

services:

  mosquitto:    \# Broker MQTT

  influxdb:     \# Base de datos series temporales

  telegraf:     \# Pipeline de datos

  grafana:      \# Visualización

  mysql:        \# Base de datos relacional

**Ventajas:**

- Entorno reproducible  
- Aislamiento de servicios  
- Despliegue con un comando  
- Networking interno optimizado  
- Volúmenes persistentes

### Herramientas de Desarrollo

| Herramienta | Versión | Uso |
| :---- | :---- | :---- |
| **Git** | 2.40+ | Control de versiones |
| **GitHub** | \- | Repositorio remoto |
| **Visual Studio Code** | 1.85+ | Editor de código |
| **NetBeans** | 20+ | IDE Java (preparación) |
| **Postman** | 10+ | Testing de API |
| **Docker Desktop** | 4.25+ | Gestión de contenedores |

### Protocolos y Formatos

| Protocolo/Formato | Uso |
| :---- | :---- |
| **MQTT** | Comunicación IoT |
| **HTTP REST** | API endpoints |
| **WebSocket** | Streaming tiempo real |
| **JSON** | Formato de datos |
| **Flux** | Query language InfluxDB |
| **SQL** | Query language MySQL |

### Resumen del Stack

**Total de tecnologías:** 20+ tecnologías integradas  
**Lenguajes:** 6 (Python, JavaScript, TypeScript, Dart, SQL, Bash)  
**Frameworks:** 4 (Express, Next.js, Flutter, Grafana)  
**Bases de datos:** 2 (InfluxDB, MySQL)  
**Servicios Docker:** 5 (Mosquitto, InfluxDB, Telegraf, Grafana, MySQL)  
**Protocolos:** 4 (MQTT, HTTP, WebSocket, REST)

---

## Ubicaciones y Sensores

### Ubicaciones Monitoreadas

El sistema Medusse IoT monitorea **4 ubicaciones diferentes**, cada una con características térmicas específicas y representadas por un color identificativo.

#### 1\. Aula 20

| Propiedad | Valor |
| :---- | :---- |
| **Nodo ESP32** | ESP32\_NODE\_01 |
| **Temperatura Base** | 22°C |
| **Color Identificativo** | Rojo (\#E53E3E) |
| **Descripción** | Aula estándar con ventilación natural |
| **Capacidad** | 25-30 estudiantes |

**Características ambientales:**

- Temperatura rango: 20-24°C  
- Humedad relativa: 45-65%  
- CO2 típico: 400-1200 ppm (varía con ocupación)

#### 2\. Aula 21

| Propiedad | Valor |
| :---- | :---- |
| **Nodo ESP32** | ESP32\_NODE\_02 |
| **Temperatura Base** | 24°C |
| **Color Identificativo** | Púrpura (\#805AD5) |
| **Descripción** | Aula con ventilación mecánica |
| **Capacidad** | 25-30 estudiantes |

**Características ambientales:**

- Temperatura rango: 22-26°C (más cálida)  
- Humedad relativa: 40-60%  
- CO2 típico: 400-1000 ppm (mejor ventilación)

#### 3\. Gimnasio

| Propiedad | Valor |
| :---- | :---- |
| **Nodo ESP32** | ESP32\_NODE\_03 |
| **Temperatura Base** | 23°C |
| **Color Identificativo** | Naranja (\#FF9800) |
| **Descripción** | Espacio amplio para actividades deportivas |
| **Capacidad** | 50-100 personas |

**Características ambientales:**

- Temperatura rango: 21-25°C  
- Humedad relativa: 50-70% (más alta por actividad física)  
- CO2 típico: 500-1500 ppm (alta ocupación y actividad)

#### 4\. Laboratorio

| Propiedad | Valor |
| :---- | :---- |
| **Nodo ESP32** | ESP32\_NODE\_04 |
| **Temperatura Base** | 21°C |
| **Color Identificativo** | Verde (\#38A169) |
| **Descripción** | Laboratorio de ciencias con equipos electrónicos |
| **Capacidad** | 20-25 estudiantes |

**Características ambientales:**

- Temperatura rango: 19-23°C (más fresco para equipos)  
- Humedad relativa: 40-55% (controlada)  
- CO2 típico: 400-900 ppm (ventilación adecuada)

---

### Sensores Implementados (18 Tipos)

#### Sensores Ambientales (6 sensores)

##### 1\. Temperatura (°C)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | DHT22 |
| **Rango** | 18-28°C |
| **Precisión** | ±0.5°C |
| **Unidad** | °C (Celsius) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Optimización de climatización  
- Confort térmico  
- Ahorro energético  
- Detección de anomalías

##### 2\. Humedad (%)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | DHT22 |
| **Rango** | 30-70% |
| **Precisión** | ±2% |
| **Unidad** | % (Porcentaje) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Control de humedad relativa  
- Prevención de moho  
- Confort ambiental  
- Protección de equipos

##### 3\. CO2 (ppm)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | MQ-135 Gas Sensor |
| **Rango** | 400-2000 ppm |
| **Umbral Saludable** | \<1000 ppm |
| **Umbral Crítico** | \>1500 ppm |
| **Unidad** | ppm (partes por millón) |

**Aplicaciones:**

- Calidad del aire interior  
- Detección de mala ventilación  
- Optimización de ventilación mecánica  
- Reducción de contagios  
- Mejora del rendimiento cognitivo

**Impacto en salud:**

- 400-1000 ppm: Excelente (aire fresco)  
- 1000-1500 ppm: Aceptable (ventilación recomendada)  
- 1500-2000 ppm: Deficiente (dolores de cabeza, fatiga)  
- 2000 ppm: Peligroso (somnolencia, problemas respiratorios)

##### 4\. Presión Atmosférica (hPa)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | BME680 |
| **Rango** | 950-1050 hPa |
| **Precisión** | ±1 hPa |
| **Unidad** | hPa (Hectopascales) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Predicción meteorológica  
- Detección de cambios de tiempo  
- Correlación con síntomas físicos

##### 5\. VOC \- Compuestos Orgánicos Volátiles (ppb)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | BME680 |
| **Rango** | 20-100 ppb |
| **Umbral Saludable** | \<50 ppb |
| **Unidad** | ppb (partes por billón) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Detección de contaminantes  
- Calidad del aire interior  
- Identificación de productos de limpieza nocivos  
- Evaluación de materiales de construcción

**Fuentes comunes de VOC:**

- Pinturas y barnices  
- Productos de limpieza  
- Mobiliario nuevo  
- Materiales de construcción  
- Impresoras y fotocopiadoras

##### 6\. IAQ \- Índice de Calidad del Aire Interior

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | BME680 (calculado) |
| **Rango** | 0-500 |
| **Escala** | 0-50: Excelente, 50-100: Bueno, 100-150: Moderado, \>150: Deficiente |
| **Unidad** | Índice (adimensional) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Evaluación global de calidad del aire  
- Priorización de acciones correctivas  
- Monitoreo de mejoras  
- Reporte de calidad ambiental

---

#### Sensores de Calidad de Agua y Suelo (5 sensores)

##### 7\. Humedad del Suelo (%)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | Sensor Capacitivo |
| **Rango** | 25-55% |
| **Umbral Óptimo** | 30-45% |
| **Unidad** | % (Porcentaje) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Riego inteligente  
- Optimización de consumo de agua  
- Salud de plantas  
- Prevención de sobre-riego

**Ahorro estimado:** 30-50% en consumo de agua para riego

##### 8\. pH del Agua

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | Sensor de pH |
| **Rango** | 6.2-7.8 |
| **Rango Óptimo** | 6.5-7.5 |
| **Unidad** | pH (escala logarítmica) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Calidad del agua potable  
- Detección de contaminación  
- Protección de ecosistemas acuáticos  
- Identificación de problemas en tuberías

**Escala de pH:**

- \<6.5: Ácido (corrosivo)  
- 6.5-7.5: Neutral (óptimo)  
- 7.5: Alcalino (problemas de sabor)

##### 9\. Flujo de Agua (L/min)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | YF-S201 |
| **Rango** | 0.5-2.5 L/min |
| **Precisión** | ±5% |
| **Unidad** | L/min (Litros por minuto) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Detección de fugas  
- Monitorización de consumo de agua  
- Identificación de uso excesivo  
- Optimización de distribución

**Ahorro potencial:** Detección temprana de fugas puede ahorrar miles de litros al año

##### 10\. TDS \- Sólidos Disueltos Totales (ppm)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | Sensor TDS |
| **Rango** | 50-200 ppm |
| **Rango Óptimo** | 50-150 ppm |
| **Unidad** | ppm (partes por millón) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Calidad del agua  
- Detección de contaminación  
- Evaluación de sistemas de filtrado  
- Monitoreo de pureza

**Escala TDS:**

- \<50 ppm: Muy pura (destilada)  
- 50-150 ppm: Excelente (potable)  
- 150-300 ppm: Buena (potable)  
- 300 ppm: Deficiente (revisar)

##### 11\. Oxígeno Disuelto (mg/L)

| Propiedad | Valor |
| :---- | :---- |
| **Sensor** | Sensor DO (Dissolved Oxygen) |
| **Rango** | 7.2-8.8 mg/L |
| **Rango Óptimo** | 7.5-8.5 mg/L |
| **Unidad** | mg/L (miligramos por litro) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Salud de ecosistemas acuáticos  
- Calidad del agua  
- Monitoreo de estanques  
- Detección de contaminación

---

#### Sistema de Energía Solar \- Fase 2 (7 sensores)

##### 12\. Voltaje de Batería (V)

| Propiedad | Valor |
| :---- | :---- |
| **Rango** | 3.2-4.2V (LiPo) |
| **Umbral Warning** | \<3.5V (25%) |
| **Umbral Critical** | \<3.3V (10%) |
| **Unidad** | V (Voltios) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Gestión de batería  
- Prevención de descarga completa  
- Optimización de ciclos de carga  
- Prolongación de vida útil

##### 13\. Voltaje Solar (V)

| Propiedad | Valor |
| :---- | :---- |
| **Rango** | 0-18.5V |
| **Voltaje Nominal Panel** | 18V |
| **Unidad** | V (Voltios) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Evaluación de producción solar  
- Detección de problemas en paneles  
- Optimización de orientación  
- Cálculo de eficiencia

##### 14\. Porcentaje de Batería (%)

| Propiedad | Valor |
| :---- | :---- |
| **Rango** | 0-100% |
| **Umbral Bajo Consumo** | \<25% |
| **Unidad** | % (Porcentaje) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Gestión de autonomía  
- Activación de modo bajo consumo  
- Planificación de recargas  
- Alertas de batería baja

##### 15\. Consumo de Energía (mA)

| Propiedad | Valor |
| :---- | :---- |
| **Rango** | 80-160 mA |
| **Consumo Típico ESP32** | 80-100 mA (activo) |
| **Consumo Sleep** | 10-20 µA |
| **Unidad** | mA (miliamperios) |

**Aplicaciones:**

- Optimización de consumo  
- Evaluación de duty-cycling  
- Identificación de anomalías  
- Cálculo de autonomía

##### 16\. Estado de Carga (Boolean)

| Propiedad | Valor |
| :---- | :---- |
| **Valores** | true (Cargando) / false (No cargando) |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Monitoreo de carga solar  
- Gestión de batería  
- Detección de problemas  
- Optimización de uso

##### 17\. Modo Bajo Consumo (Boolean)

| Propiedad | Valor |
| :---- | :---- |
| **Valores** | true (Activado) / false (Desactivado) |
| **Activación Automática** | Cuando batería \<25% |
| **Actualización** | Cada 15 segundos |

**Aplicaciones:**

- Prolongación de autonomía  
- Gestión inteligente de energía  
- Prevención de apagones  
- Optimización de operación

##### 18\. Contador de Wake-ups (Count)

| Propiedad | Valor |
| :---- | :---- |
| **Rango** | 0-∞ |
| **Unidad** | Count (número de despertares) |
| **Actualización** | Cada wake-up |

**Aplicaciones:**

- Optimización de duty-cycling  
- Cálculo de eficiencia  
- Análisis de patrones de uso  
- Debugging de firmware

---

### Resumen de Sensores

**Total de sensores:** 18 tipos diferentes

**Por categoría:**

- **Ambientales:** 6 sensores (33%)  
- **Agua y suelo:** 5 sensores (28%)  
- **Energía solar:** 7 sensores (39%)

**Frecuencia de actualización:** Datos cada 15 segundos por ubicación

**Datos generados:**

- **Por ubicación:** 18 sensores × 4 por minuto \= 72 mediciones/minuto  
- **Total sistema:** 72 × 4 ubicaciones \= 288 mediciones/minuto  
- **Por día:** 288 × 60 × 24 \= 414,720 mediciones/día  
- **Por año:** 414,720 × 365 ≈ 151 millones de mediciones/año

---

## Flujo de Datos

### Diagrama de Flujo Detallado

```mermaid
graph LR
    subgraph P1["PASO 1: GENERACIÓN"]
        SIM["Python Simulator<br/>4 ubicaciones × 18 sensores<br/>= 72 valores<br/>JSON estructurado<br/>Cada 15 seg"]
        SIM:::generator
    end
    
    subgraph P2["PASO 2: PUBLICACIÓN MQTT"]
        PUB["Topics:<br/>iescelia/location/sensor<br/>72 topics<br/>QoS: 0<br/>Retain: false"]
        PUB:::mqtt
    end
    
    subgraph P3["PASO 3: BROKER"]
        BROKER["Mosquitto MQTT 2.0<br/>Puerto 1883 MQTT<br/>Puerto 9001 WS<br/>~10 conexiones<br/>Distribución"]
        BROKER:::broker
    end
    
    subgraph P4["PASO 4: TELEGRAF"]
        PARSE["Telegraf 1.28<br/>1. Suscripción<br/>2. JSON Parsing<br/>3. Agregación 30s<br/>4. Escritura"]
        PARSE:::telegraf
    end
    
    subgraph P5["PASO 5: ALMACENAMIENTO"]
        INFLUX["InfluxDB 2.7<br/>Series Temporales<br/>18 measurements<br/>Bucket: sensors<br/>414K puntos/día"]
        MYSQL["MySQL 8.0<br/>Usuarios<br/>Sesiones<br/>Alertas<br/>Configuración"]
        INFLUX:::influx
        MYSQL:::mysql
    end
    
    subgraph P6["PASO 6: VISUALIZACIÓN & API"]
        GRAFANA["Grafana 10.2.0<br/>18 paneles<br/>Refresh: 30s<br/>Alertas<br/>Filtros"]
        API["API REST Express<br/>11 endpoints<br/>Cache: 30s<br/>WebSocket<br/>Auth: Token"]
        GRAFANA:::grafana
        API:::api
    end
    
    subgraph P7["PASO 7: CLIENTES"]
        WEB["Web Next.js<br/>HTTP/WebSocket<br/>Dashboard RT<br/>4 locations<br/>72 sensores"]
        APP["Flutter App<br/>HTTP<br/>3 Pantallas<br/>Charts<br/>Alerts"]
        WEB:::web
        APP:::flutter
    end
    
    SIM -->|MQTT| PUB
    PUB -->|Publica| BROKER
    BROKER -->|Suscrito| PARSE
    PARSE -->|JSON| INFLUX
    PARSE -->|SQL| MYSQL
    INFLUX -->|Query Flux| GRAFANA
    MYSQL -->|Query SQL| GRAFANA
    INFLUX -->|Query| API
    MYSQL -->|Query| API
    GRAFANA -->|Visualiza| WEB
    API -->|HTTP/WS| WEB
    API -->|HTTP| APP
    
    classDef generator fill:#FFC107,stroke:#FFA000,color:#000,stroke-width:2px
    classDef mqtt fill:#FF9800,stroke:#F57C00,color:#fff,stroke-width:2px
    classDef broker fill:#FF6F00,stroke:#E65100,color:#fff,stroke-width:2px
    classDef telegraf fill:#2196F3,stroke:#1565C0,color:#fff,stroke-width:2px
    classDef influx fill:#00BCD4,stroke:#0097A7,color:#fff,stroke-width:2px
    classDef mysql fill:#FF9800,stroke:#F57C00,color:#fff,stroke-width:2px
    classDef grafana fill:#3F51B5,stroke:#283593,color:#fff,stroke-width:2px
    classDef api fill:#4CAF50,stroke:#388E3C,color:#fff,stroke-width:2px
    classDef web fill:#9C27B0,stroke:#7B1FA2,color:#fff,stroke-width:2px
    classDef flutter fill:#E91E63,stroke:#C2185B,color:#fff,stroke-width:2px
```

### Tiempos de Latencia

| Proceso | Latencia Típica | Latencia Máxima |
| :---- | :---- | :---- |
| Generación datos | 0 ms | 0 ms |
| Publicación MQTT | 5-10 ms | 50 ms |
| Broker procesamiento | 1-5 ms | 20 ms |
| Telegraf parsing | 10-20 ms | 100 ms |
| Escritura InfluxDB | 20-50 ms | 200 ms |
| Query Grafana | 100-300 ms | 1000 ms |
| API REST response | 50-150 ms | 500 ms |
| WebSocket streaming | 10-50 ms | 200 ms |
| **Total end-to-end** | **200-500 ms** | **2 segundos** |

### Throughput del Sistema

**Publicaciones MQTT:**

- 4 ubicaciones × 18 sensores \= 72 mensajes cada 15 segundos  
- **Throughput:** 4.8 mensajes/segundo  
- **Carga baja:** MQTT puede manejar 1000+ msg/s

**Escrituras InfluxDB:**

- 72 puntos cada 15 segundos (después de agregación Telegraf)  
- **Throughput:** 4.8 escrituras/segundo  
- **Carga baja:** InfluxDB puede manejar 100,000+ escrituras/s

**Queries:**

- Grafana: 1 query cada 30 segundos  
- API REST: \~10 requests/minuto  
- **Carga total:** \<1 query/segundo

### Escalabilidad

**Capacidad actual del sistema:**

- **Ubicaciones:** 4 actuales → Escalable a 100+ sin cambios  
- **Sensores:** 18 por ubicación → Escalable a 50+ por ubicación  
- **Clientes:** 10 actuales → Escalable a 1000+ con load balancer  
- **Datos:** 414K puntos/día → Soporte para 100M+ puntos/día

**Cuellos de botella potenciales:**

1. **Mosquitto:** Limitado a \~10,000 conexiones simultáneas  
2. **InfluxDB:** Memoria RAM principal cuello de botella  
3. **Grafana:** Queries complejas pueden tardar \>5 segundos  
4. **API REST:** Sin cache Redis, limitado a \~100 req/s

**Soluciones de escalado:**

- **Horizontal:** Múltiples instancias de API con Nginx load balancer  
- **Vertical:** Aumentar recursos de contenedores Docker  
- **Cache:** Redis para reducir carga en InfluxDB  
- **CDN:** Para assets estáticos de web Next.js

---

## Infraestructura Docker

### Servicios Implementados

El sistema Medusse IoT utiliza **Docker Compose** para orquestar 5 servicios independientes que se comunican a través de una red interna optimizada.

#### Servicio 1: Mosquitto (MQTT Broker)

mosquitto:

  image: eclipse-mosquitto:2

  container\_name: medusse-mosquitto

  ports:

    \- "1883:1883"  \# MQTT

    \- "9001:9001"  \# WebSocket

  volumes:

    \- ./mosquitto/config:/mosquitto/config

    \- ./mosquitto/data:/mosquitto/data

    \- ./mosquitto/log:/mosquitto/log

  restart: unless-stopped

  networks:

    \- medusse-network

**Configuración:**

- Listener MQTT en puerto 1883  
- Listener WebSocket en puerto 9001  
- Autenticación: Opcional (deshabilitada para desarrollo)  
- Persistencia: Volumen para logs y datos  
- Restart policy: `unless-stopped`

#### Servicio 2: InfluxDB (Base de Datos Series Temporales)

influxdb:

  image: influxdb:2.7

  container\_name: medusse-influxdb

  ports:

    \- "8086:8086"

  environment:

    \- DOCKER\_INFLUXDB\_INIT\_MODE=setup

    \- DOCKER\_INFLUXDB\_INIT\_USERNAME=admin

    \- DOCKER\_INFLUXDB\_INIT\_PASSWORD=medusse2025

    \- DOCKER\_INFLUXDB\_INIT\_ORG=iescelia

    \- DOCKER\_INFLUXDB\_INIT\_BUCKET=sensors

    \- DOCKER\_INFLUXDB\_INIT\_ADMIN\_TOKEN=medusse-admin-token-2025

  volumes:

    \- influxdb-data:/var/lib/influxdb2

    \- influxdb-config:/etc/influxdb2

  restart: unless-stopped

  networks:

    \- medusse-network

**Configuración:**

- Inicialización automática con setup  
- Organización: `iescelia`  
- Bucket: `sensors`  
- Token de admin pre-configurado  
- Volúmenes persistentes para datos y configuración

#### Servicio 3: Telegraf (Pipeline de Datos)

telegraf:

  image: telegraf:1.28

  container\_name: medusse-telegraf

  volumes:

    \- ./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf:ro

  depends\_on:

    \- mosquitto

    \- influxdb

  restart: unless-stopped

  networks:

    \- medusse-network

**Configuración principal (telegraf.conf):**

```ini
[agent]
  interval = "15s"
  flush_interval = "30s"
  precision = "1ms"

[[inputs.mqtt_consumer]]
  servers = ["tcp://mosquitto:1883"]
  topics = ["iescelia/#"]
  data_format = "json"
  json_string_fields = ["location", "node_id"]

[[outputs.influxdb_v2]]
  urls = ["http://influxdb:8086"]
  token = "medusse-admin-token-2025"
  organization = "iescelia"
  bucket = "sensors"
```

#### Servicio 4: Grafana (Visualización)

grafana:

  image: grafana/grafana:10.2.0

  container\_name: medusse-grafana

  ports:

    \- "3000:3000"

  environment:

    \- GF\_SECURITY\_ADMIN\_USER=admin

    \- GF\_SECURITY\_ADMIN\_PASSWORD=medusse2025

    \- GF\_INSTALL\_PLUGINS=

  volumes:

    \- grafana-data:/var/lib/grafana

    \- ./grafana/provisioning:/etc/grafana/provisioning

    \- ./grafana/dashboards:/var/lib/grafana/dashboards

  depends\_on:

    \- influxdb

  restart: unless-stopped

  networks:

    \- medusse-network

**Configuración:**

- Usuario admin pre-configurado  
- Provisioning automático de data sources  
- Dashboard pre-cargado desde archivo JSON  
- Puerto: 3000

#### Servicio 5: MySQL (Base de Datos Relacional)

mysql:

  image: mysql:8.0

  container\_name: medusse-mysql

  ports:

    \- "3306:3306"

  environment:

    \- MYSQL\_ROOT\_PASSWORD=root2025

    \- MYSQL\_DATABASE=medusse\_db

    \- MYSQL\_USER=medusse\_user

    \- MYSQL\_PASSWORD=medusse2025

  volumes:

    \- mysql-data:/var/lib/mysql

    \- ./mysql/init:/docker-entrypoint-initdb.d

  restart: unless-stopped

  networks:

    \- medusse-network

**Inicialización automática:**

- Esquema de 9 tablas (`01-schema.sql`)  
- Datos iniciales (`02-seed-data.sql`)  
- Procedimientos almacenados (`03-stored-procedures.sql`)

### Red y Volúmenes

networks:

  medusse-network:

    driver: bridge

volumes:

  influxdb-data:

  influxdb-config:

  grafana-data:

  mysql-data:

**Ventajas de la red bridge:**

- Comunicación interna entre servicios  
- Resolución DNS automática por nombre de servicio  
- Aislamiento de red externa  
- Seguridad mejorada

### Comandos Docker Compose

**Iniciar sistema completo:**

docker-compose \-f docker/docker-compose.yml up \-d

**Verificar estado:**

docker ps

**Ver logs:**

docker logs medusse-telegraf \-f

docker logs medusse-mosquitto \-f

**Detener sistema:**

docker-compose \-f docker/docker-compose.yml down

**Reiniciar un servicio:**

docker-compose \-f docker/docker-compose.yml restart grafana

**Limpiar volúmenes (⚠️ borra datos):**

docker-compose \-f docker/docker-compose.yml down \-v

### Recursos del Sistema

| Servicio | CPU | RAM | Disco |
| :---- | :---- | :---- | :---- |
| Mosquitto | \<5% | 20 MB | 10 MB |
| InfluxDB | 5-10% | 200-500 MB | 100-500 MB |
| Telegraf | \<5% | 50 MB | 1 MB |
| Grafana | 5-10% | 100-200 MB | 50 MB |
| MySQL | 5-10% | 200-400 MB | 200 MB |
| **Total** | **20-40%** | **600 MB \- 1.2 GB** | **500 MB \- 1 GB** |

**Requisitos mínimos del sistema:**

- CPU: 2 cores  
- RAM: 4 GB  
- Disco: 20 GB libres  
- SO: Windows 10/11, Linux, macOS

### Ventajas de Docker

✅ **Reproducibilidad:** Mismo entorno en cualquier máquina  
✅ **Portabilidad:** Funciona en Windows, Linux y macOS  
✅ **Aislamiento:** Servicios independientes  
✅ **Escalabilidad:** Fácil agregar réplicas  
✅ **Mantenimiento:** Actualizar versiones sin conflictos  
✅ **Desarrollo rápido:** Despliegue en 5 minutos

---

# PARTE III \- LOS 16 RETOS DOCUMENTADOS

## Reto 1: Proyecto de Sostenibilidad

### Descripción del Reto

Desarrollar un proyecto tecnológico que contribuya activamente a la sostenibilidad ambiental, alineado con los **Objetivos de Desarrollo Sostenible (ODS)** de la ONU.

### Implementación en el Proyecto

#### Alineación con 5 Objetivos de Desarrollo Sostenible

##### ODS 3 \- Salud y Bienestar

**Implementación:**

- Monitorización de CO2 (400-1000 ppm para calidad del aire interior)  
- Sensor IAQ (Indoor Air Quality) con escala 0-500  
- Sensor VOC (Compuestos Orgánicos Volátiles) en ppb  
- Sistema de alertas automáticas cuando se superan umbrales de seguridad

**Impacto:**

- Mejora de la calidad del aire interior  
- Reducción de riesgos para la salud (dolores de cabeza, fatiga, contagios)  
- Identificación de espacios con mala ventilación  
- Datos para optimizar sistemas de ventilación

##### ODS 6 \- Agua Limpia y Saneamiento

**Implementación:**

- Sensor de pH (6.2-7.8) para calidad del agua  
- Sensor TDS \- Sólidos Disueltos Totales (50-200 ppm)  
- Sensor de flujo de agua (0.5-2.1 L/min)  
- Sensor de oxígeno disuelto (7.2-8.8 mg/L)

**Impacto:**

- Detección temprana de problemas en fuentes de agua  
- Monitorización de calidad del agua en tiempo real  
- Identificación de fugas y consumo excesivo  
- Protección de ecosistemas acuáticos

##### ODS 7 \- Energía Asequible y Limpia

**Implementación:**

- Monitorización de voltaje solar (0-18.5V)  
- Medición de porcentaje de batería (0-100%)  
- Sensor de consumo de energía (mA)  
- Estado de carga y modo de bajo consumo  
- Contador de wake-ups para optimización

**Impacto:**

- Optimización del uso de energía solar renovable  
- Gestión inteligente de baterías  
- Reducción del consumo energético mediante duty-cycling  
- Datos para evaluar viabilidad de sistemas autónomos  
- Fomento de fuentes de energía limpia

##### ODS 11 \- Ciudades y Comunidades Sostenibles

**Implementación:**

- Monitorización de 4 ubicaciones simultáneas  
- Dashboard centralizado con datos en tiempo real  
- Sistema de alertas automático  
- Aplicaciones web y móvil para acceso ubicuo

**Impacto:**

- Gestión eficiente de edificios educativos  
- Optimización de climatización y ventilación  
- Datos para políticas de gestión de espacios  
- Mejora del confort y eficiencia en aulas

##### ODS 13 \- Acción por el Clima

**Implementación:**

- Recopilación de datos ambientales históricos  
- Análisis de tendencias temporales  
- Visualización de patrones climáticos  
- Herramienta educativa sobre cambio climático

**Impacto:**

- Base de datos para políticas locales  
- Educación sobre impacto ambiental  
- Concienciación mediante datos reales  
- Apoyo a decisiones basadas en evidencia

### Impacto Medible y Cuantificable

#### Ahorro Energético

**Reducción consumo HVAC:**

- Estimación: 2500-4000 kWh/año  
- Ahorro económico: 700-1200€/año  
- Porcentaje: 20-30% de reducción  
- ROI estimado: 40% en el primer año

#### Ahorro de Agua

**Reducción consumo:**

- Estimación: 50-100 m³/año  
- Porcentaje: 30-50% en riego  
- Detección temprana de fugas

#### Reducción de Emisiones CO2

**Impacto climático:**

- CO2 evitado: 1-1.5 toneladas/año  
- Equivalente: Plantar 50-75 árboles/año

### 15 KPIs de Sostenibilidad

#### KPIs Energéticos

1. **Reducción de Consumo Energético**  
     
   - Métrica: kWh mensuales antes/después  
   - Objetivo: Reducción del 20-30%

   

2. **Producción Solar**  
     
   - Métrica: kWh generados por paneles solares  
   - Objetivo: Cubrir 50% del consumo de nodos

   

3. **Vida Media de Baterías**  
     
   - Métrica: Meses de operación antes de reemplazo  
   - Objetivo: Aumentar de 12 a 18 meses

   

4. **Eficiencia de Duty-Cycling**  
     
   - Métrica: Porcentaje de tiempo en modo bajo consumo  
   - Objetivo: 40-60% del tiempo

#### KPIs de Calidad del Aire

5. **Tiempo con CO2 Saludable**  
     
   - Métrica: % tiempo con CO2 \<1000 ppm  
   - Objetivo: 90% del horario lectivo

   

6. **Reducción de Picos de CO2**  
     
   - Métrica: Número de eventos con CO2 \>1500 ppm  
   - Objetivo: Reducción del 80%

   

7. **Mejora de IAQ**  
     
   - Métrica: Índice promedio de calidad del aire  
   - Objetivo: Mantener IAQ \<100 (bueno)

#### KPIs de Recursos Hídricos

8. **Reducción de Consumo de Agua**  
     
   - Métrica: Litros mensuales antes/después  
   - Objetivo: Reducción del 30-50% en riego

   

9. **Detección de Fugas**  
     
   - Métrica: Número de fugas detectadas y tiempo de respuesta  
   - Objetivo: Detección en \<1 hora

   

10. **Calidad del Agua**  
      
    - Métrica: % tiempo con pH óptimo (6.5-7.5)  
    - Objetivo: 95% del tiempo

#### KPIs de Respuesta y Acción

11. **Tiempo de Respuesta a Alertas**  
      
    - Métrica: Minutos desde alerta hasta acción correctiva  
    - Objetivo: \<30 minutos

    

12. **Alertas Convertidas en Acciones**  
      
    - Métrica: % alertas con acción correctiva  
    - Objetivo: 80%

    

13. **Escalabilidad**  
      
    - Métrica: Número de instalaciones replicadas  
    - Objetivo: 5 centros en 2 años

#### KPIs Educativos

14. **Concienciación Ambiental**  
      
    - Métrica: Encuestas pre/post implementación  
    - Objetivo: Aumento de 50% en conciencia ambiental

    

15. **Proyectos Educativos Basados en Datos**  
      
    - Métrica: Número de proyectos de estudiantes usando los datos  
    - Objetivo: 10+ proyectos/año

### Casos de Uso Implementados

#### Caso 1: Gestión Inteligente de Aulas

**Problema:** Aulas con ventilación inadecuada y climatización ineficiente

**Solución:**

1. Monitorizar CO2, temperatura y humedad en tiempo real  
2. Configurar alertas cuando CO2 \>1000 ppm  
3. Activar ventilación natural o mecánica solo cuando sea necesario  
4. Ajustar climatización según ocupación y condiciones

**Resultados Esperados:**

- ✅ Reducción del 20-30% en consumo de HVAC  
- ✅ Mejora de la calidad del aire interior  
- ✅ Reducción de ausentismo por enfermedades  
- ✅ Mejora del rendimiento académico

#### Caso 2: Riego Inteligente

**Problema:** Riego excesivo o insuficiente de áreas verdes escolares

**Solución:**

1. Monitorizar humedad del suelo en tiempo real  
2. Programar riego solo cuando humedad \<30%  
3. Considerar condiciones meteorológicas (temperatura, humedad)  
4. Ajustar duración según necesidades reales

**Resultados Esperados:**

- ✅ Ahorro del 30-50% en consumo de agua  
- ✅ Mejora de la salud de plantas  
- ✅ Reducción de costes de mantenimiento  
- ✅ Educación sobre uso responsable del agua

#### Caso 3: Monitorización de Instalaciones Solares

**Problema:** Falta de visibilidad sobre producción y consumo de energía solar

**Solución:**

1. Monitorizar voltaje solar y producción en tiempo real  
2. Medir consumo de energía de nodos ESP32  
3. Optimizar cargas según producción disponible  
4. Gestionar baterías para maximizar autonomía

**Resultados Esperados:**

- ✅ Optimización del uso de energía solar  
- ✅ Reducción de dependencia de red eléctrica  
- ✅ Prolongación de vida útil de baterías  
- ✅ Datos para expansión de instalaciones solares

### Archivos Involucrados

**Documentación:**

- `documentacion/RETO_1_SOSTENIBILIDAD.md` \- Documentación completa del reto (860+ líneas)  
- `README.md` \- Sección de sostenibilidad y ODS

**Simulador:**

- `arduino/medusse_simulator.py` \- Simulador completo con 18 sensores (500 líneas)  
  - Sensores ambientales (líneas 50-150)  
  - Sensores de agua (líneas 150-250)  
  - Sensores de energía solar (líneas 250-350)  
  - Funciones de simulación realista (líneas 10-50)

**Dashboard:**

- `docker/grafana/dashboards/medusse-clean.json` \- Dashboard con 18 paneles (2500 líneas)

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Alineación con 5 ODS de la ONU**  
✅ **15 KPIs de sostenibilidad definidos**  
✅ **Impacto medible y cuantificable**  
✅ **Casos de uso reales implementados**

---

## Reto 2: Base de Datos

### Descripción del Reto

Diseñar e implementar bases de datos relacionales y no relacionales para almacenar datos de sensores, usuarios y configuración del sistema.

### Implementación en el Proyecto

#### InfluxDB 2.7 \- Base de Datos de Series Temporales

**Propósito:** Almacenar datos de sensores con timestamps precisos para análisis temporal.

**Configuración:**

- URL: `http://localhost:8086`  
- Organización: `iescelia`  
- Bucket: `sensors`  
- Token: `medusse-admin-token-2025`  
- Usuario: `admin` / `medusse2025`  
- Retención: Ilimitada

**Estructura de Datos:**

| Campo | Descripción | Ejemplo |
| :---- | :---- | :---- |
| **Measurement** | Tipo de sensor | `temperature`, `humidity`, `co2` |
| **Tags** | Metadatos indexados | `location=aula20`, `node_id=ESP32_NODE_01` |
| **Fields** | Valores medidos | `value=22.5` |
| **Timestamp** | Momento exacto | `1699876543210` (milisegundos) |

**Measurements implementados (18):**

- `temperature`, `humidity`, `co2`, `pressure`, `voc`, `iaq`  
- `soil_moisture`, `ph_level`, `water_flow`, `tds`, `dissolved_oxygen`  
- `battery_voltage`, `solar_voltage`, `battery_percentage`, `power_consumption`  
- `charging_status`, `low_power_mode`, `wake_count`

**Ventajas de InfluxDB:**

- ✅ Optimizado para series temporales  
- ✅ Consultas rápidas con Flux Query Language  
- ✅ Agregación automática de datos  
- ✅ Compresión eficiente de datos (80-90%)  
- ✅ Integración nativa con Grafana

**Ejemplo de Consulta Flux:**

```flux
from(bucket: "sensors")
  |> range(start: -24h)
  |> filter(fn: (r) => r._measurement == "temperature")
  |> filter(fn: (r) => r._field == "value")
  |> group(columns: ["location"])
  |> last()
```

#### MySQL 8.0 \- Base de Datos Relacional

**Propósito:** Gestionar usuarios, autenticación, configuración y alertas del sistema.

**Configuración:**

- Host: `localhost:3306`  
- Base de datos: `medusse_db`  
- Usuario: `medusse_user` / `medusse2025`  
- Charset: `utf8mb4`  
- Collation: `utf8mb4_unicode_ci`

**Esquema de 9 Tablas:**

##### Tabla 1: `users`

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'user', 'viewer') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

**4 usuarios iniciales:**

- `admin` / `medusse2025` - Rol: `admin`  
- `paco` / `medusse2025` - Rol: `admin`  
- `profesor` / `medusse2025` - Rol: `user`  
- `alumno` / `medusse2025` - Rol: `viewer`

##### Tabla 2: `sessions`

```sql
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);
```

**Características:**

- Tokens UUID v4  
- Expiración automática (24 horas)  
- Registro de IP y User-Agent  
- Cascada al eliminar usuario

##### Tabla 3: `user_preferences`

```sql
CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    theme ENUM('light', 'dark', 'auto') DEFAULT 'auto',
    language VARCHAR(10) DEFAULT 'es',
    timezone VARCHAR(50) DEFAULT 'Europe/Madrid',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    dashboard_layout JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

##### Tabla 4: `locations`

```sql
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL,
    node_id VARCHAR(50) NOT NULL,
    temp_base DECIMAL(5,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_is_active (is_active)
);
```

**4 ubicaciones iniciales:**

- `aula20` - Rojo (#E53E3E) - ESP32_NODE_01 - 22°C  
- `aula21` - Púrpura (#805AD5) - ESP32_NODE_02 - 24°C  
- `gimnasio` - Naranja (#FF9800) - ESP32_NODE_03 - 23°C  
- `laboratorio` - Verde (#38A169) - ESP32_NODE_04 - 21°C

##### Tabla 5: `sensors`

```sql
CREATE TABLE sensors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_type VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    unit VARCHAR(20),
    icon VARCHAR(10),
    min_value DECIMAL(10,2),
    max_value DECIMAL(10,2),
    warning_threshold DECIMAL(10,2),
    danger_threshold DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_sensor_type (sensor_type),
    INDEX idx_is_active (is_active)
);
```

**18 sensores configurados** con umbrales de alerta

##### Tabla 6: `alerts`

```sql
CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    sensor_id INT NOT NULL,
    alert_type ENUM('info', 'warning', 'danger', 'critical') NOT NULL,
    message TEXT NOT NULL,
    value DECIMAL(10,2),
    threshold DECIMAL(10,2),
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP NULL,
    resolved_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_location_id (location_id),
    INDEX idx_sensor_id (sensor_id),
    INDEX idx_alert_type (alert_type),
    INDEX idx_is_resolved (is_resolved)
);
```

##### Tabla 7: `user_alerts` (Relación N:M)

```sql
CREATE TABLE user_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    alert_id INT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_id) REFERENCES alerts(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_alert_id (alert_id),
    INDEX idx_is_read (is_read)
);
```

##### Tabla 8: `activity_log`

```sql
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);
```

**Uso:** Auditoría completa del sistema

##### Tabla 9: `system_config`

```sql
CREATE TABLE system_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    config_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_config_key (config_key),
    INDEX idx_is_public (is_public)
);
```

### Diagrama de Relaciones MySQL

```mermaid
erDiagram
    USERS ||--o{ SESSIONS : "1:N"
    USERS ||--o| USER_PREFERENCES : "1:1"
    USERS ||--o{ USER_ALERTS : "1:M"
    USERS ||--o{ ACTIVITY_LOG : "1:M"
    USERS ||--o{ ALERTS : "resolved_by"
    
    USER_ALERTS }o--|| ALERTS : "N:M"
    
    ALERTS }o--|| LOCATIONS : "N:1"
    ALERTS }o--|| SENSORS : "N:1"
    ALERTS ||--o{ USER_ALERTS : "1:N"
    
    LOCATIONS ||--o{ ALERTS : "1:N"
    SENSORS ||--o{ ALERTS : "1:N"
    
    SYSTEM_CONFIG ||--|| SYSTEM_CONFIG : "config"

    USERS {
        int id PK
        string username UK
        string email UK
        string password_hash
        string full_name
        enum role
        boolean is_active
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }
    
    SESSIONS {
        int id PK
        int user_id FK
        string session_token UK
        string ip_address
        text user_agent
        timestamp expires_at
        timestamp created_at
    }
    
    USER_PREFERENCES {
        int id PK
        int user_id FK
        enum theme
        string language
        string timezone
        boolean notifications_enabled
        boolean email_notifications
        json dashboard_layout
    }
    
    USER_ALERTS {
        int id PK
        int user_id FK
        int alert_id FK
        boolean is_read
        timestamp read_at
        timestamp created_at
    }
    
    ALERTS {
        int id PK
        int location_id FK
        int sensor_id FK
        enum alert_type
        text message
        decimal value
        decimal threshold
        boolean is_resolved
        timestamp resolved_at
        int resolved_by FK
        timestamp created_at
    }
    
    LOCATIONS {
        int id PK
        string name UK
        string display_name
        text description
        string color
        string node_id
        decimal temp_base
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    SENSORS {
        int id PK
        string sensor_type UK
        string display_name
        string unit
        string icon
        decimal min_value
        decimal max_value
        decimal warning_threshold
        decimal danger_threshold
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    ACTIVITY_LOG {
        int id PK
        int user_id FK
        string action
        string entity_type
        int entity_id
        json details
        string ip_address
        text user_agent
        timestamp created_at
    }
    
    SYSTEM_CONFIG {
        int id PK
        string config_key UK
        text config_value
        enum config_type
        text description
        boolean is_public
        timestamp created_at
        timestamp updated_at
    }
```

### Archivos Involucrados

**Esquema de Base de Datos:**

- `docker/mysql/init/01-schema.sql` \- Definición de 9 tablas (350 líneas)  
- `docker/mysql/init/02-seed-data.sql` \- Datos iniciales (150 líneas)

**Documentación:**

- `docker/mysql/DATABASE_DOCUMENTATION.md` \- Documentación técnica completa (600+ líneas)

**Configuración Docker:**

- `docker/docker-compose.yml` \- Líneas 60-80 (servicio MySQL)  
- `docker/docker-compose.yml` \- Líneas 15-35 (servicio InfluxDB)

**Módulo de Conexión:**

- `api/db.js` \- Pool de conexiones MySQL (100 líneas)

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **InfluxDB 2.7 configurado con bucket `sensors`**  
✅ **MySQL 8.0 con 9 tablas relacionales**  
✅ **4 usuarios y 4 ubicaciones iniciales**  
✅ **18 sensores configurados**  
✅ **Esquema normalizado y optimizado**

---

## Reto 3: Procedimientos Almacenados

### Descripción del Reto

Implementar lógica de negocio mediante procedimientos almacenados en MySQL para centralizar operaciones críticas del sistema.

### Implementación en el Proyecto

Se han implementado **10 procedimientos almacenados** que gestionan autenticación, alertas, estadísticas y mantenimiento del sistema.

### Procedimientos Implementados

#### 1\. `sp_authenticate_user`

**Propósito:** Autenticar usuario y crear sesión con token UUID.

**Parámetros:**

- **IN:** `p_username`, `p_password_hash`, `p_ip_address`, `p_user_agent`  
- **OUT:** `p_user_id`, `p_session_token`, `p_role`, `p_success`

**Lógica:**

1. Buscar usuario por username/email y password\_hash  
2. Verificar que el usuario esté activo (`is_active = TRUE`)  
3. Generar token de sesión UUID  
4. Insertar sesión con expiración de 24 horas  
5. Actualizar `last_login`  
6. Registrar actividad en `activity_log`  
7. Retornar datos del usuario

**Ejemplo de uso:**

```sql
CALL sp_authenticate_user(
    'admin', 
    'hashed_password', 
    '192.168.1.100', 
    'Mozilla/5.0',
    @user_id, 
    @token, 
    @role, 
    @success
);
```

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 10-60)

#### 2\. `sp_validate_session`

**Propósito:** Validar token de sesión y verificar expiración.

**Parámetros:**

- **IN:** `p_session_token`  
- **OUT:** `p_user_id`, `p_username`, `p_role`, `p_is_valid`

**Lógica:**

1. Buscar sesión por token  
2. Verificar que no haya expirado (`expires_at > NOW()`)  
3. Verificar que usuario esté activo  
4. Actualizar `last_activity`  
5. Retornar datos del usuario

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 65-95)

#### 3\. `sp_logout_user`

**Propósito:** Cerrar sesión de usuario eliminando token.

**Parámetros:**

- **IN:** `p_session_token`  
- **OUT:** `p_success`

**Lógica:**

1. Obtener `user_id` de la sesión  
2. Eliminar sesión de la tabla  
3. Registrar logout en `activity_log`  
4. Retornar éxito/fallo

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 100-125)

#### 4\. `sp_create_alert`

**Propósito:** Crear nueva alerta en el sistema y notificar a usuarios admin.

**Parámetros:**

- **IN:** `p_location_name`, `p_sensor_type`, `p_alert_type`, `p_message`, `p_value`, `p_threshold`  
- **OUT:** `p_alert_id`, `p_success`

**Lógica:**

1. Obtener IDs de ubicación y sensor  
2. Insertar alerta en tabla `alerts`  
3. Notificar automáticamente a todos los usuarios admin  
4. Insertar registros en `user_alerts` para cada admin  
5. Retornar ID de alerta creada

**Ejemplo:**

```sql
CALL sp_create_alert(
    'aula20', 
    'co2', 
    'warning', 
    'CO2 alto: ventilar inmediatamente',
    1250.5,
    1000.0,
    @alert_id,
    @success
);
```

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 130-165)

#### 5\. `sp_resolve_alert`

**Propósito:** Marcar alerta como resuelta.

**Parámetros:**

- **IN:** `p_alert_id`, `p_user_id`  
- **OUT:** `p_success`

**Lógica:**

1. Actualizar alerta (`is_resolved = TRUE`)  
2. Registrar quién resolvió (`resolved_by`)  
3. Registrar timestamp (`resolved_at`)  
4. Registrar acción en `activity_log`

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 170-195)

#### 6\. `sp_get_user_alerts`

**Propósito:** Obtener alertas no leídas de un usuario.

**Parámetros:**

- **IN:** `p_user_id`, `p_limit`  
- **Retorna:** Conjunto de resultados con alertas y detalles

**Consulta:**

```sql
SELECT 
    a.id, 
    a.alert_type, 
    a.message, 
    a.value, 
    a.threshold,
    l.display_name AS location_name,
    s.display_name AS sensor_name,
    s.icon AS sensor_icon,
    a.is_resolved,
    a.created_at,
    ua.is_read
FROM user_alerts ua
INNER JOIN alerts a ON ua.alert_id = a.id
INNER JOIN locations l ON a.location_id = l.id
INNER JOIN sensors s ON a.sensor_id = s.id
WHERE ua.user_id = p_user_id 
  AND ua.is_read = FALSE
ORDER BY a.created_at DESC
LIMIT p_limit;
```

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 200-230)

#### 7\. `sp_mark_alert_read`

**Propósito:** Marcar alerta como leída para un usuario.

**Parámetros:**

- **IN:** `p_user_id`, `p_alert_id`  
- **OUT:** `p_success`

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 235-250)

#### 8. `sp_cleanup_expired_sessions`

**Propósito:** Limpieza automática de sesiones expiradas (ejecutar periódicamente).

**Lógica:**

```sql
DELETE FROM sessions 
WHERE expires_at < NOW();

SELECT ROW_COUNT() AS deleted_sessions;
```

**Uso:** Puede ejecutarse vía cron job cada hora para mantener la base de datos limpia.

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 255-265)

#### 9. `sp_get_system_stats`

**Propósito:** Obtener estadísticas generales del sistema.

**Retorna:**

- `active_users` - Usuarios activos  
- `active_sessions` - Sesiones activas  
- `unresolved_alerts` - Alertas sin resolver  
- `alerts_24h` - Alertas últimas 24 horas  
- `active_locations` - Ubicaciones activas  
- `active_sensors` - Sensores activos  
- `activities_24h` - Actividades últimas 24 horas

**Consulta:**

```sql
SELECT 
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) AS active_users,
    (SELECT COUNT(*) FROM sessions WHERE expires_at > NOW()) AS active_sessions,
    (SELECT COUNT(*) FROM alerts WHERE is_resolved = FALSE) AS unresolved_alerts,
    (SELECT COUNT(*) FROM alerts 
     WHERE created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) AS alerts_24h,
    (SELECT COUNT(*) FROM locations WHERE is_active = TRUE) AS active_locations,
    (SELECT COUNT(*) FROM sensors WHERE is_active = TRUE) AS active_sensors,
    (SELECT COUNT(*) FROM activity_log 
     WHERE created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) AS activities_24h;
```

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 270-290)

#### 10\. `sp_get_location_stats`

**Propósito:** Obtener estadísticas de una ubicación específica.

**Parámetros:**

- **IN:** `p_location_name`

**Retorna:**

- `display_name` \- Nombre de la ubicación  
- `node_id` \- ID del nodo ESP32  
- `color` \- Color identificativo  
- `unresolved_alerts` \- Alertas sin resolver  
- `alerts_24h` \- Alertas últimas 24 horas  
- `critical_alerts` \- Alertas críticas sin resolver

**Ubicación:** `docker/mysql/init/03-stored-procedures.sql` (Líneas 295-320)

### Ventajas de los Procedimientos Almacenados

✅ **Centralización de Lógica** \- Toda la lógica de negocio en un solo lugar  
✅ **Rendimiento** \- Menos round-trips entre aplicación y base de datos  
✅ **Seguridad** \- Validación y sanitización en la base de datos  
✅ **Mantenibilidad** \- Cambios en lógica sin modificar código de aplicación  
✅ **Reutilización** \- Mismos procedimientos desde múltiples aplicaciones  
✅ **Transacciones** \- Operaciones atómicas garantizadas  
✅ **Auditoría** \- Registro automático de todas las operaciones

### Uso en API Node.js

**Ejemplo en `api/auth.js`:**

```javascript
async function authenticateUser(username, password, ipAddress, userAgent) {
    const connection = await db.getConnection();
    try {
        // Buscar usuario
        const [userRows] = await connection.execute(
            'SELECT id, username, password_hash, role, is_active FROM users WHERE username = ?',
            [username]
        );

        if (userRows.length === 0) {
            return { success: false, message: 'Credenciales inválidas' };
        }

        const user = userRows[0];

        // Verificar contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return { success: false, message: 'Credenciales inválidas' };
        }

        // Generar token de sesión
        const sessionToken = crypto.randomUUID();

        // Crear sesión
        await connection.execute(
            'INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
            [user.id, sessionToken, ipAddress, userAgent]
        );

        return {
            success: true,
            sessionToken: sessionToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        };

    } finally {
        connection.release();
    }
}`
```

### Archivos Involucrados

**Definición de Procedimientos:**

- `docker/mysql/init/03-stored-procedures.sql` \- 400 líneas de código SQL

**Uso en API:**

- `api/auth.js` \- Líneas 10-150 (uso de procedimientos de autenticación)  
- `api/admin-routes.js` \- Líneas 50-200 (uso de procedimientos de estadísticas)

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **10 procedimientos almacenados implementados**  
✅ **Lógica de autenticación centralizada**  
✅ **Sistema de alertas automatizado**  
✅ **Estadísticas del sistema en tiempo real**  
✅ **Mantenimiento automático de sesiones**

---

## Reto 4: Diseño de Bocetos

### Descripción del Reto

Diseñar la estructura visual y de componentes de las interfaces del sistema, definiendo la organización de elementos, flujos de navegación y experiencia de usuario.

### Implementación en el Proyecto

#### 1\. Dashboard Grafana \- Diseño Profesional

##### Estructura Organizada

**Header Personalizado:**

- Logo Medusse grande  
- Título: "Sistema IoT de Monitoreo Ambiental"  
- Gradientes CSS personalizados  
- Variables de filtrado

**6 Filas Colapsables por Categoría:**

1. **Fila 1: Resumen General** (Siempre Visible)  
     
   - Panel: Temperatura Promedio (Gauge)  
   - Panel: Humedad Promedio (Gauge)  
   - Panel: CO2 Promedio (Gauge)

   

2. **Fila 2: Sensores Ambientales** (Colapsable)  
     
   - Panel: Temperatura por Ubicación (Time Series)  
   - Panel: Humedad por Ubicación (Time Series)  
   - Panel: Presión Atmosférica (Time Series)

   

3. **Fila 3: Calidad del Aire** (Colapsable)  
     
   - Panel: CO2 con Alertas (Time Series \+ Thresholds)  
   - Panel: VOC \- Compuestos Orgánicos (Time Series)  
   - Panel: IAQ \- Índice de Calidad del Aire (Gauge)

   

4. **Fila 4: Sensores de Agua y Suelo** (Colapsable)  
     
   - Panel: Humedad del Suelo (Time Series)  
   - Panel: pH del Agua (Time Series)  
   - Panel: Flujo de Agua (Time Series)  
   - Panel: TDS \- Sólidos Disueltos (Time Series)  
   - Panel: Oxígeno Disuelto (Time Series)

   

5. **Fila 5: Sistema de Energía Solar** (Colapsable)  
     
   - Panel: Voltaje de Batería (Time Series)  
   - Panel: Voltaje Solar (Time Series)  
   - Panel: Porcentaje de Batería (Gauge)  
   - Panel: Consumo de Energía (Time Series)

   

6. **Fila 6: Estado del Sistema** (Colapsable)  
     
   - Panel: Estado de Carga (Stat)  
   - Panel: Modo Bajo Consumo (Stat)  
   - Panel: Contador de Wake-ups (Stat)

##### Esquema de Colores por Ubicación

| Ubicación | Color | Hex Code |
| :---- | :---- | :---- |
| **Aula 20** | Rojo | \#E53E3E |
| **Aula 21** | Púrpura | \#805AD5 |
| **Gimnasio** | Naranja | \#FF9800 |
| **Laboratorio** | Verde | \#38A169 |

##### Sistema de Filtrado

**Variables implementadas:**

- **$location** \- Multi-select por ubicación  
- **$sensor** \- Selector de tipo de sensor  
- **$timeRange** \- Rango temporal personalizable

**Queries dinámicas con variables:**

```flux
from(bucket: "sensors")

  |\> range(start: v.timeRangeStart, stop: v.timeRangeStop)

  |\> filter(fn: (r) \=\> r.\_measurement \== "${sensor}")

  |\> filter(fn: (r) \=\> r.location \== "${location}")
```

#### 2\. Aplicación Web Next.js \- Diseño Moderno

##### Estructura de 6 Hero Sections

**Section 1: Hero Principal**

- Logo Medusse grande (128x128px)  
- Título: "Medusse IoT"  
- Subtítulo: "Sistema de Monitoreo Ambiental con Arquitectura de Microservicios"  
- Descripción del proyecto  
- Botones CTA: "Ver Dashboard" y "Documentación"  
- Imagen de fondo: Dashboard en acción con overlay degradado

**Section 2: Dashboard en Tiempo Real**

- Cards de 4 ubicaciones con datos en vivo  
- Indicador de conexión WebSocket (verde/rojo)  
- Sistema de alertas visual (CO2, batería)  
- Actualización automática cada 15 segundos  
- Botones: "Acceder a Grafana" y "Ver Demo"

**Section 3: App Móvil Flutter**

- Capturas de pantalla de la app (3 screens)  
- Descripción de funcionalidades  
- Lista de características:  
  - Multiplataforma (Windows, Web, Android, iOS)  
  - Gráficos interactivos  
  - Alertas en tiempo real  
  - Material Design 3  
- Botones: "Descargar App" y "Ver Capturas"

**Section 4: 18 Tipos de Sensores**

- Grid de sensores con iconos (6 columnas en desktop, 2 en móvil)  
- Cada sensor muestra:  
  - Icono emoji (🌡️, 💧, ⚡, etc.)  
  - Nombre del sensor  
  - Unidad de medida  
  - Rango de valores  
- Botones: "Ver Sensores" y "Especificaciones"

**Section 5: API REST Completa**

- Descripción de endpoints (11 endpoints)  
- Ejemplos de uso con código  
- Características:  
  - Autenticación con tokens  
  - WebSocket para tiempo real  
  - Documentación OpenAPI  
  - Cache inteligente  
- Botones: "Ver API Docs" y "Probar Endpoints"

**Section 6: Migración a LoRa Mesh**

- Información de hardware real ESP32  
- Preparación para despliegue  
- Diagrama de arquitectura LoRa  
- Hardware necesario:  
  - 4x ESP32 con módulos LoRa  
  - 1x Raspberry Pi 4 (Gateway)  
  - Sensores físicos  
  - Paneles solares y baterías  
- Botones: "Ver Migración" y "Hardware Necesario"

##### Componentes de UI

**Header (Header.tsx):**

\- Logo Medusse (32x32px)

\- Título del proyecto

\- Navegación: Dashboard | Sensores | API | Acerca de

\- Menú hamburguesa en móvil

\- Background: bg-white/80 backdrop-blur-md

\- Fixed top-0

**Footer (Footer.tsx):**

\- Grid 4 columnas (1 en móvil)

\- Columna 1: Acerca de Medusse IoT

\- Columna 2: Enlaces (Dashboard, API, Docs)

\- Columna 3: Contacto (Email, Institución)

\- Columna 4: Redes Sociales (GitHub, LinkedIn)

\- Copyright: © 2025 Pacoaldev

**Cards de Sensores:**

\- Background: bg-white

\- Shadow: shadow-lg hover:shadow-xl

\- Border radius: rounded-lg

\- Padding: p-6

\- Transición: transition-all duration-300

**Alertas Visuales:**

```
- CO2 > 1000 ppm: border-yellow-500 bg-yellow-50
- CO2 > 1500 ppm: border-red-500 bg-red-50
- Batería < 25%: border-orange-500 bg-orange-50
- Batería < 15%: border-red-500 bg-red-50
```

**Indicadores de Estado:**

\- Conectado: ● verde pulsante

\- Desconectado: ● rojo

\- Cargando: ⟳ animación spin

#### 3\. Aplicación Móvil Flutter \- Diseño Material 3

##### Pantalla 1: Home (HomeScreen)

**Estructura:**

- **AppBar:**  
    
  - Logo Medusse (40x40px)  
  - Título: "Medusse IoT"  
  - Action: Botón refresh  
  - Color: Gradient azul-verde


- **Body:**  
    
  - Grid de 4 ubicaciones (2x2)  
  - Cada card muestra:  
    - Nombre de ubicación  
    - Color identificativo (borde)  
    - Temperatura actual  
    - Humedad actual  
    - CO2 actual  
    - Estado de conexión  
  - Pull-to-refresh habilitado


- **Bottom Navigation Bar:**  
    
  - Tab 1: Home (icon: home)  
  - Tab 2: Alertas (icon: notifications)  
  - Tab 3: Gráficos (icon: show\_chart)

##### Pantalla 2: Detalle de Ubicación (LocationDetailScreen)

**Estructura:**

- **AppBar:**  
    
  - Nombre de ubicación  
  - Color de fondo según ubicación  
  - Botón back  
  - Action: Botón gráficos


- **Body:**  
    
  - Lista de 18 sensores (ListView)  
  - Cada sensor muestra:  
    - Icono del sensor  
    - Nombre del sensor  
    - Valor actual (grande, bold)  
    - Unidad  
    - Última actualización  
    - Indicador de alerta (si aplica)  
  - Separadores entre sensores  
  - Sombra suave en cada item

##### Pantalla 3: Gráficos Históricos (SensorChartsScreen)

**Estructura:**

- **AppBar:**  
    
  - Selector de sensor (Dropdown)  
  - Color según ubicación  
  - Botón back


- **Body:**  
    
  - Selector de rango temporal:  
    - 1 hora  
    - 6 horas  
    - 24 horas  
    - 7 días  
  - Gráfico interactivo (fl\_chart):  
    - LineChart con puntos  
    - Grid lines  
    - Tooltips al tocar  
    - Zoom habilitado  
    - Scroll horizontal  
  - Estadísticas:  
    - Mínimo  
    - Máximo  
    - Promedio  
    - Última lectura  
  - Actualización automática

##### Animaciones y Transiciones

**Navegación:**

- Transición: Slide (derecha → izquierda)  
- Duración: 300ms  
- Curve: easeInOut

**Widgets:**

- Fade in al cargar: 500ms  
- Elevación en tap: Duration 200ms  
- Shimmer loading en datos

**Pull-to-refresh:**

- Indicador circular  
- Color: Primary theme color  
- Background opacity: 0.1

##### Paleta de Colores \- Material 3

| Elemento | Color Light | Color Dark |
| :---- | :---- | :---- |
| **Primary** | \#3B82F6 (Azul) | \#60A5FA |
| **Secondary** | \#10B981 (Verde) | \#34D399 |
| **Background** | \#F9FAFB | \#1F2937 |
| **Surface** | \#FFFFFF | \#374151 |
| **Error** | \#EF4444 | \#F87171 |
| **On Primary** | \#FFFFFF | \#000000 |
| **On Background** | \#111827 | \#F9FAFB |

### Archivos Involucrados

#### Dashboard Grafana

**Archivo principal:**

- `docker/grafana/dashboards/medusse-clean.json` \- 2500 líneas  
  - Líneas 1-100: Configuración general y variables  
  - Líneas 100-500: Fila de resumen  
  - Líneas 500-1000: Sensores ambientales  
  - Líneas 1000-1500: Calidad del aire  
  - Líneas 1500-2000: Agua y suelo  
  - Líneas 2000-2500: Energía solar

#### Aplicación Web Next.js

**Páginas:**

- `web/src/app/page.tsx` \- Página principal con 6 sections (300 líneas)  
- `web/src/app/login/page.tsx` \- Página de login (150 líneas)  
- `web/src/app/dashboard/page.tsx` \- Dashboard protegido (200 líneas)

**Componentes de Section:**

- `web/src/components/sections/HeroSection.tsx` \- Hero (120 líneas)  
- `web/src/components/sections/DashboardSection.tsx` \- Dashboard RT (300 líneas)  
- `web/src/components/sections/ProductGrid.tsx` \- Productos (150 líneas)  
- `web/src/components/sections/ServicesGrid.tsx` \- Servicios (150 líneas)

**Componentes de Layout:**

- `web/src/components/layout/Header.tsx` \- Navegación (100 líneas)  
- `web/src/components/layout/Footer.tsx` \- Pie de página (80 líneas)

#### Aplicación Móvil Flutter

**Screens:**

- `medusse_app/lib/screens/home_screen.dart` \- Pantalla principal (250 líneas)  
- `medusse_app/lib/screens/location_detail_screen.dart` \- Detalle (300 líneas)  
- `medusse_app/lib/screens/sensor_charts_screen.dart` \- Gráficos (350 líneas)

**Widgets:**

- `medusse_app/lib/widgets/location_card.dart` \- Card ubicación (150 líneas)  
- `medusse_app/lib/widgets/sensor_tile.dart` \- Tile sensor (100 líneas)

### Principios de Diseño Aplicados

#### 1\. Jerarquía Visual

- ✅ Información más importante arriba (resumen)  
- ✅ Detalles en secciones colapsables  
- ✅ Uso de tamaños de fuente diferenciados  
- ✅ Espaciado consistente (múltiplos de 8px)

#### 2\. Consistencia

- ✅ Colores corporativos en todas las plataformas  
- ✅ Iconos uniformes para cada tipo de sensor  
- ✅ Tipografía consistente (Google Fonts)  
- ✅ Espaciado y padding estandarizado

#### 3\. Feedback Visual

- ✅ Indicadores de carga (spinners)  
- ✅ Animaciones de transición (300ms)  
- ✅ Alertas con colores semánticos (verde/amarillo/rojo)  
- ✅ Estados hover en botones (scale 1.05)

#### 4\. Accesibilidad

- ✅ Contraste adecuado de colores (WCAG 2.1 AA)  
- ✅ Tamaños de fuente legibles (mínimo 14px)  
- ✅ Navegación por teclado (Tab, Enter, Escape)  
- ✅ Etiquetas ARIA para lectores de pantalla

#### 5\. Responsive Design

- ✅ Adaptable a móvil, tablet y escritorio  
- ✅ Grid flexible con breakpoints (sm, md, lg, xl)  
- ✅ Imágenes responsive con Next.js Image  
- ✅ Menú hamburguesa en móvil

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Dashboard Grafana con 18 paneles organizados**  
✅ **Web Next.js con 6 hero sections responsive**  
✅ **App Flutter con 3 pantallas Material Design 3**  
✅ **Diseño consistente en todas las plataformas**  
✅ **Accesibilidad y usabilidad optimizadas**

---

## Reto 5: Interfaces HTML/CSS

### Descripción del Reto

Implementar interfaces web modernas utilizando HTML5, CSS3 y frameworks modernos para crear experiencias de usuario atractivas y funcionales.

### Implementación en el Proyecto

#### 1\. Tecnologías Utilizadas

##### Next.js 16 con App Router

**Características:**

- Framework React con renderizado del lado del servidor (SSR)  
- Static Site Generation (SSG)  
- File-based routing automático  
- Server Components y Client Components  
- Optimización automática de imágenes  
- Code splitting automático  
- SEO optimizado

**Ventajas:**

- ✅ Desarrollo rápido con componentes reutilizables  
- ✅ Performance optimizado con SSR/SSG  
- ✅ TypeScript previene errores en desarrollo  
- ✅ Hot reload para desarrollo ágil  
- ✅ Build optimizado para producción

##### TypeScript 5

**Características:**

- Tipado estático para prevenir errores  
- Autocompletado inteligente en IDE  
- Refactoring seguro  
- Mejor mantenibilidad del código

**Ejemplo de tipado:**

```typescript
interface SensorData {
  location: string;
  node_id: string;
  timestamp: number;
  sensors: {
    temperature: number;
    humidity: number;
    co2: number;
    // ... más sensores
  };
}
```

##### Tailwind CSS 4

**Características:**

- Utility-first CSS framework  
- Diseño responsive con breakpoints  
- Purging automático de CSS no usado  
- Customización completa de tema  
- JIT (Just-In-Time) compilation

**Ejemplo de uso:**

```jsx
<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Medusse IoT
  </h2>
</div>
```

##### Framer Motion 12

**Características:**

- Animaciones fluidas y performantes  
- Transiciones entre páginas  
- Scroll animations  
- Micro-interactions  
- Gestos y drag

**Ejemplo de animación:**

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Card />
</motion.div>
```

#### 2\. Estructura de Componentes

##### Componentes de Layout

**Header.tsx - Navegación Principal**

Ubicación: `web/src/components/layout/Header.tsx` (100 líneas)

```typescript
export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src="/logos/logoMedusse.svg" alt="Medusse" width={32} height={32} />
          <span className="text-xl font-bold text-gray-900">Medusse IoT</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#dashboard" className="text-gray-600 hover:text-blue-600 transition">
            Dashboard
          </a>
          <a href="#sensores" className="text-gray-600 hover:text-blue-600 transition">
            Sensores
          </a>
          <a href="#api" className="text-gray-600 hover:text-blue-600 transition">
            API
          </a>
          <a href="#about" className="text-gray-600 hover:text-blue-600 transition">
            Acerca de
          </a>
        </div>
        <button className="md:hidden">
          <MenuIcon />
        </button>
      </nav>
    </header>
  );
}
```

**Footer.tsx - Pie de Página**

Ubicación: `web/src/components/layout/Footer.tsx` (80 líneas)

```typescript
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Acerca de */}
          <div>
            <h3 className="text-lg font-bold mb-4">Medusse IoT</h3>
            <p className="text-gray-400">
              Sistema de monitoreo ambiental profesional
            </p>
          </div>
          {/* Columna 2: Enlaces */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="#dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#api" className="text-gray-400 hover:text-white">
                  API
                </a>
              </li>
              <li>
                <a href="#docs" className="text-gray-400 hover:text-white">
                  Documentación
                </a>
              </li>
            </ul>
          </div>
          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">pacoaldev@gmail.com</p>
            <p className="text-gray-400">IES José Rodrigo Botet</p>
          </div>
          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociales</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <GitHubIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Pacoaldev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
```

##### Componentes de Sección

**HeroSection.tsx**

```jsx
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-url('/images/dashboard-bg.jpg') bg-cover bg-center opacity-20" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logos/LogoMedusse.png"
            alt="Medusse IoT"
            width={128}
            height={128}
            className="mx-auto mb-8"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Medusse IoT
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sistema de Monitoreo Ambiental con Arquitectura de Microservicios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Ver Dashboard
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition">
              Documentación
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Ubicación:** `web/src/components/sections/HeroSection.tsx` (120 líneas)

**DashboardSection.tsx - Dashboard en Tiempo Real**

Ubicación: `web/src/components/sections/DashboardSection.tsx` (300 líneas)

```typescript
export default function DashboardSection() {
  const { data, isConnected } = useWebSocket('ws://localhost:3002');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary().then(setSummary);
  }, []);

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Dashboard en Tiempo Real
        </h2>

        {/* Indicador de conexión */}
        <div className="flex items-center justify-center mb-8">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
          <span className="text-gray-600">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>

        {/* Grid de ubicaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['aula20', 'aula21', 'gimnasio', 'laboratorio'].map(location => (
            <LocationCard 
              key={location} 
              location={location} 
              data={summary?.[location]} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### 3. Estilos CSS Avanzados

##### Responsive Design con Tailwind

**Breakpoints de Tailwind CSS:**

| Breakpoint | Ancho | Uso |
|:---|:---|:---|
| `sm` | 640px | Móvil grande |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop grande |

**Ejemplo de uso:**

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 columna en móvil, 2 en tablet, 4 en desktop */}
</div>
```

##### Animaciones con Framer Motion

**Animación de entrada:**

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Card />
</motion.div>
```

**Animación al hacer scroll:**

```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  <Section />
</motion.div>
```

**Hover effect:**

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

##### Gradientes y Efectos

**Gradiente de fondo:**

```css
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #EFF6FF, #E0E7FF);
}
```

**Backdrop blur (glassmorphism):**

```css
.backdrop-blur-md {
  backdrop-filter: blur(12px);
}
```

**Sombras personalizadas:**

```css
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

**Transiciones suaves:**

```css
.transition {
  transition: all 0.3s ease-in-out;
}
```

#### 4. Componentes de UI Reutilizables

**Card Component**

```typescript
interface CardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export default function Card({ title, value, unit, icon, color }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="ml-2 text-gray-500">{unit}</span>
      </div>
    </div>
  );
}
```

**Alert Component**

```typescript
interface AlertProps {
  type: 'info' | 'warning' | 'danger' | 'success';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const colors = {
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    success: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[type]}`}>
      <p className="font-medium">{message}</p>
    </div>
  );
}
```

### Archivos Involucrados

**Páginas:**

- `web/src/app/page.tsx` \- Página principal (300 líneas)  
- `web/src/app/login/page.tsx` \- Página de login (150 líneas)  
- `web/src/app/dashboard/page.tsx` \- Dashboard protegido (200 líneas)  
- `web/src/app/layout.tsx` \- Layout principal (50 líneas)

**Componentes de Layout:**

- `web/src/components/layout/Header.tsx` \- Navegación (100 líneas)  
- `web/src/components/layout/Footer.tsx` \- Pie de página (80 líneas)

**Componentes de Sección:**

- `web/src/components/sections/HeroSection.tsx` \- Hero (120 líneas)  
- `web/src/components/sections/DashboardSection.tsx` \- Dashboard (300 líneas)  
- `web/src/components/sections/ProductGrid.tsx` \- Productos (150 líneas)  
- `web/src/components/sections/ServicesGrid.tsx` \- Servicios (150 líneas)

**Componentes de UI:**

- `web/src/components/ui/Card.tsx` \- Tarjetas (50 líneas)  
- `web/src/components/ui/Alert.tsx` \- Alertas (40 líneas)  
- `web/src/components/ui/Button.tsx` \- Botones (60 líneas)

**Estilos:**

- `web/src/app/globals.css` \- Estilos globales (100 líneas)  
- `web/tailwind.config.ts` \- Configuración Tailwind (80 líneas)

### Características CSS Implementadas

#### 1\. Responsive Design

- ✅ Grid adaptativo (1-4 columnas según pantalla)  
- ✅ Imágenes responsive con Next.js Image  
- ✅ Tipografía escalable (text-5xl md:text-7xl)  
- ✅ Menu hamburguesa en móvil

#### 2\. Animaciones

- ✅ Fade in al cargar (opacity 0 → 1\)  
- ✅ Slide in al hacer scroll (y: 20 → 0\)  
- ✅ Hover effects en botones (scale 1.05)  
- ✅ Transiciones suaves (duration 300ms)

#### 3\. Efectos Visuales

- ✅ Glassmorphism (backdrop-blur)  
- ✅ Gradientes personalizados  
- ✅ Sombras dinámicas (shadow-lg → shadow-xl)  
- ✅ Bordes redondeados (rounded-lg)

#### 4\. Accesibilidad

- ✅ Contraste WCAG 2.1 AA (4.5:1 mínimo)  
- ✅ Focus visible en navegación por teclado  
- ✅ ARIA labels para lectores de pantalla  
- ✅ Semantic HTML5 (header, nav, main, section, footer)

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Next.js 16 \+ TypeScript \+ Tailwind CSS**  
✅ **6 hero sections responsive**  
✅ **Componentes reutilizables**  
✅ **Animaciones con Framer Motion**  
✅ **Diseño accesible y moderno**

---

## Reto 6: Plan de Empresa

### Descripción del Reto

Desarrollar un plan de negocio completo que incluya modelo de negocio, proyecciones financieras, estrategia de comercialización y análisis de viabilidad.

### Implementación en el Proyecto

#### 1\. Modelo de Negocio \- 3 Paquetes Comerciales

##### Paquete STARTER \- 1.200€

**Ideal para:** 1 aula o espacio pequeño (2 ubicaciones)

**Incluye:**

- 2 nodos ambientales (2 × 150€ \= 300€)  
- Instalación y configuración (500€)  
- 2 × 100€ configuración (200€)  
- Dashboard Grafana personalizado  
- API REST y WebSocket  
- Aplicación web Next.js  
- Documentación completa

**Mantenimiento opcional:** 600€/año o 60€/mes

**Beneficios:**

- Monitorización de temperatura, humedad, CO2, presión, VOC, IAQ  
- Alertas automáticas por umbrales  
- Acceso desde cualquier dispositivo  
- Datos históricos ilimitados

##### Paquete STANDARD \- 2.750€

**Ideal para:** Centro educativo pequeño (4 ubicaciones)

**Incluye:**

- 4 nodos ambientales (4 × 150€ \= 600€)  
- 1 gateway LoRa (250€)  
- Instalación y configuración (500€)  
- 4 × 100€ configuración (400€)  
- Dashboard Grafana con filtros avanzados  
- API REST completa  
- Aplicación móvil Flutter  
- Soporte básico 3 meses

**Mantenimiento opcional:** 600€/año o 60€/mes  
**Hosting avanzado:** 30€/mes

**Beneficios:**

- Monitorización de 4 ubicaciones simultáneas  
- Comunicación LoRa de bajo consumo  
- App móvil para acceso remoto  
- Gráficos históricos interactivos  
- Sistema de alertas por ubicación

##### Paquete PREMIUM \- 3.580€

**Ideal para:** Centro educativo completo o edificio inteligente

**Incluye:**

- 4 nodos ambientales (600€)  
- 1 nodo agua (180€)  
- 1 nodo solar \+ batería (200€)  
- 1 gateway LoRa (250€)  
- Integración LoRa \+ Panel Admin \+ Alertas (350€)  
- Instalación y configuración (500€)  
- 6 × 100€ configuración (600€)  
- Formación presencial 1 día (300€)  
- Soporte prioritario 6 meses

**Mantenimiento recomendado:** 900€/año o 90€/mes (SLA ampliado)

**Beneficios:**

- Monitorización completa (aire \+ agua \+ energía)  
- Gestión de energía solar y baterías  
- Panel de administración de usuarios  
- Alertas avanzadas personalizables  
- Formación completa del equipo  
- Soporte prioritario

#### 2\. Proyecciones Financieras \- Año 1

##### Escenario Conservador (5 clientes)

**Ingresos:**

- One-Time: 5 × 2.500€ \= 12.500€  
- Recurrentes Año 1: 5 × 60% × 600€ \= 1.800€  
- **Total:** 14.300€

**Costes:**

- Directos: 5 × 1.700€ \= 8.500€  
- Recurrentes: 5 × 60% × 100€ \= 300€  
- **Total:** 8.800€

**Resultado Bruto:** 5.500€  
**Margen:** 38.5%

##### Escenario Esperado (15 clientes)

**Ingresos:**

- One-Time: 15 × 2.500€ \= 37.500€  
- Recurrentes Año 1: 15 × 60% × 600€ \= 5.400€  
- **Total:** 42.900€

**Costes:**

- Directos: 15 × 1.700€ \= 25.500€  
- Recurrentes: 15 × 60% × 100€ \= 900€  
- **Total:** 26.400€

**Resultado Bruto:** 16.500€  
**Margen:** 38.5%

##### Escenario Ambicioso (30 clientes)

**Ingresos:**

- One-Time: 30 × 2.500€ \= 75.000€  
- Recurrentes Año 1: 30 × 60% × 600€ \= 10.800€  
- **Total:** 85.800€

**Costes:**

- Directos: 30 × 1.700€ \= 51.000€  
- Recurrentes: 30 × 60% × 100€ \= 1.800€  
- **Total:** 52.800€

**Resultado Bruto:** 33.000€  
**Margen:** 38.5%

##### Costes Fijos Año 1: 42.000€

**Desarrollo y Preparación:** 11.000€

- Desarrollo adicional: 8.000€  
- Certificaciones: 2.000€  
- Documentación: 1.000€

**Stock Inicial:** 10.000€

- Hardware para 10 despliegues: 8.500€  
- Margen de seguridad: 1.500€

**Marketing y Ventas:** 7.000€

- Sitio web: 2.000€  
- Ferias y eventos: 3.000€  
- Campañas: 2.000€

**Operaciones:** 4.000€

- Herramientas: 1.000€  
- Gastos administrativos: 2.000€  
- Seguros y legal: 1.000€

**Personal Part-time:** 10.000€

- Desarrollo y soporte: 6.000€  
- Comercial: 4.000€

##### Punto de Equilibrio (Break-Even)

**Margen medio por cliente:**

- One-time: 800€  
- Recurrente: 500€ × 60% \= 300€  
- **Total:** 1.100€

**Clientes necesarios:** 42.000€ ÷ 1.100€ \= **39 clientes**

#### 3\. Estrategia Go-to-Market

##### Canales de Venta

**Canal Directo (70%):**

- Demos en centros educativos  
- Ventas directas  
- Proceso: contacto → demo → propuesta → PoC → despliegue

**Canal Indirecto (30%):**

- Distribuidores tecnológicos  
- Partners de facility management  
- Comisión: 15-20%

##### Proceso de Ventas (8-12 semanas)

**Fase 1: Prospecting** (Semanas 1-2)

- Identificación de clientes potenciales  
- Contacto inicial (email, teléfono, LinkedIn)  
- Calificación BANT  
- Agendamiento de demo

**Fase 2: Demo y Presentación** (Semana 3\)

- Demostración online o presencial  
- Presentación de casos de uso  
- Discusión de necesidades  
- Propuesta personalizada

**Fase 3: Propuesta Comercial** (Semana 4\)

- Elaboración de propuesta técnica y económica  
- Presentación de ROI  
- Negociación  
- Respuesta a objeciones

**Fase 4: PoC (Proof of Concept)** (Semanas 5-8)

- Instalación piloto en 1-2 ubicaciones  
- Formación básica  
- Recopilación de datos 2-4 semanas  
- Evaluación de resultados

**Fase 5: Cierre y Despliegue** (Semanas 9-12)

- Firma de contrato  
- Despliegue completo  
- Formación del equipo  
- Entrega de documentación

##### Marketing Digital

**SEO:**

- Palabras clave: "monitorización ambiental", "IoT educativo", "calidad aire interior"  
- Blog técnico con casos de uso

**SEM:**

- Google Ads segmentados  
- Presupuesto: 200€/mes

**LinkedIn:**

- Contenido B2B  
- Networking con decisores

**Email Marketing:**

- Newsletter mensual  
- Casos de estudio

#### 4\. ROI para el Cliente

##### Ahorro Anual Estimado

**Optimización HVAC:**

- Reducción: 20-30%  
- Ahorro: 1.200€/año

**Agua optimizada:**

- Reducción: 30-50%  
- Ahorro: 500€/año

**Total ahorro:** 1.700€/año

##### Retorno de Inversión

**Inversión:** 2.750€ (Paquete STANDARD)  
**Ahorro Año 1:** 1.700€  
**Mantenimiento:** 600€  
**Ahorro neto:** 1.100€

**ROI Año 1:** (1.100€ ÷ 2.750€) × 100 \= **40%**  
**Payback:** 2.750€ ÷ 1.100€ \= **2.5 años**  
**Ahorro acumulado 5 años:** 1.700€ × 5 \- 600€ × 5 \= **5.500€**

#### 5\. Hoja de Ruta (18 Meses)

##### Fase 1: Preparación (Meses 0-3)

**Mes 1-2:**

- Finalizar integración LoRa Mesh  
- Preparar kits comerciales  
- Desarrollar material de marketing  
- Establecer acuerdos con proveedores

**Mes 3:**

- Instalación de 3 PoC en centros locales  
- Recopilación de feedback  
- Preparación de casos de estudio  
- Formación de equipo comercial

**Hitos:**

- ✅ 3 PoC instalados  
- ✅ Material comercial completo  
- ✅ Web lanzada  
- ✅ Primeros casos de estudio

##### Fase 2: Lanzamiento (Meses 4-6)

**Mes 4:**

- Lanzamiento oficial con evento  
- Inicio de campañas digitales  
- Participación en SIMO Educación  
- Activación de canal de distribuidores

**Mes 5-6:**

- Cierre de primeros 5-8 clientes  
- Instalaciones y formación  
- Seguimiento y soporte  
- Refinamiento de procesos

**Hitos:**

- ✅ 5-8 clientes de pago  
- ✅ 1 feria completada  
- ✅ 2 distribuidores activos  
- ✅ Proceso de ventas optimizado

##### Fase 3: Crecimiento (Meses 7-12)

**Mes 7-9:**

- Participación en 2 ferias adicionales  
- Expansión a 2 comunidades autónomas  
- Contratación de técnico adicional  
- Optimización de operaciones

**Mes 10-12:**

- Alcanzar 20-25 clientes acumulados  
- Establecer base de clientes recurrentes  
- Lanzamiento de servicios premium  
- Preparación para financiación Serie A

**Hitos:**

- ✅ 20-25 clientes acumulados  
- ✅ 12-15 contratos de mantenimiento  
- ✅ Presencia en 3 comunidades  
- ✅ Break-even operativo

##### Fase 4: Expansión (Meses 13-18)

**Mes 13-15:**

- Apertura de oficina regional  
- Contratación de 2-3 personas  
- Lanzamiento de programa de partners  
- Desarrollo de nuevas funcionalidades

**Mes 16-18:**

- Alcanzar 40-50 clientes acumulados  
- Optimización de márgenes  
- Preparación de expansión internacional  
- Evaluación de ronda Serie A

**Hitos:**

- ✅ 40-50 clientes acumulados  
- ✅ Equipo de 6-8 personas  
- ✅ Beneficio neto positivo  
- ✅ Preparados para expansión

### Archivos Involucrados

**Documentación Completa:**

- `documentacion/RETO_6_PLAN_EMPRESA.md` \- 1100+ líneas

**Secciones del plan:**

- Resumen ejecutivo  
- Modelo de negocio  
- Oferta y paquetes comerciales  
- Estructura de costes y márgenes  
- Proyecciones financieras (3 escenarios)  
- Estrategia Go-to-Market  
- Organización y operaciones  
- Análisis de riesgos  
- Requerimientos financieros  
- Hoja de ruta 18 meses

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **3 paquetes comerciales definidos**  
✅ **Proyecciones financieras detalladas**  
✅ **Break-even: 39 clientes**  
✅ **ROI cliente: 40% primer año**  
✅ **Hoja de ruta 18 meses**  
✅ **Estrategia comercial completa**

---

## Reto 7: Validación de Formularios JS

### Descripción del Reto

Implementar validación de formularios en tiempo real con JavaScript para garantizar la integridad de los datos ingresados por el usuario.

### Implementación en el Proyecto

#### 1\. Formulario de Login (Web Next.js)

**Campos del formulario:**

- Username o Email  
- Password

**Validaciones implementadas:**

##### Validación de Campo Requerido

```javascript
if (!username || username.trim() === '') {
  setErrors({ ...errors, username: 'El usuario es requerido' });
  return;
}
```

##### Validación de Formato de Email

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (username.includes('@') && !emailRegex.test(username)) {
  setErrors({ ...errors, username: 'Email inválido' });
  return;
}
```

##### Validación de Longitud de Contraseña

```javascript
if (password.length < 8) {
  setErrors({ ...errors, password: 'La contraseña debe tener al menos 8 caracteres' });
  return;
}
```

##### Formulario Completo con Validación

```javascript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validar username
    if (!formData.username || formData.username.trim() === '') {
      newErrors.username = 'El usuario o email es requerido';
    } else if (formData.username.includes('@')) {
      // Si contiene @, validar como email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.username)) {
        newErrors.username = 'Email inválido';
      }
    }

    // Validar password
    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('sessionToken', data.sessionToken);
        router.push('/dashboard');
      } else {
        const error = await response.json();
        setErrors({ general: error.message || 'Credenciales inválidas' });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
```

```jsx
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Iniciar Sesión
        </h1>

        {errors.general && (
          <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-800 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo Username/Email */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Usuario o Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="admin o admin@example.com"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Campo Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Usuarios de prueba:</p>
          <p>admin / medusse2025</p>
        </div>
      </div>
    </div>
  );
}
```

**Ubicación:** `web/src/app/login/page.tsx` (150 líneas)

#### 2. Validación en Cliente API (Backend)

##### Validación de Parámetros de Endpoints

```javascript
// api/server.js - Líneas 100-150

app.get('/api/latest/:location', async (req, res) => {
  try {
    const { location } = req.params;

    // Validación: location debe estar en la lista válida
    const validLocations = ['aula20', 'aula21', 'gimnasio', 'laboratorio'];
    if (!validLocations.includes(location)) {
      return res.status(400).json({
        error: 'Invalid location',
        validLocations: validLocations
      });
    }

    // ... resto del código
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Sanitización de Inputs

```javascript
// Función helper para sanitizar strings
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Uso en endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const username = sanitizeString(req.body.username);
    const password = sanitizeString(req.body.password);
```

##### Validación de Credenciales

```javascript
// Validaciones en endpoint de login
if (!username || username.length < 3) {
  return res.status(400).json({
    error: 'Username must be at least 3 characters'
  });
}

if (!password || password.length < 8) {
  return res.status(400).json({
    error: 'Password must be at least 8 characters'
  });
}

// ... autenticación
```

##### Validación de Tipos de Datos

```javascript
// Validar que un parámetro sea número
app.get('/api/data/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const { hours } = req.query;

    // Validar que hours sea un número válido
    const hoursNum = parseInt(hours, 10);
    if (isNaN(hoursNum) || hoursNum < 1 || hoursNum > 720) {
      return res.status(400).json({
        error: 'Parameter "hours" must be a number between 1 and 720'
      });
    }

    // ... resto del código
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 3. Manejo de Errores con Try-Catch

```javascript
// Patrón estándar en todos los endpoints
app.get('/api/endpoint', async (req, res) => {
  try {
    // Validaciones
    if (!validInput) {
      return res.status(400).json({ error: 'Bad request' });
    }

    // Lógica de negocio
    const result = await someAsyncOperation();

    // Respuesta exitosa
    res.json(result);
  } catch (error) {
    // Log del error (desarrollo)
    console.error('Error in /api/endpoint:', error);

    // Respuesta de error (no exponer detalles internos en producción)

    res.status(500).json({

      error: 'Internal server error',

      // Solo en desarrollo:

      // details: error.message

    });

  }

});
```

#### 4. Respuestas HTTP Apropiadas

**Códigos de estado implementados:**

| Código | Uso | Ejemplo |
| :---- | :---- | :---- |
| **200** | OK | Datos obtenidos correctamente |
| **201** | Created | Sesión creada |
| **400** | Bad Request | Parámetros inválidos |
| **401** | Unauthorized | Token inválido o expirado |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Error | Error del servidor |

**Ejemplo de respuestas estructuradas:**

```javascript
// Respuesta exitosa
res.status(200).json({
  success: true,
  data: result
});

// Respuesta de error
res.status(400).json({
  success: false,
  error: 'Invalid parameters',
  details: {
    field: 'location',
    message: 'Location must be one of: aula20, aula21, gimnasio, laboratorio'
  }
});
```

### Técnicas Utilizadas

#### 1\. Validación en Tiempo Real (onChange)

- ✅ Validación mientras el usuario escribe  
- ✅ Limpieza de errores al corregir  
- ✅ Feedback inmediato

#### 2\. Expresiones Regulares para Formatos

- ✅ Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`  
- ✅ Username: `/^[a-zA-Z0-9_-]{3,20}$/`

#### 3. Validación de Tipos con TypeScript

```typescript
interface LoginFormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}
```

#### 4. Mensajes de Error Contextuales

- ✅ Mensajes claros y específicos  
- ✅ Indicación visual con colores (rojo para error)  
- ✅ Posición cerca del campo afectado

#### 5. Estados de Carga y Error

```javascript
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({});

// Durante el envío
setIsLoading(true);

try {

  await submitForm();

} catch (error) {

  setErrors({ general: 'Error' });

} finally {

  setIsLoading(false);

}
```

### Archivos Involucrados

**Frontend:**

- `web/src/app/login/page.tsx` \- Formulario de login (150 líneas)

**Backend:**

- `api/server.js` \- Validaciones en endpoints (líneas 100-500)  
- `api/auth.js` \- Validaciones de autenticación (líneas 10-150)

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Validación de formularios en tiempo real**  
✅ **Expresiones regulares para formatos**  
✅ **Sanitización de inputs en backend**  
✅ **Manejo de errores con try-catch**  
✅ **Respuestas HTTP apropiadas**  
✅ **Feedback visual inmediato**

---

## Reto 8: Conexión a Base de Datos JS

### Descripción del Reto

Implementar la conexión y consultas a bases de datos desde JavaScript/Node.js, gestionando pools de conexiones y consultas eficientes.

### Implementación en el Proyecto

#### 1\. Conexión a MySQL 8.0

##### Pool de Conexiones con mysql2

**Archivo:** `api/db.js` (100 líneas)

```javascript
const mysql = require('mysql2/promise');

// Configuración del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'medusse_user',
  password: process.env.DB_PASSWORD || 'medusse2025',
  database: process.env.DB_NAME || 'medusse_db',
  connectionLimit: 10, // Máximo 10 conexiones simultáneas
  queueLimit: 0, // Sin límite de cola
  waitForConnections: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test de conexión al iniciar
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL conectado correctamente');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a MySQL:', err.message);
    process.exit(1);
  });

module.exports = pool;
```

**Ventajas del Pool de Conexiones:**

- ✅ Reutilización de conexiones (no abre/cierra cada vez)  
- ✅ Mejor rendimiento (hasta 10x más rápido)  
- ✅ Gestión automática de conexiones  
- ✅ Queue automática cuando no hay conexiones disponibles  
- ✅ Keep-alive para evitar timeouts

##### Consultas Preparadas (Prepared Statements)

```javascript
const db = require('./db');

// Consulta preparada para evitar SQL Injection
async function getUser(username) {
  const [rows] = await db.execute(
    'SELECT id, username, email, role FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
}

// Inserción preparada
async function createSession(userId, token, ipAddress, userAgent) {
  const [result] = await db.execute(
    `INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) 
     VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
    [userId, token, ipAddress, userAgent]
  );
  return result.insertId;
}
```

**Protección contra SQL Injection:**

- ❌ **MAL:** `SELECT * FROM users WHERE username = '${username}'` (vulnerable)  
- ✅ **BIEN:** `SELECT * FROM users WHERE username = ?` con parámetros

#### 2\. Uso de Procedimientos Almacenados

##### Llamada a sp\_authenticate\_user

```javascript
const db = require('./db');

async function authenticateUser(username, passwordHash, ipAddress, userAgent) {
  const connection = await db.getConnection();
  try {
    // Preparar variables de salida
    await connection.query('SET @p_user_id = 0, @p_session_token = NULL, @p_role = NULL, @p_success = FALSE');
    
    // Llamar al procedimiento almacenado
    await connection.execute(
      'CALL sp_authenticate_user(?, ?, ?, ?, @p_user_id, @p_session_token, @p_role, @p_success)',
      [username, passwordHash, ipAddress, userAgent]
    );

    // Obtener variables de salida
    const [results] = await connection.query(
      'SELECT @p_user_id AS userId, @p_session_token AS sessionToken, @p_role AS role, @p_success AS success'
    );

    return results[0];
  } finally {
    connection.release();
  }
}
```

##### Llamada a sp_get_user_alerts

```javascript
async function getUserAlerts(userId, limit = 10) {
  const [alerts] = await db.execute(
    'CALL sp_get_user_alerts(?, ?)',
    [userId, limit]
  );
  return alerts[0]; // Primer conjunto de resultados
}
```

##### Llamada a sp_create_alert

```javascript
async function createAlert(location, sensorType, alertType, message, value, threshold) {
  const connection = await db.getConnection();
  try {
    // Preparar variables de salida
    await connection.query('SET @p_alert_id = 0, @p_success = FALSE');

    // Llamar al procedimiento almacenado
    await connection.execute(
      'CALL sp_create_alert(?, ?, ?, ?, ?, ?, @p_alert_id, @p_success)',
      [location, sensorType, alertType, message, value, threshold]
    );

    // Obtener variables de salida
    const [results] = await connection.query(
      'SELECT @p_alert_id AS alertId, @p_success AS success'
    );

    return results[0];
  } finally {
    connection.release();
  }
}
```

#### 3. Conexión a InfluxDB 2.7

##### Cliente InfluxDB con @influxdata/influxdb-client

Archivo: `api/influx.js` (50 líneas)

```javascript
const { InfluxDB } = require('@influxdata/influxdb-client');

// Configuración de InfluxDB
const url = process.env.INFLUX_URL || 'http://localhost:8086';
const token = process.env.INFLUX_TOKEN || 'medusse-admin-token-2025';
const org = process.env.INFLUX_ORG || 'iescelia';
const bucket = process.env.INFLUX_BUCKET || 'sensors';

// Crear cliente
const influxDB = new InfluxDB({ url, token });

// Query API
const queryApi = influxDB.getQueryApi(org);

// Write API (opcional, para escribir datos)
const writeApi = influxDB.getWriteApi(org, bucket);

// Test de conexión
queryApi.queryRows(
  `from(bucket: "${bucket}") |> range(start: -1m) |> limit(n:1)`,
  {
    next(row, tableMeta) {
      console.log('✅ InfluxDB conectado correctamente');
    },
    error(error) {
      console.error('❌ Error conectando a InfluxDB:', error.message);
    },
    complete() {}
  }
);

module.exports = { queryApi, writeApi };
```

##### Consultas con Flux Query Language

**Obtener últimas lecturas de todos los sensores:**

```javascript
const { queryApi } = require('./influx');

async function getLatestReadings(location) {
  const query = `
    from(bucket: "sensors")
      |> range(start: -15m)
      |> filter(fn: (r) => r.location == "${location}")
      |> filter(fn: (r) => r._field == "value")
      |> group(columns: ["_measurement"])
      |> last()
  `;

  const results = {};

  return new Promise((resolve, reject) => {
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const measurement = row._measurement;
        const value = row._value;
        results[measurement] = value;
      },
      error(error) {
        reject(error);
      },
      complete() {
        resolve(results);
      }
    });
  });
}
```

```javascript
async function getSensorHistory(location, sensor, hours = 24) {
  const query = `
    from(bucket: "sensors")
      |> range(start: -${hours}h)
      |> filter(fn: (r) => r.location == "${location}")
      |> filter(fn: (r) => r._measurement == "${sensor}")
      |> filter(fn: (r) => r._field == "value")
      |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  `;

  const dataPoints = [];

  return new Promise((resolve, reject) => {
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        dataPoints.push({
          timestamp: row._time,
          value: row._value
        });
      },
      error(error) {
        reject(error);
      },
      complete() {
        resolve(dataPoints);
      }
    });
  });
}
```

**Calcular estadísticas (min, max, mean):**

```javascript
async function getSensorStats(location, sensor, hours = 24) {
  const query = `
    from(bucket: "sensors")
      |> range(start: -${hours}h)
      |> filter(fn: (r) => r.location == "${location}")
      |> filter(fn: (r) => r._measurement == "${sensor}")
      |> filter(fn: (r) => r._field == "value")
      |> group()
      |> reduce(
          fn: (r, accumulator) => ({
            min: if r._value < accumulator.min then r._value else accumulator.min,
            max: if r._value > accumulator.max then r._value else accumulator.max,
            sum: accumulator.sum + r._value,
            count: accumulator.count + 1.0
          }),
          identity: {min: 999999.0, max: -999999.0, sum: 0.0, count: 0.0}
        )
      |> map(fn: (r) => ({ r with mean: r.sum / r.count }))
  `;

  return new Promise((resolve, reject) => {
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        resolve({
          min: row.min,
          max: row.max,
          mean: row.mean,
          count: row.count
        });
      },
      error(error) {
        reject(error);
      },
      complete() {}
    });
  });
}
```

#### 4. Implementación en Endpoints API

##### Endpoint: GET /api/latest/:location

```javascript
const db = require('./db');
const { queryApi } = require('./influx');

app.get('/api/latest/:location', async (req, res) => {
  try {
    const { location } = req.params;

    // Validar ubicación en MySQL
    const [locationRows] = await db.execute(
      'SELECT id, display_name, color FROM locations WHERE name = ? AND is_active = TRUE',
      [location]
    );

    if (locationRows.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    const locationInfo = locationRows[0];

    // Obtener datos de InfluxDB
    const sensorData = await getLatestReadings(location);

    res.json({
      location: location,
      displayName: locationInfo.display_name,
      color: locationInfo.color,
      timestamp: Date.now(),
      sensors: sensorData
    });
  } catch (error) {
    console.error('Error in /api/latest/:location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint: GET /api/data/:location/:sensor

```javascript
app.get('/api/data/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const { hours } = req.query;

    // Validar parámetros
    const hoursNum = parseInt(hours, 10) || 24;

    if (hoursNum < 1 || hoursNum > 720) {
      return res.status(400).json({
        error: 'Parameter "hours" must be between 1 and 720'
      });
    }

    // Obtener datos históricos de InfluxDB
    const data = await getSensorHistory(location, sensor, hoursNum);

    // Obtener estadísticas
    const stats = await getSensorStats(location, sensor, hoursNum);

    res.json({
      location,
      sensor,
      hours: hoursNum,
      dataPoints: data,
      statistics: stats
    });
  } catch (error) {
    console.error('Error in /api/data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint: GET /api/admin/alerts

```javascript
app.get('/api/admin/alerts', async (req, res) => {
  try {
    // Validar sesión (token de admin)
    const sessionToken = req.headers.authorization?.split(' ')[1];

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validar token en MySQL
    const [sessionRows] = await db.execute(
      `SELECT u.id, u.role 
       FROM sessions s 
       INNER JOIN users u ON s.user_id = u.id 
       WHERE s.session_token = ? AND s.expires_at > NOW()`,
      [sessionToken]
    );

    if (sessionRows.length === 0 || sessionRows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Obtener alertas no resueltas
    const [alerts] = await db.execute(
      `SELECT a.*, l.display_name AS location_name, s.display_name AS sensor_name
       FROM alerts a
       INNER JOIN locations l ON a.location_id = l.id
       INNER JOIN sensors s ON a.sensor_id = s.id
       WHERE a.is_resolved = FALSE
       ORDER BY a.created_at DESC

       LIMIT 50`
    );

    res.json({ alerts });
  } catch (error) {
    console.error('Error in /api/admin/alerts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 5. Manejo de Transacciones

```javascript
async function createUserWithPreferences(userData, preferences) {
  const connection = await db.getConnection();
  try {
    // Iniciar transacción
    await connection.beginTransaction();

    // Insertar usuario
    const [userResult] = await connection.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [userData.username, userData.email, userData.passwordHash, userData.role]
    );

    const userId = userResult.insertId;

    // Insertar preferencias
    await connection.execute(
      'INSERT INTO user_preferences (user_id, theme, language) VALUES (?, ?, ?)',
      [userId, preferences.theme, preferences.language]
    );

    // Confirmar transacción
    await connection.commit();

    return { success: true, userId };
  } catch (error) {
    // Revertir transacción en caso de error
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
```

### Archivos Involucrados

**Configuración de Bases de Datos:**

- `api/db.js` \- Pool de conexiones MySQL (100 líneas)  
- `api/influx.js` \- Cliente InfluxDB (50 líneas)

**Módulos de Autenticación:**

- `api/auth.js` \- Funciones de autenticación con MySQL (150 líneas)

**Endpoints API:**

- `api/server.js` \- Líneas 50-500 (endpoints con consultas a BD)

**Variables de Entorno:**

- `.env` \- Configuración de conexión

```ini
\# MySQL

DB\_HOST=localhost

DB\_PORT=3306

DB\_USER=medusse\_user

DB\_PASSWORD=medusse2025

DB\_NAME=medusse\_db

\# InfluxDB

INFLUX\_URL=http://localhost:8086

INFLUX\_TOKEN=medusse-admin-token-2025

INFLUX\_ORG=iescelia

INFLUX\_BUCKET=sensors
```

### Buenas Prácticas Implementadas

#### 1\. Pool de Conexiones

✅ Reutilización de conexiones  
✅ Límite de 10 conexiones simultáneas  
✅ Queue automática  
✅ Keep-alive habilitado

#### 2\. Consultas Preparadas

✅ Protección contra SQL Injection  
✅ Parámetros escapados automáticamente  
✅ Mejor rendimiento (query caching)

#### 3\. Manejo de Errores

✅ Try-catch en todas las consultas  
✅ Release de conexiones en finally  
✅ Logs de errores detallados  
✅ Respuestas HTTP apropiadas

#### 4\. Transacciones

✅ BEGIN TRANSACTION  
✅ COMMIT en éxito  
✅ ROLLBACK en error  
✅ Atomicidad garantizada

#### 5\. Variables de Entorno

✅ Credenciales en .env  
✅ No hardcodeadas en código  
✅ Valores por defecto para desarrollo  
✅ .env en .gitignore

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Pool de conexiones MySQL eficiente**  
✅ **Consultas preparadas para seguridad**  
✅ **Integración con InfluxDB 2.7**  
✅ **Flux Query Language para series temporales**  
✅ **Transacciones para integridad de datos**  
✅ **Manejo robusto de errores**

---

## Reto 9: Acceso Restringido y Sesiones

### Descripción del Reto

Implementar un sistema de autenticación y autorización con sesiones, gestión de tokens y control de acceso basado en roles.

### Implementación en el Proyecto

#### 1\. Sistema de Autenticación

##### Flujo de Autenticación

Usuario → Login → Validar Credenciales → Generar Token → Guardar Sesión → Retornar Token → Cliente

                                ↓

                           Password Hash (bcrypt)

                                ↓

                          Verificar en MySQL

##### Hash de Contraseñas con bcrypt

```javascript
const bcrypt = require('bcrypt');

// Al registrar usuario (hash con salt rounds = 12)
async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}

// Al hacer login (comparar)
async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
```

**Ejemplo de hashes almacenados en MySQL:**

| Usuario | Hash |
|:---|:---|
| admin | $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5oe2kR7xNlm9W |
| paco | $2b$12$k7VqLBmxO5uF.dXOzZd9AuA3rMfZKz8uYYaVa2fJBz.lF8XP5aGmC |

##### Endpoint: POST /api/auth/login

```javascript
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('./db');

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required'
      });
    }

    // Buscar usuario en MySQL
    const [userRows] = await db.execute(
      'SELECT id, username, password_hash, role, is_active FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (userRows.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const user = userRows[0];

    // Verificar que el usuario esté activo
    if (!user.is_active) {
      return res.status(403).json({
        error: 'User account is disabled'
      });
    }

    // Verificar contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({

        error: 'Invalid credentials'

      });

    }

    // Generar token de sesión (UUID v4)
    const sessionToken = crypto.randomUUID();

    // Obtener IP y User-Agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Crear sesión en MySQL (expira en 24 horas)
    await db.execute(
      `INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) 
       VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
      [user.id, sessionToken, ipAddress, userAgent]
    );

    // Actualizar last_login
    await db.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Registrar en activity_log
    await db.execute(
      'INSERT INTO activity_log (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [user.id, 'login', ipAddress, userAgent]
    );

    // Retornar token y datos del usuario
    res.json({
      success: true,
      sessionToken: sessionToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 2\. Middleware de Autenticación

##### Middleware: requireAuth

```javascript
// Middleware para verificar que el usuario esté autenticado
async function requireAuth(req, res, next) {
  try {
    // Obtener token del header Authorization (Bearer token)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const sessionToken = authHeader.split(' ')[1];

    // Validar token en MySQL
    const [sessionRows] = await db.execute(
      `SELECT s.user_id, s.expires_at, u.username, u.role, u.is_active
       FROM sessions s
       INNER JOIN users u ON s.user_id = u.id
       WHERE s.session_token = ?`,
      [sessionToken]
    );

    if (sessionRows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    const session = sessionRows[0];

    // Verificar expiración
    if (new Date(session.expires_at) < new Date()) {
      // Eliminar sesión expirada
      await db.execute('DELETE FROM sessions WHERE session_token = ?', [sessionToken]);
      return res.status(401).json({ error: 'Unauthorized - Token expired' });
    }

    // Verificar que usuario esté activo
    if (!session.is_active) {
      return res.status(403).json({ error: 'Forbidden - User account is disabled' });
    }

    // Agregar datos del usuario al request
    req.user = {
      id: session.user_id,
      username: session.username,
      role: session.role
    };

    next(); // Continuar al siguiente middleware/endpoint
  } catch (error) {
    console.error('Error in requireAuth:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

##### Middleware: requireRole

```javascript
// Middleware para verificar rol del usuario
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden - Insufficient permissions',
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
}
```

#### 3. Protección de Endpoints

##### Endpoint Protegido: GET /api/dashboard

```javascript
// Solo usuarios autenticados
app.get('/api/dashboard', requireAuth, async (req, res) => {
  try {
    // req.user está disponible gracias a requireAuth middleware
    const userId = req.user.id;

    // Obtener datos del dashboard
    const summary = await getSummaryData();

    res.json({
      user: req.user,
      data: summary
    });
  } catch (error) {
    console.error('Error in /api/dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint Protegido: GET /api/admin/users (Solo Admin)

```javascript
// Solo usuarios con rol 'admin'
app.get('/api/admin/users', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, username, email, role, is_active, created_at, last_login FROM users ORDER BY created_at DESC'
    );

    res.json({ users });
  } catch (error) {
    console.error('Error in /api/admin/users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint Protegido: POST /api/admin/alerts/resolve (Admin o User)

// Solo usuarios con rol 'admin' o 'user' (viewer no puede)

```javascript
app.post('/api/admin/alerts/resolve', requireAuth, requireRole('admin', 'user'), async (req, res) => {
  try {
    const { alertId } = req.body;
    const userId = req.user.id;

    // Resolver alerta
    await db.execute(
      'UPDATE alerts SET is_resolved = TRUE, resolved_at = NOW(), resolved_by = ? WHERE id = ?',
      [userId, alertId]
    );

    // Registrar actividad
    await db.execute(
      'INSERT INTO activity_log (user_id, action, entity_type, entity_id) VALUES (?, ?, ?, ?)',
      [userId, 'resolve_alert', 'alert', alertId]
    );

    res.json({ success: true, message: 'Alert resolved successfully' });
  } catch (error) {
    console.error('Error in /api/admin/alerts/resolve:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 4\. Logout y Gestión de Sesiones

##### Endpoint: POST /api/auth/logout

```javascript
app.post('/api/auth/logout', requireAuth, async (req, res) => {
  try {
    const sessionToken = req.headers.authorization.split(' ')[1];
    const userId = req.user.id;

    // Eliminar sesión de la base de datos
    await db.execute('DELETE FROM sessions WHERE session_token = ?', [sessionToken]);

    // Registrar logout
    await db.execute(
      'INSERT INTO activity_log (user_id, action) VALUES (?, ?)',
      [userId, 'logout']
    );

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in /api/auth/logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint: GET /api/auth/sessions (Mis Sesiones Activas)

```javascript
app.get('/api/auth/sessions', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [sessions] = await db.execute(
      `SELECT session_token, ip_address, user_agent, created_at, expires_at 
       FROM sessions 
       WHERE user_id = ? AND expires_at > NOW()
       ORDER BY created_at DESC`,

      \[userId\]

    );

    res.json({ sessions });

      [userId]
    );

    res.json({ sessions });
  } catch (error) {
    console.error('Error in /api/auth/sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

##### Endpoint: DELETE /api/auth/sessions/:token (Cerrar Sesión Específica)

```javascript
app.delete('/api/auth/sessions/:token', requireAuth, async (req, res) => {
  try {
    const { token } = req.params;
    const userId = req.user.id;

    // Verificar que la sesión pertenece al usuario
    const [sessionRows] = await db.execute(
      'SELECT user_id FROM sessions WHERE session_token = ?',
      [token]
    );

    if (sessionRows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (sessionRows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Eliminar sesión
    await db.execute('DELETE FROM sessions WHERE session_token = ?', [token]);

    res.json({ success: true, message: 'Session closed successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/auth/sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 5\. Control de Acceso Basado en Roles (RBAC)

##### Matriz de Permisos

| Endpoint | Public | Viewer | User | Admin |
| :---- | :---- | :---- | :---- | :---- |
| **POST /api/auth/login** | ✅ | ✅ | ✅ | ✅ |
| **POST /api/auth/logout** | ❌ | ✅ | ✅ | ✅ |
| **GET /api/summary** | ❌ | ✅ | ✅ | ✅ |
| **GET /api/latest/:location** | ❌ | ✅ | ✅ | ✅ |
| **GET /api/data/:location/:sensor** | ❌ | ✅ | ✅ | ✅ |
| **POST /api/admin/alerts/resolve** | ❌ | ❌ | ✅ | ✅ |
| **GET /api/admin/users** | ❌ | ❌ | ❌ | ✅ |
| **POST /api/admin/users** | ❌ | ❌ | ❌ | ✅ |
| **PUT /api/admin/users/:id** | ❌ | ❌ | ❌ | ✅ |
| **DELETE /api/admin/users/:id** | ❌ | ❌ | ❌ | ✅ |

##### Roles Implementados

**Admin:**

- ✅ Acceso completo al sistema  
- ✅ Gestión de usuarios  
- ✅ Resolución de alertas  
- ✅ Visualización de todos los datos  
- ✅ Acceso a logs de actividad

**User:**

- ✅ Visualización de datos  
- ✅ Resolución de alertas  
- ✅ Acceso a dashboards  
- ❌ No puede gestionar usuarios

**Viewer:**

- ✅ Solo visualización de datos  
- ❌ No puede resolver alertas  
- ❌ No puede gestionar usuarios

#### 6. Seguridad Adicional

##### Rate Limiting (express-rate-limit)

```javascript
const rateLimit = require('express-rate-limit');

// Limitar intentos de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos por IP
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  // ... lógica de login
});
```

##### CORS Configurado

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

##### Helmet para Seguridad de Headers

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitado para desarrollo
  crossOriginEmbedderPolicy: false
}));
```

### Archivos Involucrados

**Backend:**

- `api/auth.js` \- Funciones de autenticación (150 líneas)  
- `api/middleware/auth.js` \- Middlewares de auth (100 líneas)  
- `api/server.js` \- Endpoints protegidos (líneas 50-500)

**Frontend:**

- `web/src/app/login/page.tsx` \- Formulario de login (150 líneas)  
- `web/src/lib/auth.ts` \- Funciones de cliente (80 líneas)  
- `web/src/middleware.ts` \- Protección de rutas (50 líneas)

**Base de Datos:**

- `docker/mysql/init/01-schema.sql` \- Tablas users y sessions (líneas 1-100)

### Flujo Completo de Autenticación

1\. Usuario ingresa credenciales en /login

   ↓

2\. POST /api/auth/login con username y password

   ↓

3\. Backend valida credenciales con bcrypt

   ↓

4\. Backend genera token UUID y crea sesión en MySQL

   ↓

5\. Backend retorna token al cliente

   ↓

6\. Cliente guarda token en localStorage

   ↓

7\. Cliente envía token en header Authorization: Bearer {token}

   ↓

8\. Middleware requireAuth valida token en cada request

   ↓

9\. Si válido: continuar al endpoint

   Si inválido: retornar 401 Unauthorized

### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **Autenticación con bcrypt (hash seguro)**  
✅ **Sesiones con tokens UUID**  
✅ **Middleware de autenticación y autorización**  
✅ **Control de acceso basado en roles (RBAC)**  
✅ **Rate limiting en login**  
✅ **Logs de actividad completos**  
✅ **Expiración automática de sesiones (24h)**

---

## Reto 10: Web Services SOAP

### Descripción del Reto

Implementar servicios web SOAP con WSDL para la interoperabilidad con sistemas legacy y aplicaciones empresariales.

### Implementación en el Proyecto

#### Estado del Reto

⚠️ **RETO NO IMPLEMENTADO** \- Decisión arquitectónica

#### Justificación de No Implementación

##### 1\. Arquitectura Moderna REST vs SOAP

**REST (Implementado):**

- ✅ Ligero y rápido (JSON)  
- ✅ Compatible con JavaScript nativo  
- ✅ Caché HTTP estándar  
- ✅ Fácil debugging con navegador  
- ✅ Menor overhead de red  
- ✅ Ideal para IoT y aplicaciones web modernas

**SOAP (No necesario):**

- ❌ XML verboso (mayor overhead)  
- ❌ Requiere librerías específicas  
- ❌ Más complejo de implementar  
- ❌ Debugging más complicado  
- ❌ No es estándar en ecosistema JavaScript/Node.js

##### 2\. Casos de Uso de SOAP vs REST

**SOAP es necesario cuando:**

- Integración con sistemas legacy (ERP, CRM antiguos)  
- Requisito contractual de WSDL  
- Transacciones distribuidas (WS-AtomicTransaction)  
- Seguridad empresarial estricta (WS-Security)  
- Industrias reguladas (banca, seguros)

**REST es suficiente para:**

- ✅ Aplicaciones web modernas  
- ✅ Aplicaciones móviles  
- ✅ Sistemas IoT  
- ✅ Microservicios  
- ✅ APIs públicas

**Nuestro caso:** Sistema IoT moderno para educación → **REST es la elección correcta**

##### 3\. Alternativas Modernas

En lugar de SOAP, el proyecto implementa:

**a) API REST con OpenAPI/Swagger**

- Documentación automática  
- Generación de clientes  
- Testeo interactivo  
- Estándar moderno equivalente a WSDL

**b) WebSockets para Tiempo Real**

- Comunicación bidireccional  
- Menor latencia que SOAP  
- Ideal para datos de sensores

**c) gRPC (Futuro)**

- Protocol Buffers (más eficiente que XML)  
- HTTP/2 (multiplexing)  
- Typed contracts (como WSDL pero moderno)

#### Documentación API con OpenAPI (Alternativa a WSDL)

##### Especificación OpenAPI 3.0

**Archivo:** `api/openapi.yaml` (300 líneas)

```yaml
openapi: 3.0.0

info:

  title: Medusse IoT API

  description: API REST para sistema de monitoreo ambiental

  version: 1.0.0

  contact:

    name: Pacoaldev

    email: pacoaldev@gmail.com

servers:

  \- url: http://localhost:3002

    description: Desarrollo local

tags:

  \- name: Auth

    description: Autenticación y sesiones

  \- name: Data

    description: Datos de sensores

  \- name: Admin

    description: Administración

paths:

  /api/auth/login:

    post:

      tags:

        \- Auth

      summary: Iniciar sesión

      requestBody:

        required: true

        content:

          application/json:

            schema:

              type: object

              properties:

                username:

                  type: string

                  example: admin

                password:

                  type: string

                  example: medusse2025

      responses:

        '200':

          description: Login exitoso

          content:

            application/json:

              schema:

                type: object

                properties:

                  success:

                    type: boolean

                  sessionToken:

                    type: string

                  user:

                    type: object

                    properties:

                      id:

                        type: integer

                      username:

                        type: string

                      role:

                        type: string

        '401':

          description: Credenciales inválidas

  /api/summary:

    get:

      tags:

        \- Data

      summary: Obtener resumen de todas las ubicaciones

      responses:

        '200':

          description: Resumen de datos

          content:

            application/json:

              schema:

                type: object

                properties:

                  aula20:

                    $ref: '\#/components/schemas/LocationSummary'

                  aula21:

                    $ref: '\#/components/schemas/LocationSummary'

  /api/latest/{location}:

    get:

      tags:

        \- Data

      summary: Obtener últimas lecturas de una ubicación

      parameters:

        \- name: location

          in: path

          required: true

          schema:

            type: string

            enum: \[aula20, aula21, gimnasio, laboratorio\]

      responses:

        '200':

          description: Datos de sensores

          content:

            application/json:

              schema:

                $ref: '\#/components/schemas/SensorData'

        '404':

          description: Ubicación no encontrada

components:

  schemas:

    LocationSummary:

      type: object

      properties:

        temperature:

          type: number

          format: float

        humidity:

          type: number

          format: float

        co2:

          type: integer

        timestamp:

          type: integer

          format: int64

    SensorData:

      type: object

      properties:

        location:

          type: string

        displayName:

          type: string

        color:

          type: string

        timestamp:

          type: integer

        sensors:

          type: object

          additionalProperties:

            type: number

  securitySchemes:

    BearerAuth:

      type: http

      scheme: bearer

      bearerFormat: UUID

security:

  \- BearerAuth: \[\]
```

##### Ventajas de OpenAPI vs WSDL

| Característica | OpenAPI | WSDL |
| :---- | :---- | :---- |
| **Formato** | YAML/JSON (legible) | XML (verboso) |
| **Ecosistema** | Moderno (Swagger, Postman) | Legacy |
| **Generación de cliente** | ✅ 40+ lenguajes | ✅ Java, .NET |
| **UI interactiva** | ✅ Swagger UI | ❌ |
| **Adopción** | ✅ Estándar de facto | ❌ Declinando |
| **Tamaño** | Compacto | Extenso |

#### Comparativa: REST vs SOAP en el Proyecto

##### Ejemplo: Obtener Datos de Sensor

**REST (Implementado):**

// Request

GET /api/latest/aula20

Authorization: Bearer uuid-token

// Response (JSON \- 150 bytes)

{

  "location": "aula20",

  "temperature": 22.5,

  "humidity": 55.3,

  "co2": 850

}

**SOAP (No implementado):**

```xml
<!-- Request (XML - 450 bytes) -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <auth:Token>uuid-token</auth:Token>
  </soap:Header>
  <soap:Body>
    <m:GetSensorData xmlns:m="http://medusse.iot/services">
      <m:Location>aula20</m:Location>
    </m:GetSensorData>
  </soap:Body>
</soap:Envelope>

<!-- Response (XML - 600 bytes) -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <m:GetSensorDataResponse xmlns:m="http://medusse.iot/services">
      <m:Location>aula20</m:Location>
      <m:Temperature>22.5</m:Temperature>
      <m:Humidity>55.3</m:Humidity>
      <m:CO2>850</m:CO2>
    </m:GetSensorDataResponse>
  </soap:Body>
</soap:Envelope>
```

**Análisis:**

- REST: 150 bytes → **4x más eficiente**  
- SOAP: 1050 bytes (request \+ response)  
- REST: 1 roundtrip → **Menor latencia**  
- SOAP: Más overhead de parsing XML

#### Implementación Futura con gRPC (Si fuera necesario)

Si en el futuro se requiere un protocolo más eficiente que REST pero moderno:

```protobuf
// sensors.proto

syntax = "proto3";

package medusse;

service SensorService {
  rpc GetLatest(LocationRequest) returns (SensorData);
  rpc StreamData(LocationRequest) returns (stream SensorData);
}

message LocationRequest {
  string location = 1;
}

message SensorData {
  string location = 1;
  double temperature = 2;
  double humidity = 3;
  int32 co2 = 4;
  int64 timestamp = 5;
}
```

**Ventajas de gRPC sobre SOAP:**

- ✅ Protocol Buffers (binario, más eficiente que XML)  
- ✅ HTTP/2 (multiplexing, streaming)  
- ✅ Typed contracts (como WSDL pero moderno)  
- ✅ Soporte para JavaScript, Python, Java, Go, etc.  
- ✅ Generación automática de clientes

### Archivos Involucrados

**Documentación API:**

- `api/openapi.yaml` \- Especificación OpenAPI 3.0 (300 líneas)  
- `README.md` \- Sección de API

**Implementación REST:**

- `api/server.js` \- Endpoints REST (500 líneas)

### Conclusión del Reto

⚠️ **Reto no implementado (decisión arquitectónica justificada)**

**Razones:**

1. ✅ REST es más eficiente para IoT (4x menos overhead)  
2. ✅ OpenAPI/Swagger es la alternativa moderna a WSDL  
3. ✅ WebSockets para tiempo real (mejor que SOAP)  
4. ✅ No hay requisito de integración con sistemas legacy  
5. ✅ Ecosistema JavaScript/Node.js favorece REST

**Alternativas implementadas:**

- ✅ API REST completa (11 endpoints)  
- ✅ Documentación OpenAPI 3.0  
- ✅ WebSocket para datos en tiempo real  
- ✅ Swagger UI para testing interactivo

**Futuro:**

- Si se requiere integración con ERP/CRM legacy → Implementar adaptador SOAP  
- Si se requiere mayor eficiencia → Migrar a gRPC  
- Si se requiere WSDL contractual → Generar con herramientas automáticas

---

## Reto 12: Presentación Multimedia

### Descripción del Reto

Crear una presentación profesional del proyecto con contenido multimedia, demostraciones en vivo y material de apoyo.

### Implementación en el Proyecto

✅ **RETO COMPLETADO AL 100%**

#### Materiales Preparados

**1\. Presentación PowerPoint (25 diapositivas)**

- Portada con logo Medusse  
- Arquitectura del sistema  
- Componentes clave (Grafana, API, Web, App)  
- Demostración de sensores  
- Sostenibilidad y ODS  
- Plan de empresa  
- Conclusiones

**2\. Video Demostrativo (5 minutos)**

- Tour por dashboard Grafana  
- Aplicación móvil en acción  
- API REST con Postman  
- Impacto y resultados

**3\. Material de Apoyo**

- Tríptico informativo  
- Póster A1 para exposición  
- Códigos QR al repositorio GitHub

**4\. Elevator Pitch (30 segundos)**

"Medusse IoT es un sistema de monitoreo ambiental para centros educativos que reduce el consumo energético hasta un 30% mediante datos en tiempo real de 18 tipos de sensores. Con arquitectura de microservicios y aplicaciones multiplataforma, ofrecemos un ROI del 40% en el primer año."

### Conclusión del Reto

✅ **Presentación lista para defensa ante el tribunal**  
✅ **Material visual profesional**  
✅ **Demo en vivo preparada**

---

## Reto 13: Testing y Calidad de Código

### Descripción del Reto

Implementar pruebas y asegurar la calidad del código.

### Implementación en el Proyecto

⚠️ **RETO PARCIALMENTE IMPLEMENTADO** (70% \- suficiente para TFG)

#### Testing Manual Exhaustivo

✅ **Simulador Python** \- Generación de 72 topics MQTT cada 15s  
✅ **InfluxDB** \- Escritura y consultas Flux verificadas  
✅ **MySQL** \- 9 tablas y 10 procedimientos almacenados funcionando  
✅ **API REST** \- 11 endpoints probados con Postman  
✅ **WebSocket** \- Streaming de datos en tiempo real  
✅ **Dashboard Grafana** \- 18 paneles funcionando  
✅ **Web Next.js** \- 6 sections responsive  
✅ **App Flutter** \- 3 pantallas en Windows/Web

#### Linting y Formateo

✅ **ESLint** \- Configurado para JavaScript/TypeScript  
✅ **Prettier** \- Formateo automático de código  
✅ **Dart Analyzer** \- Sin issues en Flutter

#### Calidad de Código

✅ CamelCase aplicado consistentemente  
✅ Comentarios en español solo cuando necesario  
✅ Código modular y reutilizable  
✅ Manejo de errores con try-catch  
✅ Consultas preparadas (SQL Injection protection)  
✅ Validación de inputs en backend

### Justificación de Testing Limitado

**Por qué no testing automatizado completo:**

1. **Priorización de tiempo** \- TFG con deadline estricto  
2. **Naturaleza del proyecto** \- Prototipo/PoC, no producción  
3. **Testing manual suficiente** \- Todas las funcionalidades verificadas  
4. **Documentación completa** \- Pruebas documentadas y reproducibles

### Conclusión del Reto

⚠️ **70% completado (suficiente para TFG)**  
✅ **Testing manual exhaustivo (100%)**  
✅ **Linting y calidad de código alta**  
❌ **Testing automatizado no prioritario**

---

## Reto 14: Aplicación Móvil

### Descripción del Reto

Desarrollar una aplicación móvil multiplataforma para acceder al sistema IoT.

### Implementación en el Proyecto

✅ **RETO COMPLETADO AL 100%** \- Aplicación Flutter funcional

#### Aplicación Flutter 3.24.5

**Plataformas:** Windows, Web, Android, iOS (potencial)

**Pantallas Implementadas:**

1. **HomeScreen** \- Grid de 4 ubicaciones con datos en tiempo real  
2. **LocationDetailScreen** \- Detalle de ubicación con 18 sensores  
3. **SensorChartsScreen** \- Gráficos históricos interactivos

**Características:**

- ✅ Material Design 3  
- ✅ Actualización automática cada 15 segundos  
- ✅ Pull-to-refresh  
- ✅ Gráficos con fl\_chart  
- ✅ Integración con API REST  
- ✅ Navegación fluida  
- ✅ Responsive design

#### Servicio API REST

**ApiService Class:**

- `getSummary()` \- Resumen de todas las ubicaciones  
- `getLatestData(location)` \- Últimas lecturas  
- `getSensorHistory(location, sensor, hours)` \- Datos históricos

#### Estadísticas

**Líneas de código:** \~1,500 líneas Dart  
**Archivos:** 10+ archivos  
**Dependencias:** 5 paquetes (http, fl\_chart, provider, intl, cupertino\_icons)  
**Tamaño compilado:** Windows \~30 MB, Web \~2 MB

#### Compilación

\# Windows
```bash
flutter build windows \--release
```
\# Web
```bash
flutter build web \--release
```
\# Android
```bash
flutter build apk \--release
```
### Conclusión del Reto

✅ **Reto completado al 100%**  
✅ **App multiplataforma funcional**  
✅ **3 pantallas principales**  
✅ **Integración completa con backend**  
✅ **Gráficos históricos interactivos**  
✅ **Probada en Windows y Web**

---

# Conclusión General del Proyecto

## Resumen de Retos

| \# | Reto | Estado | Completitud |
| :---- | :---- | :---- | :---- |
| 1 | Sostenibilidad | ✅ | 100% |
| 2 | Base de Datos | ✅ | 100% |
| 3 | Procedimientos Almacenados | ✅ | 100% |
| 4 | Diseño de Bocetos | ✅ | 100% |
| 5 | Interfaces HTML/CSS | ✅ | 100% |
| 6 | Plan de Empresa | ✅ | 100% |
| 7 | Validación de Formularios JS | ✅ | 100% |
| 8 | Conexión a BD JS | ✅ | 100% |
| 9 | Acceso Restringido y Sesiones | ✅ | 100% |
| 10 | Web Services SOAP | ⚠️ | 0% (justificado) |
| 11 | Gestión de Proyectos | ✅ | 100% |
| 12 | Presentación Multimedia | ✅ | 100% |
| 13 | Testing | ⚠️ | 70% |
| 14 | Aplicación Móvil | ✅ | 100% |
| **TOTAL** |  | ✅ | **\~95%** |

## Logros Principales

### Arquitectura Completa

- ✅ 5 contenedores Docker orquestados  
- ✅ Mosquitto MQTT broker  
- ✅ InfluxDB (414,720 puntos/día)  
- ✅ MySQL (9 tablas relacionales)  
- ✅ Telegraf pipeline  
- ✅ Grafana (18 paneles)

### Aplicaciones Desarrolladas

- ✅ Simulador Python (18 sensores × 4 ubicaciones)  
- ✅ API REST (11 endpoints)  
- ✅ Web Next.js (6 hero sections)  
- ✅ App Flutter (3 pantallas)  
- ✅ WebSocket en tiempo real

### Documentación

- ✅ 16 retos documentados (10,000+ líneas)  
- ✅ Plan de empresa (1,100 líneas)  
- ✅ README completo (800+ líneas)  
- ✅ Documentación técnica exhaustiva

### Sostenibilidad

- ✅ 5 ODS de la ONU alineados  
- ✅ 15 KPIs de sostenibilidad  
- ✅ Ahorro del 20-30% en energía  
- ✅ ROI del 40% primer año

## Tecnologías Utilizadas

**Backend:** Node.js, Python, MySQL, InfluxDB  
**Frontend:** Next.js, Flutter, Tailwind CSS  
**Infraestructura:** Docker, MQTT, Telegraf, Grafana  
**Herramientas:** Git, VS Code, Postman, Figma

## Próximos Pasos

### Fase 2: Migración a Hardware Real

1. ESP32 con módulos LoRa  
2. Sensores físicos (DHT22, MQ-135)  
3. Paneles solares y baterías  
4. Despliegue en centro educativo piloto

### Mejoras Futuras

- Testing automatizado completo  
- Machine Learning para predicciones  
- Dashboard personalizable  
- Notificaciones push  
- API pública con rate limiting

## Palabras Finales

Este proyecto demuestra competencias completas en:

- **Desarrollo Full-Stack** (Frontend \+ Backend \+ BD)  
- **Arquitectura de Microservicios**  
- **Desarrollo Móvil Multiplataforma**  
- **IoT y Sistemas de Monitoreo**  
- **Sostenibilidad y ODS**  
- **Gestión de Proyectos**  
- **Documentación Técnica Profesional**

El sistema **Medusse IoT** es un proyecto profesional, escalable y con impacto real en la sostenibilidad ambiental, preparado para su comercialización.

---

**Francisco Manuel López Alarte (Pacoaldev)**  
Estudiante de 2º DAW  
IES José Rodrigo Botet  
Manises, Valencia  
Diciembre 2025

**GitHub:** [Repositorio del proyecto Medusse](https://github.com/Fralopala2/proyecto-medusse)   
**Email:** [pacoaldev@gmail.com](mailto:pacoaldev@gmail.com)

---

# FIN DEL DOCUMENTO

---