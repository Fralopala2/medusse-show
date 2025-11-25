# Reto 1: Proyecto de Sostenibilidad - Medusse IoT

**Sistema IoT de Monitoreo Ambiental para la Sostenibilidad**

---

## Informacion del Proyecto

**Titulo:** Medusse IoT - Sistema de Monitoreo Ambiental Sostenible  
**Autor:** Francisco Manuel Lopez Alarte  
**Email:** pacoaldev@gmail.com  
**Institucion:** IES Jose Rodrigo Botet  
**Curso Academico:** 2025/2026  
**Fecha:** Noviembre 2025

---

## Resumen Ejecutivo

Medusse IoT es un ecosistema completo de monitorizacion ambiental que contribuye directamente a la sostenibilidad mediante la recopilacion y analisis de datos de 18 tipos de sensores distribuidos en multiples ubicaciones. El sistema facilita la toma de decisiones informadas para mejorar la salud ambiental, optimizar la eficiencia energetica y gestionar responsablemente los recursos naturales.

El proyecto integra hardware ESP32, comunicacion MQTT, bases de datos de series temporales, visualizacion profesional con Grafana y aplicaciones cliente multiplataforma, proporcionando una solucion completa para instituciones educativas, empresas y edificios inteligentes que buscan reducir su impacto ambiental.

---

## Objetivos del Documento

1. Demostrar como Medusse IoT es un proyecto de sostenibilidad
2. Identificar beneficios ambientales y sociales concretos del sistema
3. Proponer indicadores (KPIs) para medir el impacto
4. Sugerir mejoras orientadas a aumentar la sostenibilidad
5. Alinear el proyecto con los Objetivos de Desarrollo Sostenible (ODS)

---

## Alineacion con Objetivos de Desarrollo Sostenible (ODS)

### ODS 3 - Salud y Bienestar

**Implementacion en Medusse:**
- Monitorizacion continua de CO2 (ppm)
- Medicion de IAQ (Indice de Calidad del Aire Interior)
- Deteccion de VOC (Compuestos Organicos Volatiles)
- Sistema de alertas cuando se superan umbrales saludables

**Impacto:**
- Mejora de la calidad del aire interior
- Reduccion de riesgos para la salud (dolores de cabeza, fatiga, contagios)
- Identificacion de espacios con mala ventilacion
- Datos para optimizar sistemas de ventilacion

### ODS 6 - Agua Limpia y Saneamiento

**Implementacion en Medusse:**
- Sensor de pH para calidad del agua
- Medicion de TDS (Solidos Disueltos Totales)
- Sensor de flujo de agua (L/min)
- Medicion de oxigeno disuelto (mg/L)

**Impacto:**
- Deteccion temprana de problemas en fuentes de agua
- Monitorizacion de calidad del agua en tiempo real
- Identificacion de fugas y consumo excesivo
- Proteccion de ecosistemas acuaticos

### ODS 7 - Energia Asequible y Limpia

**Implementacion en Medusse:**
- Monitorizacion de voltaje solar (V)
- Medicion de porcentaje de bateria (%)
- Sensor de consumo de energia (mA)
- Estado de carga y modo de bajo consumo
- Contador de wake-ups para optimizacion

**Impacto:**
- Optimizacion del uso de energia solar renovable
- Gestion inteligente de baterias
- Reduccion del consumo energetico mediante duty-cycling
- Datos para evaluar viabilidad de sistemas autonomos
- Fomento de fuentes de energia limpia

### ODS 11 - Ciudades y Comunidades Sostenibles

**Implementacion en Medusse:**
- Monitorizacion de 4 ubicaciones simultaneas
- Dashboard centralizado con datos en tiempo real
- Sistema de alertas automatico
- Aplicaciones web y movil para acceso ubicuo

**Impacto:**
- Gestion eficiente de edificios educativos
- Optimizacion de climatizacion y ventilacion
- Datos para politicas de gestion de espacios
- Mejora del confort y eficiencia en aulas

### ODS 13 - Accion por el Clima

**Implementacion en Medusse:**
- Recopilacion de datos ambientales historicos
- Analisis de tendencias temporales
- Visualizacion de patrones climaticos
- Herramienta educativa sobre cambio climatico

**Impacto:**
- Base de datos para politicas locales
- Educacion sobre impacto ambiental
- Concienciacion mediante datos reales
- Apoyo a decisiones basadas en evidencia

