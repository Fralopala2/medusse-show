@echo off
chcp 65001 >nul
title Medusse IoT - Menu Principal
color 0B
cd /d "%~dp0"

:menu
cls
echo.
echo ========================================
echo   MEDUSSE IoT - MENU PRINCIPAL
echo ========================================
echo.
echo EJECUCION:
echo   1. Sistema completo (Dashboard + API + Simulador)
echo   2. Solo Dashboard Grafana
echo   3. Solo API REST
echo   4. Solo Web Next.js
echo.
echo VERIFICACION:
echo   5. Verificacion completa
echo   6. Verificacion rapida
echo.
echo TESTING:
echo   7. Test API REST
echo   8. Test autenticacion
echo   9. Test login web
echo.
echo UTILIDADES:
echo   10. Detener todo el sistema
echo.
echo   0. Salir
echo.
echo ========================================

set /p opcion="Selecciona una opcion (0-10): "

if "%opcion%"=="0" goto fin
if "%opcion%"=="1" goto sistema_completo
if "%opcion%"=="2" goto dashboard
if "%opcion%"=="3" goto api
if "%opcion%"=="4" goto web
if "%opcion%"=="5" goto verificar
if "%opcion%"=="6" goto verificar_rapido
if "%opcion%"=="7" goto test_api
if "%opcion%"=="8" goto test_auth
if "%opcion%"=="9" goto test_login_web
if "%opcion%"=="10" goto detener

echo.
echo ? Opcion invalida
timeout /t 2 >nul
goto menu

:sistema_completo
cls
echo.
echo ========================================
echo   SISTEMA COMPLETO
echo ========================================
echo.
call iniciar.bat
pause
goto menu

:dashboard
cls
echo.
echo ========================================
echo   DASHBOARD GRAFANA
echo ========================================
echo.

REM Verificar Docker
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Docker Desktop no esta corriendo
    echo Por favor inicia Docker Desktop primero
    pause
    goto menu
)

echo ?? Iniciando servicios Docker...
docker compose -f docker/docker-compose.yml up -d

echo.
echo ? Esperando 15 segundos...
timeout /t 15 /nobreak >nul

echo.
echo ?? Iniciando simulador...
if not exist logs mkdir logs
wscript //nologo "%~dp0scripts\start-simulator.vbs"

echo.
echo ? Dashboard disponible en: http://localhost:4000
echo    Usuario: admin / medusse2025
echo.
pause
goto menu

:api
cls
echo.
echo ========================================
echo   API REST
echo ========================================
echo.

REM Verificar Docker
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Docker Desktop no esta corriendo
    pause
    goto menu
)

echo ?? Iniciando MySQL...
docker compose -f docker/docker-compose.yml up -d mysql

echo.
echo ? Esperando 10 segundos...
timeout /t 10 /nobreak >nul

echo.
echo ?? Iniciando API REST...
cd api
wscript //nologo "%~dp0scripts\start-api.vbs"
cd ..

echo.
echo ? API disponible en: http://localhost:4001
echo.
pause
goto menu

:web
cls
echo.
echo ========================================
echo   WEB NEXT.JS
echo ========================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Node.js no esta instalado
    pause
    goto menu
)

echo ?? Iniciando Web Next.js...
cd web
wscript //nologo "%~dp0scripts\start-web.vbs"
cd ..

echo.
echo ? Web disponible en: http://localhost:4003
echo.
pause
goto menu

:verificar
cls
echo.
echo ========================================
echo   VERIFICACION COMPLETA
echo ========================================
echo.
call verificar.bat
pause
goto menu

:verificar_rapido
cls
echo.
echo ========================================
echo   VERIFICACION RAPIDA
echo ========================================
echo.

echo ?? Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Docker no instalado
) else (
    echo ? Docker instalado
)

docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Docker no corriendo
) else (
    echo ? Docker corriendo
)

echo.
echo ?? Verificando servicios...
docker ps --format "{{.Names}}" | findstr medusse >nul 2>&1
if %errorlevel% neq 0 (
    echo ??  Servicios no corriendo
) else (
    echo ? Servicios corriendo
)

echo.
echo ?? Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Node.js no instalado
) else (
    echo ? Node.js instalado
)

echo.
echo ?? Verificando Python...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Python no instalado
) else (
    echo ? Python instalado
)

echo.
echo ? Verificacion completada
pause
goto menu

:test_api
cls
echo.
echo ========================================
echo   TEST API REST
echo ========================================
echo.

curl -s http://localhost:4001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ? API no esta corriendo
    echo.
    echo Inicia la API primero (opcion 3)
    pause
    goto menu
)

echo ? API corriendo
echo.
echo ?? Ejecutando tests...
echo.

cd api
node test-api.js
cd ..

echo.
pause
goto menu

:test_auth
cls
echo.
echo ========================================
echo   TEST AUTENTICACION
echo ========================================
echo.

curl -s http://localhost:4001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ? API no esta corriendo
    pause
    goto menu
)

docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo ? MySQL no esta corriendo
    pause
    goto menu
)

echo ? API y MySQL corriendo
echo.
echo ?? Ejecutando tests de autenticacion...
echo.

cd api
node test-auth.js
cd ..

echo.
pause
goto menu

:test_login_web
cls
echo.
echo ========================================
echo   TEST LOGIN WEB
echo ========================================
echo.

REM Verificar y arrancar servicios si es necesario
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ? Docker no esta corriendo
    pause
    goto menu
)

docker ps | findstr medusse_mysql >nul 2>&1
if %errorlevel% neq 0 (
    echo ?? Iniciando MySQL...
    docker compose -f docker/docker-compose.yml up -d mysql
    timeout /t 10 /nobreak >nul
)

curl -s http://localhost:4001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ?? Iniciando API...
    wscript //nologo "%~dp0scripts\start-api.vbs"
    timeout /t 5 /nobreak >nul
)

curl -s http://localhost:4003 >nul 2>&1
if %errorlevel% neq 0 (
    echo ?? Iniciando Web...
    cd web
    wscript //nologo "%~dp0scripts\start-web.vbs"
    cd ..
    timeout /t 10 /nobreak >nul
)

echo.
echo ? Sistema listo
echo.
echo ?? USUARIOS DE PRUEBA:
echo    ? admin / medusse2025 (Administrador)
echo    ? paco / medusse2025 (Administrador)
echo    ? profesor / medusse2025 (Usuario)
echo    ? alumno / medusse2025 (Viewer)
echo.
echo ?? Login: http://localhost:4003/login
echo.

set /p abrir="?Abrir navegador? (S/N): "
if /i "%abrir%"=="S" start "" "http://localhost:4003/login"

pause
goto menu

:fin
cls
echo.
echo ========================================
echo   Gracias por usar Medusse IoT
echo ========================================
echo.
exit /b 0

:detener
cls
echo.
echo ========================================
echo   DETENER SISTEMA
echo ========================================
echo.
call detener.bat
pause
goto menu
