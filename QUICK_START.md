# Quick Start - Proyecto Medusse IoT

Guía rápida para ejecutar el **ecosistema IoT completo** en Windows.

## 🎯 Ecosistema Completo - Listo para Usar

**El proyecto Medusse IoT es un ecosistema completo** con Dashboard Grafana, API REST y App móvil Flutter. Esta guía te permite ejecutarlo en **menos de 5 minutos**.

## ⚡ Inicio Ultra Rápido

### 1. Verificar Sistema Completo

```cmd
verificar.bat
```

**Resultado esperado:** ✅ Docker, Node.js, Flutter, Python OK

### 2. Opción A: Solo Dashboard Grafana (2 minutos)

```cmd
demo.bat
```

**Esto automáticamente:**
- ✅ Inicia servicios Docker (MQTT, InfluxDB, Grafana, Telegraf)
- ✅ Abre Grafana en el navegador
- ✅ Ejecuta simulador de 3 ubicaciones
- ✅ Muestra datos en tiempo real

### 3. Opción B: Sistema Completo (5 minutos)

```cmd
sistema_completo.bat
```

**Esto automáticamente:**
- ✅ Todo lo anterior +
- ✅ Inicia API REST (puerto 3001)
- ✅ Abre interfaces web
- ✅ Prepara para app Flutter

### 4. Opción C: Componentes Individuales

```cmd
# Solo API REST
iniciar_api.bat

# Solo App Flutter
ejecutar_flutter.bat
```

## 🌐 Acceso a Interfaces

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Grafana Dashboard** | http://localhost:3000 | admin / medusse2025 |
| **API REST** | http://localhost:3001 | - |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |
| **App Flutter** | Ejecutar script | - |

## 📊 Qué Verás en el Ecosistema

### 🖥️ Dashboard Grafana (5 Paneles):

1. **🌡️ Temperatura** - Gráfico de líneas por ubicación
2. **🫁 CO2** - Niveles con alertas por colores
3. **🚨 CO2 Actual** - Gauges con umbrales
4. **💧 Humedad** - Tendencias por ubicación
5. **🌪️ Presión** - Datos barométricos

### 📱 App Flutter (3 Pantallas):

1. **Home** - Resumen general y ubicaciones
2. **Detalle** - Sensores por ubicación con alertas
3. **Gráficos** - Históricos interactivos

### 🌐 API REST (7 Endpoints):

- `/health` - Estado de servicios
- `/api/locations` - Ubicaciones disponibles
- `/api/summary` - Resumen general
- `/api/latest/:location` - Últimos valores
- `/api/data/:location/:sensor` - Datos históricos
- `/api/stats/:location/:sensor` - Estadísticas
- `WebSocket ws://localhost:3002` - Tiempo real

### 📍 3 Ubicaciones Monitoreadas:

- **Aula 20** (rojo) - Temperatura base: 22°C
- **Aula 21** (azul) - Temperatura base: 24°C
- **Laboratorio** (verde) - Temperatura base: 21°C

## 🔧 Uso Manual (Opcional)

### Solo Verificar Sistema

```cmd
verificar.bat
```

### Solo Iniciar Servicios Docker

```cmd
docker compose -f docker/docker-compose.yml up -d
```

### Solo Ejecutar Simulador

```cmd
python arduino/medusse_simulator.py
```

### Ver Logs de Servicios

```cmd
docker logs medusse_grafana
docker logs medusse_influxdb
docker logs medusse_telegraf
docker logs medusse_mosquitto
```

## �1 Datos Generados

### Formato de Datos del Simulador

```json
{
  "value": 24.5,
  "sensor": "dht22",
  "node_id": "ESP32_NODE_01",
  "timestamp": 1759948845541,
  "location": "aula20"
}
```

### Topics MQTT Generados

