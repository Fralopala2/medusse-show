# Medusse IoT - Documentación de Base de Datos MySQL

## Descripción General

Base de datos relacional MySQL 8.0 para gestión de usuarios, autenticación, configuración del sistema y alertas del proyecto Medusse IoT.

---

## Información de Conexión

### Desarrollo Local
```
Host: localhost
Port: 3306
Database: medusse_db
Usuario: medusse_user
Contraseña: medusse2025
Root Password: medusse2025
```

### Desde Docker Network
```
Host: mysql
Port: 3306
Database: medusse_db
```

---

## Diagrama Entidad-Relación

```
┌─────────────┐
│   users     │
├─────────────┤
│ id (PK)     │
│ username    │
│ email       │
│ password_hash│
│ full_name   │
│ role        │
│ is_active   │
│ created_at  │
│ updated_at  │
│ last_login  │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────────┐
│   sessions      │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ session_token   │
│ ip_address      │
│ user_agent      │
│ expires_at      │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│user_preferences │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │ 1:1 → users
│ theme           │
│ language        │
│ timezone        │
│ notifications   │
│ dashboard_layout│
└─────────────────┘

┌─────────────┐
│  locations  │
├─────────────┤
│ id (PK)     │
│ name        │
│ display_name│
│ description │
│ color       │
│ node_id     │
│ temp_base   │
│ is_active   │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────┴──────┐
│   alerts    │
├─────────────┤
│ id (PK)     │
│ location_id │ (FK) → locations
│ sensor_id   │ (FK) → sensors
│ alert_type  │
│ message     │
│ value       │
│ threshold   │
│ is_resolved │
│ resolved_at │
│ resolved_by │ (FK) → users
│ created_at  │
└──────┬──────┘
       │
       │ N:M
       │
┌──────┴──────────┐
│  user_alerts    │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │ → users
│ alert_id (FK)   │ → alerts
│ is_read         │
│ read_at         │
└─────────────────┘

┌─────────────┐
│   sensors   │
├─────────────┤
│ id (PK)     │
│ sensor_type │
│ display_name│
│ unit        │
│ icon        │
│ min_value   │
│ max_value   │
│ warning_th  │
│ danger_th   │
│ is_active   │
└─────────────┘

┌──────────────┐
│activity_log  │
├──────────────┤
│ id (PK)      │
│ user_id (FK) │ → users
│ action       │
│ entity_type  │
│ entity_id    │
│ details      │
│ ip_address   │
│ user_agent   │
│ created_at   │
└──────────────┘

┌──────────────┐
│system_config │
├──────────────┤
│ id (PK)      │
│ config_key   │
│ config_value │
│ config_type  │
│ description  │
│ is_public    │
└──────────────┘
```

---

## Tablas

### 1. users
**Descripción**: Usuarios del sistema Medusse IoT

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| username | VARCHAR(50) | Nombre de usuario (único) |
| email | VARCHAR(100) | Email (único) |
| password_hash | VARCHAR(255) | Hash bcrypt de contraseña |
| full_name | VARCHAR(100) | Nombre completo |
| role | ENUM | Rol: admin, user, viewer |
| is_active | BOOLEAN | Usuario activo |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |
| last_login | TIMESTAMP | Último inicio de sesión |

**Índices**: username, email, role

---

### 2. sessions
**Descripción**: Sesiones activas de usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| user_id | INT (FK) | Usuario propietario |
| session_token | VARCHAR(255) | Token UUID de sesión |
| ip_address | VARCHAR(45) | IP del cliente |
| user_agent | TEXT | User agent del navegador |
| expires_at | TIMESTAMP | Fecha de expiración |
| created_at | TIMESTAMP | Fecha de creación |

**Índices**: session_token, user_id, expires_at

---

### 3. user_preferences
**Descripción**: Preferencias personalizadas de usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| user_id | INT (FK) | Usuario (único) |
| theme | ENUM | Tema: light, dark, auto |
| language | VARCHAR(10) | Idioma (es, en) |
| timezone | VARCHAR(50) | Zona horaria |
| notifications_enabled | BOOLEAN | Notificaciones habilitadas |
| email_notifications | BOOLEAN | Notificaciones por email |
| dashboard_layout | JSON | Layout personalizado |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

---

