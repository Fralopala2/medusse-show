@echo off
chcp 65001 >nul
title Medusse IoT - Prueba Guiada de Autenticacion

echo.
echo ========================================
echo   MEDUSSE IoT - PRUEBA DE AUTENTICACION
echo ========================================
echo.

echo 📋 PASOS A SEGUIR:
echo.
echo 1. Iniciar Docker Desktop
echo 2. Iniciar servicios Docker (MySQL)
echo 3. Iniciar API REST
echo 4. Ejecutar tests de autenticacion
echo.
echo ========================================
echo.

REM Paso 1: Verificar Docker Desktop
echo 🔍 PASO 1: Verificando Docker Desktop...
echo.

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no esta instalado
    echo.
    echo Por favor instala Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo ✅ Docker instalado
echo.

REM Verificar si Docker esta corriendo
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Docker Desktop no esta corriendo
    echo.
    echo Por favor:
    echo 1. Abre Docker Desktop
    echo 2. Espera a que inicie completamente
    echo 3. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)

echo ✅ Docker Desktop corriendo
echo.

REM Paso 2: Iniciar servicios Docker
echo 🔍 PASO 2: Verificando servicios Docker...
echo.

docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MySQL no esta corriendo
    echo.
    echo 🚀 Iniciando servicios Docker...
    echo.
    docker compose -f docker/docker-compose.yml up -d
    
    if %errorlevel% neq 0 (
        echo ❌ Error al iniciar servicios Docker
        pause
        exit /b 1
    )
    
    echo.
    echo ⏳ Esperando 10 segundos para que MySQL inicie...
    timeout /t 10 /nobreak >nul
    echo.
)

echo ✅ MySQL corriendo
echo.

REM Paso 3: Verificar Node.js
echo 🔍 PASO 3: Verificando Node.js...
echo.

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

REM Paso 4: Verificar dependencias de la API
echo 🔍 PASO 4: Verificando dependencias de la API...
echo.

if not exist "api\node_modules" (
    echo ⚠️  Dependencias no instaladas
    echo.
    echo 📦 Instalando dependencias...
    cd api
    call npm install
    cd ..
    echo.
)

echo ✅ Dependencias instaladas
echo.

REM Paso 5: Iniciar API en segundo plano
echo 🔍 PASO 5: Iniciando API REST...
echo.

REM Verificar si la API ya esta corriendo
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API ya esta corriendo en puerto 3001
    echo.
) else (
    echo 🚀 Iniciando API REST...
    echo.
    echo ⚠️  IMPORTANTE: Se abrira una nueva ventana con la API
    echo    NO CIERRES esa ventana durante las pruebas
    echo.
    
    start "Medusse API" cmd /k "cd api && node server.js"
    
    echo ⏳ Esperando 5 segundos para que la API inicie...
    timeout /t 5 /nobreak >nul
    echo.
)

REM Verificar que la API este respondiendo
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ La API no esta respondiendo
    echo.
    echo Verifica la ventana de la API para ver errores
    pause
    exit /b 1
)

echo ✅ API respondiendo correctamente
echo.

REM Paso 6: Ejecutar tests
echo ========================================
echo   EJECUTANDO TESTS DE AUTENTICACION
echo ========================================
echo.

cd api
node test-auth.js

echo.
echo ========================================
echo   PRUEBAS COMPLETADAS
echo ========================================
echo.

echo 📝 NOTAS:
echo.
echo - La API sigue corriendo en otra ventana
echo - Puedes cerrar esa ventana cuando termines
echo - Los servicios Docker siguen corriendo
echo - Para detener Docker: docker compose -f docker/docker-compose.yml down
echo.

pause
