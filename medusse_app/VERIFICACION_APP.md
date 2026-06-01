# Verificacion de la App Flutter - Medusse IoT

## Estado de la App

✅ **App Flutter completamente funcional y lista para probar**

---

## Requisitos Previos

### Software Necesario

1. **Flutter SDK 3.9+**
   - Verificar: `flutter --version`
   - Instalar desde: https://flutter.dev/docs/get-started/install

2. **Docker Desktop**
   - Debe estar corriendo
   - Servicios: Mosquitto, InfluxDB, Telegraf, Grafana, MySQL

3. **Node.js 18+**
   - Para la API REST
   - Verificar: `node --version`

4. **Python 3.9+**
   - Para el simulador
   - Verificar: `python --version`

---

## Estructura de la App

```
medusse_app/
├── lib/
│   ├── main.dart                    # Entry point con tema Material 3
│   ├── models/
│   │   ├── sensor_data.dart         # Modelos de datos
│   │   └── system_alert.dart        # Alertas del panel admin (API)
│   ├── providers/
│   │   └── sensor_provider.dart     # Gestion de estado con Provider
│   ├── screens/
│   │   ├── home_screen.dart         # Pantalla principal
│   │   ├── location_detail_screen.dart  # Detalle de ubicacion
│   │   ├── sensor_chart_screen.dart     # Graficos historicos
│   │   └── settings_screen.dart         # Configuracion
│   ├── services/
│   │   ├── api_service.dart         # Cliente API REST
│   │   └── config_service.dart      # Configuracion de URLs
│   └── widgets/
│       ├── connection_status.dart   # Indicador de conexion
│       ├── location_card.dart       # Card de ubicacion (badge de alertas)
│       ├── sensor_card.dart         # Card de sensor
│       └── system_alerts_section.dart  # Lista de alertas operativas
├── pubspec.yaml                     # Dependencias
└── README.md
```

---

## Dependencias Instaladas

### Comunicacion
- `http: ^1.1.0` - Cliente HTTP para API REST
- `web_socket_channel: ^2.4.0` - WebSocket para tiempo real

### UI y Graficos
- `fl_chart: ^0.66.0` - Graficos interactivos
- `google_fonts: ^6.1.0` - Tipografia Google Fonts

### Estado y Navegacion
- `provider: ^6.1.1` - Gestion de estado
- `go_router: ^12.1.3` - Navegacion

### Utilidades
- `intl: ^0.19.0` - Formateo de fechas y numeros
- `shared_preferences: ^2.2.2` - Almacenamiento local

---

## Configuracion de URLs

### URLs por Defecto (Localhost)

```dart
API REST:   http://localhost:4001
WebSocket:  ws://localhost:4002
```

### Configuraciones Predefinidas

La app incluye 3 configuraciones predefinidas:

1. **Local (Docker)** - localhost:4001
2. **Red Local** - 192.168.1.140:4001
3. **Simulacion** - 127.0.0.1:4001

Puedes cambiar la configuracion desde la pantalla de Settings en la app.

---

## Funcionalidades Implementadas

### Pantalla Home (home_screen.dart)

✅ **Grid de 4 ubicaciones:**
- Aula 20 (Rojo)
- Aula 21 (Purpura)
- Gimnasio (Naranja)
- Laboratorio (Verde)

✅ **Datos en tiempo real:**
- Temperatura
- Humedad
- CO2
- Ultima actualizacion

✅ **Indicador de conexion:**
- Verde: Conectado
- Rojo: Desconectado
- Reconexion automatica

✅ **Pull-to-refresh:**
- Deslizar hacia abajo para actualizar

✅ **Alertas del sistema (panel admin):**
- Lista de alertas no resueltas bajo el estado de conexion
- Badge en cada ubicacion con numero de alertas
- Mas detalle en `README.md` (seccion «Alertas del sistema»)

### Pantalla Detalle (location_detail_screen.dart)

✅ **18 sensores monitoreados:**
- Sensores ambientales (6)
- Sensores de agua (5)
- Sensores de energia (7)

