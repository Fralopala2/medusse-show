const http = require('http');

const INFLUX_CONFIG = {
  url: process.env.INFLUXDB_URL || 'http://localhost:8086',
  token: process.env.INFLUXDB_TOKEN || 'medusse-admin-token-2025',
  org: process.env.INFLUXDB_ORG || 'iescelia',
  bucket: process.env.INFLUXDB_BUCKET || 'sensors',
};

function queryInfluxDB(fluxQuery) {
  return new Promise((resolve, reject) => {
    const influxUrl = new URL(INFLUX_CONFIG.url);
    const influxPort = influxUrl.port || (influxUrl.protocol === 'https:' ? 443 : 80);

    const options = {
      hostname: influxUrl.hostname,
      port: influxPort,
      path: `/api/v2/query?org=${INFLUX_CONFIG.org}`,
      method: 'POST',
      headers: {
        Authorization: `Token ${INFLUX_CONFIG.token}`,
        'Content-Type': 'application/vnd.flux',
        Accept: 'application/csv',
        'Content-Length': Buffer.byteLength(fluxQuery),
      },
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
          reject(new Error(`Influx HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fluxQuery);
    req.end();
  });
}

function parseInfluxCSV(csvData) {
  const lines = csvData.trim().split('\n');
  const results = [];
  if (lines.length < 2) return results;

  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith('#') && lines[i].includes(',')) {
      headerIndex = i;
      break;
    }
  }
  if (headerIndex === -1) return results;

  const headers = lines[headerIndex].split(',');
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

async function getLatestSensorValue(locationName, measurement) {
  const fluxQuery = `
    from(bucket: "${INFLUX_CONFIG.bucket}")
      |> range(start: -15m)
      |> filter(fn: (r) => r["_field"] == "value")
      |> filter(fn: (r) => r["location"] == "${locationName}")
      |> filter(fn: (r) => r["_measurement"] == "${measurement}")
      |> last()
  `;

  const csvData = await queryInfluxDB(fluxQuery);
  const rows = parseInfluxCSV(csvData);
  if (rows.length === 0) return null;

  const value = parseFloat(rows[0]._value);
  return Number.isNaN(value) ? null : value;
}

module.exports = {
  getLatestSensorValue,
};
