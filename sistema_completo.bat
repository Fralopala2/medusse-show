@echo off
title SISTEMA COMPLETO MEDUSSE IoT
color 0B

echo ==========================================
echo   SISTEMA COMPLETO MEDUSSE IoT
echo ==========================================
echo.
echo Este script inicia el ecosistema completo:
echo - Servicios Docker (MQTT, InfluxDB, Grafana)
echo - Simulador de datos
echo - API REST (puerto 3001)
echo - Dashboard Grafana (puerto 3000)
echo.
echo NOTA: La app Flutter debe ejecutarse manualmente
echo       con: ejecutar_flutter.bat
echo.

REM Verificar Docker
echo [1/5] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Docker no esta instalado o no esta corriendo
    echo    Por favor, inicia Docker Desktop y vuelve a ejecutar
    pause
    exit /b 1
)
echo ✅ Docker OK

REM Verificar Node.js para API
echo.
echo [2/5] Verificando Node.js para API...
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js no encontrado - API REST no estará disponible
    echo    Instalar desde: https://nodejs.org/
    set API_AVAILABLE=false
) else (
    echo ✅ Node.js OK
    set API_AVAILABLE=true
)

REM Verificar Python para simulador
echo.
echo [3/5] Verificando Python para simulador...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python no encontrado
    echo    Instalar desde Microsoft Store
    pause
    exit /b 1
)
echo ✅ Python OK

REM Iniciar servicios Docker
echo.
echo [4/5] Iniciando servicios Docker...
docker compose -f docker/docker-compose.yml up -d
echo ⏳ Esperando servicios (20 segundos)...
timeout /t 20 >nul

REM Abrir interfaces web
echo.
echo [5/5] Abriendo interfaces web...
echo 📊 Grafana Dashboard: http://localhost:3000
start http://localhost:3000
timeout /t 3 >nul

if "%API_AVAILABLE%"=="true" (
    echo 🌐 Iniciando API REST en segundo plano...
    cd api
    start /min cmd /c "npm install >nul 2>&1 && node server.js"
    cd ..
    timeout /t 5 >nul
    echo 🔗 API REST: http://localhost:3001
    start http://localhost:3001/health
)

echo.
echo ========================================
echo   SISTEMA INICIADO CORRECTAMENTE
echo ========================================
echo.
echo 📊 Grafana Dashboard: http://localhost:3000
echo    Usuario: admin / Contraseña: medusse2025
echo.
if "%API_AVAILABLE%"=="true" (
    echo 🌐 API REST: http://localhost:3001
    echo 🔌 WebSocket: ws://localhost:3002
    echo.
)
echo 📱 Para app Flutter ejecutar: ejecutar_flutter.bat
echo.
echo ⏹️  Para detener todo: Ctrl+C y ejecutar 'docker compose down'
echo.
echo [SIMULADOR] Iniciando datos de sensores...
echo Presiona Ctrl+C para detener
echo.

REM Ejecutar simulador (bloquea hasta Ctrl+C)
python arduino/medusse_simulator.py

echo.
echo 👋 Sistema detenido
echo.
echo Para limpiar completamente:
echo docker compose -f docker/docker-compose.yml down
pause