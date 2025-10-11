@echo off
title DEMOSTRACION PROYECTO MEDUSSE IoT
color 0A

echo ========================================
echo   DEMOSTRACION PROYECTO MEDUSSE IoT
echo ========================================
echo.
echo Sistema IoT completo con Dashboard Grafana
echo API REST disponible en: iniciar_api.bat
echo App Flutter disponible en: ejecutar_flutter.bat
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
echo Iniciando stack de contenedores...
docker compose -f docker/docker-compose.yml up -d
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
echo [4/4] Iniciando simulador de datos...
echo Presiona Ctrl+C para detener la demostracion
echo.
echo TIP: Ejecuta 'iniciar_api.bat' y 'ejecutar_flutter.bat' 
echo      en otras terminales para el sistema completo
echo.
python arduino/medusse_simulator.py

echo.
echo Demostracion finalizada.
echo.
echo Para sistema completo:
echo - API REST: iniciar_api.bat
echo - App Flutter: ejecutar_flutter.bat
pause