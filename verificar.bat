@echo off
title VERIFICACION PROYECTO MEDUSSE
color 0B

echo ========================================
echo   VERIFICACION PROYECTO MEDUSSE
echo ========================================
echo.
echo Verificando sistema IoT completo:
echo - Core: Docker, Python, Simulador
echo - API REST: Node.js
echo - App Flutter: Flutter SDK
echo.

echo [1/8] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no encontrado
    echo Instala Python desde Microsoft Store o python.org
) else (
    python --version
    echo Python OK
)

echo.
echo [2/8] Verificando Node.js (para API REST)...
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js: NO ENCONTRADO (API REST no disponible)
    echo Instala desde: https://nodejs.org/
) else (
    node --version
    echo Node.js: OK
)

echo.
echo [3/8] Verificando Flutter (para app móvil)...
REM Verificación rápida de Flutter sin ejecutar comando completo
where flutter >nul 2>&1
if errorlevel 1 (
    echo Flutter: NO ENCONTRADO (App móvil no disponible)
    echo Instala desde: https://flutter.dev/
    echo (Opcional - puedes continuar sin Flutter)
) else (
    echo Flutter: ENCONTRADO
    echo (Verificación completa se hace en ejecutar_flutter.bat)
)

echo.
echo [4/8] Verificando PlatformIO...
where platformio >nul 2>&1
if errorlevel 1 (
    echo PlatformIO: NO ENCONTRADO (para desarrollo ESP32)
    echo Instalar: pip install platformio
    echo (Opcional - no necesario para simulador)
) else (
    echo PlatformIO: ENCONTRADO
)

echo.
echo [5/8] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no encontrado
    echo Instala Docker Desktop
) else (
    docker --version
    echo Docker OK
)

echo.
echo [6/8] Verificando dependencias Python...
python -c "import paho.mqtt.client as mqtt; import requests; print('Dependencias OK')" 2>nul
if errorlevel 1 (
    echo ERROR: Dependencias Python faltantes
    echo Ejecuta: pip install paho-mqtt requests
) else (
    echo Dependencias Python OK
)

echo.
echo [7/8] Verificando contenedores Docker...
echo (Consultando Docker daemon...)
docker ps >nul 2>&1
if errorlevel 1 (
    echo Docker: NO ESTA CORRIENDO
    echo Solucion: Inicia Docker Desktop
) else (
    echo Docker: CORRIENDO
    echo Contenedores activos:
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>nul
)

echo.
echo [8/8] Verificando servicios web...
echo Verificando Grafana (timeout 3s)...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 3 -UseBasicParsing; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 (
    echo Grafana: NO ACCESIBLE (ejecutar: demo.bat o sistema_completo.bat)
) else (
    echo Grafana: ACCESIBLE
)

echo Verificando API REST (timeout 3s)...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/health' -TimeoutSec 3 -UseBasicParsing; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 (
    echo API REST: NO ACCESIBLE (ejecutar: iniciar_api.bat)
) else (
    echo API REST: ACCESIBLE
)

echo.
echo [EXTRA] Verificando archivos del proyecto...
if exist "arduino\medusse_simulator.py" (
    echo Simulador: arduino\medusse_simulator.py
) else (
    echo Simulador no encontrado
)

if exist "docker\docker-compose.yml" (
    echo Docker Compose: docker\docker-compose.yml
) else (
    echo Docker Compose no encontrado
)

if exist "docker\grafana\dashboards\medusse-clean.json" (
    echo Dashboard: medusse-clean.json
) else (
    echo Dashboard no encontrado
)

if exist "api\server.js" (
    echo API REST: api\server.js
) else (
    echo API REST no encontrada
)

if exist "medusse_app\pubspec.yaml" (
    echo App Flutter: medusse_app\pubspec.yaml
) else (
    echo App Flutter no encontrada
)

echo.
echo ========================================
echo   VERIFICACION COMPLETADA
echo ========================================
echo.
echo SISTEMA DISPONIBLE:
echo.
echo 📊 Core IoT (Grafana):     demo.bat
echo 🌐 API REST:               iniciar_api.bat
echo 📱 App Flutter:            ejecutar_flutter.bat
echo 🚀 Sistema Completo:       sistema_completo.bat
echo.
echo ACCESO WEB:
echo - Grafana: http://localhost:3000 (admin/medusse2025)
echo - API REST: http://localhost:3001
echo - InfluxDB: http://localhost:8086 (admin/medusse2025)
echo.
pause