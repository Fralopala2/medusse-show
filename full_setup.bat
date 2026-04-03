@echo off
title MEDUSSE IoT - FULL SETUP
color 0A

echo ========================================
echo   MEDUSSE IoT - CONFIGURACION COMPLETA
echo ========================================
echo.

echo [1/4] Instalando dependencias de Python...
python -m pip install paho-mqtt requests
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias de Python
) else (
    echo ✅ Python OK
)

echo.
echo [2/4] Instalando dependencias de la API (Node.js)...
cd api
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias de la API
) else (
    echo ✅ API Node.js OK
)
cd ..

echo.
echo [3/4] Instalando dependencias de la WEB (Node.js)...
cd web
call npm install
if %errorlevel% neq 0 (
    echo ❌ Error instalando dependencias de la WEB
) else (
    echo ✅ WEB Node.js OK
)
cd ..

echo.
echo [4/4] Iniciando infraestructura Docker...
docker compose -f docker/docker-compose.yml up -d
if %errorlevel% neq 0 (
    echo ❌ Error iniciando Docker. Asegurate de que Docker Desktop este abierto.
) else (
    echo ✅ Docker OK
)

echo.
echo ========================================
echo   CONFIGURACION FINALIZADA
echo ========================================
echo.
echo Ahora puedes ejecutar 'medusse.bat' para iniciar el sistema.
echo.
pause
