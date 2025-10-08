# 🚀 GUÍA INSTALACIÓN PORTÁTIL - DEMOSTRACIÓN PROFESOR

Guía paso a paso para instalar y ejecutar el proyecto Medusse en un portátil con VS Code y Windows 11.

## 📋 **REQUISITOS PREVIOS**

### ✅ **Software Necesario**
- Windows 11 ✅ (ya tienes)
- VS Code ✅ (ya tienes)
- Conexión a Internet (para descargar dependencias)

---

## 🔧 **PASO 1: INSTALACIÓN DE DEPENDENCIAS**

### 1.1 Instalar Python
```powershell
# Opción A: Desde Microsoft Store (RECOMENDADO)
# Buscar "Python 3.11" en Microsoft Store e instalar

# Opción B: Desde python.org
# Descargar desde https://www.python.org/downloads/
# ⚠️ IMPORTANTE: Marcar "Add Python to PATH" durante instalación
```

### 1.2 Verificar Python
```powershell
# Abrir PowerShell y verificar
python --version
pip --version
```

### 1.3 Instalar Docker Desktop
```powershell
# Descargar desde: https://www.docker.com/products/docker-desktop/
# Instalar y reiniciar el portátil
# Abrir Docker Desktop y esperar a que inicie
```

### 1.4 Verificar Docker
```powershell
# En PowerShell
docker --version
docker-compose --version
```

---

## 📥 **PASO 2: CLONAR EL PROYECTO**

### 2.1 Instalar Git (si no está)
```powershell
# Descargar desde: https://git-scm.com/download/win
# O usar: winget install --id Git.Git -e --source winget
```

### 2.2 Clonar Repositorio
```powershell
# Crear carpeta para el proyecto
mkdir C:\Proyectos
cd C:\Proyectos

# Clonar el repositorio
git clone https://github.com/Fralopala2/proyecto-medusse.git
cd proyecto-medusse
```

---

## 🐍 **PASO 3: CONFIGURAR PYTHON**

### 3.1 Instalar Dependencias Python
```powershell
# En la carpeta del proyecto
pip install platformio paho-mqtt requests
```

### 3.2 Verificar PlatformIO
```powershell
platformio --version
```

---

## 🐳 **PASO 4: CONFIGURAR DOCKER STACK**

### 4.1 Iniciar Docker Desktop
- Abrir Docker Desktop
- Esperar a que aparezca "Engine running"
- Verificar que no hay errores

### 4.2 Levantar Servicios
```powershell
# Ir a la carpeta docker
cd docker

# Ejecutar script de inicialización
python start_stack.py
```

### 4.3 Verificar Servicios
```powershell
# Verificar contenedores corriendo
docker ps

# Deberías ver 4 contenedores:
# - medusse_mosquitto (puerto 1883)
# - medusse_influxdb (puerto 8086)  
# - medusse_grafana (puerto 3000)
# - medusse_telegraf
```

---

## 🧪 **PASO 5: TESTING INICIAL**

### 5.1 Test de Servicios
```powershell
# En carpeta docker
python check_services.py
```

### 5.2 Test de Simuladores
```powershell
# Ir a carpeta arduino
cd ..\arduino

# Probar simulador
python test_limited.py 10
```

### 5.3 Test de Gateway
```powershell
# Ir a carpeta gateway
cd ..\gateway

# Test simple (sin MQTT real)
python medusse_gateway.py --broker localhost --source simulator --path ../arduino/test_limited.py
```

---

## 🎬 **PASO 6: DEMOSTRACIÓN COMPLETA**

### 6.1 Preparar Ventanas
1. **Terminal 1:** Gateway en ejecución
2. **Terminal 2:** Logs de Docker (opcional)
3. **Navegador:** Grafana dashboard

### 6.2 Ejecutar Demostración

#### Terminal 1 - Gateway
```powershell
cd C:\Proyectos\proyecto-medusse\gateway
python medusse_gateway.py --broker localhost --source simulator
```

#### Terminal 2 - Logs Docker (Opcional)
```powershell
cd C:\Proyectos\proyecto-medusse\docker
docker-compose logs -f telegraf
```

#### Navegador - Dashboard
```
URL: http://localhost:3000
Usuario: admin
Contraseña: medusse2025

Dashboard: "Medusse IoT - Dashboard Limpio"
```

---

## 🎯 **PASO 7: SCRIPT DE DEMOSTRACIÓN AUTOMÁTICA**

