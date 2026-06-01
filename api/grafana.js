const GRAFANA_URL = (process.env.GRAFANA_URL || 'http://localhost:4000').replace(/\/$/, '');
const GRAFANA_USER = process.env.GRAFANA_ADMIN_USER || 'admin';
const GRAFANA_PASSWORD = process.env.GRAFANA_ADMIN_PASSWORD || 'medusse2025';
const GRAFANA_DASHBOARD_UID = process.env.GRAFANA_DASHBOARD_UID || 'medusse-clean';

function isEnabled() {
  return process.env.GRAFANA_INTEGRATION !== 'false';
}

function authHeader() {
  return `Basic ${Buffer.from(`${GRAFANA_USER}:${GRAFANA_PASSWORD}`).toString('base64')}`;
}

async function createDashboardAnnotation({ text, tags, timeMs }) {
  if (!isEnabled()) return null;

  const response = await fetch(`${GRAFANA_URL}/api/annotations`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dashboardUID: GRAFANA_DASHBOARD_UID,
      time: timeMs || Date.now(),
      tags: tags || ['medusse-alert'],
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Grafana annotation failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  return data.id ?? null;
}

module.exports = {
  isEnabled,
  createDashboardAnnotation,
  GRAFANA_DASHBOARD_UID,
  GRAFANA_URL,
};
