# Medusse API REST

API REST para el proyecto Medusse IoT que proporciona acceso a datos de sensores desde InfluxDB y streaming en tiempo real vía WebSocket/MQTT.

## 🚀 Instalación y Uso

### 1. Instalar dependencias

```bash
cd api
npm install
```

### 2. Configurar variables de entorno

Editar `.env` si es necesario (ya configurado para el proyecto Medusse):

```env
PORT=3001
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=medusse-admin-token-2025
INFLUXDB_ORG=iescelia
INFLUXDB_BUCKET=sensors
MQTT_BROKER=localhost
MQTT_PORT=1883
```

### 3. Iniciar la API

```bash
npm start
# o para desarrollo con auto-reload:
npm run dev
```

## 📡 Endpoints Disponibles

### Health Check

```http
GET /health
```

Respuesta:

```json
{
  "status": "ok",
  "timestamp": "2025-01-11T10:30:00.000Z",
  "services": {
    "influxdb": "http://localhost:8086",
    "mqtt": "localhost:1883",
    "websocket": "ws://localhost:3002"
  }
}
```

### Ubicaciones Disponibles

```http
GET /api/locations
```

Respuesta:

```json
{
  "locations": ["aula20", "aula21", "laboratorio"]
}
```

### Datos Históricos

```http
GET /api/data/:location/:sensor?hours=24&interval=5m
```

Ejemplo: `GET /api/data/aula20/temperature?hours=12&interval=10m`

Respuesta:

```json
{
  "data": [
    {
      "time": "2025-01-11T10:00:00Z",
      "value": 24.5,
      "location": "aula20",
      "sensor": "temperature"
    }
  ]
}
```

### Últimos Valores por Ubicación

```http
GET /api/latest/:location
```

Ejemplo: `GET /api/latest/aula20`

Respuesta:

```json
{
  "location": "aula20",
  "data": {
    "temperature": {
      "value": 24.5,
      "time": "2025-01-11T10:30:00Z",
      "location": "aula20"
    },
    "humidity": {
      "value": 48.2,
      "time": "2025-01-11T10:30:00Z",
      "location": "aula20"
    },
    "co2": {
      "value": 456,
      "time": "2025-01-11T10:30:00Z",
      "location": "aula20"
    },
    "pressure": {
      "value": 1015.3,
      "time": "2025-01-11T10:30:00Z",
      "location": "aula20"
    }
  }
}
```

### Resumen de Todas las Ubicaciones

```http
GET /api/summary
```

Respuesta:

```json
{
  "summary": {
    "aula20": {
      "temperature": { "value": 24.5, "time": "2025-01-11T10:30:00Z" },
      "humidity": { "value": 48.2, "time": "2025-01-11T10:30:00Z" },
      "co2": { "value": 456, "time": "2025-01-11T10:30:00Z" },
      "pressure": { "value": 1015.3, "time": "2025-01-11T10:30:00Z" }
    },
    "aula21": { ... },
    "laboratorio": { ... }
  }
}
```

### Estadísticas

```http
GET /api/stats/:location/:sensor?hours=24
```

Ejemplo: `GET /api/stats/aula20/temperature?hours=12`

Respuesta:

```json
{
  "location": "aula20",
  "sensor": "temperature",
  "hours": 12,
  "stats": {
    "min": 22.1,
    "max": 26.8,
    "mean": 24.3
  }
}
```

## 🔌 WebSocket (Tiempo Real)

Conectar a: `ws://localhost:3002`

### Mensajes recibidos:

```json
{
  "topic": "iescelia/aula20/temperature",
  "data": {
    "value": 24.5,
    "sensor": "dht22",
    "node_id": "ESP32_NODE_01",
    "timestamp": 1641902400000,
    "location": "aula20"
  },
  "timestamp": "2025-01-11T10:30:00.000Z"
}
```

## 🧪 Pruebas

### Probar con curl

```bash
# Health check
curl http://localhost:3001/health

# Ubicaciones
curl http://localhost:3001/api/locations

# Últimos datos del aula20
curl http://localhost:3001/api/latest/aula20

# Datos históricos de temperatura (últimas 6 horas)
curl "http://localhost:3001/api/data/aula20/temperature?hours=6&interval=15m"
```

