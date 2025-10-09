# Quick Start - Proyecto Medusse IoT

Guía rápida para ejecutar el **sistema IoT completo** en Windows.

## 🎯 Proyecto Completado - Listo para Usar

**El proyecto Medusse IoT está 100% funcional.** Esta guía te permite ejecutarlo en **menos de 2 minutos**.

## ⚡ Inicio Ultra Rápido

### 1. Verificar Sistema

```cmd
verificar.bat
```

**Resultado esperado:** ✅ Todos los servicios OK

### 2. Ejecutar Demo Completa

```cmd
demo.bat
```

**Esto automáticamente:**

- ✅ Inicia servicios Docker (MQTT, InfluxDB, Grafana, Telegraf)
- ✅ Abre Grafana en el navegador
- ✅ Ejecuta simulador de 3 ubicaciones
- ✅ Muestra datos en tiempo real

### 3. Acceder al Dashboard

- **URL:** http://localhost:3000
- **Usuario:** `admin`
- **Contraseña:** `medusse2025`
- **Dashboard:** "Medusse IoT - Dashboard Completo"

## 📊 Qué Verás en el Dashboard

### 5 Paneles en Tiempo Real:

1. **🌡️ Temperatura** - Gráfico de líneas por ubicación
2. **🫁 CO2** - Niveles con alertas por colores
3. **🚨 CO2 Actual** - Gauges con umbrales
4. **💧 Humedad** - Tendencias por ubicación
5. **🌪️ Presión** - Datos barométricos

### 3 Ubicaciones Monitoreadas:

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
| **InfluxDB** | 8086   | Base de datos      |
| **MQTT**     | 1883   | Broker de mensajes |
| **Telegraf** | -      | Pipeline de datos  |

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

- `demo.bat` - ✅ **Ejecutar proyecto completo**
- `verificar.bat` - ✅ **Verificar sistema**

### Simulador y Datos

- `arduino/medusse_simulator.py` - ✅ **Simulador optimizado**
- `docker/grafana/dashboards/medusse-clean.json` - ✅ **Dashboard completo**

### Configuración Docker

- `docker/docker-compose.yml` - ✅ **Stack de servicios**
- `docker/telegraf/telegraf.conf` - ✅ **Pipeline de datos**

## 🎉 ¡Listo!

**En menos de 2 minutos tienes un sistema IoT completo funcionando:**

- ✅ Simulación de 3 ubicaciones con 4 sensores cada una
- ✅ Pipeline de datos moderno (MQTT → InfluxDB → Grafana)
- ✅ Dashboard profesional en tiempo real
- ✅ Visualización optimizada y clara

**¡Perfecto para demostración o como base para sensores ESP32 reales!** 🚀

---

_Proyecto desarrollado para IES Celia Viñas - Curso 2024/2025_