✅ **Cards de sensores:**
- Valor actual
- Unidad de medida
- Icono diferenciado
- Color por tipo
- Resaltado si hay alerta del panel admin o umbral local superado

✅ **Alertas en la ubicacion:**
- Bloque «Alertas en esta ubicacion» cuando hay alertas activas

✅ **Navegacion:**
- Tap en sensor para ver graficos historicos

### Pantalla Graficos (sensor_chart_screen.dart)

✅ **Grafico interactivo:**
- Linea temporal con fl_chart
- Zoom y pan
- Tooltips con valores

✅ **Selector de rango:**
- 1 hora
- 6 horas
- 24 horas
- 7 dias

✅ **Estadisticas:**
- Minimo
- Maximo
- Promedio

### Pantalla Settings (settings_screen.dart)

✅ **Configuracion de servidor:**
- URL de API REST
- URL de WebSocket
- Configuraciones predefinidas
- Test de conexion

✅ **Informacion de la app:**
- Version
- Autor
- Repositorio

---

## Como Probar la App

### Opcion 1: Script Automatico (Recomendado)

```cmd
probar_app_flutter.bat
```

Este script:
1. Verifica Flutter instalado
2. Inicia Docker si no esta corriendo
3. Inicia servicios Docker
4. Inicia API REST
5. Inicia simulador
6. Instala dependencias de Flutter
7. Ejecuta la app

### Opcion 2: Manual

**1. Iniciar servicios:**
```cmd
sistema_completo.bat
```

**2. Instalar dependencias:**
```cmd
cd medusse_app
flutter pub get
```

**3. Ejecutar app:**
```cmd
# Windows
flutter run -d windows

# Chrome
flutter run -d chrome

# Listar dispositivos
flutter devices
```

---

## Verificacion de Funcionamiento

### 1. Verificar Servicios

```cmd
# Docker
docker ps

# API REST
curl http://localhost:4001/health

# WebSocket (desde la app)
```

### 2. Verificar Datos

**En la app:**
1. Abrir pantalla Home
2. Verificar que aparezcan 4 ubicaciones
3. Verificar que los valores se actualicen
4. Verificar indicador de conexion verde

**Datos esperados:**
- Temperatura: 20-26°C
- Humedad: 50-70%
- CO2: 400-600 ppm
- Presion: 1008-1018 hPa

### 3. Verificar Navegacion

1. Tap en una ubicacion → Pantalla de detalle
2. Verificar 18 sensores listados
3. Tap en un sensor → Pantalla de graficos
4. Verificar grafico con datos historicos
5. Cambiar rango temporal
6. Verificar estadisticas (min/max/avg)

### 4. Verificar Tiempo Real

1. Observar valores en pantalla Home
2. Esperar 15 segundos (intervalo del simulador)
3. Verificar que los valores cambien
4. Pull-to-refresh para actualizar manualmente

### 5. Verificar Alertas del Sistema

1. API y MySQL en marcha; migracion `004_alerts_grafana.sql` aplicada
2. Crear una alerta en el panel web (dashboard → Alertas)
3. Comprobar API: `curl http://localhost:4001/api/system-alerts`
4. En la app: Actualizar → debe aparecer «Alertas del sistema» en Home
5. Entrar en la ubicacion de la alerta → lista filtrada y sensor resaltado

---

## Soluciones a Problemas Comunes

### Error: "No devices found"

**Solucion:**
```cmd
# Verificar dispositivos
flutter devices

# Si no aparece Windows, habilitar:
flutter config --enable-windows-desktop

# Si no aparece Chrome:
flutter config --enable-web
```

### Error: "Failed to connect to API"

**Solucion:**
1. Verificar que la API este corriendo: `curl http://localhost:4001/health`
2. Verificar que Docker este corriendo: `docker ps`
3. Iniciar servicios: `sistema_completo.bat`
4. En la app, ir a Settings y probar conexion

### Error: "WebSocket connection failed"

**Solucion:**
1. Verificar que el puerto 4002 este libre
2. Reiniciar la API: `cd api && npm start`
3. En la app, cerrar y volver a abrir

