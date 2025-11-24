@echo off
chcp 65001 >nul
title Medusse IoT - Test de Autenticacion

echo.
echo ========================================
echo   MEDUSSE IoT - TEST DE AUTENTICACION
echo ========================================
echo.

REM Verificar que Node.js este instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no esta instalado
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js instalado
echo.

REM Verificar que la API este corriendo
echo 🔍 Verificando que la API este corriendo...
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  La API no esta corriendo
    echo.
    echo Por favor inicia la API primero con: iniciar_api.bat
    echo.
    pause
    exit /b 1
)

echo ✅ API corriendo en puerto 3001
echo.

REM Verificar que MySQL este corriendo
echo 🔍 Verificando que MySQL este corriendo...
docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  MySQL no esta corriendo
    echo.
    echo Por favor inicia Docker con: docker compose -f docker/docker-compose.yml up -d
    echo.
    pause
    exit /b 1
)

echo ✅ MySQL corriendo
echo.

echo ========================================
echo   EJECUTANDO TESTS DE AUTENTICACION
echo ========================================
echo.

REM Ejecutar tests
cd api
node test-auth.js

echo.
echo ========================================
echo   TESTS COMPLETADOS
echo ========================================
echo.

pause
