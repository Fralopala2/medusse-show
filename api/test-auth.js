// Script de testing para endpoints de autenticacion
const http = require('http');

const API_URL = 'localhost';
const API_PORT = 3001;

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Funcion para hacer peticiones HTTP
function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_URL,
      port: API_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsed
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Tests
async function runTests() {
  log('\n🧪 TESTING AUTHENTICATION ENDPOINTS\n', 'cyan');
  
  let sessionToken = null;
  
  // Test 1: Login con credenciales correctas
  try {
    log('📝 Test 1: Login con credenciales correctas (admin)', 'blue');
    const response = await makeRequest('POST', '/api/auth/login', {
      username: 'admin',
      password: 'medusse2025'
    });
    
    if (response.statusCode === 200 && response.data.success) {
      log('✅ Login exitoso', 'green');
      log(`   Usuario: ${response.data.user.username}`, 'green');
      log(`   Rol: ${response.data.user.role}`, 'green');
      log(`   Token: ${response.data.sessionToken.substring(0, 20)}...`, 'green');
      sessionToken = response.data.sessionToken;
    } else {
      log(`❌ Login fallido: ${response.data.message}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
  
  log('');
  
  // Test 2: Login con credenciales incorrectas
  try {
    log('📝 Test 2: Login con credenciales incorrectas', 'blue');
    const response = await makeRequest('POST', '/api/auth/login', {
      username: 'admin',
      password: 'wrongpassword'
    });
    
    if (response.statusCode === 401) {
      log('✅ Credenciales incorrectas rechazadas correctamente', 'green');
    } else {
      log(`❌ Respuesta inesperada: ${response.statusCode}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
  
  log('');
  
  // Test 3: Validar sesion
  if (sessionToken) {
    try {
      log('📝 Test 3: Validar sesion', 'blue');
      const response = await makeRequest('GET', '/api/auth/validate', null, {
        'Authorization': `Bearer ${sessionToken}`
      });
      
      if (response.statusCode === 200 && response.data.valid) {
        log('✅ Sesion valida', 'green');
        log(`   Usuario: ${response.data.user.username}`, 'green');
      } else {
        log(`❌ Sesion invalida`, 'red');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
  }
  
  log('');
  
  // Test 4: Obtener perfil
  if (sessionToken) {
    try {
      log('📝 Test 4: Obtener perfil de usuario', 'blue');
      const response = await makeRequest('GET', '/api/auth/profile', null, {
        'Authorization': `Bearer ${sessionToken}`
      });
      
      if (response.statusCode === 200 && response.data.success) {
        log('✅ Perfil obtenido correctamente', 'green');
        log(`   Usuario: ${response.data.user.username}`, 'green');
        log(`   Email: ${response.data.user.email}`, 'green');
        log(`   Nombre: ${response.data.user.fullName}`, 'green');
        log(`   Rol: ${response.data.user.role}`, 'green');
      } else {
        log(`❌ Error al obtener perfil`, 'red');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
  }
  
  log('');
  
  // Test 5: Acceso sin autenticacion
  try {
    log('📝 Test 5: Acceso a perfil sin autenticacion', 'blue');
    const response = await makeRequest('GET', '/api/auth/profile');
    
    if (response.statusCode === 401) {
      log('✅ Acceso no autorizado rechazado correctamente', 'green');
    } else {
      log(`❌ Respuesta inesperada: ${response.statusCode}`, 'red');
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
  }
  
  log('');
  
  // Test 6: Login con otros usuarios
  const testUsers = [
    { username: 'francisco', password: 'medusse2025', role: 'admin' },
    { username: 'profesor', password: 'medusse2025', role: 'user' },
    { username: 'alumno', password: 'medusse2025', role: 'viewer' }
  ];
  
  for (const user of testUsers) {
    try {
      log(`📝 Test: Login como ${user.username} (${user.role})`, 'blue');
      const response = await makeRequest('POST', '/api/auth/login', {
        username: user.username,
        password: user.password
      });
      
      if (response.statusCode === 200 && response.data.success) {
        log(`✅ Login exitoso como ${user.username}`, 'green');
        log(`   Rol: ${response.data.user.role}`, 'green');
      } else {
        log(`❌ Login fallido para ${user.username}`, 'red');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
    log('');
  }
  
  // Test 7: Logout
  if (sessionToken) {
    try {
      log('📝 Test 7: Logout', 'blue');
      const response = await makeRequest('POST', '/api/auth/logout', null, {
        'Authorization': `Bearer ${sessionToken}`
      });
      
      if (response.statusCode === 200 && response.data.success) {
        log('✅ Logout exitoso', 'green');
      } else {
        log(`❌ Logout fallido`, 'red');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
  }
  
  log('');
  
  // Test 8: Validar sesion despues de logout
  if (sessionToken) {
    try {
      log('📝 Test 8: Validar sesion despues de logout', 'blue');
      const response = await makeRequest('GET', '/api/auth/validate', null, {
        'Authorization': `Bearer ${sessionToken}`
      });
      
      if (response.statusCode === 401 || !response.data.valid) {
        log('✅ Sesion invalidada correctamente despues de logout', 'green');
      } else {
        log(`❌ Sesion aun valida despues de logout`, 'red');
      }
    } catch (error) {
      log(`❌ Error: ${error.message}`, 'red');
    }
  }
  
  log('\n✅ TESTS COMPLETADOS\n', 'cyan');
}

// Ejecutar tests
log('\n🚀 Iniciando tests de autenticacion...', 'yellow');
log(`📡 API: http://${API_URL}:${API_PORT}`, 'yellow');
log('⏳ Esperando 2 segundos para que la API este lista...\n', 'yellow');

setTimeout(() => {
  runTests().catch(error => {
    log(`\n❌ Error fatal: ${error.message}`, 'red');
    process.exit(1);
  });
}, 2000);
