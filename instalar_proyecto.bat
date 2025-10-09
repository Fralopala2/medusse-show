@echo off
title INSTALADOR PROYECTO MEDUSSE IoT
color 0A

echo ========================================
echo   INSTALADOR PROYECTO MEDUSSE IoT
echo ========================================
echo.
echo Este script instalara automaticamente:
echo - Docker Desktop (si no esta instalado)
echo - Python y dependencias
echo - Configuracion completa del proyecto
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

echo.
echo [1/6] Verificando sistema...

:: Verificar si estamos en Windows
ver | findstr /i "Windows" >nul
if errorlevel 1 (
    echo ERROR: Este instalador es solo para Windows
    pause
    exit /b 1
)

:: Verificar permisos de administrador
net session >nul 2>&1
if errorlevel 1 (
    echo ADVERTENCIA: Se recomienda ejecutar como administrador
    echo para instalar Docker Desktop automaticamente
    echo.
    echo Continuar de todas formas? (S/N)
    set /p continuar=
    if /i not "%continuar%"=="S" exit /b 1
)

echo Sistema Windows detectado - OK

echo.
echo [2/6] Verificando Docker Desktop...

docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker no encontrado. Descargando Docker Desktop...
    
    :: Crear directorio temporal
    if not exist "%TEMP%\medusse_install" mkdir "%TEMP%\medusse_install"
    
    echo Descargando Docker Desktop...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://desktop.docker.com/win/main/amd64/Docker%%20Desktop%%20Installer.exe' -OutFile '%TEMP%\medusse_install\DockerDesktopInstaller.exe'}"
    
    if exist "%TEMP%\medusse_install\DockerDesktopInstaller.exe" (
        echo Ejecutando instalador de Docker Desktop...
        echo IMPORTANTE: Sigue las instrucciones del instalador
        echo Despues de instalar Docker, REINICIA el equipo y ejecuta este script de nuevo
        pause
        "%TEMP%\medusse_install\DockerDesktopInstaller.exe"
        echo.
        echo Docker Desktop se esta instalando...
        echo REINICIA el equipo cuando termine y ejecuta este script de nuevo
        pause
        exit /b 0
    ) else (
        echo ERROR: No se pudo descargar Docker Desktop
        echo Descarga manualmente desde: https://www.docker.com/products/docker-desktop
        pause
        exit /b 1
    )
) else (
    echo Docker Desktop encontrado - OK
)

echo.
echo [3/6] Verificando Python...

python --version >nul 2>&1
if errorlevel 1 (
    echo Python no encontrado. Instalando desde Microsoft Store...
    echo.
    echo INSTRUCCIONES:
    echo 1. Se abrira Microsoft Store
    echo 2. Instala Python 3.11 o superior
    echo 3. Cierra Microsoft Store y presiona cualquier tecla aqui
    echo.
    start ms-windows-store://pdp/?ProductId=9NRWMJP3717K
    pause
    
    :: Verificar de nuevo
    python --version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Python sigue sin estar disponible
        echo Instala Python manualmente y ejecuta este script de nuevo
        pause
        exit /b 1
    )
)

python --version
echo Python encontrado - OK

echo.
echo [4/6] Instalando dependencias Python...

python -m pip install --upgrade pip
python -m pip install paho-mqtt requests

echo Dependencias instaladas - OK

echo.
echo [5/6] Verificando servicios Docker...

echo Iniciando Docker Desktop (puede tardar unos minutos)...
docker info >nul 2>&1
if errorlevel 1 (
    echo Esperando a que Docker Desktop se inicie...
    timeout /t 30 >nul
    docker info >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Docker Desktop no esta corriendo
        echo.
        echo SOLUCION:
        echo 1. Abre Docker Desktop manualmente
        echo 2. Espera a que se inicie completamente
        echo 3. Ejecuta este script de nuevo
        pause
        exit /b 1
    )
)

echo Docker Desktop corriendo - OK

echo.
echo [6/6] Configurando proyecto...

:: Crear directorios necesarios si no existen
if not exist "docker\grafana\data" mkdir "docker\grafana\data"
if not exist "docker\influxdb\data" mkdir "docker\influxdb\data"

echo Configuracion completada - OK

echo.
echo ========================================
echo   INSTALACION COMPLETADA
echo ========================================
echo.
echo El proyecto Medusse IoT esta listo para usar:
echo.
echo 1. Verificar sistema:     verificar.bat
echo 2. Ejecutar proyecto:     demo.bat
echo 3. Acceder dashboard:     http://localhost:3000
echo    Usuario: admin
echo    Password: medusse2025
echo.
echo Presiona cualquier tecla para ejecutar la verificacion...
pause >nul

echo.
echo Ejecutando verificacion del sistema...
call verificar.bat

echo.
echo ¿Quieres ejecutar la demo ahora? (S/N)
set /p ejecutar_demo=
if /i "%ejecutar_demo%"=="S" (
    echo.
    echo Iniciando demo del proyecto...
    call demo.bat
)

echo.
echo Instalacion y configuracion completadas.
echo El proyecto Medusse IoT esta listo para usar.
pause