@echo off
title VERIFICACION PROYECTO MEDUSSE
color 0B

echo ========================================
echo   VERIFICACION PROYECTO MEDUSSE
echo ========================================
echo.

echo [1/6] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no encontrado
    echo Instala Python desde Microsoft Store o python.org
) else (
    python --version
    echo Python OK
)

echo.
echo [2/6] Verificando PlatformIO...
platformio --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: PlatformIO no encontrado
    echo Ejecuta: pip install platformio
) else (
    platformio --version
    echo PlatformIO OK
)

echo.
echo [3/6] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no encontrado
    echo Instala Docker Desktop
) else (
    docker --version
    echo Docker OK
)

echo.
echo [4/6] Verificando dependencias Python...
python -c "import paho.mqtt.client as mqtt; import requests; print('Dependencias OK')" 2>nul
if errorlevel 1 (
    echo ERROR: Dependencias Python faltantes
    echo Ejecuta: pip install paho-mqtt requests
) else (
    echo Dependencias Python OK
)

echo.
echo [5/6] Verificando contenedores Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no esta corriendo
    echo Inicia Docker Desktop
) else (
    echo Contenedores Docker:
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
)

echo.
echo [6/6] Verificando servicios web...
echo Verificando Grafana (http://localhost:3000)...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo Grafana: NO ACCESIBLE
) else (
    echo Grafana: ACCESIBLE
)

echo.
echo ========================================
echo   VERIFICACION COMPLETADA
echo ========================================
echo.
echo Si todos los servicios estan OK, ejecuta: demo.bat
echo.
pause