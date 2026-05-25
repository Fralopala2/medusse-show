// Rutas de autenticacion - Reto 9
const express = require('express');
const router = express.Router();
const auth = require('./auth');

// Login - Autenticar usuario
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Usuario y contraseña son requeridos'
      });
    }
    
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    console.log(`🔐 Login attempt for user: ${username}`);
    
    const result = await auth.authenticateUser(username, password, ipAddress, userAgent);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        sessionToken: result.sessionToken,
        user: result.user
      });
    } else {
      res.status(401).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('❌ Error in login:', error.message);
    res.status(500).json({
      error: 'Error de autenticacion',
      message: 'Error al procesar la solicitud de login'
    });
  }
});

// Logout - Cerrar sesion
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({
        error: 'Token requerido',
        message: 'Token de sesion requerido en el header Authorization'
      });
    }
    
    const sessionToken = authHeader.substring(7);
    
    console.log(`🚪 Logout attempt for token: ${sessionToken.substring(0, 8)}...`);
    
    const result = await auth.logoutUser(sessionToken);
    
    res.json(result);
  } catch (error) {
    console.error('❌ Error in logout:', error.message);
    res.status(500).json({
      error: 'Error al cerrar sesion',
      message: 'Error al procesar la solicitud de logout'
    });
  }
});

// Validar sesion - Verificar si el token es valido
router.get('/validate', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        valid: false,
        message: 'Token de sesion requerido'
      });
    }
    
    const sessionToken = authHeader.substring(7);
    
    const result = await auth.validateSession(sessionToken);
    
    if (result.valid) {
      res.json({
        valid: true,
        user: result.user
      });
    } else {
      res.status(401).json({
        valid: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('❌ Error in validate:', error.message);
    res.status(500).json({
      valid: false,
      message: 'Error al validar la sesion'
    });
  }
});

// Obtener perfil del usuario autenticado
router.get('/profile', auth.requireAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('❌ Error getting profile:', error.message);
    res.status(500).json({
      error: 'Error al obtener perfil',
      message: 'Error al procesar la solicitud'
    });
  }
});

module.exports = router;
