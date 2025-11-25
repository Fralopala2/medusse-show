# Reto 6: Plan de Empresa - Medusse IoT

**Plan de Negocio para Comercializacion del Sistema IoT de Monitorizacion Ambiental**

---

## Informacion del Proyecto

**Titulo:** Plan de Empresa - Medusse IoT  
**Autor:** Francisco Manuel Lopez Alarte  
**Email:** pacoaldev@gmail.com  
**Institucion:** IES Jose Rodrigo Botet  
**Curso Academico:** 2025/2026  
**Fecha:** Noviembre 2025

---

## 1. Resumen Ejecutivo

Medusse IoT es un ecosistema completo de monitorizacion ambiental llave en mano que integra hardware ESP32, comunicacion MQTT, bases de datos de series temporales, visualizacion profesional con Grafana, API REST y aplicaciones cliente multiplataforma. El sistema monitoriza 18 tipos de sensores para medir calidad del aire, consumo energetico, calidad del agua y parametros ambientales.

Este plan de empresa presenta el modelo de negocio, estructura de costes, estrategia comercial, precios recomendados, proyecciones financieras, analisis de riesgos y hoja de ruta para lanzar la oferta al mercado, dirigida principalmente a instituciones educativas, edificios inteligentes y empresas que buscan mejorar su eficiencia y sostenibilidad.

### Vision

Convertir a Medusse IoT en la solucion de referencia para monitorizacion ambiental en instituciones educativas y edificios inteligentes en España, expandiendose posteriormente a nivel europeo.

### Mision

Proporcionar sistemas de monitorizacion ambiental accesibles, faciles de instalar y mantener, que permitan a organizaciones tomar decisiones basadas en datos para mejorar la salud, eficiencia energetica y sostenibilidad.

### Valores

- **Sostenibilidad:** Contribuir a la reduccion del impacto ambiental
- **Innovacion:** Tecnologia moderna y escalable
- **Educacion:** Herramienta para concienciacion ambiental
- **Accesibilidad:** Soluciones al alcance de instituciones educativas
- **Calidad:** Productos y servicios profesionales

---

## 2. Modelo de Negocio

### Producto y Servicio

#### Hardware
- **Nodos ESP32 con sensores ambientales** (DHT22, BME680)
- **Nodos ESP32 con sensores de agua** (pH, TDS, flujo, oxigeno disuelto)
- **Nodos ESP32 con panel solar y bateria** (autonomia energetica)
- **Gateways LoRa** (Raspberry Pi 4 con modulo LoRa)
- **Sensores individuales** para expansion

#### Software
- **Sistema desplegable en Docker** (InfluxDB, Grafana, Telegraf, MySQL, MQTT)
- **Dashboard Grafana personalizado** con branding y alertas
- **API REST** con 7 endpoints y WebSocket
- **Aplicacion web Next.js** con dashboard en tiempo real
- **Aplicacion movil Flutter** multiplataforma (Windows, Web, Android, iOS)

#### Servicios
- **Instalacion completa** del sistema
- **Configuracion por nodo** ESP32
- **Soporte tecnico especializado** (remoto y presencial)
- **Mantenimiento anual** con SLA
- **Formacion personalizada** para administradores y usuarios
- **Integracion LoRa Mesh** para despliegues extensos
- **Hosting y backup** en la nube (opcional)

### Clientes Objetivo

#### Mercado Primario
1. **Instituciones Educativas**
   - Colegios e institutos (IES)
   - Universidades y centros de formacion
   - Centros de investigacion

2. **Administradores de Edificios**
   - Facility management
   - Edificios inteligentes
   - Centros deportivos

3. **Empresas Especializadas**
   - Laboratorios
   - Viveros e invernaderos
   - Piscinas y spas
   - Instalaciones industriales

#### Mercado Secundario
- Ayuntamientos (edificios publicos)
- Hospitales y centros de salud
- Hoteles y centros turisticos
- Oficinas corporativas

### Propuesta de Valor

1. **Instalacion Rapida y Reproducible**
   - Despliegue con Docker en menos de 5 minutos
   - Scripts automatizados para Windows y Linux
   - Documentacion completa y accesible

2. **Monitorizacion Integral**
   - 18 tipos de sensores (aire, agua, energia)
   - Dashboard profesional con Grafana
   - Alertas automaticas configurables
   - Datos historicos para analisis

3. **Escalable y Flexible**
   - Arquitectura basada en MQTT
   - Compatible con LoRa Mesh para despliegues extensos
   - Facil agregar nuevas ubicaciones y sensores
   - API REST para integraciones personalizadas

4. **Herramienta Educativa**
   - Ideal para proyectos educativos
   - Concienciacion sobre sostenibilidad
   - Datos reales para aprendizaje
   - Formacion en tecnologias IoT

5. **Soporte Local**
   - Equipo tecnico en España
   - Soporte en español
   - Formacion presencial disponible
   - Mantenimiento y actualizaciones

