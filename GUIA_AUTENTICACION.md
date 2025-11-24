# Guía de Prueba de Autenticación - Medusse IoT

## 🎯 Objetivo

Probar el sistema de autenticación completo implementado en el Reto 9, que incluye login, logout, validación de sesiones y control de acceso por roles.

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener:

- ✅ Docker Desktop instalado y corriendo
- ✅ Node.js instalado (v16 o superior)
- ✅ Servicios Docker iniciados (MySQL)
- ✅ API REST corriendo en puerto 3001

---

## 🚀 Opción 1: Prueba Automática (Recomendada)

### Ejecutar el script guiado:

```cmd
probar_autenticacion_guiado.bat
```

Este script:
1. Verifica que Docker esté corriendo
2. Inicia MySQL si no está activo
3. Verifica Node.js y dependencias
4. Inicia la API REST automáticamente
5. Ejecuta todos los tests de autenticación
6. Muestra resultados en colores

### ¿Qué verás?

```
========================================
  MEDUSSE IoT - PRUEBA DE AUTENTICACION
========================================

✅ Docker instalado
✅ Docker Desktop corriendo
✅ MySQL corriendo
✅ Node.js instalado
✅ Dependencias instaladas
✅ API respondiendo correctamente

========================================
  EJECUTANDO TESTS DE AUTENTICACION
========================================

🧪 TESTING AUTHENTICATION ENDPOINTS

📝 Test 1: Login con credenciales correctas (admin)
✅ Login exitoso
   Usuario: admin
   Rol: admin
   Token: 550e8400-e29b-41d4-a7...

📝 Test 2: Login con credenciales incorrectas
✅ Credenciales incorrectas rechazadas correctamente

📝 Test 3: Validar sesion
✅ Sesion valida
   Usuario: admin

📝 Test 4: Obtener perfil de usuario
✅ Perfil obtenido correctamente
   Usuario: admin
   Email: admin@medusse.local
   Nombre: Administrador
   Rol: admin

📝 Test 5: Acceso a perfil sin autenticacion
✅ Acceso no autorizado rechazado correctamente

📝 Test: Login como francisco (admin)
✅ Login exitoso como francisco
   Rol: admin

📝 Test: Login como profesor (user)
✅ Login exitoso como profesor
   Rol: user

📝 Test: Login como alumno (viewer)
✅ Login exitoso como alumno
   Rol: viewer

📝 Test 7: Logout
✅ Logout exitoso

📝 Test 8: Validar sesion despues de logout
✅ Sesion invalidada correctamente despues de logout

✅ TESTS COMPLETADOS
```

---

## 🔧 Opción 2: Prueba Manual Paso a Paso

### Paso 1: Iniciar Docker

```cmd
# Abrir Docker Desktop manualmente
# Esperar a que inicie completamente
```

### Paso 2: Iniciar servicios Docker

```cmd
docker compose -f docker/docker-compose.yml up -d
```

Espera unos 10 segundos para que MySQL inicie.

### Paso 3: Verificar MySQL

```cmd
docker ps | findstr medusse_mysql
```

Deberías ver algo como:
```
medusse_mysql   Up 2 minutes   0.0.0.0:3306->3306/tcp
```

### Paso 4: Iniciar API REST

```cmd
cd api
node server.js
```

Deberías ver:
```
🚀 Medusse API Server running on http://localhost:3001

📊 InfluxDB Endpoints:
   Health check: http://localhost:3001/health
   ...

🔐 Authentication Endpoints:
   Login: POST http://localhost:3001/api/auth/login
   Logout: POST http://localhost:3001/api/auth/logout
   Validate: GET http://localhost:3001/api/auth/validate
   Profile: GET http://localhost:3001/api/auth/profile

🗄️  Connected to MySQL: localhost:3306
```

### Paso 5: Ejecutar tests (en otra terminal)

```cmd
cd api
node test-auth.js
```

---

## 🧪 Opción 3: Prueba Manual con curl

### Test 1: Login

```cmd
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"medusse2025\"}"
```

**Respuesta esperada:**
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

**Guarda el sessionToken para los siguientes tests.**

### Test 2: Validar sesión

```cmd
curl -X GET http://localhost:3001/api/auth/validate ^
  -H "Authorization: Bearer TU_SESSION_TOKEN_AQUI"
```