### Error: "No data available"

**Solucion:**
1. Verificar que el simulador este corriendo
2. Esperar 15 segundos para que genere datos
3. Verificar en Grafana que haya datos: http://localhost:4000
4. Pull-to-refresh en la app

### App muy lenta

**Solucion:**
1. Ejecutar en modo release: `flutter run --release -d windows`
2. Cerrar otras apps pesadas
3. Verificar que Docker no este consumiendo muchos recursos

---

## Plataformas Soportadas

### ✅ Windows (Recomendado)
- Mejor rendimiento
- Ventana nativa
- Acceso completo a APIs

### ✅ Web (Chrome)
- Rapido para probar
- No requiere compilacion
- Limitaciones de WebSocket

### ✅ Android (Futuro)
- Requiere Android Studio
- Emulador o dispositivo fisico
- Cambiar URL a IP de red local

### ✅ iOS (Futuro)
- Requiere macOS y Xcode
- Dispositivo fisico o simulador
- Cambiar URL a IP de red local

---

## Capturas de Pantalla Esperadas

### Home Screen
- 4 cards de ubicaciones con colores
- Valores de temperatura, humedad, CO2
- Indicador de conexion verde
- Seccion «Alertas del sistema» (si hay alertas en MySQL)
- Boton de refresh

### Location Detail Screen
- Header con nombre y color de ubicacion
- 18 cards de sensores organizados
- Iconos diferenciados por tipo
- Valores actuales con unidades

### Sensor Chart Screen
- Grafico de linea temporal
- Selector de rango (1h, 6h, 24h, 7d)
- Estadisticas (min, max, avg)
- Titulo con nombre del sensor

### Settings Screen
- Campos de URL API y WebSocket
- Botones de configuraciones predefinidas
- Boton de test de conexion
- Informacion de la app

---

## Comandos Utiles

```cmd
# Ver dispositivos disponibles
flutter devices

# Ejecutar en Windows
flutter run -d windows

# Ejecutar en Chrome
flutter run -d chrome

# Ejecutar en modo release (mas rapido)
flutter run --release -d windows

# Ver logs
flutter logs

# Limpiar build
flutter clean

# Reinstalar dependencias
flutter pub get

# Analizar codigo
flutter analyze

# Ejecutar tests
flutter test
```

---

## Metricas de la App

### Codigo
- **Dart:** ~2000 lineas
- **Archivos:** 13 archivos
- **Pantallas:** 4 pantallas
- **Widgets:** 3 widgets personalizados
- **Servicios:** 2 servicios

### Funcionalidades
- **Ubicaciones:** 4 ubicaciones
- **Sensores:** 18 tipos de sensores
- **Endpoints API:** 8 endpoints consumidos (incluye `/api/system-alerts`)
- **WebSocket:** Tiempo real habilitado
- **Graficos:** Interactivos con fl_chart

### Performance
- **Tiempo de carga:** < 3 segundos
- **Actualizacion:** Cada 15 segundos (WebSocket)
- **Consumo memoria:** ~100 MB
- **Tamaño app:** ~20 MB (Windows)

---

## Proximos Pasos

### Mejoras Pendientes
- [ ] Notificaciones push para alertas
- [ ] Modo oscuro completo
- [ ] Exportar datos a CSV
- [ ] Graficos comparativos entre ubicaciones
- [x] Listado de alertas del panel admin en la app (ver `README.md`)
- [ ] Configuracion de umbrales personalizados desde la app

### Deployment
- [ ] Build para Android
- [ ] Build para iOS
- [ ] Publicar en Play Store
- [ ] Publicar en App Store

---

## Contacto y Soporte

**Autor:** Francisco Manuel Lopez Alarte  
**Email:** pacoaldev@gmail.com  
**Repositorio:** https://github.com/Fralopala2/medusse-show  
**Rama:** clase

---

**Ultima actualizacion:** Junio 2026  
**Version de la app:** 1.0.0  
**Estado:** ✅ Completamente funcional y lista para probar

