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

async function isSimulatorProcessRunning() {
  try {
    const { stdout } = await execAsync(
      'powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name=\'python.exe\'\\" | ForEach-Object { $_.CommandLine }"',
      { timeout: 8000, windowsHide: true }
    );
    return stdout.toLowerCase().includes('medusse_simulator');
  } catch {
    try {
      const { stdout } = await execAsync(
        'wmic process where "name=\'python.exe\'" get CommandLine 2>nul',
        { timeout: 8000, windowsHide: true }
      );
      return stdout.toLowerCase().includes('medusse_simulator');
    } catch {
      return false;
    }
  }
}

async function getSimulatorStatus() {
  const log = tailLogFile(LOG_FILES.simulator, 5);
  const processRunning = await isSimulatorProcessRunning();

  if (!log.exists && !processRunning) {
    return { status: 'unknown', lastLogAt: null, processRunning: false };
  }

  let logFresh = false;
  if (log.exists && log.mtime) {
    const ageMs = Date.now() - new Date(log.mtime).getTime();
    // Ciclo cada 15s; margen por buffering en Windows
    logFresh = ageMs < 90000;
  }

  if (processRunning || logFresh) {
    return {
      status: 'active',
      lastLogAt: log.mtime,
      processRunning,
    };
  }

  return {
    status: 'idle',
    lastLogAt: log.mtime,
    processRunning: false,
  };
}

function ensureLogsDir() {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

function appendStopLog(message) {
  ensureLogsDir();
  const logPath = path.join(LOGS_DIR, 'stop.log');
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
}

async function runStopCommand(command, label) {
  appendStopLog(`> ${label}: ${command}`);
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: PROJECT_ROOT,
      timeout: 120000,
      windowsHide: true,
      maxBuffer: 10 * 1024 * 1024,
    });
    if (stdout?.trim()) appendStopLog(stdout.trim());
    if (stderr?.trim()) appendStopLog(stderr.trim());
    appendStopLog(`OK: ${label}`);
    return true;
  } catch (error) {
    appendStopLog(`ERROR ${label}: ${error.message}`);
    if (error.stdout) appendStopLog(String(error.stdout).trim());
    if (error.stderr) appendStopLog(String(error.stderr).trim());
    return false;
  }
}

async function stopMedusseStack() {
  appendStopLog('--- Inicio stop desde portal ---');

  const composeFile = path.join(PROJECT_ROOT, 'docker', 'docker-compose.yml');

  await runStopCommand('taskkill /F /IM python.exe', 'python');
  await runStopCommand(`docker compose -f "${composeFile}" down`, 'docker');

  await runStopCommand(
    'powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show(\'Todos los servicios Medusse han sido detenidos.\',\'Medusse IoT\',[System.Windows.Forms.MessageBoxButtons]::OK,[System.Windows.Forms.MessageBoxIcon]::Information)"',
    'toast'
  );

  appendStopLog('Deteniendo Node.js (API y Web)...');
  await runStopCommand('taskkill /F /IM node.exe', 'node');
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

    const simulator = await getSimulatorStatus();
    services.push({
      id: 'simulator',
      label: 'Simulador Python',
      port: null,
      status:
        simulator.status === 'active'
          ? 'up'
          : simulator.status === 'idle'
            ? 'down'
            : 'unknown',
      lastLogAt: simulator.lastLogAt,
      processRunning: simulator.processRunning,
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
  res.json({
    ok: true,
    message: 'Sistema detenido correctamente.',
  });

  // Responder al navegador antes de apagar la API y Docker
  setTimeout(() => {
    stopMedusseStack().catch((error) => {
      appendStopLog(`Fatal stop: ${error.message}`);
    });
  }, 1000);
});

module.exports = router;