---

## 3. Oferta y Paquetes Comerciales

### Costes Unitarios Base

#### Hardware
- Nodo ESP32 + Sensores Ambientales: 150€
- Nodo ESP32 + Sensores de Agua: 180€
- Nodo ESP32 + Panel Solar + Bateria: 200€
- Gateway LoRa (Raspberry Pi 4): 250€
- Sensor DHT22 individual: 15€
- Sensor BME680 individual: 25€
- Sensor pH individual: 30€
- Modulo LoRa SX1276: 20€

#### Servicios
- Instalacion Completa: 500€
- Configuracion por Nodo: 100€/nodo
- Mantenimiento Anual: 600€/año
- Soporte Tecnico: 50€/hora
- Formacion: 300€/dia
- Integracion LoRa Mesh: 200€
- Panel de Administracion: 100€
- Sistema de Alertas Avanzado: 50€

### Paquetes Comerciales

#### Paquete STARTER - Pack Aula
**Ideal para:** 1 aula o espacio pequeño (2 ubicaciones)

**Incluye:**
- 2 nodos ambientales (2 × 150€ = 300€)
- Instalacion y configuracion (500€ + 2×100€ = 700€)
- Dashboard Grafana personalizado
- API REST y WebSocket
- Aplicacion web Next.js
- Documentacion completa

**Precio:** 1.200€ (pago unico)  
**Mantenimiento opcional:** 600€/año o 60€/mes

**Beneficios:**
- Monitorizacion de temperatura, humedad, CO2, presion, VOC, IAQ
- Alertas automaticas por umbrales
- Acceso desde cualquier dispositivo
- Datos historicos ilimitados

#### Paquete STANDARD - Pack Centro Pequeño
**Ideal para:** Centro educativo pequeño (4 ubicaciones)

**Incluye:**
- 4 nodos ambientales (4 × 150€ = 600€)
- 1 gateway LoRa (250€)
- Instalacion y configuracion (500€ + 4×100€ = 900€)
- Dashboard Grafana con filtros avanzados
- API REST completa
- Aplicacion movil Flutter
- Soporte basico 3 meses

**Precio:** 2.750€ (pago unico)  
**Mantenimiento opcional:** 600€/año o 60€/mes  
**Hosting avanzado:** +30€/mes

**Beneficios:**
- Monitorizacion de 4 ubicaciones simultaneas
- Comunicacion LoRa de bajo consumo
- App movil para acceso remoto
- Graficos historicos interactivos
- Sistema de alertas por ubicacion

#### Paquete PREMIUM - Pack Completo
**Ideal para:** Centro educativo completo o edificio inteligente

**Incluye:**
- 4 nodos ambientales (4 × 150€ = 600€)
- 1 nodo agua (180€)
- 1 nodo solar + bateria (200€)
- 1 gateway LoRa (250€)
- Integracion LoRa + Panel Admin + Alertas (200€ + 100€ + 50€ = 350€)
- Instalacion y configuracion (500€ + 6×100€ = 1.100€)
- Formacion presencial 1 dia (300€)
- Soporte prioritario 6 meses

**Precio:** 3.580€ (pago unico)  
**Mantenimiento recomendado:** 900€/año o 90€/mes (SLA ampliado)

**Beneficios:**
- Monitorizacion completa: aire + agua + energia
- Gestion de energia solar y baterias
- Panel de administracion de usuarios
- Alertas avanzadas personalizables
- Formacion completa del equipo
- Soporte prioritario

### Opciones Adicionales

#### Expansion de Sensores
- Sensor adicional de agua: 180€ + 100€ configuracion
- Nodo solar adicional: 200€ + 100€ configuracion
- Sensores individuales: desde 15€

#### Servicios Profesionales
- Consultoria de optimizacion: 50€/hora
- Desarrollo de integraciones personalizadas: desde 500€
- Formacion adicional: 300€/dia
- Soporte on-site: 50€/hora + desplazamiento

#### Hosting y Cloud
- Hosting basico (30 dias retencion): 30€/mes
- Hosting avanzado (1 año retencion): 60€/mes
- Hosting premium (ilimitado + backup): 100€/mes

---

## 4. Estructura de Costes y Margenes

### Analisis de Costes por Paquete

#### Paquete STARTER (1.200€)
**Costes Directos:**
- Hardware: 2×150€ = 300€
- Instalacion: 500€
- Configuracion: 2×100€ = 200€
- **Total COGS:** 1.000€

**Margen Bruto:** 1.200€ - 1.000€ = 200€ (16.7%)

#### Paquete STANDARD (2.750€)
**Costes Directos:**
- Hardware: 4×150€ + 250€ = 850€
- Instalacion: 500€
- Configuracion: 4×100€ = 400€
- **Total COGS:** 1.750€

**Margen Bruto:** 2.750€ - 1.750€ = 1.000€ (36.4%)

