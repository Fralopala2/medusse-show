const db = require('./db');
const grafana = require('./grafana');
const { getLatestSensorValue } = require('./influx-query');

const POLL_MS = parseInt(process.env.ALERT_MONITOR_INTERVAL_MS || '30000', 10);

const LOW_VALUE_SENSORS = new Set([
  'battery_percentage',
  'battery_voltage',
  'soil_moisture',
  'dissolved_oxygen',
]);

function thresholdViolated(sensorType, currentValue, threshold) {
  if (currentValue === null || threshold === null) return false;
  if (LOW_VALUE_SENSORS.has(sensorType)) {
    return currentValue <= threshold;
  }
  return currentValue >= threshold;
}

async function fetchPendingAlerts() {
  const [rows] = await db.query(
    `SELECT a.id, a.message, a.alert_type, a.threshold, a.value AS alert_value,
            l.name AS location_name, l.display_name AS location_label,
            s.sensor_type, s.display_name AS sensor_label
     FROM alerts a
     JOIN locations l ON a.location_id = l.id
     JOIN sensors s ON a.sensor_id = s.id
     WHERE a.is_resolved = FALSE
       AND a.threshold IS NOT NULL
       AND a.triggered_at IS NULL`
  );
  return rows;
}

async function markTriggered(alertId, annotationId) {
  await db.query(
    `UPDATE alerts
     SET triggered_at = NOW(), grafana_annotation_fired = ?
     WHERE id = ?`,
    [annotationId ? String(annotationId) : null, alertId]
  );
}

async function evaluateAlerts() {
  if (!grafana.isEnabled()) return;

  let alerts;
  try {
    alerts = await fetchPendingAlerts();
  } catch (error) {
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      console.warn('⚠️ Alert monitor: ejecuta docker/mysql/migrations/004_alerts_grafana.sql');
      return;
    }
    throw error;
  }

  for (const alert of alerts) {
    try {
      const current = await getLatestSensorValue(alert.location_name, alert.sensor_type);
      if (!thresholdViolated(alert.sensor_type, current, Number(alert.threshold))) {
        continue;
      }

      const text = [
        'ALERTA ACTIVADA',
        `${alert.location_label} · ${alert.sensor_label}`,
        `Valor actual: ${current} (umbral: ${alert.threshold})`,
        alert.message,
      ].join('\n');

      const annotationId = await grafana.createDashboardAnnotation({
        text,
        tags: ['medusse-alert', 'fired', `alert-${alert.id}`, alert.alert_type],
        timeMs: Date.now(),
      });

      await markTriggered(alert.id, annotationId);
      console.log(`🚨 Alerta #${alert.id} activada → Grafana (anotación ${annotationId})`);
    } catch (error) {
      console.error(`❌ Error evaluando alerta #${alert.id}:`, error.message);
    }
  }
}

function startAlertMonitor() {
  if (process.env.ALERT_MONITOR_ENABLED === 'false') {
    console.log('⏸️ Monitor de alertas desactivado (ALERT_MONITOR_ENABLED=false)');
    return;
  }

  console.log(`🔔 Monitor de alertas → Grafana cada ${POLL_MS / 1000}s (${grafana.GRAFANA_URL})`);
  evaluateAlerts().catch((err) => console.error('❌ Alert monitor:', err.message));
  setInterval(() => {
    evaluateAlerts().catch((err) => console.error('❌ Alert monitor:', err.message));
  }, POLL_MS);
}

module.exports = { startAlertMonitor, evaluateAlerts, thresholdViolated };