---

## Por que Medusse es un Proyecto de Sostenibilidad

### 1. Monitorizacion Ambiental Integral

El sistema implementa 18 tipos de sensores que cubren aspectos criticos de la sostenibilidad:

#### Sensores Ambientales
- **Temperatura y Humedad:** Optimizacion de climatizacion
- **CO2:** Calidad del aire y ventilacion
- **Presion Atmosferica:** Condiciones meteorologicas
- **VOC e IAQ:** Contaminantes y calidad del aire interior

#### Sensores de Recursos Hidricos
- **Humedad del Suelo:** Optimizacion de riego
- **pH:** Calidad del agua
- **Flujo de Agua:** Deteccion de fugas
- **TDS:** Solidos disueltos
- **Oxigeno Disuelto:** Salud de ecosistemas acuaticos

#### Sensores de Energia
- **Voltaje Solar:** Produccion de energia renovable
- **Voltaje de Bateria:** Estado de almacenamiento
- **Porcentaje de Bateria:** Autonomia del sistema
- **Consumo de Energia:** Optimizacion de uso
- **Estado de Carga:** Gestion inteligente
- **Modo Bajo Consumo:** Eficiencia energetica
- **Wake-ups:** Optimizacion de ciclos de trabajo

### 2. Datos en Tiempo Real y Dashboards

**Tecnologias Implementadas:**
- Grafana 10.2.0 para visualizacion profesional
- InfluxDB 2.7 para series temporales
- WebSocket para actualizaciones en tiempo real
- Sistema de alertas por umbrales configurables

**Beneficios:**
- Visualizacion inmediata de condiciones ambientales
- Alertas automaticas (CO2 > 1000 ppm, bateria < 20%)
- Toma de decisiones rapida (ventilar, reducir consumo)
- Historico de datos para analisis de tendencias

### 3. Energia y Autonomia

**Caracteristicas Implementadas:**
- Simulacion realista de energia solar con irradiancia
- Gestion inteligente de carga y descarga de baterias
- Modo de bajo consumo automatico (bateria < 25%)
- Duty-cycling para extender vida de bateria
- Monitorizacion de eficiencia energetica

**Impacto:**
- Evaluacion de viabilidad de nodos solares autonomos
- Optimizacion de consumo energetico
- Reduccion de dependencia de red electrica
- Estrategias de ahorro energetico basadas en datos

### 4. Escalabilidad Eficiente

**Arquitectura Implementada:**
- Protocolo MQTT de bajo consumo
- Preparacion para migracion a LoRa Mesh
- Contenedores Docker para despliegue rapido
- Scripts de automatizacion completos

**Beneficios:**
- Despliegues de baja potencia en areas extensas
- Reduccion de consumo de red
- Instalacion rapida y reproducible
- Escalabilidad horizontal sin perdida de eficiencia

### 5. Educacion y Replicabilidad

**Caracteristicas:**
- Proyecto diseñado para entorno educativo (IES)
- Documentacion completa y accesible
- Codigo abierto y reproducible
- Dashboards intuitivos para estudiantes

**Impacto:**
- Herramienta educativa para concienciacion ambiental
- Metricas escolares de sostenibilidad
- Formacion en tecnologias IoT sostenibles
- Replicabilidad en otras instituciones

### 6. Implementacion Reproducible

**Recursos Disponibles:**
- Contenedores Docker con docker-compose.yml
- Scripts automatizados para Windows y Linux
- Instrucciones detalladas de instalacion
- Simulador para pruebas sin hardware

**Beneficios:**
- Despliegues rapidos (menos de 5 minutos)
- Minimizacion de tiempo y recursos en instalacion
- Reduccion de errores de configuracion
- Facilita adopcion en multiples ubicaciones

---

## Relevancia de Cada Sensor para Sostenibilidad

### Sensores de Calidad del Aire

#### CO2 (Dioxido de Carbono)
**Rango:** 400-2000 ppm  
**Umbral Saludable:** < 1000 ppm

**Aplicaciones de Sostenibilidad:**
- Identificar mala ventilacion en espacios cerrados
- Optimizar ventilacion mecanica (reducir consumo innecesario)
- Reducir riesgos de contagios (COVID-19, gripe)
- Mejorar rendimiento cognitivo de estudiantes

**Ahorro Estimado:** 20-30% en consumo de HVAC con ventilacion dirigida