#### Paquete PREMIUM (3.580€)
**Costes Directos:**
- Hardware: 600€ + 180€ + 200€ + 250€ = 1.230€
- Software adicional: 350€
- Instalacion: 500€
- Configuracion: 6×100€ = 600€
- Formacion: 300€
- **Total COGS:** 2.980€

**Margen Bruto:** 3.580€ - 2.980€ = 600€ (16.8%)

### Ingresos Recurrentes

#### Mantenimiento Anual
- **Coste:** 100€/año (actualizaciones, soporte basico)
- **Precio:** 600€/año
- **Margen:** 500€ (83.3%)

#### Hosting Cloud
- **Coste:** 10€/mes (servidor, backup)
- **Precio:** 30-100€/mes
- **Margen:** 20-90€/mes (66-90%)

#### Soporte Tecnico
- **Coste:** 25€/hora (tecnico)
- **Precio:** 50€/hora
- **Margen:** 25€/hora (50%)

### Estrategia de Precios

1. **Hardware + Instalacion:** Margen moderado (15-35%) para competitividad
2. **Servicios Recurrentes:** Margen alto (50-85%) para rentabilidad
3. **Formacion y Consultoria:** Margen medio (40-50%) por valor añadido
4. **Descuentos por Volumen:** 10-20% para despliegues >10 ubicaciones

---

## 5. Proyecciones Financieras (Año 1)

### Supuestos Base

- **Precio medio por cliente:** 2.500€ (mix de paquetes)
- **COGS medio:** 1.700€
- **Margen bruto medio:** 800€ por cliente (32%)
- **Tasa de conversion mantenimiento:** 60%
- **Precio mantenimiento:** 600€/año

### Escenario Conservador (5 clientes)

**Ingresos One-Time:**
- 5 clientes × 2.500€ = 12.500€

**Costes Directos:**
- 5 clientes × 1.700€ = 8.500€

**Margen Bruto One-Time:** 4.000€

**Ingresos Recurrentes (Año 1):**
- 5 × 60% × 600€ = 1.800€
- Margen (83%): 1.500€

**Resultado Bruto Total:** 5.500€

### Escenario Esperado (15 clientes)

**Ingresos One-Time:**
- 15 clientes × 2.500€ = 37.500€

**Costes Directos:**
- 15 clientes × 1.700€ = 25.500€

**Margen Bruto One-Time:** 12.000€

**Ingresos Recurrentes (Año 1):**
- 15 × 60% × 600€ = 5.400€
- Margen (83%): 4.500€

**Resultado Bruto Total:** 16.500€

### Escenario Ambicioso (30 clientes)

**Ingresos One-Time:**
- 30 clientes × 2.500€ = 75.000€

**Costes Directos:**
- 30 clientes × 1.700€ = 51.000€

**Margen Bruto One-Time:** 24.000€

**Ingresos Recurrentes (Año 1):**
- 30 × 60% × 600€ = 10.800€
- Margen (83%): 9.000€

**Resultado Bruto Total:** 33.000€

### Costes Fijos Estimados (Año 1)

**Desarrollo y Preparacion:**
- Desarrollo adicional y pruebas: 8.000€
- Certificaciones y homologaciones: 2.000€
- Documentacion y material comercial: 1.000€
- **Subtotal:** 11.000€

**Stock Inicial:**
- Hardware para 10 despliegues: 8.500€
- Margen de seguridad: 1.500€
- **Subtotal:** 10.000€

**Marketing y Ventas:**
- Sitio web y material digital: 2.000€
- Ferias y eventos: 3.000€
- Campañas publicitarias: 2.000€
- **Subtotal:** 7.000€

**Operaciones:**
- Herramientas y software: 1.000€
- Gastos administrativos: 2.000€
- Seguros y legal: 1.000€
- **Subtotal:** 4.000€

**Personal (Part-time/Freelance):**
- Desarrollo y soporte tecnico: 6.000€
- Comercial y atencion cliente: 4.000€
- **Subtotal:** 10.000€

**Total Costes Fijos Año 1:** 42.000€

### Punto de Equilibrio (Break-Even)

**Margen medio por cliente:** 800€  
**Costes fijos:** 42.000€

**Clientes necesarios para break-even:** 42.000€ / 800€ = **53 clientes**

**Considerando ingresos recurrentes:**
- Margen adicional por mantenimiento: 500€ × 60% = 300€
- Margen total por cliente: 800€ + 300€ = 1.100€
- **Clientes necesarios:** 42.000€ / 1.100€ = **39 clientes**

### Proyeccion de Beneficio Neto

#### Escenario Conservador (5 clientes)
- Resultado bruto: 5.500€
- Costes fijos: 42.000€
- **Resultado neto:** -36.500€ (perdida)

#### Escenario Esperado (15 clientes)
- Resultado bruto: 16.500€
- Costes fijos: 42.000€
- **Resultado neto:** -25.500€ (perdida)