### 7.1 Crear Script de Demo
```powershell
# Crear archivo demo.bat en la raíz del proyecto
@echo off
echo ========================================
echo   DEMOSTRACION PROYECTO MEDUSSE IoT
echo ========================================
echo.
echo Iniciando servicios Docker...
cd docker
start /B python start_stack.py
timeout /t 10
echo.
echo Abriendo dashboard Grafana...
start http://localhost:3000
timeout /t 5
echo.
echo Iniciando gateway con simuladores...
cd ..\gateway
python medusse_gateway.py --broker localhost --source simulator
```

### 7.2 Ejecutar Demo
```powershell
# Doble clic en demo.bat o desde PowerShell:
.\demo.bat
```

---

## 🔍 **PASO 8: VERIFICACIÓN FINAL**

### 8.1 Checklist Pre-Demostración
- [ ] Docker Desktop corriendo
- [ ] 4 contenedores activos (docker ps)
- [ ] Grafana accesible (http://localhost:3000)
- [ ] Gateway conectando sin errores
- [ ] Dashboard mostrando datos en tiempo real

### 8.2 URLs de Verificación
```
Grafana: http://localhost:3000 (admin/medusse2025)
InfluxDB: http://localhost:8086 (admin/medusse2025)
```

---

## 🚨 **TROUBLESHOOTING**

### Problema: Docker no inicia
```powershell
# Solución:
# 1. Reiniciar Docker Desktop
# 2. Reiniciar el portátil
# 3. Verificar que la virtualización está habilitada en BIOS
```

### Problema: Puerto ocupado
```powershell
# Ver qué usa el puerto
netstat -an | findstr :3000

# Matar proceso si es necesario
taskkill /F /PID <PID>
```

### Problema: Python no encontrado
```powershell
# Reinstalar Python marcando "Add to PATH"
# O añadir manualmente al PATH del sistema
```

### Problema: Sin datos en Grafana
```powershell
# 1. Verificar que el gateway está corriendo
# 2. Verificar logs de Telegraf:
docker logs medusse_telegraf

# 3. Generar datos manualmente:
cd arduino
python test_limited.py 15
```

---

## 🎓 **PASO 9: PREPARACIÓN PARA EL PROFESOR**

### 9.1 Puntos Clave a Mostrar
1. **Arquitectura completa:** ESP32 → Gateway → MQTT → InfluxDB → Grafana
2. **Múltiples nodos:** 3 ubicaciones (Aula 20, Aula 21, Laboratorio)
3. **Datos en tiempo real:** Actualización cada 5 segundos
4. **Dashboard limpio:** Nombres claros y colores diferenciados
5. **Sensores múltiples:** Temperatura, Humedad, Presión, CO2

### 9.2 Flujo de Demostración
1. **Mostrar código:** VS Code con estructura del proyecto
2. **Ejecutar stack:** `python start_stack.py`
3. **Abrir Grafana:** Dashboard funcionando
4. **Ejecutar gateway:** Datos llegando en tiempo real
5. **Explicar arquitectura:** Diagrama del flujo de datos

### 9.3 Datos de Acceso
```
Grafana:
- URL: http://localhost:3000
- Usuario: admin  
- Contraseña: medusse2025

InfluxDB:
- URL: http://localhost:8086
- Usuario: admin
- Contraseña: medusse2025
```

---

## ⏱️ **TIEMPO ESTIMADO DE INSTALACIÓN**

- **Instalación inicial:** 30-45 minutos
- **Verificación y testing:** 15 minutos
- **Preparación demo:** 10 minutos
- **Total:** ~1 hora

---

## 📱 **CONTACTO DE EMERGENCIA**

Si hay problemas durante la instalación:
1. Verificar conexión a Internet
2. Reiniciar Docker Desktop
3. Ejecutar comandos como Administrador
4. Verificar que no hay antivirus bloqueando

---

## ✅ **CHECKLIST FINAL**

Antes de ir al profesor, verificar:
- [ ] Todos los servicios Docker corriendo
- [ ] Grafana mostrando dashboard limpio
- [ ] Gateway procesando datos sin errores
- [ ] 3 nodos enviando datos diferentes
- [ ] Colores diferenciados por ubicación
- [ ] Datos actualizándose en tiempo real

**¡PROYECTO LISTO PARA DEMOSTRACIÓN!** 🚀