#### IAQ (Indice de Calidad del Aire Interior)
**Rango:** 0-500 (0-50 excelente, 50-100 bueno, 100-150 moderado)

**Aplicaciones de Sostenibilidad:**
- Evaluacion global de calidad del aire
- Deteccion de multiples contaminantes
- Priorizar acciones de mejora
- Validar efectividad de medidas correctivas

#### VOC (Compuestos Organicos Volatiles)
**Rango:** 20-100 ppb

**Aplicaciones de Sostenibilidad:**
- Detectar contaminantes de materiales de construccion
- Identificar productos de limpieza nocivos
- Evaluar calidad de mobiliario
- Promover uso de materiales sostenibles

### Sensores Climaticos

#### Temperatura y Humedad
**Temperatura:** 18-28°C  
**Humedad:** 30-70%

**Aplicaciones de Sostenibilidad:**
- Ajustar climatizacion para confort eficiente
- Evitar sobrecalentamiento o enfriamiento excesivo
- Optimizar uso de calefaccion y aire acondicionado
- Identificar perdidas de aislamiento termico

**Ahorro Estimado:** 15-25% en climatizacion con ajustes basados en datos

### Sensores de Recursos Hidricos

#### Humedad del Suelo
**Rango:** 25-55%

**Aplicaciones de Sostenibilidad:**
- Programar riego solo cuando sea necesario
- Evitar desperdicio de agua
- Optimizar crecimiento de plantas
- Reducir consumo hidrico

**Ahorro Estimado:** 30-50% en consumo de agua para riego

#### pH del Agua
**Rango Optimo:** 6.5-7.5

**Aplicaciones de Sostenibilidad:**
- Detectar contaminacion del agua
- Proteger ecosistemas acuaticos
- Garantizar calidad del agua potable
- Identificar problemas en tuberias

#### Flujo de Agua
**Rango:** 0.5-2.5 L/min

**Aplicaciones de Sostenibilidad:**
- Detectar fugas en tiempo real
- Monitorizar consumo de agua
- Identificar uso excesivo
- Optimizar sistemas de distribucion

**Ahorro Estimado:** Deteccion temprana de fugas puede ahorrar miles de litros

### Sensores de Energia Solar

#### Voltaje Solar
**Rango:** 0-18.5V

**Aplicaciones de Sostenibilidad:**
- Evaluar produccion de paneles solares
- Optimizar orientacion de paneles
- Detectar problemas de rendimiento
- Calcular retorno de inversion

#### Porcentaje de Bateria
**Rango:** 0-100%

**Aplicaciones de Sostenibilidad:**
- Gestionar autonomia del sistema
- Optimizar ciclos de carga/descarga
- Prolongar vida util de baterias
- Planificar reemplazos

#### Consumo de Energia
**Rango:** 80-160 mA

**Aplicaciones de Sostenibilidad:**
- Identificar consumos excesivos
- Optimizar duty-cycling
- Evaluar eficiencia de componentes
- Reducir huella de carbono

---

## Casos de Uso Practicos para Sostenibilidad

### Caso 1: Gestion Inteligente de Aulas

**Problema:**
Aulas con ventilacion inadecuada y climatizacion ineficiente.

**Solucion con Medusse:**
1. Monitorizar CO2, temperatura y humedad en tiempo real
2. Configurar alertas cuando CO2 > 1000 ppm
3. Activar ventilacion natural o mecanica solo cuando sea necesario
4. Ajustar climatizacion segun ocupacion y condiciones

**Resultados Esperados:**
- Reduccion del 20-30% en consumo de HVAC
- Mejora de la calidad del aire interior
- Reduccion de ausentismo por enfermedades
- Mejora del rendimiento academico

### Caso 2: Riego Inteligente

**Problema:**
Riego excesivo o insuficiente de areas verdes escolares.

**Solucion con Medusse:**
1. Monitorizar humedad del suelo en tiempo real
2. Programar riego solo cuando humedad < 30%
3. Considerar condiciones meteorologicas (temperatura, humedad)
4. Ajustar duracion segun necesidades reales

**Resultados Esperados:**
- Ahorro del 30-50% en consumo de agua
- Mejora de la salud de plantas
- Reduccion de costes de mantenimiento
- Educacion sobre uso responsable del agua

### Caso 3: Monitorizacion de Instalaciones Solares