#### Escenario Ambicioso (30 clientes)
- Resultado bruto: 33.000€
- Costes fijos: 42.000€
- **Resultado neto:** -9.000€ (perdida)

**Conclusion:** Se necesitan 39-53 clientes en el primer año para alcanzar el punto de equilibrio. Esto requiere una estrategia comercial agresiva o reduccion de costes fijos iniciales.

### Proyeccion Año 2 (Escenario Esperado)

**Supuestos:**
- Base de 15 clientes del año 1
- 25 clientes nuevos en año 2
- Renovacion de mantenimiento: 80%
- Costes fijos reducidos: 30.000€ (operacion establecida)

**Ingresos:**
- Nuevos clientes: 25 × 2.500€ = 62.500€
- Mantenimiento año 1: 15 × 80% × 600€ = 7.200€
- Mantenimiento año 2: 25 × 60% × 600€ = 9.000€
- **Total ingresos:** 78.700€

**Costes:**
- COGS nuevos: 25 × 1.700€ = 42.500€
- Costes mantenimiento: (12 + 15) × 100€ = 2.700€
- Costes fijos: 30.000€
- **Total costes:** 75.200€

**Resultado neto año 2:** 3.500€ (beneficio)

---

## 6. Estrategia de Comercializacion (Go-to-Market)

### Canales de Venta

#### Canal Directo
1. **Demos y PoC Gratuitos**
   - Instalacion piloto en 2-3 centros educativos locales
   - Demostracion en vivo del sistema completo
   - Casos de uso documentados

2. **Ventas Directas**
   - Equipo comercial: 1 comercial + 1 tecnico preventa
   - Proceso: contacto → demo → propuesta → PoC → despliegue
   - CRM para seguimiento de oportunidades

3. **Marketing Digital**
   - Landing page con casos de uso y dashboards en vivo
   - Blog con articulos tecnicos y casos de exito
   - SEO para palabras clave: "monitorizacion ambiental", "IoT educativo"
   - Campañas en LinkedIn y Google Ads

#### Canal Indirecto
1. **Alianzas con Distribuidores**
   - Distribuidores de hardware IoT
   - Empresas de instalacion electrica
   - Integradores de sistemas
   - Comision: 15-20% sobre venta

2. **Partners Tecnologicos**
   - Empresas de facility management
   - Consultoras de eficiencia energetica
   - Empresas de climatizacion

### Estrategias de Marketing

#### Marketing de Contenidos
- **Blog tecnico:** Articulos sobre IoT, sostenibilidad, casos de uso
- **Webinars:** Demostraciones en vivo y formacion
- **Casos de estudio:** Documentar resultados de clientes piloto
- **Videos:** Tutoriales de instalacion y uso

#### Marketing en Eventos
- **Ferias tecnologicas:** SIMO Educacion, IoT Solutions World Congress
- **Eventos educativos:** Congresos de directores, jornadas de innovacion
- **Workshops:** Talleres practicos en centros educativos
- **Demostraciones:** Stand con sistema funcionando en vivo

#### Marketing Digital
- **SEO:** Posicionamiento organico para palabras clave relevantes
- **SEM:** Campañas de Google Ads segmentadas
- **LinkedIn:** Contenido B2B y networking
- **Email marketing:** Newsletter mensual con novedades

### Proceso de Ventas

#### Fase 1: Prospecting (Semanas 1-2)
- Identificacion de clientes potenciales
- Contacto inicial (email, telefono, LinkedIn)
- Calificacion de oportunidades (BANT)
- Agendamiento de demo

#### Fase 2: Demo y Presentacion (Semana 3)
- Demostracion online o presencial
- Presentacion de casos de uso relevantes
- Discusion de necesidades especificas
- Propuesta de solucion personalizada

#### Fase 3: Propuesta Comercial (Semana 4)
- Elaboracion de propuesta tecnica y economica
- Presentacion de ROI y beneficios
- Negociacion de condiciones
- Respuesta a objeciones

#### Fase 4: PoC (Semanas 5-8)
- Instalacion piloto en 1-2 ubicaciones
- Formacion basica del equipo
- Recopilacion de datos durante 2-4 semanas
- Evaluacion de resultados

#### Fase 5: Cierre y Despliegue (Semanas 9-12)
- Firma de contrato
- Despliegue completo del sistema
- Formacion completa del equipo
- Entrega de documentacion

### Estrategias de Conversion

#### Ofertas Limitadas
- **Early Bird:** 20% descuento en instalacion para primeros 10 clientes
- **Referidos:** 10% descuento por cada cliente referido
- **Paquete completo:** Mantenimiento primer año gratis si se contrata en el momento

#### Programa Escuela Embajadora
- Descuento del 30% para centros que actuen como referencia
- Visitas de clientes potenciales
- Casos de estudio documentados
- Testimonios y videos

