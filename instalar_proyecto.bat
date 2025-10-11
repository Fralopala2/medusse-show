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
echo - Node.js (para API REST)
echo - Configuracion completa del ecosistema IoT
echo.
echo ECOSISTEMA INCLUYE:
echo - Dashboard Grafana (puerto 3000)
echo - API REST + WebSocket (puertos 3001/3002)
echo - App Flutter multiplataforma
echo - Pipeline completo MQTT -> InfluxDB
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

echo.
echo [1/8] Verificando sistema...

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
echo [2/8] Verificando Docker Desktop...

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
echo [3/8] Verificando Python...

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
echo [4/8] Verificando Node.js (para API REST)...

node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js no encontrado. Descargando Node.js...
    echo.
    echo INSTRUCCIONES:
    echo 1. Se abrira la pagina de descarga de Node.js
    echo 2. Descarga e instala Node.js LTS
    echo 3. Reinicia esta terminal y ejecuta este script de nuevo
    echo.
    start https://nodejs.org/
    pause
    
    :: Verificar de nuevo
    node --version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Node.js sigue sin estar disponible
        echo Instala Node.js manualmente y ejecuta este script de nuevo
        pause
        exit /b 1
    )
)

node --version
echo Node.js encontrado - OK

echo.
echo [5/8] Verificando Flutter SDK (opcional)...

flutter --version >nul 2>&1
if errorlevel 1 (
    echo Flutter no encontrado - App movil no estara disponible
    echo Para instalar Flutter: https://flutter.dev/docs/get-started/install
    echo (Opcional - puedes continuar sin Flutter)
    echo.
) else (
    flutter --version | findstr "Flutter"
    echo Flutter encontrado - OK
)

echo.
echo [6/8] Instalando dependencias Python...

python -m pip install --upgrade pip
python -m pip install paho-mqtt requests

echo Dependencias instaladas - OK

echo.
echo [7/8] Verificando servicios Docker...

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
echo [8/8] Configurando proyecto...

:: Crear directorios necesarios si no existen
if not exist "docker\grafana\data" mkdir "docker\grafana\data"
if not exist "docker\influxdb\data" mkdir "docker\influxdb\data"

:: Instalar dependencias API si Node.js esta disponible
node --version >nul 2>&1
if not errorlevel 1 (
    echo Instalando dependencias API REST...
    cd api
    npm install >nul 2>&1
    cd ..
    echo Dependencias API instaladas - OK
)

echo Configuracion completada - OK

echo.
echo ========================================
echo   INSTALACION COMPLETADA
echo ========================================
echo.
echo El ecosistema Medusse IoT esta listo para usar:
echo.
echo OPCIONES DE EJECUCION:
echo 1. Verificar sistema:        verificar.bat
echo 2. Solo Dashboard Grafana:   demo.bat
echo 3. Sistema completo:         sistema_completo.bat
echo 4. Solo API REST:            iniciar_api.bat
echo 5. Solo App Flutter:         ejecutar_flutter.bat
echo.
echo ACCESO WEB:
echo - Grafana: http://localhost:3000 (admin/medusse2025)
echo - API REST: http://localhost:3001
echo - InfluxDB: http://localhost:8086 (admin/medusse2025)
echo.
echo Presiona cualquier tecla para ejecutar la verificacion...
pause >nul

echo.
echo Ejecutando verificacion del sistema...
call verificar.bat

echo.
echo ¿Que quieres ejecutar ahora?
echo 1. Solo Dashboard Grafana (demo.bat)
echo 2. Sistema completo (sistema_completo.bat)
echo 3. Nada (salir)
echo.
set /p opcion=Elige opcion (1/2/3): 

if "%opcion%"=="1" (
    echo.
    echo Iniciando Dashboard Grafana...
    call demo.bat
) else if "%opcion%"=="2" (
    echo.
    echo Iniciando sistema completo...
    call sistema_completo.bat
) else (
    echo.
    echo Puedes ejecutar el sistema cuando quieras con:
    echo - demo.bat (solo Grafana)
    echo - sistema_completo.bat (ecosistema completo)
)

echo.
echo Instalacion y configuracion completadas.
echo El ecosistema Medusse IoT esta listo para usar.
echo.
echo RECORDATORIO:
echo - Para sistema completo: sistema_completo.bat
echo - Para solo Grafana: demo.bat
echo - Para verificar: verificar.bat
pause