**Problema:**
Falta de visibilidad sobre produccion y consumo de energia solar.

**Solucion con Medusse:**
1. Monitorizar voltaje solar y produccion en tiempo real
2. Medir consumo de energia de nodos ESP32
3. Optimizar cargas segun produccion disponible
4. Gestionar baterias para maximizar autonomia

**Resultados Esperados:**
- Optimizacion del uso de energia solar
- Reduccion de dependencia de red electrica
- Prolongacion de vida util de baterias
- Datos para expansion de instalaciones solares

### Caso 4: Deteccion Temprana de Problemas de Agua

**Problema:**
Fugas o contaminacion del agua no detectadas a tiempo.

**Solucion con Medusse:**
1. Monitorizar pH, TDS y flujo de agua continuamente
2. Configurar alertas para valores fuera de rango
3. Detectar cambios bruscos en flujo (posibles fugas)
4. Analizar tendencias para mantenimiento preventivo

**Resultados Esperados:**
- Deteccion temprana de fugas (ahorro de miles de litros)
- Identificacion rapida de contaminacion
- Reduccion de costes de reparacion
- Proteccion de la salud de usuarios

### Caso 5: Educacion Ambiental

**Problema:**
Falta de concienciacion sobre impacto ambiental en estudiantes.

**Solucion con Medusse:**
1. Dashboards accesibles para estudiantes
2. Visualizacion de datos en tiempo real
3. Proyectos educativos basados en datos reales
4. Gamificacion de objetivos de sostenibilidad

**Resultados Esperados:**
- Mayor concienciacion ambiental
- Comprension de relacion entre datos y decisiones
- Formacion en tecnologias IoT
- Cultura de sostenibilidad en el centro

---

## Indicadores (KPIs) para Medir Impacto

### KPIs Energeticos

1. **Reduccion de Consumo Energetico**
   - Metrica: kWh mensuales antes/despues
   - Objetivo: Reduccion del 20-30%
   - Medicion: Comparar facturas electricas

2. **Produccion Solar**
   - Metrica: kWh generados por paneles solares
   - Objetivo: Cubrir 50% del consumo de nodos
   - Medicion: Voltaje solar x corriente x tiempo

3. **Vida Media de Baterias**
   - Metrica: Meses de operacion antes de reemplazo
   - Objetivo: Aumentar de 12 a 18 meses
   - Medicion: Registro de reemplazos

4. **Eficiencia de Duty-Cycling**
   - Metrica: Porcentaje de tiempo en modo bajo consumo
   - Objetivo: 40-60% del tiempo
   - Medicion: Contador de wake-ups

### KPIs de Calidad del Aire

1. **Tiempo con CO2 Saludable**
   - Metrica: Porcentaje de tiempo con CO2 < 1000 ppm
   - Objetivo: > 90% del horario lectivo
   - Medicion: Datos historicos de InfluxDB

2. **Reduccion de Picos de CO2**
   - Metrica: Numero de eventos con CO2 > 1500 ppm
   - Objetivo: Reduccion del 80%
   - Medicion: Alertas registradas

3. **Mejora de IAQ**
   - Metrica: Indice promedio de calidad del aire
   - Objetivo: Mantener IAQ < 100 (bueno)
   - Medicion: Promedio diario/semanal

### KPIs de Recursos Hidricos

1. **Reduccion de Consumo de Agua**
   - Metrica: Litros mensuales antes/despues
   - Objetivo: Reduccion del 30-50% en riego
   - Medicion: Contador de agua o flujo acumulado

2. **Deteccion de Fugas**
   - Metrica: Numero de fugas detectadas y tiempo de respuesta
   - Objetivo: Deteccion en < 1 hora
   - Medicion: Registro de alertas y acciones

3. **Calidad del Agua**
   - Metrica: Porcentaje de tiempo con pH optimo (6.5-7.5)
   - Objetivo: > 95% del tiempo
   - Medicion: Datos historicos

### KPIs de Respuesta y Accion

1. **Tiempo de Respuesta a Alertas**
   - Metrica: Minutos desde alerta hasta accion correctiva
   - Objetivo: < 30 minutos
   - Medicion: Registro de alertas y acciones

2. **Alertas Convertidas en Acciones**
   - Metrica: Porcentaje de alertas con accion correctiva
   - Objetivo: > 80%
   - Medicion: Registro de actividad

