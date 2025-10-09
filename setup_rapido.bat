@echo off
title SETUP RAPIDO - PROYECTO MEDUSSE IoT
color 0B

echo ========================================
echo   SETUP RAPIDO - PROYECTO MEDUSSE IoT
echo ========================================
echo.
echo Setup rapido para equipos con Docker ya instalado
echo.

echo [1/4] Verificando requisitos...

:: Verificar Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no encontrado
    echo.
    echo SOLUCION: Ejecuta instalar_proyecto.bat para instalacion completa
    pause
    exit /b 1
)
echo Docker: OK

:: Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no encontrado
    echo.
    echo SOLUCION: Instala Python desde Microsoft Store
    echo https://www.microsoft.com/store/productId/9NRWMJP3717K
    pause
    exit /b 1
)
echo Python: OK

echo.
echo [2/4] Instalando dependencias Python...
python -m pip install --quiet --upgrade pip
python -m pip install --quiet paho-mqtt requests
echo Dependencias: OK

echo.
echo [3/4] Verificando Docker Desktop...
docker info >nul 2>&1
if errorlevel 1 (
    echo Docker Desktop no esta corriendo
    echo Iniciando Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Esperando 30 segundos...
    timeout /t 30 >nul
    
    docker info >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Docker Desktop no se pudo iniciar
        echo Inicia Docker Desktop manualmente y ejecuta este script de nuevo
        pause
        exit /b 1
    )
)
echo Docker Desktop: OK

echo.
echo [4/4] Preparando proyecto...

:: Limpiar contenedores anteriores si existen
docker compose -f docker/docker-compose.yml down >nul 2>&1

:: Crear directorios necesarios
if not exist "docker\grafana\data" mkdir "docker\grafana\data" >nul 2>&1
if not exist "docker\influxdb\data" mkdir "docker\influxdb\data" >nul 2>&1

echo Proyecto preparado: OK

echo.
echo ========================================
echo   SETUP COMPLETADO
echo ========================================
echo.
echo Proyecto listo para usar:
echo.
echo   verificar.bat    - Verificar sistema
echo   demo.bat         - Ejecutar proyecto completo
echo.
echo Dashboard: http://localhost:3000 (admin/medusse2025)
echo.

echo ¿Ejecutar verificacion ahora? (S/N)
set /p verificar=
if /i "%verificar%"=="S" call verificar.bat

echo.
echo ¿Ejecutar demo ahora? (S/N)
set /p demo=
if /i "%demo%"=="S" call demo.bat

echo.
echo Setup completado. El proyecto esta listo.
pause