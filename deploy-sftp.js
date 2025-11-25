// Script SFTP para deployment automatico - Reto 11
// Version con SFTP (mas seguro que FTP)

const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');

// Configuracion SFTP
const SFTP_CONFIG = {
  host: process.env.SFTP_HOST || 'sftp.ejemplo.com',
  port: process.env.SFTP_PORT || 22,
  username: process.env.SFTP_USER || 'usuario',
  password: process.env.SFTP_PASSWORD || 'password'
  // O usar clave SSH:
  // privateKey: fs.readFileSync('/path/to/private/key')
};

// Directorios a subir
const UPLOAD_DIRS = [
  { local: './web/.next', remote: '/var/www/html/web' },
  { local: './api', remote: '/var/www/html/api' }
];

// Archivos a excluir
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  '.env',
  '*.log'
];

function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

async function uploadDirectory(sftp, localDir, remoteDir) {
  console.log(`📁 Subiendo: ${localDir} → ${remoteDir}`);
  
  try {
    // Crear directorio remoto
    await sftp.mkdir(remoteDir, true);
    
    const files = fs.readdirSync(localDir);
    
    for (const file of files) {
      const localPath = path.join(localDir, file);
      const remotePath = `${remoteDir}/${file}`;
      
      if (shouldExclude(localPath)) {
        console.log(`⏭️  Saltando: ${localPath}`);
        continue;
      }
      
      const stat = fs.statSync(localPath);
      
      if (stat.isDirectory()) {
        await uploadDirectory(sftp, localPath, remotePath);
      } else {
        console.log(`📤 Subiendo: ${file}`);
        await sftp.put(localPath, remotePath);
      }
    }
    
    console.log(`✅ Completado: ${localDir}`);
  } catch (error) {
    console.error(`❌ Error en ${localDir}:`, error.message);
    throw error;
  }
}

async function deploy() {
  const sftp = new Client();
  
  try {
    console.log('🚀 Iniciando deployment SFTP...\n');
    
    console.log(`🔌 Conectando a ${SFTP_CONFIG.host}...`);
    await sftp.connect(SFTP_CONFIG);
    console.log('✅ Conectado exitosamente\n');
    
    for (const dir of UPLOAD_DIRS) {
      if (fs.existsSync(dir.local)) {
        await uploadDirectory(sftp, dir.local, dir.remote);
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
    await sftp.end();
  }
}

if (require.main === module) {
  deploy().catch(error => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
}

module.exports = { deploy };