3. **Escalabilidad**
   - Metrica: Numero de instalaciones replicadas
   - Objetivo: 5+ centros en 2 años
   - Medicion: Registro de despliegues

---

## Plan de Despliegue y Demostracion

### Fase 1: Instalacion (Semana 1)

**Actividades:**
1. Instalar stack Docker en servidor del centro
2. Configurar servicios (MQTT, InfluxDB, Grafana, MySQL)
3. Ejecutar simulador para verificar funcionamiento
4. Configurar dashboards y alertas

**Comandos:**
```bash
# Instalar Docker y dependencias
./setup_lliurex.sh

# Iniciar servicios
docker compose -f docker/docker-compose.yml up -d

# Ejecutar simulador
python arduino/medusse_simulator.py
```

**Verificacion:**
- Acceder a Grafana: http://localhost:3000 (admin / medusse2025)
- Verificar datos en dashboard
- Probar alertas con umbrales de prueba

### Fase 2: Configuracion de Umbrales (Semana 1-2)

**Actividades:**
1. Configurar alertas de CO2 (> 1000 ppm warning, > 1500 ppm critical)
2. Configurar alertas de bateria (< 25% warning, < 15% critical)
3. Configurar alertas de pH (< 6.5 o > 7.5)
4. Configurar alertas de flujo de agua (variaciones > 50%)

**Umbrales Recomendados:**
- CO2: 1000 ppm (warning), 1500 ppm (critical)
- Temperatura: < 18°C o > 26°C
- Humedad: < 30% o > 70%
- Bateria: < 25% (warning), < 15% (critical)
- pH: < 6.5 o > 7.5
- Flujo agua: variacion > 50% respecto a media

### Fase 3: Piloto en Aulas (Semanas 3-6)

**Ubicaciones Piloto:**
1. Aula 20 - Aula estandar
2. Aula 21 - Aula con ventilacion mecanica
3. Gimnasio - Espacio amplio con alta ocupacion
4. Laboratorio - Espacio con equipos electronicos

**Actividades:**
1. Recopilar datos durante 4 semanas
2. Registrar alertas y condiciones
3. Implementar acciones correctivas:
   - Ventilar cuando CO2 > 1000 ppm
   - Ajustar climatizacion segun temperatura
   - Optimizar horarios de riego
4. Documentar resultados y observaciones

**Registro de Datos:**
- Exportar datos de InfluxDB semanalmente
- Generar reportes de KPIs
- Documentar acciones tomadas
- Registrar feedback de usuarios

### Fase 4: Analisis y Optimizacion (Semana 7-8)

**Actividades:**
1. Analizar datos recopilados
2. Calcular KPIs antes/durante/despues
3. Identificar patrones y oportunidades
4. Ajustar umbrales y estrategias
5. Documentar mejores practicas

**Analisis Esperados:**
- Correlacion entre CO2 y ocupacion
- Patrones de consumo energetico
- Eficiencia de ventilacion natural vs mecanica
- Optimizacion de horarios de riego

### Fase 5: Presentacion de Resultados (Semana 9)

**Entregables:**
1. Informe de resultados con KPIs
2. Graficos de tendencias y mejoras
3. Recomendaciones para expansion
4. Presentacion para comunidad educativa
5. Plan de mantenimiento

---

## Evidencias en el Repositorio

### Archivos Clave

1. **README.md**
   - Descripcion completa del ecosistema
   - Lista de 18 sensores y ubicaciones
   - Arquitectura del sistema
   - Instrucciones de instalacion

2. **arduino/medusse_simulator.py**
   - Simulador de sensores con datos realistas
   - Simulacion de energia solar con irradiancia
   - Gestion de carga/descarga de baterias
   - Modo de bajo consumo automatico

3. **docker/docker-compose.yml**
   - Despliegue reproducible de servicios
   - MQTT, InfluxDB, Grafana, Telegraf, MySQL
   - Volumenes persistentes
   - Networking optimizado

4. **docker/grafana/dashboards/medusse-clean.json**
   - Dashboard profesional con 18 paneles
   - Filtros por ubicacion
   - Sistema de alertas visual
   - Branding personalizado

5. **api/README.md**
   - Documentacion completa de API REST
   - 7 endpoints de datos
   - WebSocket para tiempo real
   - Ejemplos de uso

6. **medusse_app/README.md**
   - Aplicacion movil Flutter
   - 3 pantallas completas
   - Graficos interactivos
   - Sistema de alertas

