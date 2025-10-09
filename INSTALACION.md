# Instalación Proyecto Medusse IoT

Guías de instalación para ejecutar el proyecto en **cualquier equipo Windows**.

## 🚀 Instalación Automática (Recomendada)

### Para Equipos Nuevos (Sin Docker)
```cmd
instalar_proyecto.bat
```

**Este script instala automáticamente:**
- ✅ Docker Desktop
- ✅ Python y dependencias
- ✅ Configuración completa del proyecto
- ✅ Verificación del sistema

### Para Equipos con Docker Ya Instalado
```cmd
setup_rapido.bat
```

**Este script hace setup rápido:**
- ✅ Verifica requisitos
- ✅ Instala dependencias Python
- ✅ Prepara el proyecto
- ✅ Ejecuta verificación

## 📋 Requisitos del Sistema

### Mínimos
- **OS:** Windows 10/11 (64-bit)
- **RAM:** 4 GB mínimo, 8 GB recomendado
- **Espacio:** 2 GB libres
- **Internet:** Para descargar Docker y dependencias

### Software Necesario
- **Docker Desktop** (se instala automáticamente)
- **Python 3.7+** (se instala desde Microsoft Store)

## 🔧 Instalación Manual (Si los scripts fallan)

### 1. Instalar Docker Desktop
1. Descargar desde: https://www.docker.com/products/docker-desktop
2. Ejecutar instalador
3. **REINICIAR** el equipo
4. Abrir Docker Desktop y esperar a que se inicie

### 2. Instalar Python
1. Abrir Microsoft Store
2. Buscar "Python 3.11"
3. Instalar
4. Verificar: `python --version`

### 3. Instalar Dependencias
```cmd
python -m pip install paho-mqtt requests
```

### 4. Verificar Instalación
```cmd
verificar.bat
```

## 🎯 Después de la Instalación

### Ejecutar el Proyecto
```cmd
demo.bat
```

### Acceder al Dashboard
- **URL:** http://localhost:3000
- **Usuario:** `admin`
- **Contraseña:** `medusse2025`

## 🆘 Solución de Problemas

### Error: "Docker no encontrado"
**Solución:**
1. Instalar Docker Desktop manualmente
2. Reiniciar el equipo
3. Ejecutar `setup_rapido.bat`

### Error: "Python no encontrado"
**Solución:**
1. Instalar Python desde Microsoft Store
2. Reiniciar terminal
3. Ejecutar script de nuevo

### Error: "Docker Desktop no inicia"
**Solución:**
1. Abrir Docker Desktop manualmente
2. Esperar a que aparezca "Docker Desktop is running"
3. Ejecutar script de nuevo

### Error: "Permisos insuficientes"
**Solución:**
1. Ejecutar terminal como Administrador
2. Ejecutar `instalar_proyecto.bat`

### Servicios no funcionan
**Solución:**
```cmd
docker compose -f docker/docker-compose.yml down
docker volume prune -f
docker compose -f docker/docker-compose.yml up -d
```

## 📦 Para Profesores/Compañeros

### Instalación en 3 Pasos
1. **Descargar** el proyecto completo
2. **Ejecutar** `instalar_proyecto.bat` como Administrador
3. **Esperar** a que termine y ejecutar `demo.bat`

### Demo Rápida (5 minutos)
1. `verificar.bat` - Verificar que todo funciona
2. `demo.bat` - Ejecutar proyecto completo
3. Abrir http://localhost:3000 en el navegador
4. Ver dashboard con datos en tiempo real

### Qué Verán
- **5 paneles** con datos de sensores IoT
- **3 ubicaciones** (Aula 20, Aula 21, Laboratorio)
- **4 tipos de sensores** (Temperatura, Humedad, CO2, Presión)
- **Datos en tiempo real** actualizándose cada 30 segundos

## 🎓 Para Presentaciones

### Script de Demostración
```cmd
# 1. Mostrar verificación del sistema
verificar.bat

# 2. Ejecutar proyecto completo
demo.bat

# 3. Explicar mientras se ven los datos en Grafana
# - Pipeline IoT completo
# - Simulación de sensores ESP32
# - Visualización profesional
```

### Puntos Clave a Destacar
- ✅ **Sistema IoT completo** funcionando
- ✅ **Tecnologías modernas** (Docker, MQTT, InfluxDB, Grafana)
- ✅ **Escalable** para sensores reales
- ✅ **Fácil instalación** en cualquier equipo

## 📁 Archivos de Instalación

| Archivo | Descripción |
|---------|-------------|
| `instalar_proyecto.bat` | Instalación completa automática |
| `setup_rapido.bat` | Setup rápido (Docker ya instalado) |
| `verificar.bat` | Verificar sistema |
| `demo.bat` | Ejecutar proyecto completo |
| `INSTALACION.md` | Esta guía |

---

**¡El proyecto está listo para ser ejecutado en cualquier equipo Windows!** 🚀

*Desarrollado para IES Celia Viñas - Curso 2024/2025*