# Proyecto Medusse IoT

Sistema IoT completo para monitoreo ambiental con ESP32, MQTT, InfluxDB y Grafana.

## 📋 Descripción

Proyecto IoT completo que simula una red de sensores ESP32 recopilando datos ambientales (temperatura, humedad, CO2, presión) y visualizándolos en tiempo real mediante un stack tecnológico moderno.

## 🏗️ Arquitectura

```
ESP32 Simulators → MQTT → Telegraf → InfluxDB → Grafana Dashboard
```

## 📁 Estructura del Proyecto

```
proyecto-medusse/
├── arduino/                    # Simuladores y firmware ESP32
│   ├── medusse_simulator.py   # ✅ Simulador principal (3 ubicaciones)
│   └── src/                   # Código ESP32 real
├── docker/                    # Stack completo Docker
│   ├── docker-compose.yml     # Servicios: MQTT, InfluxDB, Grafana, Telegraf
│   ├── grafana/              # Configuración y dashboards
│   ├── telegraf/             # Pipeline de datos MQTT→InfluxDB
│   └── mosquitto/            # Broker MQTT
├── gateway/                   # Gateway avanzado (opcional)
├── demo.bat                   # 🚀 Ejecutar demo completa
├── verificar.bat             # 🔍 Verificar sistema
└── README.md                 # Esta documentación
```

## 🎉 Estado: COMPLETADO ✅

### ✅ Funcionalidades Implementadas

- **3 ubicaciones monitoreadas:** Aula 20, Aula 21, Laboratorio
- **4 tipos de sensores:** Temperatura, Humedad, CO2, Presión
- **Dashboard en tiempo real** con visualización optimizada
- **Pipeline completo** funcionando end-to-end
- **Simulador realista** con datos variables por ubicación

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker Desktop instalado y funcionando
- Python 3.7+ con pip
- Windows 10/11 (scripts .bat incluidos)

### 1. Verificar Sistema

```cmd
verificar.bat
```

### 2. Ejecutar Demo Completa

```cmd
demo.bat
```

Esto automáticamente:

- ✅ Inicia todos los servicios Docker
- ✅ Abre Grafana en el navegador
- ✅ Ejecuta el simulador de datos
- ✅ Muestra datos en tiempo real

### 3. Acceder al Dashboard

- **URL:** http://localhost:3000
- **Usuario:** admin
- **Contraseña:** medusse2025
- **Dashboard:** "Medusse IoT - Dashboard Completo"

## 📊 Servicios Incluidos

| Servicio        | Puerto | Descripción                        |
| --------------- | ------ | ---------------------------------- |
| **Grafana**     | 3000   | Dashboard y visualización          |
| **InfluxDB**    | 8086   | Base de datos de series temporales |
| **MQTT Broker** | 1883   | Comunicación IoT                   |
| **Telegraf**    | -      | Pipeline de datos                  |

## 🛠️ Uso Manual

### Ejecutar Solo el Simulador

```cmd
python arduino/medusse_simulator.py
```

### Iniciar Solo los Servicios Docker

```cmd
docker compose -f docker/docker-compose.yml up -d
```

### Ver Logs de Servicios

```cmd
docker logs medusse_grafana
docker logs medusse_influxdb
docker logs medusse_telegraf
```

## 📈 Características del Dashboard

- **Panel de Temperatura:** Gráfico de líneas por ubicación
- **Panel de CO2:** Niveles con alertas por colores
- **Panel de Humedad:** Tendencias por ubicación
- **Gauges de CO2:** Valores actuales con umbrales
- **Actualización:** Cada 30 segundos
- **Agregación:** Datos promediados cada 30 segundos

## 🔧 Configuración Avanzada

### Modificar Frecuencia de Datos

Editar `arduino/medusse_simulator.py`:

```python
time.sleep(15)  # Cambiar intervalo entre ciclos
```

### Agregar Nueva Ubicación

En `medusse_simulator.py`, agregar a la lista `locations`:

```python
{"name": "nueva_aula", "node": "ESP32_NODE_04", "temp_base": 23}
```

### Personalizar Dashboard

- Editar: `docker/grafana/dashboards/medusse-clean.json`
- Reiniciar: `docker compose restart grafana`

## 🐛 Solución de Problemas

### No aparecen datos en Grafana

1. Verificar que el simulador esté corriendo
2. Comprobar logs: `docker logs medusse_telegraf`
3. Verificar conexión MQTT: `docker logs medusse_mosquitto`

### Error "bucket not found"

```cmd
docker compose down
docker volume prune -f
docker compose up -d
```

### Servicios no inician

```cmd
verificar.bat
```

## 📝 Desarrollo

### Conectar ESP32 Real

1. Modificar `gateway/medusse_gateway.py`
2. Cambiar source de `simulator` a `serial`
3. Especificar puerto: `--port COM3`

### Agregar Nuevos Sensores

1. Modificar simulador para incluir nuevos campos
2. Actualizar configuración Telegraf
3. Crear nuevos paneles en Grafana

## 🤝 Contribuir

Si quieres contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia "All Rights Reserved".

Para consultas de licencia o permisos, contacta al autor.

## 👨‍💻 Autor

**Francisco Manuel López Alarte**

---

## 🎯 Próximos Pasos

- [ ] Integración con ESP32 físicos
- [ ] Comunicación LoRa mesh
- [ ] Alertas automáticas por umbrales
- [ ] API REST para datos
- [ ] App móvil de monitoreo

---

_Proyecto desarrollado para IES Celia Viñas - Curso 2024/2025_
