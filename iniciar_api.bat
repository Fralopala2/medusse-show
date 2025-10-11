@echo off
title API REST MEDUSSE IoT
color 0B

echo ==========================================
echo   API REST MEDUSSE IoT
echo ==========================================
echo.
echo Servidor Node.js con Express y WebSocket
echo - Puerto 3001: API REST
echo - Puerto 3002: WebSocket tiempo real
echo - Integracion InfluxDB y MQTT
echo.

REM Verificar que Node.js este instalado
echo [1/4] Verificando Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado
    echo    Instalar desde: https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo [OK] Node.js disponible

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm no esta disponible
    pause
    exit /b 1
)
echo [OK] npm disponible

REM Ir al directorio de la API
echo.
echo [2/4] Preparando API REST
cd /d "%~dp0api"

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo [ERROR] Directorio de API no encontrado
    echo    Archivo package.json no existe
    pause
    exit /b 1
)
echo [OK] Proyecto API encontrado

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo [INFO] Instalando dependencias npm (puede tardar 1-2 minutos)
    npm install
    if errorlevel 1 (
        echo [ERROR] Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas
) else (
    echo [OK] Dependencias ya instaladas
)

REM Verificar servicios Docker (opcional)
echo.
echo [3/4] Verificando servicios Docker (opcional)
docker ps --format "table {{.Names}}\t{{.Status}}" 2>nul | findstr "medusse" >nul 2>&1
if errorlevel 1 (
    echo [WARN] Servicios Docker no corriendo
    echo    API funcionara con funcionalidad limitada
    echo    Para funcionalidad completa ejecutar: sistema_completo.bat
) else (
    echo [OK] Servicios Docker activos
)

echo.
echo [4/4] Iniciando servidor API REST
echo.
echo ==========================================
echo   SERVIDOR INICIADO
echo ==========================================
echo.
echo [API] API REST: http://localhost:3001
echo [WS]  WebSocket: ws://localhost:3002
echo.
echo ENDPOINTS DISPONIBLES:
echo - GET /health - Estado de servicios
echo - GET /api/locations - Ubicaciones disponibles
echo - GET /api/summary - Resumen general
echo - GET /api/latest/:location - Ultimos valores
echo - GET /api/data/:location/:sensor - Datos historicos
echo.
echo [STOP] Para detener: Ctrl+C
echo.

REM Ejecutar servidor
node server.js

echo.
echo [INFO] Servidor API detenido
pause