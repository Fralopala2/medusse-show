@echo off
chcp 65001 >nul
title Medusse IoT - Testing

echo.
echo ========================================
echo   MEDUSSE IoT - TESTING
echo ========================================
echo.

echo Selecciona qué probar:
echo.
echo 1. Verificacion completa del sistema
echo 2. Verificacion rapida (30 segundos)
echo 3. Testing de API REST
echo 4. Testing de autenticacion
echo 5. Salir
echo.

set /p opcion="Opcion (1-5): "

if "%opcion%"=="1" goto verificar_completo
if "%opcion%"=="2" goto verificar_rapido
if "%opcion%"=="3" goto test_api
if "%opcion%"=="4" goto test_auth
if "%opcion%"=="5" goto fin

echo Opcion invalida
pause
exit /b 1

:verificar_completo
echo.
echo ========================================
echo   VERIFICACION COMPLETA
echo ========================================
echo.
call verificar.bat
goto fin

:verificar_rapido
echo.
echo ========================================
echo   VERIFICACION RAPIDA
echo ========================================
echo.

REM Verificar Docker
echo 🔍 Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker no instalado
    pause
    exit /b 1
)
echo ✅ Docker instalado

docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Desktop no corriendo
    pause
    exit /b 1
)
echo ✅ Docker corriendo

REM Verificar servicios
echo.
echo 🔍 Verificando servicios...
docker ps --format "{{.Names}}" | findstr medusse >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Servicios no corriendo
) else (
    echo ✅ Servicios corriendo
)

REM Verificar Node.js
echo.
echo 🔍 Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no instalado
) else (
    echo ✅ Node.js instalado
)

REM Verificar Python
echo.
echo 🔍 Verificando Python...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no instalado
) else (
    echo ✅ Python instalado
)

REM Verificar Flutter
echo.
echo 🔍 Verificando Flutter...
where flutter >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Flutter no instalado
) else (
    echo ✅ Flutter instalado
)

echo.
echo ========================================
echo   VERIFICACION COMPLETADA
echo ========================================
echo.
pause
goto fin

:test_api
echo.
echo ========================================
echo   TESTING API REST
echo ========================================
echo.

REM Verificar que la API este corriendo
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ API no esta corriendo
    echo.
    echo Por favor inicia la API primero con: ejecutar.bat (opcion 3)
    pause
    exit /b 1
)

echo ✅ API corriendo
echo.
echo 🧪 Ejecutando tests de API...
echo.

cd api
node -e "const http = require('http'); console.log('Test 1: Health check...'); http.get('http://localhost:3001/health', res => {let d=''; res.on('data', c=>d+=c); res.on('end', ()=>{console.log(res.statusCode===200?'✅ Health OK':'❌ Health FAIL'); console.log('\nTest 2: Locations...'); http.get('http://localhost:3001/api/locations', res2=>{let d2=''; res2.on('data',c=>d2+=c); res2.on('end',()=>{console.log(res2.statusCode===200?'✅ Locations OK':'❌ Locations FAIL'); console.log('\nTest 3: Summary...'); http.get('http://localhost:3001/api/summary', res3=>{let d3=''; res3.on('data',c=>d3+=c); res3.on('end',()=>{console.log(res3.statusCode===200?'✅ Summary OK':'❌ Summary FAIL'); console.log('\n✅ Tests completados')})})})})})}).on('error', e=>console.error('❌ Error:', e.message));"
cd ..

echo.
pause
goto fin

:test_auth
echo.
echo ========================================
echo   TESTING AUTENTICACION
echo ========================================
echo.

REM Verificar que la API este corriendo
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ API no esta corriendo
    echo.
    echo Por favor inicia la API primero con: ejecutar.bat (opcion 3)
    pause
    exit /b 1
)

REM Verificar MySQL
docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL no esta corriendo
    echo.
    echo Por favor inicia Docker con: docker compose -f docker/docker-compose.yml up -d
    pause
    exit /b 1
)

echo ✅ API y MySQL corriendo
echo.
echo 🧪 Ejecutando tests de autenticacion...
echo.

cd api
node test-auth.js
cd ..

echo.
pause
goto fin

:fin
