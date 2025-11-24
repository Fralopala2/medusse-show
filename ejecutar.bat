@echo off
chcp 65001 >nul
title Medusse IoT - Ejecutar Componentes

echo.
echo ========================================
echo   MEDUSSE IoT - EJECUTAR COMPONENTES
echo ========================================
echo.

echo Selecciona qué componente ejecutar:
echo.
echo 1. Sistema completo (Dashboard + API + Simulador)
echo 2. Solo Dashboard Grafana
echo 3. Solo API REST + WebSocket
echo 4. Solo App Flutter
echo 5. Solo Web Next.js
echo 6. Salir
echo.

set /p opcion="Opcion (1-6): "

if "%opcion%"=="1" goto sistema_completo
if "%opcion%"=="2" goto dashboard
if "%opcion%"=="3" goto api
if "%opcion%"=="4" goto flutter
if "%opcion%"=="5" goto web
if "%opcion%"=="6" goto fin

echo Opcion invalida
pause
exit /b 1

:sistema_completo
echo.
echo ========================================
echo   INICIANDO SISTEMA COMPLETO
echo ========================================
echo.
call sistema_completo.bat
goto fin

:dashboard
echo.
echo ========================================
echo   INICIANDO DASHBOARD GRAFANA
echo ========================================
echo.

REM Verificar Docker
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Desktop no esta corriendo
    echo Por favor inicia Docker Desktop primero
    pause
    exit /b 1
)

echo 🚀 Iniciando servicios Docker...
docker compose -f docker/docker-compose.yml up -d

echo.
echo ⏳ Esperando 15 segundos para que los servicios inicien...
timeout /t 15 /nobreak >nul

echo.
echo 🚀 Iniciando simulador...
start "Medusse Simulator" cmd /k "python arduino/medusse_simulator.py"

echo.
echo ✅ Dashboard disponible en: http://localhost:3000
echo    Usuario: admin
echo    Password: medusse2025
echo.
pause
goto fin

:api
echo.
echo ========================================
echo   INICIANDO API REST
echo ========================================
echo.

REM Verificar Docker
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Desktop no esta corriendo
    echo Por favor inicia Docker Desktop primero
    pause
    exit /b 1
)

echo 🚀 Iniciando MySQL...
docker compose -f docker/docker-compose.yml up -d mysql

echo.
echo ⏳ Esperando 10 segundos para que MySQL inicie...
timeout /t 10 /nobreak >nul

echo.
echo 🚀 Iniciando API REST...
cd api
start "Medusse API" cmd /k "node server.js"
cd ..

echo.
echo ✅ API disponible en: http://localhost:3001
echo    Health: http://localhost:3001/health
echo    WebSocket: ws://localhost:3002
echo.
pause
goto fin

:flutter
echo.
echo ========================================
echo   INICIANDO APP FLUTTER
echo ========================================
echo.

REM Verificar Flutter
where flutter >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Flutter no esta instalado
    pause
    exit /b 1
)

echo 🚀 Iniciando App Flutter...
cd medusse_app
start "Medusse Flutter App" cmd /k "flutter run -d windows"
cd ..

echo.
echo ✅ App Flutter iniciando...
echo.
pause
goto fin

:web
echo.
echo ========================================
echo   INICIANDO WEB NEXT.JS
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no esta instalado
    pause
    exit /b 1
)

echo 🚀 Iniciando Web Next.js...
cd web
start "Medusse Web" cmd /k "npm run dev"
cd ..

echo.
echo ✅ Web disponible en: http://localhost:3100
echo.
pause
goto fin

:fin