### Probar WebSocket

```javascript
const ws = new WebSocket("ws://localhost:3002");
ws.onmessage = (event) => {
  console.log("Datos en tiempo real:", JSON.parse(event.data));
};
```

## 🔧 Configuración para Flutter

La API está optimizada para Flutter con:

- **CORS habilitado** para desarrollo web
- **Endpoints RESTful** para http package
- **WebSocket** para datos en tiempo real
- **Formato JSON** consistente
- **Manejo de errores** apropiado

### Ejemplo de uso en Flutter:

```dart
// HTTP para datos históricos
final response = await http.get(
  Uri.parse('http://localhost:3001/api/latest/aula20')
);

// WebSocket para tiempo real
final channel = WebSocketChannel.connect(
  Uri.parse('ws://localhost:3002')
);
```

## 🚀 Preparado para LoRa Mesh

La API está diseñada para ser compatible con la futura implementación LoRa Mesh:

- **Misma estructura de datos** JSON
- **Mismos topics MQTT** (iescelia/location/sensor)
- **Flexibilidad** para agregar nuevos sensores/ubicaciones
- **Escalabilidad** para más nodos

Cuando implementes LoRa Mesh, solo necesitarás:

1. Cambiar el gateway para recibir datos LoRa
2. Mantener la publicación MQTT con el mismo formato
3. La API y Flutter app seguirán funcionando sin cambios

## 📊 Monitoreo

La API incluye logs detallados:

- Conexiones WebSocket
- Mensajes MQTT recibidos
- Consultas InfluxDB
- Errores y excepciones

## 🔐 Autenticación (Reto 9)

### Endpoints de Autenticación

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "medusse2025"
}
```

Respuesta exitosa:

```json
{
  "success": true,
  "message": "Autenticacion exitosa",
  "sessionToken": "550e8400-e29b-41d4-a716-446655440000",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@medusse.local",
    "fullName": "Administrador",
    "role": "admin"
  }
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440000
```

Respuesta:

```json
{
  "success": true,
  "message": "Sesion cerrada correctamente"
}
```

#### Validar Sesión

```http
GET /api/auth/validate
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440000
```

Respuesta:

```json
{
  "valid": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@medusse.local",
    "fullName": "Administrador",
    "role": "admin"
  }
}
```

#### Obtener Perfil

```http
GET /api/auth/profile
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440000
```

Respuesta:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@medusse.local",
    "fullName": "Administrador",
    "role": "admin"
  }
}
```

### Usuarios Disponibles

| Username | Password | Role | Descripción |
|----------|----------|------|-------------|
| admin | medusse2025 | admin | Administrador del sistema |
| paco | medusse2025 | admin | Autor del proyecto |
| profesor | medusse2025 | user | Usuario estándar |
| alumno | medusse2025 | viewer | Solo lectura |

### Middleware de Protección

Para proteger rutas, usa el middleware `requireAuth`:

```javascript
const auth = require('./auth');

// Ruta protegida
app.get('/api/protected', auth.requireAuth, (req, res) => {
  // req.user contiene la informacion del usuario autenticado
  res.json({ user: req.user });
});

// Ruta con rol especifico
app.get('/api/admin', auth.requireAuth, auth.requireRole('admin'), (req, res) => {
  res.json({ message: 'Solo administradores' });
});
```

### Seguridad Implementada

- **Tokens UUID** para sesiones seguras
- **Expiración automática** de sesiones (24 horas)
- **Registro de IP y User-Agent** en cada sesión
- **Validación con procedimientos almacenados** MySQL
- **Control de acceso por roles** (admin/user/viewer)
- **Protección contra ataques** de fuerza bruta

### Testing de Autenticación

```bash
# Ejecutar tests automaticos
node test-auth.js

# O usar el script batch (Windows)
..\probar_autenticacion.bat
```

## 🔒 Seguridad

Para producción, considera:

- ✅ Autenticación con sesiones (implementado)
- Rate limiting
- HTTPS/WSS
- Validación de entrada
- Variables de entorno seguras
- Rotación de tokens
- Auditoría de accesos
