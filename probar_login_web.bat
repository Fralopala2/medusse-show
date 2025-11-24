@echo off
chcp 65001 >nul
title Medusse IoT - Probar Login Web

echo.
echo ========================================
echo   MEDUSSE IoT - PROBAR LOGIN WEB
echo ========================================
echo.

echo Esta guia te ayudara a probar el sistema de login en la web Next.js
echo.

REM Verificar Docker
echo 🔍 Paso 1: Verificando Docker...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Desktop no esta corriendo
    echo.
    echo Por favor:
    echo 1. Abre Docker Desktop
    echo 2. Espera a que inicie completamente
    echo 3. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)
echo ✅ Docker corriendo

REM Verificar MySQL
echo.
echo 🔍 Paso 2: Verificando MySQL...
docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MySQL no esta corriendo
    echo.
    echo 🚀 Iniciando MySQL...
    docker compose -f docker/docker-compose.yml up -d mysql
    
    echo ⏳ Esperando 10 segundos para que MySQL inicie...
    timeout /t 10 /nobreak >nul
)
echo ✅ MySQL corriendo

REM Verificar API
echo.
echo 🔍 Paso 3: Verificando API REST...
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  API no esta corriendo
    echo.
    echo 🚀 Iniciando API...
    start "Medusse API" cmd /k "cd api && node server.js"
    
    echo ⏳ Esperando 5 segundos para que la API inicie...
    timeout /t 5 /nobreak >nul
)
echo ✅ API corriendo

REM Verificar Web
echo.
echo 🔍 Paso 4: Verificando Web Next.js...
curl -s http://localhost:3100 >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Web no esta corriendo
    echo.
    echo 🚀 Iniciando Web Next.js...
    cd web
    start "Medusse Web" cmd /k "npm run dev"
    cd ..
    
    echo ⏳ Esperando 10 segundos para que la web inicie...
    timeout /t 10 /nobreak >nul
)
echo ✅ Web corriendo

echo.
echo ========================================
echo   SISTEMA LISTO PARA PROBAR
echo ========================================
echo.

echo 📝 INSTRUCCIONES PARA PROBAR EL LOGIN:
echo.
echo 1. Abre tu navegador en: http://localhost:3100/login
echo.
echo 2. Prueba con estos usuarios:
echo    • admin / medusse2025 (Administrador)
echo    • paco / medusse2025 (Administrador)
echo    • profesor / medusse2025 (Usuario)
echo    • alumno / medusse2025 (Viewer)
echo.
echo 3. Despues de login exitoso, veras el Dashboard
echo.
echo 4. Verifica que puedes:
echo    ✓ Ver tu informacion de usuario
echo    ✓ Ver tus permisos segun el rol
echo    ✓ Acceder a enlaces externos (Grafana, API)
echo    ✓ Cerrar sesion correctamente
echo.
echo 5. Prueba cerrar sesion y volver a entrar con otro usuario
echo.

echo ========================================
echo   URLs IMPORTANTES
echo ========================================
echo.
echo 🌐 Login: http://localhost:3100/login
echo 📊 Dashboard: http://localhost:3100/dashboard
echo 🔌 API Health: http://localhost:3001/health
echo 📈 Grafana: http://localhost:3000
echo.

echo ¿Quieres abrir el navegador automaticamente? (S/N)
set /p abrir="Respuesta: "

if /i "%abrir%"=="S" (
    echo.
    echo 🌐 Abriendo navegador...
    start http://localhost:3100/login
)

echo.
echo ========================================
echo   LISTO PARA PROBAR
echo ========================================
echo.
echo Presiona cualquier tecla para salir...
pause >nul
