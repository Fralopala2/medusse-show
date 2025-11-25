@echo off
title Deployment FTP - Medusse IoT
color 0B

echo ==========================================
echo   DEPLOYMENT FTP - MEDUSSE IoT
echo ==========================================
echo.

REM Verificar Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no esta instalado
    pause
    exit /b 1
)

REM Verificar que exista el script
if not exist "deploy-ftp.js" (
    echo ❌ Script deploy-ftp.js no encontrado
    pause
    exit /b 1
)

REM Instalar dependencias si es necesario
if not exist "node_modules\basic-ftp" (
    echo 📦 Instalando dependencias FTP...
    npm install basic-ftp
    echo.
)

REM Verificar variables de entorno
if "%FTP_HOST%"=="" (
    echo ⚠️  Variables de entorno FTP no configuradas
    echo.
    echo Configura las siguientes variables:
    echo   FTP_HOST=ftp.tuservidor.com
    echo   FTP_USER=tu_usuario
    echo   FTP_PASSWORD=tu_password
    echo   FTP_PORT=21
    echo   FTP_SECURE=false
    echo.
    echo ¿Continuar con valores por defecto? (S/N)
    set /p continuar=
    if /i not "%continuar%"=="S" exit /b 1
)

echo 🚀 Iniciando deployment...
echo.

REM Ejecutar script de deployment
node deploy-ftp.js

if %errorlevel% equ 0 (
    echo.
    echo ✅ Deployment completado exitosamente
) else (
    echo.
    echo ❌ Error durante el deployment
)

echo.
pause