```
📤 iescelia/aula20/temperature: {"value": 24.5, ...}
📤 iescelia/aula20/humidity: {"value": 48.2, ...}
📤 iescelia/aula20/co2: {"value": 456, ...}
📤 iescelia/aula20/pressure: {"value": 1015.3, ...}
📤 iescelia/aula21/temperature: {"value": 26.1, ...}
📤 iescelia/laboratorio/temperature: {"value": 21.8, ...}
```

## 🎛️ Configuración del Sistema

### Servicios y Puertos

| Servicio     | Puerto | Descripción        |
| ------------ | ------ | ------------------ |
| **Grafana**  | 3000   | Dashboard web      |
| **API REST** | 3001   | Endpoints HTTP     |
| **WebSocket**| 3002   | Tiempo real        |
| **InfluxDB** | 8086   | Base de datos      |
| **MQTT**     | 1883   | Broker de mensajes |
| **Telegraf** | -      | Pipeline de datos  |
| **Flutter**  | -      | App multiplataforma|

### Frecuencias Optimizadas

- **Simulador:** Datos cada 15 segundos
- **Dashboard:** Actualización cada 30 segundos
- **Agregación:** Ventanas de 30 segundos

## 🆘 Solución de Problemas

### No aparecen datos en Grafana

```cmd
# 1. Verificar que el simulador esté corriendo
# Deberías ver mensajes 📤 en el terminal

# 2. Verificar servicios Docker
docker compose -f docker/docker-compose.yml ps

# 3. Reiniciar todo si es necesario
docker compose -f docker/docker-compose.yml restart
```

### Error "Docker no encontrado"

1. Instalar Docker Desktop
2. Asegurarse de que esté corriendo
3. Ejecutar `verificar.bat` de nuevo

### Error "Python no encontrado"

1. Instalar Python desde Microsoft Store
2. Instalar dependencias: `pip install paho-mqtt requests`

### Servicios no inician

```cmd
# Limpiar y reiniciar
docker compose -f docker/docker-compose.yml down
docker volume prune -f
docker compose -f docker/docker-compose.yml up -d
```

## 📁 Archivos Clave del Proyecto

### Scripts de Ejecución

- `sistema_completo.bat` - 🚀 **Ecosistema completo**
- `demo.bat` - 📊 **Solo Dashboard Grafana**
- `iniciar_api.bat` - 🌐 **Solo API REST**
- `ejecutar_flutter.bat` - 📱 **Solo App Flutter**
- `verificar.bat` - 🔍 **Verificar sistema**

### Core del Sistema

- `arduino/medusse_simulator.py` - ✅ **Simulador optimizado**
- `docker/grafana/dashboards/medusse-clean.json` - ✅ **Dashboard completo**
- `docker/docker-compose.yml` - ✅ **Stack de servicios**

### API y App

- `api/server.js` - ✅ **API REST + WebSocket**
- `medusse_app/lib/` - ✅ **App Flutter completa**
- `README_FLUTTER.md` - ✅ **Documentación app**

## 🎉 ¡Listo!

**En menos de 5 minutos tienes un ecosistema IoT completo funcionando:**

- ✅ **Core IoT:** Simulación de 3 ubicaciones con 4 sensores cada una
- ✅ **Pipeline:** MQTT → Telegraf → InfluxDB → Grafana
- ✅ **Dashboard:** Grafana profesional en tiempo real
- ✅ **API REST:** 7 endpoints + WebSocket tiempo real
- ✅ **App Móvil:** Flutter multiplataforma con gráficos interactivos
- ✅ **Preparado:** Para migración a LoRa Mesh sin cambios

**¡Ecosistema IoT profesional listo para demostración y producción!** 🚀

## 📱 Próximos Pasos

1. **Explorar API:** http://localhost:3001/health
2. **Probar Flutter:** `ejecutar_flutter.bat`
3. **Ver documentación:** `README_FLUTTER.md`
4. **Migrar a LoRa:** `MIGRACION.md`

---

_Proyecto desarrollado para IES Celia Viñas - Curso 2024/2025_
