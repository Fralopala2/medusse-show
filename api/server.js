const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const mqtt = require('mqtt');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// InfluxDB Client
const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
});

const queryApi = influxDB.getQueryApi(process.env.INFLUXDB_ORG);

// WebSocket Server para tiempo real
const wss = new WebSocket.Server({ port: 3002 });
console.log('🔌 WebSocket server iniciado en puerto 3002');

// MQTT Client para tiempo real
const mqttClient = mqtt.connect(`mqtt://${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`);

mqttClient.on('connect', () => {
  console.log('✅ Conectado a MQTT broker');
  mqttClient.subscribe(`${process.env.MQTT_TOPIC_BASE}/+/+`);
});

mqttClient.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    
    // Broadcast a todos los clientes WebSocket conectados
    const wsMessage = {
      topic,
      data,
      timestamp: new Date().toISOString()
    };
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(wsMessage));
      }
    });
  } catch (error) {
    console.error('Error procesando mensaje MQTT:', error);
  }
});

// Rutas de la API

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      influxdb: process.env.INFLUXDB_URL,
      mqtt: `${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`,
      websocket: `ws://localhost:3002`
    }
  });
});

// Obtener todas las ubicaciones disponibles
app.get('/api/locations', async (req, res) => {
  try {
    const query = `
      from(bucket: "${process.env.INFLUXDB_BUCKET}")
        |> range(start: -24h)
        |> group(columns: ["location"])
        |> distinct(column: "location")
        |> yield(name: "locations")
    `;
    
    const locations = [];
    await queryApi.queryRows(query, {
      next: (row, tableMeta) => {
        const location = tableMeta.toObject(row).location;
        if (location && !locations.includes(location)) {
          locations.push(location);
        }
      },
      error: (error) => {
        console.error('Error consultando ubicaciones:', error);
        throw error;
      }
    });
    
    res.json({ locations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener datos históricos por ubicación y sensor
app.get('/api/data/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const { hours = 24, interval = '5m' } = req.query;
    
    const query = `
      from(bucket: "${process.env.INFLUXDB_BUCKET}")
        |> range(start: -${hours}h)
        |> filter(fn: (r) => r._measurement == "${sensor}")
        |> filter(fn: (r) => r.location == "${location}")
        |> aggregateWindow(every: ${interval}, fn: mean, createEmpty: false)
        |> yield(name: "data")
    `;
    
    const data = [];
    await queryApi.queryRows(query, {
      next: (row, tableMeta) => {
        const record = tableMeta.toObject(row);
        data.push({
          time: record._time,
          value: record._value,
          location: record.location,
          sensor: record._measurement
        });
      },
      error: (error) => {
        console.error('Error consultando datos:', error);
        throw error;
      }
    });
    
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener últimos valores de todos los sensores por ubicación
app.get('/api/latest/:location', async (req, res) => {
  try {
    const { location } = req.params;
    
    const sensors = ['temperature', 'humidity', 'co2', 'pressure'];
    const latestData = {};
    
    for (const sensor of sensors) {
      const query = `
        from(bucket: "${process.env.INFLUXDB_BUCKET}")
          |> range(start: -1h)
          |> filter(fn: (r) => r._measurement == "${sensor}")
          |> filter(fn: (r) => r.location == "${location}")
          |> last()
          |> yield(name: "latest")
      `;
      
      await queryApi.queryRows(query, {
        next: (row, tableMeta) => {
          const record = tableMeta.toObject(row);
          latestData[sensor] = {
            value: record._value,
            time: record._time,
            location: record.location
          };
        },
        error: (error) => {
          console.error(`Error consultando ${sensor}:`, error);
        }
      });
    }
    
    res.json({ location, data: latestData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener resumen de todas las ubicaciones
app.get('/api/summary', async (req, res) => {
  try {
    const query = `
      from(bucket: "${process.env.INFLUXDB_BUCKET}")
        |> range(start: -1h)
        |> group(columns: ["location", "_measurement"])
        |> last()
        |> yield(name: "summary")
    `;
    
    const summary = {};
    await queryApi.queryRows(query, {
      next: (row, tableMeta) => {
        const record = tableMeta.toObject(row);
        const location = record.location;
        const sensor = record._measurement;
        
        if (!summary[location]) {
          summary[location] = {};
        }
        
        summary[location][sensor] = {
          value: record._value,
          time: record._time
        };
      },
      error: (error) => {
        console.error('Error consultando resumen:', error);
        throw error;
      }
    });
    
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas por ubicación y sensor
app.get('/api/stats/:location/:sensor', async (req, res) => {
  try {
    const { location, sensor } = req.params;
    const { hours = 24 } = req.query;
    
    const query = `
      from(bucket: "${process.env.INFLUXDB_BUCKET}")
        |> range(start: -${hours}h)
        |> filter(fn: (r) => r._measurement == "${sensor}")
        |> filter(fn: (r) => r.location == "${location}")
        |> group()
        |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
        |> duplicate(column: "_value", as: "mean")
        |> min()
        |> set(key: "stat", value: "min")
        |> union(tables: [
          from(bucket: "${process.env.INFLUXDB_BUCKET}")
            |> range(start: -${hours}h)
            |> filter(fn: (r) => r._measurement == "${sensor}")
            |> filter(fn: (r) => r.location == "${location}")
            |> group()
            |> max()
            |> set(key: "stat", value: "max")
        ])
        |> union(tables: [
          from(bucket: "${process.env.INFLUXDB_BUCKET}")
            |> range(start: -${hours}h)
            |> filter(fn: (r) => r._measurement == "${sensor}")
            |> filter(fn: (r) => r.location == "${location}")
            |> group()
            |> mean()
            |> set(key: "stat", value: "mean")
        ])
        |> yield(name: "stats")
    `;
    
    const stats = {};
    await queryApi.queryRows(query, {
      next: (row, tableMeta) => {
        const record = tableMeta.toObject(row);
        stats[record.stat] = record._value;
      },
      error: (error) => {
        console.error('Error consultando estadísticas:', error);
        throw error;
      }
    });
    
    res.json({ location, sensor, hours: parseInt(hours), stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('🔌 Cliente WebSocket conectado');
  
  ws.on('close', () => {
    console.log('🔌 Cliente WebSocket desconectado');
  });
  
  // Enviar mensaje de bienvenida
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Conectado al stream de datos Medusse IoT',
    timestamp: new Date().toISOString()
  }));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Medusse API iniciada en puerto ${PORT}`);
  console.log(`📊 InfluxDB: ${process.env.INFLUXDB_URL}`);
  console.log(`📡 MQTT: ${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:3002`);
  console.log(`\n📋 Endpoints disponibles:`);
  console.log(`   GET /health - Estado de la API`);
  console.log(`   GET /api/locations - Ubicaciones disponibles`);
  console.log(`   GET /api/data/:location/:sensor - Datos históricos`);
  console.log(`   GET /api/latest/:location - Últimos valores`);
  console.log(`   GET /api/summary - Resumen de todas las ubicaciones`);
  console.log(`   GET /api/stats/:location/:sensor - Estadísticas`);
});