7. **documentacion/MIGRACION.md**
   - Plan de migracion a LoRa Mesh
   - Hardware necesario
   - Configuracion de red
   - Estimaciones de alcance y consumo

---

## Recomendaciones para Aumentar la Sostenibilidad

### 1. Migracion a LoRa Mesh

**Beneficios:**
- Menor consumo de energia (10-100x menos que WiFi)
- Mayor alcance (hasta 2 km en campo abierto)
- Mejor penetracion en edificios
- Red mesh auto-organizada

**Implementacion:**
- Modulos LoRa SX1276/SX1262 para ESP32
- Gateway LoRa en Raspberry Pi 4
- Frecuencia 868 MHz (EU)
- Protocolo LoRaWAN o custom

**Ahorro Estimado:**
- Reduccion del 80-90% en consumo de comunicacion
- Aumento de autonomia de 1 mes a 6-12 meses

### 2. Alimentacion Solar Optimizada

**Mejoras Propuestas:**
- Paneles solares de 10-20W por nodo
- Baterias LiFePO4 (mayor vida util que LiPo)
- Controlador MPPT para maxima eficiencia
- Supercapacitores para picos de consumo

**Beneficios:**
- Autonomia completa sin red electrica
- Reduccion de huella de carbono
- Menor coste operativo
- Mayor resiliencia del sistema

### 3. Edge Computing

**Implementacion:**
- Agregacion y filtrado local en ESP32
- Envio solo de datos relevantes o cambios significativos
- Procesamiento de alertas en el nodo
- Compresion de datos antes de transmision

**Beneficios:**
- Reduccion del 50-70% en trafico de red
- Menor consumo de energia en transmision
- Respuesta mas rapida a eventos criticos
- Menor carga en servidor central

### 4. Duty-Cycling Agresivo

**Estrategias:**
- Sleep profundo entre mediciones (15-60 minutos)
- Wake-up por evento (RTC, interrupcion externa)
- Mediciones rapidas (< 5 segundos activo)
- Transmision por lotes

**Beneficios:**
- Aumento de autonomia de 1 mes a 6-12 meses
- Reduccion del 90-95% en consumo promedio
- Mayor vida util de componentes
- Menor generacion de calor

### 5. Modelos de Prediccion

**Implementacion:**
- Machine Learning para predecir ocupacion
- Prediccion de condiciones ambientales
- Programacion proactiva de climatizacion
- Optimizacion de riego basada en predicciones meteorologicas

**Beneficios:**
- Ahorro proactivo vs reactivo
- Reduccion adicional del 10-20% en consumo
- Mejor confort y condiciones
- Menor desgaste de equipos

### 6. Politicas de Retencion de Datos

**Estrategias:**
- Datos crudos: 7 dias
- Datos agregados (5 min): 30 dias
- Datos agregados (1 hora): 1 año
- Datos agregados (1 dia): ilimitado

**Beneficios:**
- Reduccion del 80-90% en almacenamiento
- Menor consumo de energia en servidores
- Cumplimiento de privacidad (GDPR)
- Optimizacion de consultas

### 7. Plan de Mantenimiento y Reciclaje

**Componentes:**
- Calendario de mantenimiento preventivo
- Protocolo de reemplazo de baterias
- Reciclaje de componentes electronicos
- Reutilizacion de hardware obsoleto

**Beneficios:**
- Mayor vida util del sistema
- Reduccion de residuos electronicos
- Menor coste total de propiedad
- Cumplimiento de normativas ambientales

---

## Impacto Esperado

### Escenario Conservador (Piloto 4 Semanas)

**Ventilacion Dirigida:**
- Reduccion del 15-20% en consumo de HVAC
- Mejora del 30% en tiempo con CO2 saludable
- Reduccion del 50% en picos de CO2 > 1500 ppm

**Riego Inteligente:**
- Ahorro del 25-35% en consumo de agua
- Mejora de la salud de plantas
- Reduccion de costes de mantenimiento

**Gestion Energetica:**
- Optimizacion del 10-15% en consumo de nodos
- Aumento del 20% en vida util de baterias
- Datos para expansion de instalaciones solares

### Escenario Optimista (Despliegue Completo 1 Año)