### 4. locations
**Descripción**: Ubicaciones monitoreadas (Aula 20, 21, Gimnasio, Lab)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| name | VARCHAR(50) | Nombre interno (único) |
| display_name | VARCHAR(100) | Nombre para mostrar |
| description | TEXT | Descripción |
| color | VARCHAR(7) | Color hex (#E53E3E) |
| node_id | VARCHAR(50) | ID del nodo ESP32 |
| temp_base | DECIMAL(5,2) | Temperatura base |
| is_active | BOOLEAN | Ubicación activa |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

**Índices**: name, is_active

**Datos iniciales**:
- aula20: #E53E3E (Rojo)
- aula21: #805AD5 (Púrpura)
- gimnasio: #FF9800 (Naranja)
- laboratorio: #38A169 (Verde)

---

### 5. sensors
**Descripción**: Tipos de sensores configurados (18 tipos)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| sensor_type | VARCHAR(50) | Tipo de sensor (único) |
| display_name | VARCHAR(100) | Nombre para mostrar |
| unit | VARCHAR(20) | Unidad de medida |
| icon | VARCHAR(10) | Emoji del sensor |
| min_value | DECIMAL(10,2) | Valor mínimo |
| max_value | DECIMAL(10,2) | Valor máximo |
| warning_threshold | DECIMAL(10,2) | Umbral de advertencia |
| danger_threshold | DECIMAL(10,2) | Umbral de peligro |
| is_active | BOOLEAN | Sensor activo |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

**Índices**: sensor_type, is_active

**Categorías**:
- **Ambientales** (6): temperature, humidity, co2, pressure, voc, iaq
- **Agua/Suelo** (5): soil_moisture, ph_level, water_flow, tds, dissolved_oxygen
- **Energía** (7): battery_voltage, solar_voltage, battery_percentage, power_consumption, charging_status, low_power_mode, wake_count

---

### 6. alerts
**Descripción**: Alertas generadas por el sistema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| location_id | INT (FK) | Ubicación |
| sensor_id | INT (FK) | Sensor |
| alert_type | ENUM | Tipo: info, warning, danger, critical |
| message | TEXT | Mensaje de alerta |
| value | DECIMAL(10,2) | Valor que generó la alerta |
| threshold | DECIMAL(10,2) | Umbral superado |
| is_resolved | BOOLEAN | Alerta resuelta |
| resolved_at | TIMESTAMP | Fecha de resolución |
| resolved_by | INT (FK) | Usuario que resolvió |
| created_at | TIMESTAMP | Fecha de creación |

**Índices**: location_id, sensor_id, alert_type, is_resolved, created_at

---

### 7. user_alerts
**Descripción**: Notificaciones de alertas para usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| user_id | INT (FK) | Usuario |
| alert_id | INT (FK) | Alerta |
| is_read | BOOLEAN | Alerta leída |
| read_at | TIMESTAMP | Fecha de lectura |
| created_at | TIMESTAMP | Fecha de creación |

**Índices**: user_id, alert_id, is_read

---

### 8. activity_log
**Descripción**: Registro de actividad del sistema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| user_id | INT (FK) | Usuario (nullable) |
| action | VARCHAR(100) | Acción realizada |
| entity_type | VARCHAR(50) | Tipo de entidad |
| entity_id | INT | ID de entidad |
| details | JSON | Detalles adicionales |
| ip_address | VARCHAR(45) | IP del cliente |
| user_agent | TEXT | User agent |
| created_at | TIMESTAMP | Fecha de creación |

**Índices**: user_id, action, entity_type, created_at

**Acciones comunes**:
- user_login, user_logout
- user_created, user_updated, user_deleted
- alert_created, alert_resolved
- config_updated
- system_init

---

### 9. system_config
**Descripción**: Configuración general del sistema

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK) | Identificador único |
| config_key | VARCHAR(100) | Clave de configuración (única) |
| config_value | TEXT | Valor |
| config_type | ENUM | Tipo: string, number, boolean, json |
| description | TEXT | Descripción |
| is_public | BOOLEAN | Visible públicamente |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

**Índices**: config_key, is_public

**Configuraciones iniciales**:
- system_name, system_version
- alert thresholds (CO2, battery, temp)
- API URLs (api, websocket, grafana)
- Timeouts y límites

---

## Procedimientos Almacenados

### 1. sp_authenticate_user
**Descripción**: Autentica un usuario y crea una sesión

**Parámetros IN**:
- p_username: Nombre de usuario o email
- p_password_hash: Hash de contraseña
- p_ip_address: IP del cliente
- p_user_agent: User agent

**Parámetros OUT**:
- p_user_id: ID del usuario
- p_session_token: Token de sesión (UUID)
- p_role: Rol del usuario
- p_success: TRUE si autenticación exitosa

**Uso**:
```sql
CALL sp_authenticate_user('admin', '$2b$10$...', '192.168.1.1', 'Mozilla/5.0...', @user_id, @token, @role, @success);
SELECT @user_id, @token, @role, @success;
```

---

### 2. sp_validate_session
**Descripción**: Valida una sesión activa

