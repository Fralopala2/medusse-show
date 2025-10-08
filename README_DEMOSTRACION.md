# 🎓 README DEMOSTRACIÓN - PROYECTO MEDUSSE

Guía rápida para la demostración del proyecto al profesor.

## 🚀 **INICIO RÁPIDO**

### 1. Verificar Sistema
```cmd
verificar.bat
```

### 2. Ejecutar Demostración
```cmd
demo.bat
```

### 3. Acceder a Dashboard
- **URL:** http://localhost:3000
- **Usuario:** admin
- **Contraseña:** medusse2025

---

## 🎯 **QUÉ MOSTRAR AL PROFESOR**

### 1. **Arquitectura del Sistema**
```
ESP32 Simulados → Gateway Python → MQTT → Telegraf → InfluxDB → Grafana
```

### 2. **Funcionalidades Implementadas**
- ✅ **3 nodos ESP32** simulados (Aula 20, Aula 21, Laboratorio)
- ✅ **4 tipos de sensores** (Temperatura, Humedad, Presión, CO2)
- ✅ **Gateway en tiempo real** (7+ mensajes/segundo)
- ✅ **Stack Docker completo** (4 servicios)
- ✅ **Dashboard limpio** con nombres claros
- ✅ **Colores diferenciados** por ubicación
- ✅ **Actualización automática** cada 5 segundos

### 3. **Datos en Tiempo Real**
- **Aula 20:** 🔴 Rojo - Temperatura ~20-25°C, CO2 ~400-500 ppm
- **Aula 21:** 🔵 Azul - Temperatura ~21-24°C, CO2 ~500-600 ppm
- **Laboratorio:** 🟢 Verde - Temperatura ~19-23°C, CO2 ~350-450 ppm

---

## 📊 **PUNTOS CLAVE DE LA DEMOSTRACIÓN**

### 1. **Mostrar Código (VS Code)**
- Estructura del proyecto organizada
- Firmware ESP32 con sensores reales
- Gateway procesando JSON
- Configuración Docker completa

### 2. **Ejecutar Stack**
```cmd
cd docker
python start_stack.py
```
- Mostrar 4 contenedores iniciándose
- Verificar servicios accesibles

### 3. **Dashboard Grafana**
- Abrir http://localhost:3000
- Login: admin/medusse2025
- Mostrar "Medusse IoT - Dashboard Limpio"
- Explicar paneles y métricas

### 4. **Gateway en Acción**
```cmd
cd gateway
python medusse_gateway.py --broker localhost --source simulator
```
- Mostrar mensajes MQTT en tiempo real
- Explicar procesamiento de datos
- Ver datos llegando al dashboard

### 5. **Datos Actualizándose**
- Dashboard actualizándose cada 5 segundos
- Diferentes valores por ubicación
- Colores diferenciados
- Nombres claros (no códigos técnicos)

---

## 🔧 **COMANDOS ÚTILES DURANTE LA DEMO**

### Ver Estado de Servicios
```cmd
docker ps
```

### Ver Logs en Tiempo Real
```cmd
docker logs -f medusse_telegraf
```

### Test Rápido de Simuladores
```cmd
cd arduino
python test_limited.py 10
```

### Verificar Conectividad
```cmd
cd docker
python check_services.py
```

---

## 🎬 **FLUJO DE DEMOSTRACIÓN (10 minutos)**

### Minutos 1-2: Introducción
- "Proyecto IoT completo con ESP32, MQTT, InfluxDB y Grafana"
- "Simulación de 3 aulas con sensores ambientales"
- "Pipeline de datos en tiempo real"

### Minutos 3-4: Mostrar Código
- Abrir VS Code con el proyecto
- Mostrar estructura organizada
- Explicar firmware ESP32 y gateway

### Minutos 5-6: Ejecutar Stack
- `demo.bat` o comandos manuales
- Mostrar servicios Docker iniciándose
- Abrir Grafana dashboard

### Minutos 7-8: Dashboard en Acción
- Login en Grafana
- Mostrar dashboard limpio
- Explicar métricas y colores
- Datos actualizándose en tiempo real

### Minutos 9-10: Explicar Arquitectura
- Flujo de datos completo
- Tecnologías utilizadas
- Escalabilidad del sistema
- Preguntas del profesor

---

## 📱 **DATOS DE ACCESO**

### Grafana
- **URL:** http://localhost:3000
- **Usuario:** admin
- **Contraseña:** medusse2025
- **Dashboard:** "Medusse IoT - Dashboard Limpio"

### InfluxDB (si pregunta)
- **URL:** http://localhost:8086
- **Usuario:** admin
- **Contraseña:** medusse2025
- **Bucket:** sensors

### MQTT Broker
- **Host:** localhost
- **Puerto:** 1883
- **Topics:** iescelia/aula20/*, iescelia/aula21/*, iescelia/laboratorio/*

---

## 🚨 **SI ALGO FALLA DURANTE LA DEMO**

### Docker no responde
```cmd
# Reiniciar Docker Desktop
# Esperar 2-3 minutos
# Ejecutar: docker ps
```

### Grafana no carga
```cmd
# Verificar: http://localhost:3000
# Si no funciona: docker restart medusse_grafana
# Esperar 30 segundos
```

### Sin datos en dashboard
```cmd
# Verificar gateway corriendo
# Ejecutar: cd arduino && python test_limited.py 10
# Datos deberían aparecer en 10-15 segundos
```

### Gateway con errores
```cmd
# Verificar MQTT: docker logs medusse_mosquitto
# Reiniciar si es necesario: docker restart medusse_mosquitto
```

---

## ✅ **CHECKLIST PRE-DEMOSTRACIÓN**

- [ ] Portátil cargado y con Internet
- [ ] Docker Desktop instalado y corriendo
- [ ] Python y dependencias instaladas
- [ ] Proyecto clonado y verificado
- [ ] `verificar.bat` ejecutado sin errores
- [ ] `demo.bat` probado al menos una vez
- [ ] Dashboard Grafana accesible
- [ ] Datos fluyendo en tiempo real

---

## 🎯 **MENSAJE FINAL PARA EL PROFESOR**

*"Este proyecto demuestra un sistema IoT completo y funcional que simula una red de sensores ambientales en tiempo real. Aunque utiliza simuladores en lugar de hardware físico, toda la arquitectura de software, el procesamiento de datos y la visualización son completamente reales y escalables. El sistema procesa más de 7 mensajes por segundo y mantiene un dashboard actualizado cada 5 segundos con datos de 3 ubicaciones diferentes."*

**¡BUENA SUERTE CON LA DEMOSTRACIÓN!** 🚀