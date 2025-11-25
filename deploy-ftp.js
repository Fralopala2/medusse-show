// Script FTP para deployment automatico - Reto 11
// Sube archivos del proyecto a un servidor FTP

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// Configuracion FTP (usar variables de entorno en produccion)
const FTP_CONFIG = {
  host: process.env.FTP_HOST || 'ftp.ejemplo.com',
  user: process.env.FTP_USER || 'usuario',
  password: process.env.FTP_PASSWORD || 'password',
  port: process.env.FTP_PORT || 21,
  secure: process.env.FTP_SECURE === 'true' // FTPS
};

// Directorios a subir
const UPLOAD_DIRS = [
  { local: './web/.next', remote: '/public_html/web' },
  { local: './api', remote: '/public_html/api' },
  { local: './docker', remote: '/public_html/docker' }
];

// Archivos a excluir
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  '.env',
  '.env.local',
  '*.log',
  '.DS_Store'
];

// Funcion para verificar si un archivo debe ser excluido
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

// Funcion para subir un directorio recursivamente
async function uploadDirectory(client, localDir, remoteDir) {
  console.log(`📁 Subiendo: ${localDir} → ${remoteDir}`);
  
  try {
    // Crear directorio remoto si no existe
    await client.ensureDir(remoteDir);
    
    // Leer archivos locales
    const files = fs.readdirSync(localDir);
    
    for (const file of files) {
      const localPath = path.join(localDir, file);
      const remotePath = `${remoteDir}/${file}`;
      
      // Saltar archivos excluidos
      if (shouldExclude(localPath)) {
        console.log(`⏭️  Saltando: ${localPath}`);
        continue;
      }
      
      const stat = fs.statSync(localPath);
      
      if (stat.isDirectory()) {
        // Subir subdirectorio recursivamente
        await uploadDirectory(client, localPath, remotePath);
      } else {
        // Subir archivo
        console.log(`📤 Subiendo archivo: ${file}`);
        await client.uploadFrom(localPath, remotePath);
      }
    }
    
    console.log(`✅ Completado: ${localDir}`);
  } catch (error) {
    console.error(`❌ Error en ${localDir}:`, error.message);
    throw error;
  }
}

// Funcion principal
async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Mostrar logs detallados
  
  try {
    console.log('🚀 Iniciando deployment FTP...\n');
    
    // Conectar al servidor FTP
    console.log(`🔌 Conectando a ${FTP_CONFIG.host}...`);
    await client.access(FTP_CONFIG);
    console.log('✅ Conectado exitosamente\n');
    
    // Subir cada directorio
    for (const dir of UPLOAD_DIRS) {
      if (fs.existsSync(dir.local)) {
        await uploadDirectory(client, dir.local, dir.remote);
        console.log('');
      } else {
        console.log(`⚠️  Directorio no encontrado: ${dir.local}\n`);
      }
    }
    
    console.log('🎉 Deployment completado exitosamente!');
    
  } catch (error) {
    console.error('❌ Error durante el deployment:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

// Ejecutar deployment
if (require.main === module) {
  deploy().catch(error => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
}

module.exports = { deploy };
