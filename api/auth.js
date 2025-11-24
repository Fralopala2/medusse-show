// Modulo de autenticacion
const bcrypt = require('bcrypt');
const db = require('./db');

// Autenticar usuario (login)
async function authenticateUser(username, password, ipAddress = null, userAgent = null) {
  try {
    console.log(`🔐 Attempting authentication for user: ${username}`);
    
    // Llamar al procedimiento almacenado sp_authenticate_user
    const results = await db.callProcedure('sp_authenticate_user', [
      username,
      password,
      ipAddress,
      userAgent
    ]);
    
    // El procedimiento devuelve multiples result sets
    // [0] = resultado de la autenticacion
    // [1] = informacion del usuario
    // [2] = metadata
    
    if (results && results[0] && results[0].length > 0) {
      const authResult = results[0][0];
      
      if (authResult.success) {
        console.log(`✅ Authentication successful for user: ${username}`);
        
        // Obtener informacion del usuario del segundo result set
        const userInfo = results[1] && results[1][0] ? results[1][0] : null;
        
        return {
          success: true,
          message: authResult.message,
          sessionToken: authResult.session_token,
          user: userInfo ? {
            id: userInfo.user_id,
            username: userInfo.username,
            email: userInfo.email,
            fullName: userInfo.full_name,
            role: userInfo.role
          } : null
        };
      } else {
        console.log(`❌ Authentication failed for user: ${username} - ${authResult.message}`);
        return {
          success: false,
          message: authResult.message
        };
      }
    }
    
    return {
      success: false,
      message: 'Error en la autenticacion'
    };
    
  } catch (error) {
    console.error('❌ Error in authenticateUser:', error.message);
    throw error;
  }
}

// Validar sesion
async function validateSession(sessionToken) {
  try {
    console.log(`🔍 Validating session token: ${sessionToken.substring(0, 8)}...`);
    
    // Llamar al procedimiento almacenado sp_validate_session
    const results = await db.callProcedure('sp_validate_session', [sessionToken]);
    
    if (results && results[0] && results[0].length > 0) {
      const validationResult = results[0][0];
      
      if (validationResult.is_valid) {
        console.log(`✅ Session valid for user ID: ${validationResult.user_id}`);
        
        // Obtener informacion del usuario del segundo result set
        const userInfo = results[1] && results[1][0] ? results[1][0] : null;
        
        return {
          valid: true,
          user: userInfo ? {
            id: userInfo.user_id,
            username: userInfo.username,
            email: userInfo.email,
            fullName: userInfo.full_name,
            role: userInfo.role
          } : null
        };
      } else {
        console.log(`❌ Session invalid: ${validationResult.message}`);
        return {
          valid: false,
          message: validationResult.message
        };
      }
    }
    
    return {
      valid: false,
      message: 'Sesion no encontrada'
    };
    
  } catch (error) {
    console.error('❌ Error in validateSession:', error.message);
    throw error;
  }
}

// Cerrar sesion (logout)
async function logoutUser(sessionToken) {
  try {
    console.log(`🚪 Logging out session: ${sessionToken.substring(0, 8)}...`);
    
    // Llamar al procedimiento almacenado sp_logout_user
    const results = await db.callProcedure('sp_logout_user', [sessionToken]);
    
    if (results && results[0] && results[0].length > 0) {
      const logoutResult = results[0][0];
      
      if (logoutResult.success) {
        console.log(`✅ Logout successful`);
        return {
          success: true,
          message: logoutResult.message
        };
      } else {
        console.log(`❌ Logout failed: ${logoutResult.message}`);
        return {
          success: false,
          message: logoutResult.message
        };
      }
    }
    
    return {
      success: false,
      message: 'Error al cerrar sesion'
    };
    
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
