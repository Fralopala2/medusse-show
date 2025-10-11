#!/usr/bin/env node
/**
 * Script de prueba para la API Medusse
 * Prueba todos los endpoints y WebSocket
 */

const http = require('http');
const WebSocket = require('ws');

const API_BASE = 'http://localhost:3001';
const WS_URL = 'ws://localhost:3002';

// Función helper para hacer requests HTTP
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}${path}`;
    console.log(`🔍 Probando: ${url}`);
    
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ ${path}:`, JSON.stringify(json, null, 2));
          resolve(json);
        } catch (error) {
          console.log(`✅ ${path}:`, data);
          resolve(data);
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error en ${path}:`, error.message);
      reject(error);
    });
  });
}

async function testAPI() {
  console.log('🧪 Iniciando pruebas de la API Medusse\n');
  
  try {
    // 1. Health check
    await makeRequest('/health');
    console.log('\n');
    
    // 2. Ubicaciones
    const locations = await makeRequest('/api/locations');
    console.log('\n');
    
    // 3. Resumen general
    await makeRequest('/api/summary');
    console.log('\n');
    
    // 4. Probar con cada ubicación si existen
    if (locations && locations.locations && locations.locations.length > 0) {
      const location = locations.locations[0];
      console.log(`📍 Probando con ubicación: ${location}\n`);
      
      // Últimos valores
      await makeRequest(`/api/latest/${location}`);
      console.log('\n');
      
      // Datos históricos de temperatura
      await makeRequest(`/api/data/${location}/temperature?hours=1&interval=5m`);
      console.log('\n');
      
      // Estadísticas de CO2
      await makeRequest(`/api/stats/${location}/co2?hours=6`);
      console.log('\n');
    } else {
      console.log('⚠️  No se encontraron ubicaciones. Asegúrate de que el simulador esté corriendo.\n');
    }
    
    // 5. Probar WebSocket
    console.log('🔌 Probando WebSocket...');
    testWebSocket();
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

function testWebSocket() {
  try {
    const ws = new WebSocket(WS_URL);
    let messageCount = 0;
    
    ws.on('open', () => {
      console.log('✅ WebSocket conectado');
    });
    
    ws.on('message', (data) => {
      messageCount++;
      const message = JSON.parse(data.toString());
      console.log(`📨 Mensaje ${messageCount}:`, JSON.stringify(message, null, 2));
      
      // Cerrar después de 3 mensajes para no saturar
      if (messageCount >= 3) {
        ws.close();
      }
    });
    
    ws.on('close', () => {
      console.log('🔌 WebSocket desconectado');
      console.log('\n✅ Pruebas completadas');
    });
    
    ws.on('error', (error) => {
      console.error('❌ Error WebSocket:', error.message);
    });
    
    // Timeout de seguridad
    setTimeout(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log('⏰ WebSocket cerrado por timeout');
      }
    }, 10000);
    
  } catch (error) {
    console.error('❌ Error iniciando WebSocket:', error.message);
  }
}

// Ejecutar pruebas
testAPI();