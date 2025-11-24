// Rutas de administracion - Reto 10
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const db = require('./db');

// Middleware para verificar que el usuario es admin
const requireAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado',
      message: 'Se requieren permisos de administrador'
    });
  }
  next();
};

// Obtener todos los usuarios
router.get('/users', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT user_id, username, full_name, email, role, created_at, last_login FROM users ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      error: 'Error al obtener usuarios',
      message: error.message
    });
  }
});

// Obtener estadisticas del sistema
router.get('/stats', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    // Total de usuarios
    const [userCount] = await db.query('SELECT COUNT(*) as total FROM users');
    
    // Sesiones activas
    const [activeSessions] = await db.query(
      'SELECT COUNT(*) as total FROM sessions WHERE expires_at > NOW()'
    );
    
    // Alertas activas
    const [activeAlerts] = await db.query(
      'SELECT COUNT(*) as total FROM alerts WHERE is_resolved = FALSE'
    );
    
    // Actividad reciente (ultimos 7 dias)
    const [recentActivity] = await db.query(
      'SELECT COUNT(*) as total FROM activity_log WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );
    
    // Usuarios por rol
    const [usersByRole] = await db.query(
      'SELECT role, COUNT(*) as count FROM users GROUP BY role'
    );
    
    res.json({
      success: true,
      stats: {
        totalUsers: userCount[0].total,
        activeSessions: activeSessions[0].total,
        activeAlerts: activeAlerts[0].total,
        recentActivity: recentActivity[0].total,
        usersByRole
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      error: 'Error al obtener estadisticas',
      message: error.message
    });
  }
});

// Obtener logs de actividad
router.get('/logs', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    
    const [logs] = await db.query(
      `SELECT al.*, u.username 
       FROM activity_log al 
       LEFT JOIN users u ON al.user_id = u.user_id 
       ORDER BY al.created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    
    res.json({
      success: true,
      logs
    });
  } catch (error) {
    console.error('Error getting logs:', error);
    res.status(500).json({
      error: 'Error al obtener logs',
      message: error.message
    });
  }
});

// Obtener sesiones activas
router.get('/sessions', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const [sessions] = await db.query(
      `SELECT s.session_id, s.session_token, s.user_id, s.ip_address, 
              s.user_agent, s.created_at, s.expires_at, u.username, u.full_name
       FROM sessions s
       JOIN users u ON s.user_id = u.user_id
       WHERE s.expires_at > NOW()
       ORDER BY s.created_at DESC`
    );
    
    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({
      error: 'Error al obtener sesiones',
      message: error.message
    });
  }
});

// Eliminar usuario
router.delete('/users/:userId', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // No permitir eliminar el propio usuario
    if (parseInt(userId) === req.user.user_id) {
      return res.status(400).json({
        error: 'Operacion no permitida',
        message: 'No puedes eliminar tu propio usuario'
      });
    }
    
    await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      error: 'Error al eliminar usuario',
      message: error.message
    });
  }
});

// Actualizar rol de usuario
router.put('/users/:userId/role', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['admin', 'user', 'viewer'].includes(role)) {
      return res.status(400).json({
        error: 'Rol invalido',
        message: 'El rol debe ser admin, user o viewer'
      });
    }
    
    // No permitir cambiar el propio rol
    if (parseInt(userId) === req.user.user_id) {
      return res.status(400).json({
        error: 'Operacion no permitida',
        message: 'No puedes cambiar tu propio rol'
      });
    }
    
    await db.query('UPDATE users SET role = ? WHERE user_id = ?', [role, userId]);
    
    res.json({
      success: true,
      message: 'Rol actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({
      error: 'Error al actualizar rol',
      message: error.message
    });
  }
});

module.exports = router;
