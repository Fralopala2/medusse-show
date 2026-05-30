// Rutas de administracion - Reto 10
const express = require('express');
const router = express.Router();
const auth = require('./auth');
const db = require('./db');

function parsePositiveInt(value, fallback, max) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) return fallback;
  if (typeof max === 'number') return Math.min(parsed, max);
  return parsed;
}

function parseEntityId(value) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return null;
  return parsed;
}

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

// Middleware para verificar que el usuario es admin o user (profesor)
const requireAdminOrUser = async (req, res, next) => {
  if (!req.user || !['admin', 'user'].includes(req.user.role)) {
    return res.status(403).json({
      error: 'Acceso denegado',
      message: 'Se requieren permisos de administrador o usuario'
    });
  }
  next();
};

// Obtener todos los usuarios
router.get('/users', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id as user_id, username, full_name, email, role, created_at, last_login FROM users ORDER BY created_at DESC'
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
    const limit = parsePositiveInt(req.query.limit, 50, 200);
    const offset = parsePositiveInt(req.query.offset, 0, 10000);

    // MySQL puede fallar con placeholders en LIMIT/OFFSET según configuración,
    // así que interpolamos valores ya saneados como enteros.
    const [logs] = await db.query(
      `SELECT al.*, u.username
       FROM activity_log al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT ${limit} OFFSET ${offset}`
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
      `SELECT s.id as session_id, s.session_token, s.user_id, s.ip_address, 
              s.user_agent, s.created_at, s.expires_at, u.username, u.full_name
       FROM sessions s
       JOIN users u ON s.user_id = u.id
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
    const userId = parseEntityId(req.params.userId);
    if (!userId) {
      return res.status(400).json({
        error: 'Identificador invalido',
        message: 'El userId debe ser un numero entero positivo'
      });
    }
    
    // No permitir eliminar el propio usuario
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({
        error: 'Operacion no permitida',
        message: 'No puedes eliminar tu propio usuario'
      });
    }
    
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'No existe un usuario con ese identificador'
      });
    }
    
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
    const userId = parseEntityId(req.params.userId);
    if (!userId) {
      return res.status(400).json({
        error: 'Identificador invalido',
        message: 'El userId debe ser un numero entero positivo'
      });
    }
    const { role } = req.body;
    
    if (!['admin', 'user', 'viewer'].includes(role)) {
      return res.status(400).json({
        error: 'Rol invalido',
        message: 'El rol debe ser admin, user o viewer'
      });
    }
    
    // No permitir cambiar el propio rol
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({
        error: 'Operacion no permitida',
        message: 'No puedes cambiar tu propio rol'
      });
    }
    
    const [result] = await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado',
        message: 'No existe un usuario con ese identificador'
      });
    }
    
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

// Crear nuevo usuario (admin y user pueden crear)
router.post('/users', auth.requireAuth, requireAdminOrUser, async (req, res) => {
  try {
    const username = (req.body.username || '').trim();
    const email = (req.body.email || '').trim();
    const password = req.body.password || '';
    const full_name = (req.body.full_name || '').trim();
    const role = req.body.role;
    
    // Validaciones
    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requieren username, email, password y full_name'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password invalida',
        message: 'La contraseña debe tener al menos 8 caracteres'
      });
    }
    
    // Si el usuario es 'user' (profesor), solo puede crear 'viewer' (alumnos)
    if (req.user.role === 'user' && role !== 'viewer') {
      return res.status(403).json({
        error: 'Permiso denegado',
        message: 'Los profesores solo pueden crear alumnos (viewer)'
      });
    }
    
    // Si el usuario es admin, puede crear cualquier rol
    const newRole = role || 'viewer';
    if (!['admin', 'user', 'viewer'].includes(newRole)) {
      return res.status(400).json({
        error: 'Rol invalido',
        message: 'El rol debe ser admin, user o viewer'
      });
    }
    
    // Verificar que el username no exista
    const [existing] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Usuario existente',
        message: 'El nombre de usuario ya esta en uso'
      });
    }
    
    // Hash de la contraseña
    const bcrypt = require('bcrypt');
    const password_hash = await bcrypt.hash(password, 10);
    
    // Insertar usuario
    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash, full_name, role, is_active) VALUES (?, ?, ?, ?, ?, TRUE)',
      [username, email, password_hash, full_name, newRole]
    );
    
    // Registrar actividad
    await db.query(
      'INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'create_user', 'user', result.insertId, JSON.stringify({ username, role: newRole })]
    );
    
    res.json({
      success: true,
      message: 'Usuario creado correctamente',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: 'Error al crear usuario',
      message: error.message
    });
  }
});

// Obtener todas las alertas (solo admin)
router.get('/alerts', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const [alerts] = await db.query(
      `SELECT a.*, l.display_name as location_name, s.display_name as sensor_name, s.unit,
              u.username as resolved_by_username
       FROM alerts a
       LEFT JOIN locations l ON a.location_id = l.id
       LEFT JOIN sensors s ON a.sensor_id = s.id
       LEFT JOIN users u ON a.resolved_by = u.id
       ORDER BY a.created_at DESC
       LIMIT 100`
    );
    
    res.json({
      success: true,
      alerts
    });
  } catch (error) {
    console.error('Error getting alerts:', error);
    res.status(500).json({
      error: 'Error al obtener alertas',
      message: error.message
    });
  }
});

// Crear alerta manualmente (admin y profesor/user)
router.post('/alerts', auth.requireAuth, requireAdminOrUser, async (req, res) => {
  try {
    const location_id = parseEntityId(req.body.location_id);
    const sensor_id = parseEntityId(req.body.sensor_id);
    const alert_type = (req.body.alert_type || '').trim();
    const message = (req.body.message || '').trim();
    const value = req.body.value;
    const threshold = req.body.threshold;
    
    if (!location_id || !sensor_id || !alert_type || !message) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requieren location_id, sensor_id, alert_type y message'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO alerts (location_id, sensor_id, alert_type, message, value, threshold, is_resolved) VALUES (?, ?, ?, ?, ?, ?, FALSE)',
      [location_id, sensor_id, alert_type, message, value || null, threshold || null]
    );
    
    // Registrar actividad
    await db.query(
      'INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'create_alert', 'alert', result.insertId, JSON.stringify({ message, alert_type })]
    );
    
    res.json({
      success: true,
      message: 'Alerta creada correctamente',
      alertId: result.insertId
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({
      error: 'Error al crear alerta',
      message: error.message
    });
  }
});

// Resolver alerta (solo admin)
router.put('/alerts/:alertId/resolve', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const alertId = parseEntityId(req.params.alertId);
    if (!alertId) {
      return res.status(400).json({
        error: 'Identificador invalido',
        message: 'El alertId debe ser un numero entero positivo'
      });
    }
    
    const [result] = await db.query(
      'UPDATE alerts SET is_resolved = TRUE, resolved_at = NOW(), resolved_by = ? WHERE id = ?',
      [req.user.id, alertId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alerta no encontrada',
        message: 'No existe una alerta con ese identificador'
      });
    }
    
    // Registrar actividad
    await db.query(
      'INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'resolve_alert', 'alert', alertId, JSON.stringify({ resolved: true })]
    );
    
    res.json({
      success: true,
      message: 'Alerta resuelta correctamente'
    });
  } catch (error) {
    console.error('Error resolving alert:', error);
    res.status(500).json({
      error: 'Error al resolver alerta',
      message: error.message
    });
  }
});

// Eliminar alerta (solo admin)
router.delete('/alerts/:alertId', auth.requireAuth, requireAdmin, async (req, res) => {
  try {
    const alertId = parseEntityId(req.params.alertId);
    if (!alertId) {
      return res.status(400).json({
        error: 'Identificador invalido',
        message: 'El alertId debe ser un numero entero positivo'
      });
    }
    
    const [result] = await db.query('DELETE FROM alerts WHERE id = ?', [alertId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alerta no encontrada',
        message: 'No existe una alerta con ese identificador'
      });
    }
    
    // Registrar actividad
    await db.query(
      'INSERT INTO activity_log (user_id, action, entity_type, entity_id, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'delete_alert', 'alert', alertId, JSON.stringify({ deleted: true })]
    );
    
    res.json({
      success: true,
      message: 'Alerta eliminada correctamente'
    });
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({
      error: 'Error al eliminar alerta',
      message: error.message
    });
  }
});

// Obtener ubicaciones y sensores para formularios
router.get('/locations', auth.requireAuth, requireAdminOrUser, async (req, res) => {
  try {
    const [locations] = await db.query('SELECT id, name, display_name FROM locations WHERE is_active = TRUE');
    res.json({ success: true, locations });
  } catch (error) {
    console.error('Error getting locations:', error);
    res.status(500).json({ error: 'Error al obtener ubicaciones', message: error.message });
  }
});

router.get('/sensors', auth.requireAuth, requireAdminOrUser, async (req, res) => {
  try {
    const [sensors] = await db.query('SELECT id, sensor_type, display_name, unit FROM sensors WHERE is_active = TRUE');
    res.json({ success: true, sensors });
  } catch (error) {
    console.error('Error getting sensors:', error);
    res.status(500).json({ error: 'Error al obtener sensores', message: error.message });
  }
});

module.exports = router;
