// Modulo de autenticacion
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('./db');

// Autenticar usuario (login)
async function authenticateUser(username, password, ipAddress = null, userAgent = null) {
  try {
    console.log(`🔐 Attempting authentication for user: ${username}`);
    
    const connection = await db.getConnection();
    
    try {
      // Buscar usuario directamente (sin procedimiento almacenado)
      const [userRows] = await connection.execute(
        'SELECT id, username, email, full_name, role, password_hash, is_active FROM users WHERE (username = ? OR email = ?) LIMIT 1',
        [username, username]
      );
      
      if (userRows.length === 0) {
        console.log(`❌ User not found: ${username}`);
        return {
          success: false,
          message: 'Credenciales invalidas'
        };
      }
      
      const user = userRows[0];
      
      // Verificar que el usuario este activo
      if (!user.is_active) {
        console.log(`❌ User inactive: ${username}`);
        return {
          success: false,
          message: 'Usuario inactivo'
        };
      }
      
      // Verificar contraseña con bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      
      if (!passwordMatch) {
        console.log(`❌ Invalid password for user: ${username}`);
        return {
          success: false,
          message: 'Credenciales invalidas'
        };
      }
      
      // Generar token de sesion
      const sessionToken = crypto.randomUUID();
      
      // Crear sesion
      await connection.execute(
        'INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))',
        [user.id, sessionToken, ipAddress, userAgent]
      );
      
      // Actualizar ultimo login
      await connection.execute(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );
      
      // Registrar actividad
      await connection.execute(
        'INSERT INTO activity_log (user_id, action, entity_type, entity_id, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, 'user_login', 'user', user.id, ipAddress, userAgent]
      );
      
      console.log(`✅ Authentication successful for user: ${username}`);
      
      return {
        success: true,
        message: 'Autenticacion exitosa',
        sessionToken: sessionToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          role: user.role
        }
      };
      
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('❌ Error in authenticateUser:', error.message);
    throw error;
  }
}

// Validar sesion
async function validateSession(sessionToken) {
  try {
    console.log(`🔍 Validating session token: ${sessionToken.substring(0, 8)}...`);
    
    const connection = await db.getConnection();
    
    try {
      // Buscar sesion activa directamente
      const [sessionRows] = await connection.execute(
        'SELECT s.user_id, u.username, u.email, u.full_name, u.role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.session_token = ? AND s.expires_at > NOW() AND u.is_active = TRUE LIMIT 1',
        [sessionToken]
      );
      
      if (sessionRows.length === 0) {
        console.log(`❌ Session invalid or expired`);
        return {
          valid: false,
          message: 'Sesion invalida o expirada'
        };
      }
      
      const session = sessionRows[0];
      
      console.log(`✅ Session valid for user ID: ${session.user_id}`);
      
      return {
        valid: true,
        user: {
          id: session.user_id,
          username: session.username,
          email: session.email,
          fullName: session.full_name,
          role: session.role
        }
      };
      
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('❌ Error in validateSession:', error.message);
    throw error;
  }
}

// Cerrar sesion (logout)
async function logoutUser(sessionToken) {
  try {
    console.log(`🚪 Logging out session: ${sessionToken.substring(0, 8)}...`);
    
    const connection = await db.getConnection();
    
    try {
      // Eliminar sesion directamente
      const [result] = await connection.execute(
        'DELETE FROM sessions WHERE session_token = ?',
        [sessionToken]
      );
      
      if (result.affectedRows > 0) {
        console.log(`✅ Logout successful`);
        return {
          success: true,
          message: 'Sesion cerrada correctamente'
        };
      } else {
        console.log(`❌ Session not found`);
        return {
          success: false,
          message: 'Sesion no encontrada'
        };
      }
      
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('❌ Error in logoutUser:', error.message);
    throw error;
  }
}

// Middleware para proteger rutas
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No autorizado',
      message: 'Token de sesion requerido'
    });
  }
  
  const sessionToken = authHeader.substring(7); // Remover "Bearer "
  
  validateSession(sessionToken)
    .then(result => {
      if (result.valid) {
        req.user = result.user;
        next();
      } else {
        res.status(401).json({
          error: 'No autorizado',
          message: result.message || 'Sesion invalida o expirada'
        });
      }
    })
    .catch(error => {
      console.error('❌ Error in auth middleware:', error.message);
      res.status(500).json({
        error: 'Error de autenticacion',
        message: 'Error al validar la sesion'
      });
    });
}

// Middleware para requerir rol especifico
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Usuario no autenticado'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Prohibido',
        message: 'No tienes permisos para acceder a este recurso'
      });
    }
    
    next();
  };
}

module.exports = {
  authenticateUser,
  validateSession,
  logoutUser,
  requireAuth,
  requireRole
};
