const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const db = require('./db');
const authRoutes = require('./auth-routes');

const app = express();
const PORT = 3001;

// Configuración de InfluxDB
const INFLUX_CONFIG = {
  url: 'http://localhost:8086',
  token: 'medusse-admin-token-2025',
  org: 'iescelia',
  bucket: 'sensors'
};

console.log('🔗 Starting stable server with InfluxDB integration...');
console.log(`📊 Bucket: ${INFLUX_CONFIG.bucket}`);
console.log(`🏢 Organization: ${INFLUX_CONFIG.org}`);

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar MySQL
db.initPool();
db.testConnection().then(connected => {
  if (connected) {
    console.log('✅ MySQL ready for authentication');
  } else {
    console.warn('⚠️  MySQL not available - Authentication disabled');
  }
});

// Rutas de autenticacion (Reto 9)
app.use('/api/auth', authRoutes);

// Rutas de administracion (Reto 10)
const adminRoutes = require('./admin-routes');
app.use('/api/admin', adminRoutes);

// Cache para datos recientes
let cachedSummary = {};
let lastCacheUpdate = 0;
const CACHE_DURATION = 30000; // 30 segundos

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      influxdb: INFLUX_CONFIG.url,
      bucket: INFLUX_CONFIG.bucket,
      org: INFLUX_CONFIG.org,
      mqtt: 'localhost:1883',
      websocket: `ws://localhost:${PORT + 1}`
    }
  });
});

app.get('/api/locations', (req, res) => {
  // Por ahora devolvemos las ubicaciones conocidas
  const locations = ['aula20', 'aula21', 'gimnasio', 'laboratorio'];
  console.log(`📍 Returning ${locations.length} locations:`, locations);
  res.json({ locations });
});

app.get('/api/summary', async (req, res) => {
  try {
    console.log('🔍 Getting summary data...');
    
    // Usar cache si es reciente
    const now = Date.now();
    if (now - lastCacheUpdate < CACHE_DURATION && Object.keys(cachedSummary).length > 0) {
      console.log('📦 Using cached data');
      return res.json({ summary: cachedSummary });
    }

    const summary = await getSummaryFromInflux();
    cachedSummary = summary;
    lastCacheUpdate = now;
    
    console.log('📊 Returning summary with', Object.keys(summary).length, 'locations');
    res.json({ summary });
  } catch (error) {
    console.error('❌ Error getting summary:', error.message);
    res.status(500).json({ error: 'Error fetching summary data' });
  }
});

app.get('/api/latest/:location', async (req, res) => {
  try {
    const location = req.params.location;
    console.log(`🔍 Getting latest data for ${location}...`);
    
    const data = await getLatestDataForLocation(location);
    
    res.json({
      location: location,
      data: data
    });
  } catch (error) {
    console.error('❌ Error getting latest data:', error.message);
    res.status(500).json({ error: 'Error fetching latest data' });
  }
});

app.get('/api/data/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const hours = parseInt(req.query.hours) || 24;
    const interval = req.query.interval || '5m';
    
    console.log(`📈 Getting historical data: ${sensor} in ${location} for ${hours}h`);
    
    const data = await getHistoricalData(location, sensor, hours, interval);
    res.json({ data });
  } catch (error) {
    console.error('❌ Error getting historical data:', error.message);
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});

