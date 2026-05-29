const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const net = require('net');
const { exec } = require('child_process');
const { promisify } = require('util');
const db = require('./db');

const execAsync = promisify(exec);
const router = express.Router();

const PROJECT_ROOT = path.join(__dirname, '..');
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs');

const LOG_FILES = {
  api: 'api.log',
  web: 'web.log',
  simulator: 'simulator.log',
};

const SERVICE_CHECKS = [
  { id: 'api', label: 'API REST', port: 3001, path: '/health' },
  { id: 'web', label: 'Web Next.js', port: 3003, path: '/' },
  { id: 'grafana', label: 'Grafana', port: 3000, path: '/login' },
  { id: 'influxdb', label: 'InfluxDB', port: 8086, path: '/health' },
  { id: 'mqtt', label: 'MQTT', port: 1883, tcp: true },
  { id: 'mysql', label: 'MySQL', port: 3307, db: true },
];

function isDevPortalEnabled() {
  if (process.env.DEV_PORTAL === 'false') return false;
  if (process.env.NODE_ENV === 'production') return false;
  return true;
}

function devOnly(req, res, next) {
  if (!isDevPortalEnabled()) {
    return res.status(404).json({ error: 'Dev portal disabled' });
  }
  next();
}

function checkPort(host, port, timeoutMs = 2000) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, timeoutMs);

    socket.on('connect', () => {
      clearTimeout(timer);
      socket.end();
      resolve(true);
    });

    socket.on('error', () => {
      clearTimeout(timer);
      resolve(false);
    });
  });
}

function checkHttp(url, timeoutMs = 2500) {
  return new Promise((resolve) => {
    const started = Date.now();
    const req = http.get(url, (res) => {
      res.resume();
      resolve({
        up: res.statusCode >= 200 && res.statusCode < 500,
        latencyMs: Date.now() - started,
        statusCode: res.statusCode,
      });
    });

    req.on('error', () => {
      resolve({ up: false, latencyMs: Date.now() - started });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve({ up: false, latencyMs: Date.now() - started });
    });
  });
}

async function getDockerContainers() {
  try {
    const { stdout } = await execAsync(
      'docker ps --filter name=medusse --format "{{.Names}}|{{.Status}}|{{.State}}"',
      { timeout: 5000 }
    );

    return stdout
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [name, status, state] = line.split('|');
        return { name, status, state };
      });
  } catch {
    return [];
  }
}

function tailLogFile(filename, lineCount = 80) {
  const logPath = path.join(LOGS_DIR, filename);

  if (!fs.existsSync(logPath)) {
    return { exists: false, lines: [], mtime: null };
  }

  const stat = fs.statSync(logPath);
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.split(/\r?\n/).filter((line, index, arr) => {
    return index < arr.length - 1 || line.length > 0;
  });

  return {
    exists: true,
    lines: lines.slice(-lineCount),
    mtime: stat.mtime.toISOString(),
    size: stat.size,
  };
}

function getSimulatorStatus() {
  const log = tailLogFile(LOG_FILES.simulator, 5);
  if (!log.exists) {
    return { status: 'unknown', lastLogAt: null };
  }

  const ageMs = Date.now() - new Date(log.mtime).getTime();
  const active = ageMs < 30000;

  return {
    status: active ? 'active' : 'idle',
    lastLogAt: log.mtime,
  };
}

router.use(devOnly);

router.get('/status', async (req, res) => {
  try {
    const services = [];

    for (const service of SERVICE_CHECKS) {
      let status = 'down';
      let latencyMs = null;

      if (service.db) {
        const connected = await db.testConnection();
        status = connected ? 'up' : 'down';
      } else if (service.tcp) {
        const open = await checkPort('127.0.0.1', service.port);
        status = open ? 'up' : 'down';
      } else if (service.path) {
        const result = await checkHttp(
          `http://127.0.0.1:${service.port}${service.path}`
        );
        status = result.up ? 'up' : 'down';
        latencyMs = result.latencyMs;
      }

      services.push({
        id: service.id,
        label: service.label,
        port: service.port,
        status,
        latencyMs,
      });
    }

    const simulator = getSimulatorStatus();
    services.push({
      id: 'simulator',
      label: 'Simulador Python',
      port: null,
      status: simulator.status === 'active' ? 'up' : simulator.status === 'idle' ? 'degraded' : 'unknown',
      lastLogAt: simulator.lastLogAt,
    });

    const docker = await getDockerContainers();
    const upCount = services.filter((s) => s.status === 'up').length;

    res.json({
      timestamp: new Date().toISOString(),
      summary: { up: upCount, total: services.length },
      services,
      docker,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/logs', (req, res) => {
  const service = String(req.query.service || 'api');
  const lines = Math.min(parseInt(req.query.lines, 10) || 80, 500);
  const filename = LOG_FILES[service];

  if (!filename) {
    return res.status(400).json({ error: 'Invalid service. Use api, web, or simulator.' });
  }

  const log = tailLogFile(filename, lines);
  res.json({ service, ...log });
});

router.post('/stop', (req, res) => {
  const detenerBat = path.join(PROJECT_ROOT, 'detener.bat');

  if (!fs.existsSync(detenerBat)) {
    return res.status(500).json({ error: 'detener.bat not found' });
  }

  res.json({
    ok: true,
    message: 'Sistema detenido correctamente.',
  });

  // Dar tiempo a que la respuesta HTTP llegue al navegador antes de matar node.exe
  setTimeout(() => {
    exec(`cmd /c "${detenerBat}" /silent`, {
      cwd: PROJECT_ROOT,
      windowsHide: true,
    }).unref();
  }, 1500);
});

module.exports = router;
