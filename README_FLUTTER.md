# Medusse Flutter App

App móvil para monitoreo IoT del proyecto Medusse. Visualiza datos de sensores en tiempo real desde múltiples ubicaciones.

## 🚀 Inicio Rápido

### 1. Ejecutar la App

```cmd
ejecutar_flutter.bat
```

### 2. Requisitos Previos

- **Flutter SDK** instalado
- **API REST** corriendo en puerto 3001
- **Servicios Docker** activos (MQTT, InfluxDB, Grafana)

## 📱 Características de la App

### **Pantalla Principal (Home)**

- **Resumen general** con promedios de todos los sensores
- **Lista de ubicaciones** con datos en tiempo real
- **Estado de conexión** con la API
- **Actualización automática** vía WebSocket

### **Detalle de Ubicación**

- **4 sensores por ubicación**: Temperatura, Humedad, CO₂, Presión
- **Alertas visuales** cuando valores están fuera de rango
- **Acceso rápido** a gráficos históricos
- **Información de estado** de cada sensor

### **Gráficos Históricos**

- **Datos históricos** de 1h a 24h
- **Gráficos interactivos** con fl_chart
- **Estadísticas rápidas**: actual, promedio, min, max
- **Tooltips informativos** al tocar el gráfico

## 🎨 Diseño y UX

### **Colores por Sensor**

- 🌡️ **Temperatura**: Naranja (#FF5722)
- 💧 **Humedad**: Azul (#2196F3)
- 🫁 **CO₂**: Verde (#4CAF50)
- 🌪️ **Presión**: Morado (#9C27B0)

### **Colores por Ubicación**

- 🔴 **Aula 20**: Rojo (#E53E3E)
- 🔵 **Aula 21**: Azul (#3182CE)
- 🟢 **Laboratorio**: Verde (#38A169)

### **Sistema de Alertas**

- ✅ **Normal**: Verde - Valores dentro del rango
- ⚠️ **Advertencia**: Naranja - Valores cerca del límite
- 🚨 **Crítico**: Rojo - Valores fuera del rango seguro

## 📊 Umbrales de Alerta

### **Temperatura**

- Normal: 18°C - 28°C
- Advertencia: 15°C - 18°C / 28°C - 32°C
- Crítico: < 15°C / > 32°C

### **Humedad**

- Normal: 30% - 70%
- Advertencia: 20% - 30% / 70% - 80%
- Crítico: < 20% / > 80%

### **CO₂**

- Normal: < 1000 ppm
- Advertencia: 1000 - 1500 ppm
- Crítico: > 1500 ppm

### **Presión**

- Normal: 1000 - 1030 hPa
- Advertencia: 995 - 1000 hPa / 1030 - 1035 hPa
- Crítico: < 995 hPa / > 1035 hPa

## 🔧 Arquitectura Técnica

### **Estado de la App**

- **Provider Pattern** para gestión de estado
- **SensorProvider** centraliza datos y lógica
- **Actualización reactiva** con ChangeNotifier

### **Comunicación con API**

- **HTTP REST** para datos históricos
- **WebSocket** para tiempo real
- **Manejo de errores** robusto
- **Reconexión automática**

### **Estructura de Archivos**

```
lib/
├── main.dart                 # App principal y tema
├── models/
│   └── sensor_data.dart      # Modelos de datos
├── services/
│   └── api_service.dart      # Cliente API REST/WebSocket
├── providers/
│   └── sensor_provider.dart  # Gestión de estado
├── screens/
│   ├── home_screen.dart      # Pantalla principal
│   ├── location_detail_screen.dart  # Detalle ubicación
│   └── sensor_chart_screen.dart     # Gráficos históricos
└── widgets/
    ├── sensor_card.dart      # Tarjeta de sensor
    ├── location_card.dart    # Tarjeta de ubicación
    └── connection_status.dart # Estado de conexión
```

## 🌐 Conectividad

### **Endpoints API Utilizados**

- `GET /health` - Estado de servicios
- `GET /api/locations` - Ubicaciones disponibles
- `GET /api/summary` - Resumen general
- `GET /api/latest/:location` - Últimos valores
- `GET /api/data/:location/:sensor` - Datos históricos
- `WebSocket ws://localhost:3002` - Tiempo real

### **Configuración de Red**

```dart
// En api_service.dart
static const String baseUrl = 'http://localhost:3001';
static const String wsUrl = 'ws://localhost:3002';
```

## 📱 Plataformas Soportadas

- ✅ **Windows** (Desktop)
- ✅ **Web** (Chrome, Edge, Firefox)
- ✅ **Android** (con emulador o dispositivo)
- ✅ **iOS** (con simulador o dispositivo)

## 🔮 Preparado para LoRa Mesh

La app está diseñada para funcionar sin cambios cuando implementes LoRa Mesh:

1. **API REST** seguirá siendo la misma
2. **Estructura de datos** JSON compatible
3. **WebSocket** mantendrá el formato
4. **Solo el gateway** cambiará de simulador a LoRa

## 🛠️ Desarrollo

### **Comandos Útiles**

```cmd
# Instalar dependencias
flutter pub get

# Ejecutar en modo debug
flutter run

# Ejecutar en web
flutter run -d chrome

# Build para producción
flutter build windows
flutter build web
flutter build apk
```

### **Hot Reload**

- Presiona `r` en la consola para hot reload
- Presiona `R` para hot restart
- Presiona `q` para salir

### **Debug**

- La app incluye logs detallados en consola
- Estado de conexión visible en la UI
- Manejo de errores con mensajes informativos

## 🧪 Testing

### **Probar sin API**

La app maneja graciosamente la falta de conexión:

- Muestra estado "Sin conexión"
- Permite reintentar conexión
- Mantiene última información cargada

### **Probar con Datos Simulados**

1. Ejecutar `demo.bat` (servicios + simulador)
2. Ejecutar `iniciar_api.bat` (API REST)
3. Ejecutar `ejecutar_flutter.bat` (App Flutter)

## 📋 TODO / Mejoras Futuras

- [ ] **Notificaciones push** para alertas críticas
- [ ] **Modo offline** con cache local
- [ ] **Exportar datos** a CSV/PDF
- [ ] **Configuración de umbrales** personalizable
- [ ] **Múltiples dashboards** personalizables
- [ ] **Autenticación** de usuarios
- [ ] **Temas** claro/oscuro automático

## 🎯 Casos de Uso

### **Profesor/Administrador**

- Monitorear condiciones ambientales del aula
- Recibir alertas de CO₂ alto
- Ver tendencias históricas
- Verificar funcionamiento de sensores

### **Estudiante/Usuario**

- Consultar condiciones actuales
- Ver gráficos de evolución
- Comparar entre ubicaciones
- Acceso rápido desde móvil

### **Técnico/Mantenimiento**

- Diagnosticar problemas de sensores
- Verificar conectividad
- Analizar patrones anómalos
- Estadísticas de funcionamiento

---

**¡La app Flutter está lista para usar con tu sistema Medusse IoT!** 🚀

Ejecuta `ejecutar_flutter.bat` y disfruta monitoreando tus sensores en tiempo real.