app.get('/api/stats/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const hours = parseInt(req.query.hours) || 24;
    
    console.log(`📊 Getting stats: ${sensor} in ${location} for ${hours}h`);
    
    const stats = await getStatsData(location, sensor, hours);
    res.json(stats);
  } catch (error) {
    console.error('❌ Error getting stats:', error.message);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// ===== AUTHENTICATION ENDPOINTS (RETO 9) =====

// Login - Autenticar usuario
app.post('/api/auth/login', async (req, res) => {
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
app.post('/api/auth/logout', async (req, res) => {
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
app.get('/api/auth/validate', async (req, res) => {
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

// ===== ENERGY MONITORING ENDPOINTS (FASE 2) =====

app.get('/api/energy/:location', async (req, res) => {
  try {
    const location = req.params.location;
    console.log(`🔋 Getting energy data for ${location}...`);
    
    const energyData = await getEnergyDataForLocation(location);
    
    res.json({
      location: location,
      energy: energyData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting energy data:', error.message);
    res.status(500).json({ error: 'Error fetching energy data' });
  }
});

app.get('/api/energy/summary', async (req, res) => {
  try {
    console.log('🔋 Getting energy summary for all locations...');
    
    const locations = ['aula20', 'aula21', 'gimnasio', 'laboratorio'];
    const energySummary = {};
    
    for (const location of locations) {
      energySummary[location] = await getEnergyDataForLocation(location);
    }
    
    res.json({
      summary: energySummary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting energy summary:', error.message);
    res.status(500).json({ error: 'Error fetching energy summary' });
  }
});

app.get('/api/energy/alerts', async (req, res) => {
  try {
    console.log('⚠️ Getting energy alerts...');
    
    const alerts = await getEnergyAlerts();
    
    res.json({
      alerts: alerts,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting energy alerts:', error.message);
    res.status(500).json({ error: 'Error fetching energy alerts' });
  }
});

app.get('/api/energy/:location/history', async (req, res) => {
  try {
    const location = req.params.location;
    const hours = parseInt(req.query.hours) || 24;
    const interval = req.query.interval || '15m';
    
    console.log(`📈 Getting energy history: ${location} for ${hours}h`);
    
    const energyHistory = await getEnergyHistory(location, hours, interval);
    
    res.json({
      location: location,
      history: energyHistory,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting energy history:', error.message);
    res.status(500).json({ error: 'Error fetching energy history' });
  }
});

// Función para consultar InfluxDB usando HTTP directo con autenticación
async function queryInfluxDB(fluxQuery) {
  return new Promise((resolve, reject) => {
    const postData = fluxQuery;
    
    const options = {
      hostname: 'localhost',
      port: 8086,
      path: `/api/v2/query?org=${INFLUX_CONFIG.org}`,
      method: 'POST',
      headers: {
        'Authorization': `Token ${INFLUX_CONFIG.token}`,
        'Content-Type': 'application/vnd.flux',
        'Accept': 'application/csv',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Función para parsear CSV de InfluxDB
function parseInfluxCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const results = [];
  
  if (lines.length < 2) return results;
  
  // Encontrar la línea de headers (que no empiece con #)
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith('#') && lines[i].includes(',')) {
      headerIndex = i;
      break;
    }
  }
  
  if (headerIndex === -1) return results;
  
  const headers = lines[headerIndex].split(',');
  
  // Procesar las líneas de datos
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line && !line.startsWith('#')) {
      const values = line.split(',');
      const row = {};
      
      headers.forEach((header, index) => {
        if (values[index] !== undefined) {
          row[header.trim()] = values[index].trim();
        }
      });
      
      results.push(row);
    }
  }
  
  return results;
}

async function getSummaryFromInflux() {
  console.log('🔍 Querying InfluxDB for summary data...');
  
  try {
    // Consulta Flux para obtener los últimos valores
    const fluxQuery = `
      from(bucket: "${INFLUX_CONFIG.bucket}")
        |> range(start: -24h)
        |> filter(fn: (r) => r["_field"] == "value")
        |> group(columns: ["location", "_measurement"])
        |> last()
    `;
    
    const csvData = await queryInfluxDB(fluxQuery);
    const rows = parseInfluxCSV(csvData);
    
    console.log(`📊 Found ${rows.length} data points from InfluxDB`);
    
    const summary = {};
    
    rows.forEach(row => {
      const location = row.location;
      const sensor = row._measurement || row.sensor;
      const value = parseFloat(row._value);
      const time = row._time;
      
      console.log('📊 Processing data:', {
        location,
        sensor,
        value,
        time: time ? time.substring(0, 19) + 'Z' : 'unknown'
      });
      
      if (location && sensor && !isNaN(value)) {
        if (!summary[location]) {
          summary[location] = {};
        }
        
        summary[location][sensor] = {
          value: value,
          sensor: sensor,
          time: time || new Date().toISOString(),
          location: location
        };
      }
    });
    
    console.log(`✅ Processed data for ${Object.keys(summary).length} locations`);
    
    // Si no hay datos reales, usar fallback
    if (Object.keys(summary).length === 0) {
      console.log('⚠️ No real data found, using fallback data...');
      return getFallbackData();
    }
    
    return summary;
    
  } catch (error) {
    console.error('❌ Error querying InfluxDB:', error.message);
    console.log('🔄 Using fallback data...');
    return getFallbackData();
  }
}

async function getLatestDataForLocation(location) {
  try {
    const fluxQuery = `
      from(bucket: "${INFLUX_CONFIG.bucket}")
        |> range(start: -24h)
        |> filter(fn: (r) => r["_field"] == "value")
        |> filter(fn: (r) => r["location"] == "${location}")
        |> group(columns: ["_measurement"])
        |> last()
    `;
    
    const csvData = await queryInfluxDB(fluxQuery);
    const rows = parseInfluxCSV(csvData);
    
    const data = {};
    
    rows.forEach(row => {
      const sensor = row._measurement || row.sensor;
      const value = parseFloat(row._value);
      const time = row._time;
      
      if (sensor && !isNaN(value)) {
        data[sensor] = {
          value: value,
          sensor: sensor,
          time: time || new Date().toISOString(),
          location: location
        };
      }
    });
    
    return data;
  } catch (error) {
    console.error(`❌ Error getting latest data for ${location}:`, error.message);
    return {};
  }
}

async function getHistoricalData(location, sensor, hours, interval) {
  try {
    const fluxQuery = `
      from(bucket: "${INFLUX_CONFIG.bucket}")
        |> range(start: -${hours}h)
        |> filter(fn: (r) => r["_field"] == "value")
        |> filter(fn: (r) => r["location"] == "${location}")
        |> filter(fn: (r) => r["_measurement"] == "${sensor}")
        |> aggregateWindow(every: ${interval}, fn: mean, createEmpty: false)
    `;
    
    const csvData = await queryInfluxDB(fluxQuery);
    const rows = parseInfluxCSV(csvData);
    
    const data = rows.map(row => ({
      time: row._time || new Date().toISOString(),
      value: parseFloat(row._value) || 0,
      location: location,
      sensor: sensor
    })).filter(item => !isNaN(item.value));
    
    console.log(`📈 Found ${data.length} historical data points for ${sensor} in ${location}`);
    
    // Si no hay datos reales, generar datos de prueba
    if (data.length === 0) {
      console.log(`🔄 Generating mock historical data for ${sensor} in ${location}`);
      return generateMockHistoricalData(location, sensor, hours);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error getting historical data:', error.message);
    return generateMockHistoricalData(location, sensor, hours);
  }
}

async function getStatsData(location, sensor, hours) {
  try {
    const fluxQuery = `
      from(bucket: "${INFLUX_CONFIG.bucket}")
        |> range(start: -${hours}h)
        |> filter(fn: (r) => r["_field"] == "value")
        |> filter(fn: (r) => r["location"] == "${location}")
        |> filter(fn: (r) => r["_measurement"] == "${sensor}")
        |> group()
        |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
    `;
    
    const csvData = await queryInfluxDB(fluxQuery);
    const rows = parseInfluxCSV(csvData);
    
    const values = rows.map(row => parseFloat(row._value)).filter(v => !isNaN(v));
    
    if (values.length > 0) {
      return {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        count: values.length
      };
    }
  } catch (error) {
    console.error('❌ Error getting stats:', error.message);
  }
  
  // Fallback stats
  return {
    min: Math.random() * 50,
    max: Math.random() * 50 + 50,
    avg: Math.random() * 50 + 25,
    count: Math.floor(Math.random() * 1000) + 100
  };
}

function getFallbackData() {
  const now = new Date().toISOString();
  return {
    aula20: {
      temperature: { value: 22.5, sensor: 'temperature', time: now, location: 'aula20' },
      humidity: { value: 65.2, sensor: 'humidity', time: now, location: 'aula20' },
      co2: { value: 420, sensor: 'co2', time: now, location: 'aula20' },
      pressure: { value: 1013.2, sensor: 'pressure', time: now, location: 'aula20' },
      voc: { value: 45.3, sensor: 'voc', time: now, location: 'aula20' },
      iaq: { value: 85, sensor: 'iaq', time: now, location: 'aula20' },
      soil_moisture: { value: 32.1, sensor: 'soil_moisture', time: now, location: 'aula20' },
      ph_level: { value: 6.8, sensor: 'ph_level', time: now, location: 'aula20' },
      water_flow: { value: 0.7, sensor: 'water_flow', time: now, location: 'aula20' },
      tds: { value: 120.5, sensor: 'tds', time: now, location: 'aula20' },
      dissolved_oxygen: { value: 7.8, sensor: 'dissolved_oxygen', time: now, location: 'aula20' }
    },
    aula21: {
      temperature: { value: 23.1, sensor: 'temperature', time: now, location: 'aula21' },
      humidity: { value: 58.7, sensor: 'humidity', time: now, location: 'aula21' },
      co2: { value: 380, sensor: 'co2', time: now, location: 'aula21' },
      pressure: { value: 1012.8, sensor: 'pressure', time: now, location: 'aula21' },
      voc: { value: 52.1, sensor: 'voc', time: now, location: 'aula21' },
      iaq: { value: 72, sensor: 'iaq', time: now, location: 'aula21' },
      soil_moisture: { value: 38.5, sensor: 'soil_moisture', time: now, location: 'aula21' },
      ph_level: { value: 7.2, sensor: 'ph_level', time: now, location: 'aula21' },
      water_flow: { value: 1.1, sensor: 'water_flow', time: now, location: 'aula21' },
      tds: { value: 95.2, sensor: 'tds', time: now, location: 'aula21' },
      dissolved_oxygen: { value: 8.2, sensor: 'dissolved_oxygen', time: now, location: 'aula21' }
    },
    gimnasio: {
      temperature: { value: 23.8, sensor: 'temperature', time: now, location: 'gimnasio' },
      humidity: { value: 62.3, sensor: 'humidity', time: now, location: 'gimnasio' },
      co2: { value: 415, sensor: 'co2', time: now, location: 'gimnasio' },
      pressure: { value: 1013.5, sensor: 'pressure', time: now, location: 'gimnasio' },
      voc: { value: 38.7, sensor: 'voc', time: now, location: 'gimnasio' },
      iaq: { value: 110, sensor: 'iaq', time: now, location: 'gimnasio' },
      soil_moisture: { value: 28.3, sensor: 'soil_moisture', time: now, location: 'gimnasio' },
      ph_level: { value: 6.9, sensor: 'ph_level', time: now, location: 'gimnasio' },
      water_flow: { value: 2.3, sensor: 'water_flow', time: now, location: 'gimnasio' },
      tds: { value: 145.8, sensor: 'tds', time: now, location: 'gimnasio' },
      dissolved_oxygen: { value: 7.5, sensor: 'dissolved_oxygen', time: now, location: 'gimnasio' }
    },
    laboratorio: {
      temperature: { value: 24.2, sensor: 'temperature', time: now, location: 'laboratorio' },
      humidity: { value: 72.1, sensor: 'humidity', time: now, location: 'laboratorio' },
      co2: { value: 450, sensor: 'co2', time: now, location: 'laboratorio' },
      pressure: { value: 1014.1, sensor: 'pressure', time: now, location: 'laboratorio' },
      voc: { value: 65.4, sensor: 'voc', time: now, location: 'laboratorio' },
      iaq: { value: 55, sensor: 'iaq', time: now, location: 'laboratorio' },
      soil_moisture: { value: 45.7, sensor: 'soil_moisture', time: now, location: 'laboratorio' },
      ph_level: { value: 7.0, sensor: 'ph_level', time: now, location: 'laboratorio' },
      water_flow: { value: 0.9, sensor: 'water_flow', time: now, location: 'laboratorio' },
      tds: { value: 78.3, sensor: 'tds', time: now, location: 'laboratorio' },
      dissolved_oxygen: { value: 8.5, sensor: 'dissolved_oxygen', time: now, location: 'laboratorio' }
    }
  };
}

function generateMockHistoricalData(location, sensor, hours) {
  const data = [];
  const now = new Date();
  const points = Math.min(hours * 12, 100);
  
  for (let i = points; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 5 * 60 * 1000));
    let value;
    
    switch (sensor) {
      case 'temperature':
        value = 20 + Math.random() * 10 + Math.sin(i * 0.1) * 3;
        break;
      case 'humidity':
        value = 50 + Math.random() * 30 + Math.cos(i * 0.15) * 10;
        break;
      case 'co2':
        value = 350 + Math.random() * 200 + Math.sin(i * 0.05) * 50;
        break;
      case 'pressure':
        value = 1010 + Math.random() * 10 + Math.sin(i * 0.08) * 5;
        break;
      case 'voc':
        value = 30 + Math.random() * 40 + Math.sin(i * 0.12) * 15;
        break;
      case 'iaq':
        value = 50 + Math.random() * 100 + Math.cos(i * 0.08) * 30;
        break;
      case 'soil_moisture':
        value = 25 + Math.random() * 30 + Math.sin(i * 0.06) * 10;
        break;
      case 'ph_level':
        value = 6.5 + Math.random() * 1.5 + Math.sin(i * 0.04) * 0.3;
        break;
      case 'water_flow':
        value = 0.5 + Math.random() * 2 + Math.cos(i * 0.09) * 0.5;
        break;
      case 'tds':
        value = 80 + Math.random() * 100 + Math.sin(i * 0.07) * 20;
        break;
      case 'dissolved_oxygen':
        value = 7 + Math.random() * 2 + Math.cos(i * 0.11) * 0.8;
        break;
      default:
        value = Math.random() * 100;
    }
    
    data.push({
      time: timestamp.toISOString(),
      value: Math.round(value * 10) / 10,
      location: location,
      sensor: sensor
    });
  }
  
  return data;
}

// ===== ENERGY MONITORING FUNCTIONS (FASE 2) =====

async function getEnergyDataForLocation(location) {
  try {
    console.log(`🔋 Querying energy data for ${location}...`);
    
    // Lista de sensores energéticos
    const energySensors = [
      'battery_voltage',
      'solar_voltage',
      'battery_percentage',
      'power_consumption',
      'charging_status',
      'low_power_mode',
      'wake_count'
    ];
    
    const energyData = {};
    
    for (const sensor of energySensors) {
      const fluxQuery = `
        from(bucket: "${INFLUX_CONFIG.bucket}")
          |> range(start: -1h)
          |> filter(fn: (r) => r["_measurement"] == "${sensor}")
          |> filter(fn: (r) => r["location"] == "${location}")
          |> last()
      `;
      
      try {
        const result = await queryInfluxDB(fluxQuery);
        if (result && result.length > 0) {
          const record = result[0];
          energyData[sensor] = {
            value: record._value,
            sensor: sensor,
            time: record._time,
            location: location
          };
        }
      } catch (sensorError) {
        console.log(`⚠️ No data for ${sensor} in ${location}, using fallback`);
        energyData[sensor] = generateFallbackEnergyData(sensor, location);
      }
    }
    
    return energyData;
  } catch (error) {
    console.error('❌ Error getting energy data:', error.message);
    return generateFallbackEnergyData('all', location);
  }
}

async function getEnergyAlerts() {
  try {
    console.log('⚠️ Checking energy alerts...');
    
    const locations = ['aula20', 'aula21', 'gimnasio', 'laboratorio'];
    const alerts = [];
    
    for (const location of locations) {
      const energyData = await getEnergyDataForLocation(location);
      
      // Verificar alertas de batería baja
      if (energyData.battery_percentage && energyData.battery_percentage.value < 25) {
        alerts.push({
          level: 'warning',
          type: 'low_battery',
          location: location,
          message: `Batería baja en ${location}: ${energyData.battery_percentage.value}%`,
          value: energyData.battery_percentage.value,
          timestamp: new Date().toISOString()
        });
      }
      
      // Verificar alertas de batería crítica
      if (energyData.battery_percentage && energyData.battery_percentage.value < 15) {
        alerts.push({
          level: 'critical',
          type: 'critical_battery',
          location: location,
          message: `Batería crítica en ${location}: ${energyData.battery_percentage.value}%`,
          value: energyData.battery_percentage.value,
          timestamp: new Date().toISOString()
        });
      }
      
      // Verificar alertas de voltaje bajo
      if (energyData.battery_voltage && energyData.battery_voltage.value < 3.4) {
        alerts.push({
          level: 'warning',
          type: 'low_voltage',
          location: location,
          message: `Voltaje bajo en ${location}: ${energyData.battery_voltage.value}V`,
          value: energyData.battery_voltage.value,
          timestamp: new Date().toISOString()
        });
      }
      
      // Verificar alertas de modo de bajo consumo
      if (energyData.low_power_mode && energyData.low_power_mode.value === 1) {
        alerts.push({
          level: 'info',
          type: 'low_power_mode',
          location: location,
          message: `Nodo ${location} en modo de bajo consumo`,
          value: energyData.low_power_mode.value,
          timestamp: new Date().toISOString()
        });
      }
      
      // Verificar alertas de panel solar sin generar
      if (energyData.solar_voltage && energyData.solar_voltage.value < 1.0) {
        const currentHour = new Date().getHours();
        // Solo alertar durante horas de día (7-19h)
        if (currentHour >= 7 && currentHour <= 19) {
          alerts.push({
            level: 'warning',
            type: 'no_solar_generation',
            location: location,
            message: `Panel solar sin generación en ${location}: ${energyData.solar_voltage.value}V`,
            value: energyData.solar_voltage.value,
            timestamp: new Date().toISOString()
          });
        }
      }
    }
    
    return alerts;
  } catch (error) {
    console.error('❌ Error checking energy alerts:', error.message);
    return [];
  }
}

async function getEnergyHistory(location, hours, interval) {
  try {
    console.log(`📈 Getting energy history for ${location}...`);
    
    const energySensors = [
      'battery_voltage',
      'solar_voltage',
      'battery_percentage',
      'power_consumption'
    ];
    
    const history = {};
    
    for (const sensor of energySensors) {
      const fluxQuery = `
        from(bucket: "${INFLUX_CONFIG.bucket}")
          |> range(start: -${hours}h)
          |> filter(fn: (r) => r["_measurement"] == "${sensor}")
          |> filter(fn: (r) => r["location"] == "${location}")
          |> aggregateWindow(every: ${interval}, fn: mean, createEmpty: false)
          |> yield(name: "mean")
      `;
      
      try {
        const result = await queryInfluxDB(fluxQuery);
        if (result && result.length > 0) {
          history[sensor] = result.map(record => ({
            time: record._time,
            value: record._value,
            location: location,
            sensor: sensor
          }));
        } else {
          history[sensor] = generateMockEnergyHistory(sensor, location, hours);
        }
      } catch (sensorError) {
        console.log(`⚠️ No history for ${sensor} in ${location}, generating mock data`);
        history[sensor] = generateMockEnergyHistory(sensor, location, hours);
      }
    }
    
    return history;
  } catch (error) {
    console.error('❌ Error getting energy history:', error.message);
    // Generar datos mock para todos los sensores
    const history = {};
    const energySensors = ['battery_voltage', 'solar_voltage', 'battery_percentage', 'power_consumption'];
    
    for (const sensor of energySensors) {
      history[sensor] = generateMockEnergyHistory(sensor, location, hours);
    }
    
    return history;
  }
}

function generateFallbackEnergyData(sensor, location) {
  const now = new Date().toISOString();
  const baseValues = {
    battery_voltage: { value: 3.8 + Math.random() * 0.4, unit: 'V' },
    solar_voltage: { value: Math.random() * 15, unit: 'V' },
    battery_percentage: { value: 50 + Math.random() * 40, unit: '%' },
    power_consumption: { value: 100 + Math.random() * 50, unit: 'mA' },
    charging_status: { value: Math.random() > 0.5 ? 1 : 0, unit: 'bool' },
    low_power_mode: { value: Math.random() > 0.8 ? 1 : 0, unit: 'bool' },
    wake_count: { value: Math.floor(Math.random() * 100) + 1, unit: 'count' }
  };
  
  if (sensor === 'all') {
    const allData = {};
    for (const [key, config] of Object.entries(baseValues)) {
      allData[key] = {
        value: Math.round(config.value * 100) / 100,
        sensor: key,
        time: now,
        location: location
      };
    }
    return allData;
  }
  
  const config = baseValues[sensor] || { value: Math.random() * 100, unit: 'unknown' };
  return {
    value: Math.round(config.value * 100) / 100,
    sensor: sensor,
    time: now,
    location: location
  };
}

function generateMockEnergyHistory(sensor, location, hours) {
  const data = [];
  const now = new Date();
  const points = Math.min(hours * 4, 100); // Un punto cada 15 minutos
  
  for (let i = points; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 15 * 60 * 1000));
    let value;
    
    switch (sensor) {
      case 'battery_voltage':
        // Voltaje de batería con descarga lenta durante la noche
        const batteryBase = 4.1 - (i / points) * 0.3;
        value = batteryBase + Math.sin(i * 0.1) * 0.05;
        break;
      case 'solar_voltage':
        // Voltaje solar basado en hora del día (simulación día/noche)
        const hour = timestamp.getHours();
        if (hour >= 7 && hour <= 19) {
          // Día: patrón de campana con pico al mediodía
          const dayProgress = (hour - 7) / 12;
          const solarCurve = Math.sin(dayProgress * Math.PI);
          value = solarCurve * 18 + Math.random() * 2;
        } else {
          // Noche: muy bajo o 0
          value = Math.random() * 0.5;
        }
        break;
      case 'battery_percentage':
        // Porcentaje de batería con descarga lenta y carga durante el día
        const basePercent = 85 - (i / points) * 20;
        value = Math.max(20, basePercent + Math.sin(i * 0.08) * 10);
        break;
      case 'power_consumption':
        // Consumo variable con picos ocasionales
        const baseConsumption = 120;
        value = baseConsumption + Math.random() * 40 + Math.sin(i * 0.15) * 20;
        break;
      default:
        value = Math.random() * 100;
    }
    
    data.push({
      time: timestamp.toISOString(),
      value: Math.round(value * 100) / 100,
      location: location,
      sensor: sensor
    });
  }
  
  return data;
}

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Stable InfluxDB API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Locations: http://localhost:${PORT}/api/locations`);
  console.log(`📈 Summary: http://localhost:${PORT}/api/summary`);
  console.log(`� Energy Summary: http://localhost:${PORT}/api/energy/summary`);
  console.log(`⚠️ Energy Alerts: http://localhost:${PORT}/api/energy/alerts`);
  console.log(`�🔗 Connected to InfluxDB: ${INFLUX_CONFIG.url}`);
  console.log(`📊 Using bucket: ${INFLUX_CONFIG.bucket}`);
  console.log(`🏢 Using organization: ${INFLUX_CONFIG.org}`);
});

// WebSocket Server para datos en tiempo real
const wss = new WebSocket.Server({ port: PORT + 1 });

wss.on('connection', (ws) => {
  console.log('📡 WebSocket client connected');
  
  const interval = setInterval(async () => {
    try {
      const summary = await getSummaryFromInflux();
      
      const locations = Object.keys(summary);
      if (locations.length > 0) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const locationData = summary[randomLocation];
        
        const sensors = Object.keys(locationData);
        if (sensors.length > 0) {
          const randomSensor = sensors[Math.floor(Math.random() * sensors.length)];
          const sensorData = locationData[randomSensor];
          
          if (sensorData) {
            ws.send(JSON.stringify({
              location: randomLocation,
              sensor: randomSensor,
              value: sensorData.value,
              timestamp: sensorData.time
            }));
          }
        }
      }
    } catch (error) {
      console.error('❌ Error sending WebSocket data:', error.message);
    }
  }, 10000);
  
  ws.on('close', () => {
    console.log('📡 WebSocket client disconnected');
    clearInterval(interval);
  });
});

console.log(`🔌 WebSocket server running on ws://localhost:${PORT + 1}`);

// Actualizar cache periódicamente
setInterval(async () => {
  try {
    console.log('🔄 Updating cache...');
    const summary = await getSummaryFromInflux();
    cachedSummary = summary;
    lastCacheUpdate = Date.now();
    console.log('✅ Cache updated');
  } catch (error) {
    console.error('❌ Error updating cache:', error.message);
  }
}, 60000);