---
inclusion: always
---

# Reglas del Proyecto Medusse IoT
- Lo comentarios siempre seran en ESPAÑOL de España, y nunca con acentos.
- TODA y repito, TODA la documentación estará en un solo archivo, el README.md. Aparte, cada vez que se modifique algo sustancial del proyecto, se deberá actualizar el CHANGELOG.md y documentarlo.
- El proyecto lo mas limpio posible de archivos que no se utilicen, o sean extrictamente necesarios, me refiero a tests, debugs, .bat, .md, etc...

## Información del Proyecto
- **Nombre**: Medusse IoT - Sistema de Monitoreo Ambiental Completo
- **Versión**: 2.3.0
- **Autor**: Francisco Manuel López Alarte
- **Institución**: IES José Rodrigo Botet
- **Curso**: 2025/2026
- **Licencia**: All Rights Reserved

## Arquitectura del Sistema

### Stack Tecnológico Completo
```
ESP32 Simulators → MQTT → Telegraf → InfluxDB → Grafana Dashboard
                     ↓
                 API REST ← Flutter Mobile App
                     ↓
                WebSocket (Real-time)
```

### Componentes Principales
- **MQTT Broker**: Mosquitto 2.0 (puerto 1883, WebSocket 9001)
- **InfluxDB**: Base de datos de series temporales v2.7 (puerto 8086)
- **Telegraf**: Pipeline de datos MQTT→InfluxDB v1.28
- **Grafana**: Visualización profesional v10.2.0 (puerto 3000)
- **API REST**: Node.js + Express (puerto 3001)
- **WebSocket**: Streaming tiempo real (puerto 3002)
- **App Flutter**: Multiplataforma (Windows, Web, Android, iOS)

