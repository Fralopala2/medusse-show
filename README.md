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

Cómo desarrollar localmente

1. Instala Visual Studio Code y extiende con PlatformIO si vas a trabajar en firmware.
2. Para servicios (broker MQTT, InfluxDB, Grafana) se recomienda usar Docker Desktop y ejecutar los servicios con `docker-compose` desde la carpeta `docker/`.

Contribuir

Si quieres contribuir, crea una Issue describiendo tu propuesta o abre un Pull Request. Revisa `CONTRIBUTING.md` para más detalles.

Licencia

Este repositorio está marcado como privado en GitHub y los contenidos están bajo
"All Rights Reserved" por defecto. Ninguna parte del repositorio puede ser
utilizada, copiada o distribuida sin permiso expreso del propietario. Para
consultas de licencia o permisos por favor contacta al autor.

Contacto

Francisco Manuel López Alarte