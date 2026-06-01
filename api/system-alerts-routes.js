/**
 * Alertas operativas (MySQL) — lectura pública para app móvil y clientes sin sesión.
 * Creación/gestión sigue en /api/admin/alerts (autenticado).
 */
const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
  try {
    const unresolvedOnly = req.query.unresolved !== 'false';
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);

    let sql = `
      SELECT a.id, a.alert_type, a.message, a.value, a.threshold,
             a.is_resolved, a.triggered_at, a.created_at,
             l.name AS location_name, l.display_name AS location_label,
             s.sensor_type, s.display_name AS sensor_label, s.unit AS sensor_unit
      FROM alerts a
      INNER JOIN locations l ON a.location_id = l.id
      INNER JOIN sensors s ON a.sensor_id = s.id
    `;

    if (unresolvedOnly) {
      sql += ' WHERE a.is_resolved = FALSE';
    }

    sql += ` ORDER BY a.created_at DESC LIMIT ${limit}`;

    const [rows] = await db.query(sql);

    const alerts = rows.map((row) => ({
      id: row.id,
      alert_type: row.alert_type,
      message: row.message,
      value: row.value != null ? Number(row.value) : null,
      threshold: row.threshold != null ? Number(row.threshold) : null,
      is_resolved: Boolean(row.is_resolved),
      triggered_at: row.triggered_at || null,
      created_at: row.created_at,
      location_name: row.location_name,
      location_label: row.location_label,
      sensor_type: row.sensor_type,
      sensor_label: row.sensor_label,
      sensor_unit: row.sensor_unit || '',
      status: row.is_resolved
        ? 'resuelta'
        : row.triggered_at
          ? 'activada'
          : 'registrada',
    }));

    res.json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      return res.status(503).json({
        success: false,
        error: 'Esquema de alertas desactualizado',
        message: 'Ejecuta docker/mysql/migrations/004_alerts_grafana.sql',
      });
    }
    console.error('Error GET /api/system-alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener alertas',
      message: error.message,
    });
  }
});

module.exports = router;