### Ubicaciones del Sistema
1. **Aula 20** - Color: Rojo (#E53E3E) - Temp. base: 22°C - Node: ESP32_NODE_01
2. **Aula 21** - Color: Púrpura (#805AD5) - Temp. base: 24°C - Node: ESP32_NODE_02
3. **Gimnasio** - Color: Naranja (#FF9800) - Temp. base: 23°C - Node: ESP32_NODE_03
4. **Laboratorio** - Color: Verde (#38A169) - Temp. base: 21°C - Node: ESP32_NODE_04

### Sensores Monitoreados (18 tipos)
#### Sensores Ambientales
- **Temperatura** (°C) - DHT22/BME680
- **Humedad** (%) - DHT22/BME680
- **CO₂** (ppm) - Sensor de gas
- **Presión atmosférica** (hPa) - BME680
- **VOC** (ppb) - Compuestos Orgánicos Volátiles - BME680
- **IAQ** (índice) - Calidad del Aire Interior - BME680

#### Sensores de Calidad de Agua y Suelo
- **Humedad del suelo** (%) - Sensor capacitivo
- **pH** (nivel) - Sensor de pH
- **Flujo de agua** (L/min) - YF-S201
- **TDS** (ppm) - Sólidos Disueltos Totales
- **Oxígeno disuelto** (mg/L) - Sensor DO

#### Sistema de Energía Solar (FASE 2)
- **Voltaje de batería** (V) - 3.2-4.2V
- **Voltaje solar** (V) - Panel 18.5V max
- **Porcentaje de batería** (%) - 0-100%
- **Consumo de energía** (mA) - Consumo actual
- **Estado de carga** (bool) - Cargando/No cargando
- **Modo bajo consumo** (bool) - Activado/Desactivado
- **Contador de wake-ups** (count) - Número de despertares

## Reglas de Desarrollo

### Estructura de Código
- **Modular**: Cada componente en su directorio (`api/`, `arduino/`, `docker/`, `medusse_app/`)
- **Configurable**: Usar archivos de configuración centralizados
- **Robusto**: Implementar manejo de errores y reconexión automática
- **Escalable**: Facilitar la adición de nuevos sensores y ubicaciones

### Convenciones de Naming
- **Topics MQTT**: `iescelia/{ubicacion}/{sensor}` (ej: `iescelia/aula20/temperature`)
- **Nodos**: `ESP32_NODE_{numero:02d}` (ej: `ESP32_NODE_01`)
- **Archivos Python**: snake_case (ej: `medusse_simulator.py`)
- **Archivos JavaScript**: camelCase (ej: `server.js`)
- **Archivos Dart**: snake_case (ej: `sensor_service.dart`)
- **Clases**: PascalCase (ej: `SensorManager`)

### Configuración del Sistema
- **Docker Compose**: `docker/docker-compose.yml`
- **Telegraf Pipeline**: `docker/telegraf/telegraf.conf`
- **Dashboard Grafana**: `docker/grafana/dashboards/medusse-clean.json`
- **API REST**: `api/server.js` y `api/package.json`
- **Flutter App**: `medusse_app/pubspec.yaml`
- **Simulador**: `arduino/medusse_simulator.py`

### Credenciales del Sistema
- **Grafana**: admin / medusse2025
- **InfluxDB**: admin / medusse2025
- **InfluxDB Token**: medusse-admin-token-2025
- **InfluxDB Org**: iescelia
- **InfluxDB Bucket**: sensors

## Reglas de Modificación

### NUNCA cambiar sin consultar:
- Estructura de topics MQTT existentes (`iescelia/{ubicacion}/{sensor}`)
- Esquema de base de datos InfluxDB (bucket: sensors, org: iescelia)
- Puertos de servicios Docker (1883, 8086, 3000, 3001, 3002, 9001)
- Formato JSON de datos de sensores
- Credenciales de acceso configuradas

### SIEMPRE mantener:
- Compatibilidad con Windows (modo simulación)
- Preparación para Raspberry Pi (hardware real con LoRa)
- Formato de datos consistente entre simulador y hardware real
- Pipeline de datos sin pérdidas (MQTT → Telegraf → InfluxDB)
- Compatibilidad API REST con App Flutter

### Al agregar nuevos sensores:
1. Actualizar `arduino/medusse_simulator.py` con nuevo sensor
2. Agregar topic MQTT en `docker/telegraf/telegraf.conf`
3. Actualizar dashboard Grafana si es relevante
4. Documentar en README.md y CHANGELOG.md
5. Actualizar API REST si se necesitan nuevos endpoints
6. Considerar actualizar App Flutter para mostrar nuevos datos

### Al modificar el dashboard Grafana:
- **Dashboard único**: Solo existe `medusse-clean.json`
- Mantener variables dinámicas: `${location}` para filtrado
- Preservar esquema de colores por ubicación
- Asegurar compatibilidad con todas las ubicaciones
- Mantener filas colapsables para organización
- Conservar header personalizado con branding

### Al modificar la API REST:
- Mantener endpoints existentes para compatibilidad
- Usar cache inteligente (30 segundos) para optimizar rendimiento
- Implementar manejo de errores completo con try-catch
- Mantener formato JSON consistente con Flutter App
- Documentar nuevos endpoints en `api/README.md`

### Al modificar la App Flutter:
- Mantener arquitectura Provider para gestión de estado
- Usar Material Design 3 con tema personalizado
- Mantener compatibilidad multiplataforma
- Actualizar `pubspec.yaml` con nuevas dependencias
- Documentar cambios en README_FLUTTER.md

### Gestión de archivos:
- **SIEMPRE borrar** scripts de debug o archivos temporales después de usarlos
- Solo mantener archivos necesarios para el funcionamiento del proyecto
- Documentar claramente qué archivos son permanentes vs temporales

### Documentación del proyecto:
- **SIEMPRE actualizar** CHANGELOG.md cuando se hagan cambios significativos
- **SIEMPRE actualizar** README.md con nuevas funcionalidades
- Documentar versiones, fechas y descripción de cambios importantes
- Mantener la documentación sincronizada con el estado real del proyecto

## Comandos Importantes

### Scripts de Instalación
```cmd
instalar_proyecto.bat      # Instalación completa automática (equipos nuevos)
setup_rapido.bat          # Setup rápido (Docker ya instalado)
```

### Scripts de Ejecución
```cmd
sistema_completo.bat      # Ecosistema completo (recomendado)
demo.bat                  # Solo Dashboard Grafana
iniciar_api.bat          # Solo API REST + WebSocket
ejecutar_flutter.bat     # Solo App móvil Flutter
```

### Scripts de Verificación
```cmd
verificar.bat            # Verificación completa del sistema
verificar_rapido.bat     # Verificación rápida (30 segundos)
probar_api.bat          # Testing automático de API
```

### Comandos Docker
```cmd
# Iniciar servicios
docker compose -f docker/docker-compose.yml up -d

# Ver logs
docker logs medusse_grafana
docker logs medusse_influxdb
docker logs medusse_telegraf
docker logs medusse_mosquitto

# Detener servicios
docker compose -f docker/docker-compose.yml down

# Limpiar volúmenes
docker volume prune -f
```

### Comandos Python
```cmd
# Ejecutar simulador
python arduino/medusse_simulator.py

# Instalar dependencias
python -m pip install -r requirements.txt
```

### Comandos Node.js
```cmd
# Instalar dependencias API
cd api
npm install

# Ejecutar API
npm start
```

### Comandos Flutter
```cmd
# Instalar dependencias
cd medusse_app
flutter pub get

# Ejecutar app
flutter run -d windows
```

## URLs del Sistema

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| **Grafana Dashboard** | http://localhost:3000 | admin / medusse2025 |
| **API REST** | http://localhost:3001 | - |
| **API Health** | http://localhost:3001/health | - |
| **API Summary** | http://localhost:3001/api/summary | - |
| **WebSocket** | ws://localhost:3002 | - |
| **InfluxDB** | http://localhost:8086 | admin / medusse2025 |

## Endpoints API REST

### Endpoints Principales
- `GET /health` - Estado de todos los servicios
- `GET /api/locations` - Lista de ubicaciones disponibles
- `GET /api/summary` - Resumen general de todas las ubicaciones
- `GET /api/latest/:location` - Últimos valores por ubicación
- `GET /api/data/:location/:sensor` - Datos históricos con filtros
- `GET /api/stats/:location/:sensor` - Estadísticas (min/max/avg)

### Endpoints de Energía (FASE 2)
- `GET /api/energy/:location` - Datos de energía por ubicación
- `GET /api/energy/summary` - Resumen de energía de todas las ubicaciones
- `GET /api/energy/alerts` - Alertas de energía del sistema
- `GET /api/energy/:location/history` - Histórico de energía

## Estructura de Datos

### Formato JSON de Sensores (MQTT)
```json
{
  "value": 24.5,
  "sensor": "dht22",
  "node_id": "ESP32_NODE_01",
  "timestamp": 1759948845541,
  "location": "aula20"
}
```

### Formato JSON de Energía (MQTT)
```json
{
  "value": 3.85,
  "sensor": "battery_voltage",
  "node_id": "ESP32_NODE_01",
  "timestamp": 1759948845541,
  "location": "aula20"
}
```

## Preparación para LoRa Mesh

### Arquitectura Compatible
El proyecto está **completamente preparado** para migración a hardware real:
- **Gateway intercambiable** - Solo cambiar de simulador a gateway LoRa
- **Formato de datos idéntico** - Sin modificar API/Flutter/Grafana
- **Pipeline sin cambios** - MQTT → InfluxDB → Grafana
- **Documentación completa** - Ver MIGRACION.md

### Hardware Requerido (Futuro)
- 4x ESP32 con módulos LoRa SX1276/SX1262
- 1x Raspberry Pi 4 con módulo LoRa
- Sensores: DHT22, BME680, sensores de agua/suelo
- Antenas LoRa 868MHz

### Configuración LoRa
- **Frecuencia**: 868 MHz (EU)
- **Bandwidth**: 125 kHz
- **Spreading Factor**: 7
- **Coding Rate**: 4/5
- **Potencia**: 10 dBm

## Dependencias del Proyecto

### Python (requirements.txt)
- paho-mqtt - Cliente MQTT
- requests - HTTP client

### Node.js (api/package.json)
- @influxdata/influxdb-client ^1.35.0
- express ^4.18.2
- cors ^2.8.5
- ws ^8.14.2
- mqtt ^5.3.0
- dotenv ^16.3.1

### Flutter (medusse_app/pubspec.yaml)
- http ^1.1.0
- web_socket_channel ^2.4.0
- fl_chart ^0.66.0
- provider ^6.1.1
- go_router ^12.1.3
- intl ^0.19.0
- shared_preferences ^2.2.2
- google_fonts ^6.1.0

## Frecuencias y Tiempos

### Simulador
- **Intervalo de datos**: 15 segundos entre ciclos
- **Publicación MQTT**: Inmediata por sensor

### Dashboard Grafana
- **Actualización automática**: Cada 30 segundos
- **Agregación de datos**: Ventanas de 30 segundos

### API REST
- **Cache de datos**: 30 segundos
- **Timeout consultas**: 5 segundos

### WebSocket
- **Streaming**: Cada 15 segundos (sincronizado con simulador)

## Solución de Problemas Comunes

### No aparecen datos en Grafana
1. Verificar que el simulador esté corriendo
2. Comprobar logs: `docker logs medusse_telegraf`
3. Verificar conexión MQTT: `docker logs medusse_mosquitto`
4. Reiniciar servicios si es necesario

### Error "bucket not found" en InfluxDB
```cmd
docker compose -f docker/docker-compose.yml down
docker volume prune -f
docker compose -f docker/docker-compose.yml up -d
```

### API no responde
1. Verificar que Node.js esté instalado
2. Instalar dependencias: `cd api && npm install`
3. Verificar que InfluxDB esté corriendo
4. Revisar logs en consola

### App Flutter no compila
1. Verificar Flutter instalado: `flutter doctor`
2. Instalar dependencias: `flutter pub get`
3. Limpiar build: `flutter clean`
4. Verificar que API esté corriendo

### Docker no inicia
1. Verificar Docker Desktop está corriendo
2. Reiniciar Docker Desktop
3. Ejecutar `verificar.bat` para diagnóstico

## Buenas Prácticas

### Al Desarrollar
- Usar `verificar.bat` antes de empezar a trabajar
- Probar cambios con `sistema_completo.bat`
- Documentar cambios en CHANGELOG.md
- Mantener formato de código consistente

### Al Hacer Commits
- Usar mensajes descriptivos
- Incluir número de versión si aplica
- Referenciar issues o features relacionadas
- No commitear archivos temporales o de debug

### Al Agregar Features
1. Planificar cambios necesarios en cada componente
2. Actualizar documentación primero
3. Implementar cambios de forma incremental
4. Probar cada componente individualmente
5. Probar integración completa
6. Actualizar CHANGELOG.md

### Al Hacer Testing
- Usar `verificar.bat` para verificación completa
- Usar `probar_api.bat` para testing de API
- Verificar datos en Grafana visualmente
- Probar App Flutter en múltiples plataformas
- Verificar logs de todos los servicios

## Notas Importantes

### Compatibilidad
- El proyecto funciona en **Windows** con simulación
- Preparado para **Raspberry Pi** con hardware real
- App Flutter es **multiplataforma** (Windows, Web, Android, iOS)

### Escalabilidad
- Fácil agregar nuevas ubicaciones
- Fácil agregar nuevos tipos de sensores
- Pipeline diseñado para alto volumen de datos
- API REST preparada para múltiples clientes

### Seguridad
- Credenciales configuradas para desarrollo
- **CAMBIAR credenciales en producción**
- Considerar autenticación en API para producción
- Implementar HTTPS en producción

### Performance
- Cache inteligente en API (30s)
- Agregación de datos en Telegraf
- Consultas optimizadas en InfluxDB
- WebSocket para tiempo real eficiente

## Contacto y Soporte

**Autor**: Francisco Manuel López Alarte
**Email**: pacoaldev@gmail.com
**Institución**: IES José Rodrigo Botet
**Curso**: 2025/2026

---

**Estado del Proyecto**: ✅ ECOSISTEMA COMPLETO Y FUNCIONAL

**Última Actualización**: Versión 2.3.0 - Dashboard Profesional con Filtros Avanzados

**Próximos Pasos**: Migración a LoRa Mesh con hardware real (ver MIGRACION.md)
