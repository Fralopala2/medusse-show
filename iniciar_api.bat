@echo off
echo 🚀 Iniciando Medusse API REST...
echo.

REM Verificar que Node.js esté instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    echo    Instalar desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Ir al directorio de la API
cd /d "%~dp0api"

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
    echo.
)

REM Verificar que los servicios Docker estén corriendo
echo 🔍 Verificando servicios Docker...
docker ps | findstr "medusse_influxdb" >nul
if errorlevel 1 (
    echo ⚠️  InfluxDB no está corriendo
    echo    Ejecutar: docker compose -f docker/docker-compose.yml up -d
    echo.
)

docker ps | findstr "medusse_mosquitto" >nul
if errorlevel 1 (
    echo ⚠️  MQTT Broker no está corriendo
    echo    Ejecutar: docker compose -f docker/docker-compose.yml up -d
    echo.
)

echo ✅ Iniciando API en puerto 3001...
echo ✅ WebSocket en puerto 3002...
echo.
echo 📋 Endpoints disponibles:
echo    http://localhost:3001/health
echo    http://localhost:3001/api/locations
echo    http://localhost:3001/api/summary
echo    ws://localhost:3002 (WebSocket)
echo.
echo 🛑 Presiona Ctrl+C para detener
echo.

REM Iniciar la API
npm start