**Parámetros IN**:
- p_session_token: Token de sesión

**Parámetros OUT**:
- p_user_id: ID del usuario
- p_username: Nombre de usuario
- p_role: Rol del usuario
- p_is_valid: TRUE si sesión válida

**Uso**:
```sql
CALL sp_validate_session('uuid-token', @user_id, @username, @role, @is_valid);
SELECT @user_id, @username, @role, @is_valid;
```

---

### 3. sp_logout_user
**Descripción**: Cierra la sesión de un usuario

**Parámetros IN**:
- p_session_token: Token de sesión

**Parámetros OUT**:
- p_success: TRUE si logout exitoso

---

### 4. sp_create_alert
**Descripción**: Crea una nueva alerta en el sistema

**Parámetros IN**:
- p_location_name: Nombre de ubicación
- p_sensor_type: Tipo de sensor
- p_alert_type: Tipo de alerta (info/warning/danger/critical)
- p_message: Mensaje de alerta
- p_value: Valor que generó la alerta
- p_threshold: Umbral superado

**Parámetros OUT**:
- p_alert_id: ID de la alerta creada
- p_success: TRUE si creación exitosa

---

### 5. sp_resolve_alert
**Descripción**: Marca una alerta como resuelta

**Parámetros IN**:
- p_alert_id: ID de la alerta
- p_user_id: ID del usuario que resuelve

**Parámetros OUT**:
- p_success: TRUE si resolución exitosa

---

### 6. sp_get_user_alerts
**Descripción**: Obtiene alertas no leídas de un usuario

**Parámetros IN**:
- p_user_id: ID del usuario
- p_limit: Número máximo de alertas

**Retorna**: ResultSet con alertas

---

### 7. sp_mark_alert_read
**Descripción**: Marca una alerta como leída para un usuario

**Parámetros IN**:
- p_user_id: ID del usuario
- p_alert_id: ID de la alerta

**Parámetros OUT**:
- p_success: TRUE si marcado exitoso

---

### 8. sp_cleanup_expired_sessions
**Descripción**: Limpia sesiones expiradas (ejecutar periódicamente)

**Retorna**: Número de sesiones eliminadas

**Uso**:
```sql
CALL sp_cleanup_expired_sessions();
```

---

### 9. sp_get_system_stats
**Descripción**: Obtiene estadísticas del sistema

**Retorna**: ResultSet con estadísticas:
- active_users
- active_sessions
- unresolved_alerts
- alerts_24h
- active_locations
- active_sensors
- activities_24h

---

### 10. sp_get_location_stats
**Descripción**: Obtiene estadísticas de una ubicación

**Parámetros IN**:
- p_location_name: Nombre de ubicación

**Retorna**: ResultSet con estadísticas de la ubicación

---

## Usuarios Iniciales

| Username | Email | Password | Role | Descripción |
|----------|-------|----------|------|-------------|
| admin | admin@medusse.local | medusse2025 | admin | Administrador del sistema |
| francisco | pacoaldev@gmail.com | medusse2025 | admin | Autor del proyecto |
| profesor | profesor@medusse.local | medusse2025 | user | Usuario profesor |
| alumno | alumno@medusse.local | medusse2025 | viewer | Usuario alumno |

**Nota**: Las contraseñas están hasheadas con bcrypt. El hash mostrado en seed data es de "medusse2025".

---

## Mantenimiento

### Limpieza de Sesiones Expiradas
Ejecutar periódicamente (cron job):
```sql
CALL sp_cleanup_expired_sessions();
```

### Limpieza de Alertas Antiguas
```sql
DELETE FROM alerts 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
  AND is_resolved = TRUE;
```

### Backup
```bash
docker exec medusse_mysql mysqldump -u root -pmedusse2025 medusse_db > backup.sql
```

### Restore
```bash
docker exec -i medusse_mysql mysql -u root -pmedusse2025 medusse_db < backup.sql
```

---

## Conexión desde Node.js

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'medusse_user',
  password: 'medusse2025',
  database: 'medusse_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ejemplo de uso
async function authenticateUser(username, passwordHash) {
  const [rows] = await pool.query(
    'CALL sp_authenticate_user(?, ?, ?, ?, @user_id, @token, @role, @success)',
    [username, passwordHash, '127.0.0.1', 'Node.js Client']
  );
  
  const [result] = await pool.query(
    'SELECT @user_id as user_id, @token as token, @role as role, @success as success'
  );
  
  return result[0];
}
```

---

**Autor**: Francisco Manuel López Alarte  
**Proyecto**: Medusse IoT - TFG 2025/2026  
**Última actualización**: 2025-11-24
