// Modulo de conexion a MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuracion de la conexion
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 13306,
  user: process.env.MYSQL_USER || 'medusse_user',
  password: process.env.MYSQL_PASSWORD || 'medusse2025',
  database: process.env.MYSQL_DATABASE || 'medusse_db',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexiones
let pool = null;

// Inicializar pool de conexiones
function initPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    console.log('🗄️  MySQL connection pool created');
  }
  return pool;
}

// Obtener conexion del pool
async function getConnection() {
  if (!pool) {
    initPool();
  }
  return await pool.getConnection();
}

// Ejecutar query simple
async function query(sql, params = []) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(sql, params);
    return result; // Devuelve [rows, fields]
  } finally {
    connection.release();
  }
}

// Ejecutar procedimiento almacenado
async function callProcedure(procedureName, params = []) {
  const connection = await getConnection();
  try {
    const placeholders = params.map(() => '?').join(', ');
    const sql = `CALL ${procedureName}(${placeholders})`;
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    connection.release();
  }
}

// Verificar conexion
async function testConnection() {
  try {
    const connection = await getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ MySQL connection successful');
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// Cerrar pool de conexiones
async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('🗄️  MySQL connection pool closed');
  }
}

module.exports = {
  initPool,
  getConnection,
  query,
  callProcedure,
  testConnection,
  closePool
};
