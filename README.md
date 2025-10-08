# Proyecto Medusse

Sistema IoT con LoRa Mesh para sensores ambientales.

Descripción

Este repositorio contiene el plan de desarrollo, configuraciones y recursos para el proyecto Medusse: una red de nodos basados en ESP32/LoRa que recopilan datos ambientales (temperatura, humedad, CO2) y los envían mediante una malla LoRa a un gateway que publica en MQTT/InfluxDB/Grafana.

Estructura propuesta

proyecto-medusse/
├── arduino/                # Firmware PlatformIO para nodos ESP32
├── gateway/                # Scripts y servicios del gateway (Python)
├── docker/                 # docker-compose para Mosquitto, InfluxDB, Grafana
└── docs/                   # Documentación adicional

Archivos en este repo

- `proyecto_medusse_fases.md` - Plan de desarrollo y fases
- `ConfiguracionVS CODE.txt` - Recomendaciones de herramientas y setup
- `Esquema proyecto.png` - Diagrama del sistema

Estado del Desarrollo

✅ **Fase 1-2: Firmware ESP32** - Completado
- Sensores DHT22, BME280, Gas funcionando
- Simuladores múltiples nodos
- Compilación PlatformIO exitosa

✅ **Fase 3: Gateway** - Completado  
- Procesamiento JSON → MQTT
- Múltiples nodos simultáneos
- 7+ mensajes/segundo throughput

🔄 **Fase 4: Stack Docker** - En progreso
- Mosquitto, InfluxDB, Grafana

Cómo desarrollar localmente

1. **Firmware:** `cd arduino && platformio run`
2. **Simuladores:** `python arduino/test_multiple_nodes.py`
3. **Gateway:** `python gateway/gateway_direct.py`
4. **Stack completa:** `docker-compose up -d` (próximamente)

Contribuir

Si quieres contribuir, crea una Issue describiendo tu propuesta o abre un Pull Request. Revisa `CONTRIBUTING.md` para más detalles.

Licencia

Este repositorio está marcado como privado en GitHub y los contenidos están bajo
"All Rights Reserved" por defecto. Ninguna parte del repositorio puede ser
utilizada, copiada o distribuida sin permiso expreso del propietario. Para
consultas de licencia o permisos por favor contacta al autor.

Contacto

Francisco Manuel López Alarte