#### Financiacion
- **Pago aplazado:** 50% al inicio, 50% a 30 dias
- **Renting:** Opcion de pago mensual (hardware + servicio)
- **Leasing:** Para despliegues grandes (>10.000€)

### KPIs de Marketing y Ventas

#### Marketing
- **CAC (Coste de Adquisicion de Cliente):** Objetivo ≤ 800€
- **Leads mensuales:** Objetivo 20-30 leads cualificados
- **Tasa de conversion lead→demo:** Objetivo 30-40%
- **Coste por lead:** Objetivo ≤ 50€

#### Ventas
- **Tasa de conversion demo→venta:** Objetivo 20-30%
- **Tiempo medio de cierre:** Objetivo 8-12 semanas
- **Ticket medio:** Objetivo 2.500€
- **Tasa de renovacion mantenimiento:** Objetivo 70-80%

---

## 7. Organizacion y Operaciones

### Equipo Inicial (Año 1)

#### Fundador / CEO
- **Responsabilidades:** Estrategia, ventas, relaciones con inversores
- **Dedicacion:** Full-time
- **Compensacion:** Equity + salario minimo

#### Desarrollador Full-Stack / DevOps
- **Responsabilidades:** Mantenimiento software, despliegues, integraciones
- **Dedicacion:** Part-time (50%)
- **Compensacion:** 2.000€/mes (24.000€/año)

#### Tecnico IoT / Instalador
- **Responsabilidades:** Instalaciones, configuracion nodos, soporte tecnico
- **Dedicacion:** Part-time (50%)
- **Compensacion:** 1.500€/mes (18.000€/año)

#### Comercial / Customer Success
- **Responsabilidades:** Ventas, demos, formacion, atencion cliente
- **Dedicacion:** Part-time (50%)
- **Compensacion:** 1.500€/mes + comisiones (20.000€/año)

**Total costes personal año 1:** 62.000€

### Equipo Expansion (Año 2)

- Desarrollador Full-time
- Tecnico adicional
- Comercial Full-time
- Administrativo Part-time

**Total costes personal año 2:** 120.000€

### Operaciones

#### Almacen y Logistica
- **Stock minimo:** Hardware para 5 despliegues
- **Proveedores:** Alianzas con distribuidores de componentes
- **Logistica:** Envio express para instalaciones urgentes
- **Control de inventario:** Sistema de gestion de stock

#### Soporte Tecnico
- **Sistema de tickets:** Zendesk o similar
- **SLA basico:** Respuesta en 24h, resolucion en 72h
- **SLA premium:** Respuesta en 4h, resolucion en 24h
- **Documentacion:** Base de conocimiento online
- **Formacion:** Videos tutoriales y webinars

#### Desarrollo
- **Roadmap trimestral:** Nuevas funcionalidades y mejoras
- **Testing:** QA antes de cada release
- **Actualizaciones:** Releases mensuales
- **Feedback:** Sistema de sugerencias de clientes

#### Calidad
- **Pruebas de hardware:** Testing de cada nodo antes de envio
- **Certificaciones:** CE, RoHS para componentes
- **Garantia:** 2 años en hardware, 1 año en instalacion
- **Satisfaccion:** Encuestas post-instalacion y trimestrales

---

## 8. Analisis de Riesgos y Mitigacion

### Riesgos Comerciales

#### Riesgo: Competencia de soluciones establecidas
**Probabilidad:** Alta  
**Impacto:** Alto

**Mitigacion:**
- Posicionamiento en nicho educativo con paquete llave en mano
- Enfasis en soporte local y formacion
- Precio competitivo para instituciones educativas
- Diferenciacion por facilidad de instalacion

#### Riesgo: Falta de adopcion por costes iniciales
**Probabilidad:** Media  
**Impacto:** Alto

**Mitigacion:**
- Opciones de financiacion y renting
- Demostracion de ROI con casos de uso
- Ofertas de lanzamiento con descuentos
- Programa de escuelas embajadoras

#### Riesgo: Ciclo de ventas largo en instituciones publicas
**Probabilidad:** Alta  
**Impacto:** Medio

**Mitigacion:**
- Diversificar cartera de clientes (publico + privado)
- Proceso de PoC rapido para acelerar decision
- Alianzas con distribuidores homologados
- Financiacion para facilitar aprobacion presupuestaria

### Riesgos Tecnicos

#### Riesgo: Hardware defectuoso u obsolescencia
**Probabilidad:** Media  
**Impacto:** Medio

**Mitigacion:**
- Acuerdos con proveedores de calidad
- Pruebas de QA exhaustivas
- Garantia de 2 años
- Plan de recambio y reciclaje
- Diseño modular para actualizaciones

#### Riesgo: Problemas de conectividad o integracion
**Probabilidad:** Media  
**Impacto:** Medio

**Mitigacion:**
- Pruebas en entorno real antes de despliegue
- Soporte tecnico especializado
- Documentacion detallada de troubleshooting
- Actualizaciones remotas de firmware

