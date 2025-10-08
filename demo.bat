@echo off
title DEMOSTRACION PROYECTO MEDUSSE IoT
color 0A

echo ========================================
echo   DEMOSTRACION PROYECTO MEDUSSE IoT
echo ========================================
echo.
echo [1/4] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker no esta instalado o no esta corriendo
    echo Por favor, inicia Docker Desktop y vuelve a ejecutar
    pause
    exit /b 1
)
echo Docker OK

echo.
echo [2/4] Iniciando servicios Docker...
cd docker
echo Ejecutando start_stack.py...
start /B python start_stack.py
echo Esperando 15 segundos para que los servicios se inicien...
timeout /t 15 >nul

echo.
echo [3/4] Abriendo dashboard Grafana...
echo URL: http://localhost:3000
echo Usuario: admin
echo Password: medusse2025
start http://localhost:3000
timeout /t 5 >nul

echo.
echo [4/4] Iniciando gateway con simuladores...
echo Presiona Ctrl+C para detener la demostracion
echo.
cd ..\gateway
python medusse_gateway.py --broker localhost --source simulator

echo.
echo Demostracion finalizada.
pause