**Respuesta esperada:**
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

### Test 3: Obtener perfil

```cmd
curl -X GET http://localhost:3001/api/auth/profile ^
  -H "Authorization: Bearer TU_SESSION_TOKEN_AQUI"
```

**Respuesta esperada:**
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

### Test 4: Logout

```cmd
curl -X POST http://localhost:3001/api/auth/logout ^
  -H "Authorization: Bearer TU_SESSION_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Sesion cerrada correctamente"
}
```

### Test 5: Intentar acceder después de logout

```cmd
curl -X GET http://localhost:3001/api/auth/validate ^
  -H "Authorization: Bearer TU_SESSION_TOKEN_AQUI"
```

**Respuesta esperada:**
```json
{
  "valid": false,
  "message": "Sesion no encontrada o expirada"
}
```

---

## 👥 Usuarios Disponibles para Pruebas

| Username | Password | Role | Descripción |
|----------|----------|------|-------------|
| admin | medusse2025 | admin | Administrador del sistema |
| francisco | medusse2025 | admin | Autor del proyecto |
| profesor | medusse2025 | user | Usuario estándar |
| alumno | medusse2025 | viewer | Solo lectura |

Puedes probar con cualquiera de estos usuarios.

---

## 🔍 Verificar en MySQL (Opcional)

Si quieres ver los datos directamente en MySQL:

```cmd
# Conectar a MySQL
docker exec -it medusse_mysql mysql -u medusse_user -pmedusse2025 medusse_db

# Ver usuarios
SELECT id, username, email, role FROM users;

# Ver sesiones activas
SELECT user_id, session_token, ip_address, created_at, expires_at 
FROM sessions 
WHERE expires_at > NOW();

# Salir
exit
```

---

## ❌ Solución de Problemas

### Error: "MySQL connection failed"

**Solución:**
```cmd
# Reiniciar MySQL
docker compose -f docker/docker-compose.yml restart mysql

# Esperar 10 segundos
timeout /t 10

# Reiniciar API
```

### Error: "ECONNREFUSED localhost:3001"

**Solución:**
- Verifica que la API esté corriendo
- Revisa la ventana de la API para ver errores
- Reinicia la API con `node server.js`

### Error: "Cannot find module 'mysql2'"

**Solución:**
```cmd
cd api
npm install
```

### Error: "Credenciales invalidas"

**Solución:**
- Verifica que estés usando las credenciales correctas
- Usuarios disponibles: admin, francisco, profesor, alumno
- Password para todos: medusse2025

---

## 📊 Logs de la API

Mientras ejecutas las pruebas, en la ventana de la API verás logs como:

```
🔐 Login attempt for user: admin
✅ MySQL ready for authentication
🔐 Attempting authentication for user: admin
✅ Authentication successful for user: admin

🔍 Validating session token: 550e8400...
✅ Session valid for user ID: 1

🚪 Logout attempt for token: 550e8400...
✅ Logout successful
```

Estos logs te ayudan a entender qué está pasando en cada paso.

---

## ✅ Resultado Esperado

Si todo funciona correctamente, deberías ver:

- ✅ 8 tests pasados
- ✅ Login exitoso con 4 usuarios diferentes
- ✅ Validación de sesión funcionando
- ✅ Logout invalidando la sesión
- ✅ Protección de rutas funcionando
- ✅ Control de acceso por roles operativo

---

## 🎓 Conceptos Implementados (Reto 9)

- **Autenticación**: Verificación de identidad con usuario/contraseña
- **Sesiones**: Tokens UUID con expiración automática (24h)
- **Autorización**: Control de acceso por roles (admin/user/viewer)
- **Middleware**: Protección de rutas con requireAuth
- **Procedimientos almacenados**: Lógica de negocio en MySQL
- **Seguridad**: Registro de IP, User-Agent, validación de tokens

---

## 📚 Documentación Adicional

- **README.md**: Documentación general del proyecto
- **api/README.md**: Documentación completa de la API
- **CHANGELOG.md**: Historial de cambios (v2.5.0)
- **docker/mysql/DATABASE_DOCUMENTATION.md**: Esquema de base de datos

---

**¡Listo para probar!** 🚀

Ejecuta `probar_autenticacion_guiado.bat` y sigue las instrucciones.