#### Riesgo: Escalabilidad del sistema
**Probabilidad:** Baja  
**Impacto:** Alto

**Mitigacion:**
- Arquitectura diseñada para escalabilidad
- Pruebas de carga y stress testing
- Migracion a LoRa Mesh para despliegues grandes
- Infraestructura cloud elastica

### Riesgos Operacionales

#### Riesgo: Falta de recursos para soporte
**Probabilidad:** Media  
**Impacto:** Alto

**Mitigacion:**
- Documentacion completa y autoservicio
- Sistema de tickets priorizado
- Contratacion escalonada segun crecimiento
- Outsourcing de soporte nivel 1

#### Riesgo: Problemas de calidad en instalaciones
**Probabilidad:** Baja  
**Impacto:** Alto

**Mitigacion:**
- Formacion exhaustiva de instaladores
- Checklist de instalacion estandarizado
- Verificacion remota post-instalacion
- Garantia de satisfaccion

### Riesgos Legales y Regulatorios

#### Riesgo: Regulaciones de privacidad de datos (GDPR)
**Probabilidad:** Media  
**Impacto:** Alto

**Mitigacion:**
- Politicas de proteccion de datos claras
- Anonimizacion de datos personales
- Opcion de despliegue on-premise
- Cumplimiento de GDPR desde diseño

#### Riesgo: Certificaciones y homologaciones
**Probabilidad:** Baja  
**Impacto:** Medio

**Mitigacion:**
- Uso de componentes certificados (CE, RoHS)
- Asesoramiento legal especializado
- Presupuesto para certificaciones necesarias

---

## 9. Requerimientos Financieros y Uso de Fondos

### Necesidad de Financiacion Inicial

**Total requerido:** 50.000€

### Uso de Fondos

#### Desarrollo y Producto (30%)
- Desarrollo adicional y optimizaciones: 8.000€
- Integracion LoRa Mesh: 3.000€
- Certificaciones y homologaciones: 2.000€
- Documentacion y material tecnico: 2.000€
- **Subtotal:** 15.000€

#### Stock Inicial (25%)
- Hardware para 15 despliegues: 10.000€
- Componentes de repuesto: 2.000€
- Margen de seguridad: 500€
- **Subtotal:** 12.500€

#### Marketing y Ventas (25%)
- Sitio web profesional: 3.000€
- Material comercial y demos: 2.000€
- Ferias y eventos (3): 4.000€
- Campañas publicitarias: 3.500€
- **Subtotal:** 12.500€

#### Operaciones (20%)
- Herramientas y software: 2.000€
- Gastos administrativos: 3.000€
- Seguros y legal: 2.000€
- Contingencias: 3.000€
- **Subtotal:** 10.000€

### Objetivos con Financiacion

**Año 1 (12 meses):**
- Alcanzar 20-25 despliegues
- Generar 50.000-62.500€ en ingresos
- Establecer 3 casos de exito documentados
- Construir base de clientes recurrentes (12-15 contratos mantenimiento)
- Alcanzar punto de equilibrio operativo

**Año 2 (24 meses):**
- Alcanzar 50+ despliegues acumulados
- Generar 125.000€+ en ingresos
- Expansion a 3 comunidades autonomas
- Equipo de 6-8 personas
- Beneficio neto positivo

### Fuentes de Financiacion

#### Opcion 1: Bootstrapping
- Inversion propia del fundador: 10.000€
- Preventa de 5 paquetes con descuento: 10.000€
- Credito ICO para emprendedores: 30.000€

#### Opcion 2: Business Angels
- Inversion de 1-2 angels: 50.000€
- Equity: 15-20%
- Valoracion pre-money: 200.000-250.000€

#### Opcion 3: Subvenciones
- Subvencion ENISA Jovenes Emprendedores: 25.000€
- Ayudas I+D+i autonomicas: 15.000€
- Credito complementario: 10.000€

**Opcion recomendada:** Combinacion de Opcion 1 + Opcion 3 (bootstrapping + subvenciones)

---

## 10. Hoja de Ruta (18 Meses)

### Fase 1: Preparacion (Meses 0-3)

**Mes 1-2: Desarrollo y Preparacion**
- Finalizar integracion LoRa Mesh
- Preparar kits comerciales (hardware + documentacion)
- Desarrollar material de marketing (web, presentaciones, videos)
- Establecer acuerdos con proveedores

**Mes 3: Lanzamiento Soft**
- Instalacion de 3 PoC en centros educativos locales
- Recopilacion de feedback y ajustes
- Preparacion de casos de estudio
- Formacion de equipo comercial

**Hitos:**
- 3 PoC instalados y funcionando
- Material comercial completo
- Web lanzada
- Primeros casos de estudio

### Fase 2: Lanzamiento (Meses 4-6)

