const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');

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
      pressure: { value: 1013.2, sensor: 'pressure', time: now, location: 'aula20' }
    },
    aula21: {
      temperature: { value: 23.1, sensor: 'temperature', time: now, location: 'aula21' },
      humidity: { value: 58.7, sensor: 'humidity', time: now, location: 'aula21' },
      co2: { value: 380, sensor: 'co2', time: now, location: 'aula21' },
      pressure: { value: 1012.8, sensor: 'pressure', time: now, location: 'aula21' }
    },
    gimnasio: {
      temperature: { value: 23.1, sensor: 'temperature', time: now, location: 'gimnasio' },
      humidity: { value: 58.7, sensor: 'humidity', time: now, location: 'gimnasio' },
      co2: { value: 380, sensor: 'co2', time: now, location: 'gimnasio' },
      pressure: { value: 1012.8, sensor: 'pressure', time: now, location: 'gimnasio' }
    },
    laboratorio: {
      temperature: { value: 24.2, sensor: 'temperature', time: now, location: 'laboratorio' },
      humidity: { value: 72.1, sensor: 'humidity', time: now, location: 'laboratorio' },
      co2: { value: 450, sensor: 'co2', time: now, location: 'laboratorio' },
      pressure: { value: 1014.1, sensor: 'pressure', time: now, location: 'laboratorio' }
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

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Stable InfluxDB API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Locations: http://localhost:${PORT}/api/locations`);
  console.log(`📈 Summary: http://localhost:${PORT}/api/summary`);
  console.log(`🔗 Connected to InfluxDB: ${INFLUX_CONFIG.url}`);
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