**Ventilacion Dirigida:**
- Reduccion del 25-35% en consumo de HVAC
- Mejora del 50% en tiempo con CO2 saludable
- Reduccion del 80% en picos de CO2 > 1500 ppm
- Ahorro anual: 2000-3000 kWh (400-600€)

**Riego Inteligente:**
- Ahorro del 40-60% en consumo de agua
- Reduccion de 50-100 m³ anuales
- Ahorro anual: 100-200€

**Gestion Energetica:**
- Autonomia completa con energia solar
- Reduccion del 90% en consumo de red
- Ahorro anual: 200-400€

**Impacto Total Estimado:**
- Ahorro energetico: 2500-4000 kWh/año
- Ahorro economico: 700-1200€/año
- Reduccion de CO2: 1-1.5 toneladas/año
- Ahorro de agua: 50-100 m³/año

---

## Conclusion

Medusse IoT ofrece una base tecnica solida para un proyecto de sostenibilidad integral. El sistema proporciona:

1. **Monitorizacion Completa:** 18 tipos de sensores cubren aspectos criticos de sostenibilidad ambiental, energetica e hidrica.

2. **Datos Accionables:** Visualizacion en tiempo real y sistema de alertas permiten toma de decisiones rapida y efectiva.

3. **Energia Renovable:** Soporte completo para energia solar con gestion inteligente de baterias y optimizacion de consumo.

4. **Escalabilidad:** Arquitectura preparada para expansion con LoRa Mesh y edge computing.

5. **Educacion:** Herramienta ideal para concienciacion ambiental en entornos educativos.

6. **Impacto Medible:** KPIs claros para demostrar reduccion de consumo energetico, mejora de calidad del aire y uso responsable del agua.

Con un piloto de 4 semanas en un centro educativo y aplicando las recomendaciones propuestas (LoRa, solar, edge computing), se puede demostrar un impacto real y cuantificable en sostenibilidad, ademas de servir como recurso educativo valioso para formar a las nuevas generaciones en tecnologias sostenibles.

El proyecto Medusse IoT no solo es una solucion tecnica, sino una herramienta para el cambio cultural hacia la sostenibilidad basada en datos y evidencia.

---

## Anexos

### Anexo A: Comandos Rapidos para Demostracion

```bash
# 1. Levantar stack Docker
docker compose -f docker/docker-compose.yml up -d

# 2. Verificar servicios
docker ps

# 3. Ejecutar simulador
python arduino/medusse_simulator.py

# 4. Ver logs de Telegraf
docker logs medusse_telegraf -f

# 5. Acceder a Grafana
# Navegador: http://localhost:3000
# Usuario: admin / medusse2025

# 6. Acceder a API
# Navegador: http://localhost:3001/api/summary

# 7. Detener sistema
docker compose -f docker/docker-compose.yml down
```

### Anexo B: Configuracion de Alertas en Grafana

**Alerta de CO2 Alto:**
- Condicion: CO2 > 1000 ppm durante 5 minutos
- Accion: Notificacion + Email
- Mensaje: "CO2 alto en {ubicacion}: {valor} ppm. Ventilar inmediatamente."

**Alerta de Bateria Baja:**
- Condicion: Bateria < 25% durante 10 minutos
- Accion: Notificacion
- Mensaje: "Bateria baja en {ubicacion}: {valor}%. Revisar panel solar."

**Alerta de pH Fuera de Rango:**
- Condicion: pH < 6.5 o > 7.5 durante 15 minutos
- Accion: Notificacion + Email
- Mensaje: "pH fuera de rango en {ubicacion}: {valor}. Revisar calidad del agua."

### Anexo C: Plantilla de Registro de Acciones

| Fecha | Hora | Ubicacion | Alerta | Valor | Accion Tomada | Resultado |
|-------|------|-----------|--------|-------|---------------|-----------|
| 2025-11-25 | 10:30 | Aula 20 | CO2 Alto | 1250 ppm | Abrir ventanas | CO2 bajo a 800 ppm en 15 min |
| 2025-11-25 | 14:15 | Gimnasio | Bateria Baja | 22% | Revisar panel solar | Panel limpio, carga normal |
| 2025-11-26 | 09:00 | Lab | pH Bajo | 6.2 | Analizar agua | Contaminacion detectada |

---

**Documento preparado para:** Presentacion de Reto 1 - Proyecto de Sostenibilidad  
**Fecha:** Noviembre 2025  
**Version:** 1.0  
**Estado:** Completo