**Mes 4: Go-to-Market**
- Lanzamiento oficial con evento
- Inicio de campañas de marketing digital
- Participacion en primera feria (SIMO Educacion)
- Activacion de canal de distribuidores

**Mes 5-6: Primeras Ventas**
- Cierre de primeros 5-8 clientes de pago
- Instalaciones y formacion
- Seguimiento y soporte
- Refinamiento de procesos

**Hitos:**
- 5-8 clientes de pago
- 1 feria completada
- 2 distribuidores activos
- Proceso de ventas optimizado

### Fase 3: Crecimiento (Meses 7-12)

**Mes 7-9: Escalado**
- Participacion en 2 ferias adicionales
- Expansion a 2 comunidades autonomas adicionales
- Contratacion de tecnico adicional
- Optimizacion de operaciones

**Mes 10-12: Consolidacion**
- Alcanzar 20-25 clientes acumulados
- Establecer base de clientes recurrentes
- Lanzamiento de servicios premium (hosting, alertas avanzadas)
- Preparacion para ronda de financiacion Serie A

**Hitos:**
- 20-25 clientes acumulados
- 12-15 contratos de mantenimiento activos
- Presencia en 3 comunidades autonomas
- Break-even operativo alcanzado

### Fase 4: Expansion (Meses 13-18)

**Mes 13-15: Expansion Regional**
- Apertura de oficina regional
- Contratacion de equipo adicional (2-3 personas)
- Lanzamiento de programa de partners
- Desarrollo de nuevas funcionalidades

**Mes 16-18: Consolidacion y Preparacion**
- Alcanzar 40-50 clientes acumulados
- Optimizacion de margenes y procesos
- Preparacion de expansion internacional
- Evaluacion de ronda Serie A

**Hitos:**
- 40-50 clientes acumulados
- Equipo de 6-8 personas
- Beneficio neto positivo
- Preparados para expansion internacional

---

## 11. Metricas y KPIs de Negocio

### Metricas Financieras

#### Ingresos
- **MRR (Monthly Recurring Revenue):** Objetivo mes 12: 1.500€
- **ARR (Annual Recurring Revenue):** Objetivo año 1: 18.000€
- **Ingresos totales:** Objetivo año 1: 50.000-62.500€
- **Crecimiento mensual:** Objetivo 15-20%

#### Rentabilidad
- **Margen bruto:** Objetivo 30-35%
- **Margen neto:** Objetivo año 2: 10-15%
- **CAC (Customer Acquisition Cost):** Objetivo ≤ 800€
- **LTV (Lifetime Value):** Objetivo ≥ 4.000€
- **Ratio LTV/CAC:** Objetivo ≥ 5:1

### Metricas Operacionales

#### Ventas
- **Clientes nuevos/mes:** Objetivo 2-3
- **Tasa de conversion:** Objetivo 20-30%
- **Tiempo de cierre:** Objetivo 8-12 semanas
- **Ticket medio:** Objetivo 2.500€

#### Clientes
- **Tasa de retencion:** Objetivo 80-90%
- **Tasa de renovacion mantenimiento:** Objetivo 70-80%
- **NPS (Net Promoter Score):** Objetivo ≥ 50
- **CSAT (Customer Satisfaction):** Objetivo ≥ 4.5/5

#### Operaciones
- **Tiempo de instalacion:** Objetivo ≤ 4 horas
- **Tiempo de resolucion tickets:** Objetivo ≤ 48h
- **Uptime del sistema:** Objetivo ≥ 99.5%
- **Tasa de defectos:** Objetivo ≤ 2%

---

## 12. Analisis Competitivo

### Competidores Directos

#### Soluciones IoT Genericas
- **Ventaja competidor:** Marca establecida, mas recursos
- **Nuestra ventaja:** Especializacion en educacion, solucion llave en mano, soporte local

#### Sistemas de Building Management (BMS)
- **Ventaja competidor:** Funcionalidades avanzadas, integracion con HVAC
- **Nuestra ventaja:** Precio accesible, instalacion rapida, enfoque en sostenibilidad

### Competidores Indirectos

#### Soluciones DIY
- **Ventaja competidor:** Precio muy bajo
- **Nuestra ventaja:** Solucion completa, soporte profesional, sin conocimientos tecnicos necesarios

#### Consultoras de Eficiencia Energetica
- **Ventaja competidor:** Experiencia en auditorias
- **Nuestra ventaja:** Monitorizacion continua vs auditoria puntual, datos en tiempo real

### Barreras de Entrada

**Nuestras barreras:**
- Conocimiento tecnico especializado
- Integracion completa de hardware + software
- Casos de uso documentados
- Red de distribuidores

**Barreras para nuevos competidores:**
- Inversion inicial en desarrollo
- Establecimiento de marca
- Red de clientes y casos de exito
- Certificaciones y homologaciones

---

## 13. Estrategia de Salida

### Opciones de Salida (5-7 años)

#### Opcion 1: Adquisicion Estrategica
- **Compradores potenciales:** Empresas de BMS, distribuidores de IoT, utilities
- **Valoracion estimada:** 5-10x EBITDA
- **Timeline:** 5-7 años

#### Opcion 2: Fusion con Competidor
- **Objetivo:** Consolidacion del mercado
- **Valoracion:** Negociable segun sinergias
- **Timeline:** 4-6 años

#### Opcion 3: Crecimiento Organico
- **Objetivo:** Empresa rentable y sostenible
- **Distribucion de dividendos:** A partir año 3-4
- **Timeline:** Indefinido

**Opcion preferida:** Adquisicion estrategica por empresa de BMS o utilities en 5-7 años

---

## 14. Conclusion y Proximos Pasos

### Resumen de Oportunidad

Medusse IoT representa una oportunidad solida en el mercado de monitorizacion ambiental para instituciones educativas y edificios inteligentes. Con una propuesta de valor clara (instalacion rapida, monitorizacion integral, soporte local), precios competitivos y un mercado en crecimiento, el proyecto tiene potencial para alcanzar rentabilidad en 18-24 meses.

### Factores Criticos de Exito

1. **Ejecucion comercial:** Alcanzar 20-25 clientes en año 1
2. **Calidad del producto:** Instalaciones sin problemas, uptime >99%
3. **Satisfaccion del cliente:** NPS >50, renovaciones >70%
4. **Control de costes:** Mantener COGS <70%, CAC <800€
5. **Equipo:** Contratar talento clave en momentos adecuados

### Proximos Pasos Inmediatos

#### Mes 1
1. **Validar precios** con 3-5 clientes potenciales
2. **Preparar material comercial** (presentacion, dossier tecnico, demo)
3. **Establecer acuerdos** con 2 proveedores de hardware
4. **Solicitar subvenciones** ENISA y ayudas autonomicas

#### Mes 2
5. **Instalar 2 PoC** en centros educativos locales
6. **Desarrollar web comercial** con casos de uso
7. **Preparar plan de marketing** detallado
8. **Definir estructura legal** y fiscal

#### Mes 3
9. **Lanzamiento soft** con evento local
10. **Inicio campañas marketing** digital
11. **Primeras reuniones comerciales** con clientes potenciales
12. **Evaluacion y ajuste** de estrategia

### Recomendaciones Finales

1. **Empezar con bootstrapping** para validar modelo antes de buscar inversion
2. **Enfocarse en nicho educativo** antes de expandir a otros sectores
3. **Priorizar calidad y satisfaccion** sobre crecimiento rapido
4. **Construir casos de exito** solidos para facilitar ventas futuras
5. **Mantener costes bajo control** hasta alcanzar break-even

---

## 15. Anexos

### Anexo A: Calculo Detallado de ROI para Cliente

**Escenario:** Centro educativo con 4 aulas (Paquete STANDARD)

**Inversion Inicial:** 2.750€  
**Mantenimiento Anual:** 600€

**Ahorros Anuales Estimados:**
- Optimizacion HVAC (25%): 1.200€/año
- Reduccion consumo agua (40%): 300€/año
- Deteccion temprana problemas: 200€/año
- **Total ahorros:** 1.700€/año

**ROI:**
- Año 1: (1.700€ - 600€) / 2.750€ = 40%
- Payback: 2.750€ / 1.100€ = 2.5 años
- ROI a 5 años: (1.700€ × 5 - 600€ × 5 - 2.750€) / 2.750€ = 100%

### Anexo B: Comparativa de Paquetes

| Caracteristica | STARTER | STANDARD | PREMIUM |
|----------------|---------|----------|---------|
| Precio | 1.200€ | 2.750€ | 3.580€ |
| Nodos ambientales | 2 | 4 | 4 |
| Nodo agua | - | - | 1 |
| Nodo solar | - | - | 1 |
| Gateway LoRa | - | 1 | 1 |
| Instalacion | ✓ | ✓ | ✓ |
| Dashboard Grafana | ✓ | ✓ | ✓ |
| API REST | ✓ | ✓ | ✓ |
| App movil | - | ✓ | ✓ |
| Panel admin | - | - | ✓ |
| Alertas avanzadas | - | - | ✓ |
| Formacion | - | - | 1 dia |
| Soporte | 3 meses | 3 meses | 6 meses |
| Ideal para | 1 aula | Centro pequeño | Centro completo |

### Anexo C: Plantilla de Propuesta Comercial

**Estructura:**
1. Resumen ejecutivo
2. Situacion actual y necesidades
3. Solucion propuesta (paquete + personalizacion)
4. Beneficios y ROI
5. Timeline de implementacion
6. Precio y condiciones
7. Proximos pasos

---

**Documento preparado para:** Presentacion de Reto 6 - Plan de Empresa  
**Fecha:** Noviembre 2025  
**Version:** 1.0  
**Estado:** Completo y listo para presentacion
