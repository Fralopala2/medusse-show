@echo off
title SISTEMA COMPLETO MEDUSSE IoT
color 0B

echo ==========================================
echo   SISTEMA COMPLETO MEDUSSE IoT
echo ==========================================
echo.
echo Este script inicia el ecosistema completo:
echo - Servicios Docker (MQTT, InfluxDB, Grafana, MySQL)
echo - Simulador de datos
echo - API REST (puerto 3001)
echo - Web Next.js (puerto 3003)
echo - Dashboard Grafana (puerto 3000)
echo.
echo NOTA: La app Flutter debe ejecutarse manualmente
echo       con: flutter run -d windows en medusse_app/
echo.

REM Verificar Docker
echo [1/5] Verificando Docker

REM Verificar si Docker esta instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker no esta instalado
    echo    Instalar Docker Desktop desde: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo [OK] Docker instalado

REM Verificar si Docker Desktop esta corriendo
echo Verificando si Docker Desktop esta corriendo
docker info >nul 2>&1
if errorlevel 1 (
    echo [WARN] Docker Desktop no esta corriendo
    echo [INFO] Intentando iniciar Docker Desktop
    
    REM Intentar iniciar Docker Desktop
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe" >nul 2>&1
    if errorlevel 1 (
        REM Intentar ruta alternativa
        start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" >nul 2>&1
    )
    
    echo [WAIT] Esperando a que Docker Desktop se inicie (puede tardar 1-2 minutos)
    echo    Veras el icono de Docker en la bandeja del sistema cuando este listo
    
    REM Esperar hasta que Docker este listo (maximo 2 minutos)
    set /a contador=0
    :wait_docker
    timeout /t 10 >nul
    docker info >nul 2>&1
    if not errorlevel 1 goto docker_ready
    
    set /a contador+=1
    if %contador% lss 12 (
        echo    Esperando (%contador%/12)
        goto wait_docker
    )
    
    echo [ERROR] Docker Desktop no se pudo iniciar automaticamente
    echo.
    echo SOLUCION MANUAL:
    echo 1. Abre Docker Desktop manualmente desde el menu de inicio
    echo 2. Espera a que aparezca "Docker Desktop is running" 
    echo 3. Ejecuta este script de nuevo
    echo.
    pause
    exit /b 1
    
    :docker_ready
    echo [OK] Docker Desktop iniciado correctamente
) else (
    echo [OK] Docker Desktop ya esta corriendo
)

REM Verificar Node.js para API
echo.
echo [2/5] Verificando Node.js para API
node --version >nul 2>&1
if errorlevel 1 (
    echo [WARN] Node.js no encontrado - API REST no estara disponible
    echo    Instalar desde: https://nodejs.org/
    set API_AVAILABLE=false
) else (
    echo [OK] Node.js OK
    set API_AVAILABLE=true
)

REM Verificar Python para simulador
echo.
echo [3/5] Verificando Python para simulador
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no encontrado
    echo    Instalar desde Microsoft Store
    pause
    exit /b 1
)
echo [OK] Python OK

REM Iniciar servicios Docker
echo.
echo [4/5] Iniciando servicios Docker
echo Iniciando contenedores: MQTT, InfluxDB, Grafana, Telegraf

docker compose -f docker/docker-compose.yml up -d
if errorlevel 1 (
    echo [ERROR] No se pudieron iniciar los servicios Docker
    echo.
    echo POSIBLES SOLUCIONES:
    echo 1. Verificar que Docker Desktop este corriendo
    echo 2. Ejecutar: docker compose -f docker/docker-compose.yml down
    echo 3. Ejecutar: docker system prune -f
    echo 4. Intentar de nuevo
    echo.
    pause
    exit /b 1
)

echo [OK] Contenedores iniciados
echo [WAIT] Esperando a que los servicios esten listos (30 segundos)
echo    - InfluxDB inicializandose
echo    - Grafana configurandose
echo    - Telegraf conectandose

timeout /t 30 >nul

echo Verificando estado de contenedores
docker compose -f docker/docker-compose.yml ps

REM Abrir interfaces web
echo.
echo [5/5] Iniciando servicios web

if "%API_AVAILABLE%"=="true" (
    echo [API] Verificando si API ya esta corriendo
    curl -s http://localhost:3001/health >nul 2>&1
    if errorlevel 1 (
        echo [API] Iniciando API REST
        cd api
        start "Medusse API" cmd /k "node server.js"
        cd ..
        timeout /t 5 >nul
        echo [API] API REST: http://localhost:3001
    ) else (
        echo [API] API ya esta corriendo en http://localhost:3001
    )
    
    echo [WEB] Verificando si Web ya esta corriendo
    curl -s http://localhost:3003 >nul 2>&1
    if errorlevel 1 (
        echo [WEB] Iniciando Web Next.js
        cd web
        start "Medusse Web" cmd /k "npm run dev"
        cd ..
        timeout /t 15 >nul
        echo [WEB] Web Next.js: http://localhost:3003
    ) else (
        echo [WEB] Web ya esta corriendo en http://localhost:3003
    )
    
    echo [NAVEGADOR] Abriendo Web Next.js
    start http://localhost:3003
)

echo.
echo ========================================
echo   SISTEMA INICIADO CORRECTAMENTE
echo ========================================
echo.
echo [GRAFANA] Dashboard: http://localhost:3000
echo    Usuario: admin / Contrasena: medusse2025
echo.
if "%API_AVAILABLE%"=="true" (
    echo [API] API REST: http://localhost:3001
    echo [WS]  WebSocket: ws://localhost:3002
    echo [WEB] Web Next.js: http://localhost:3003
    echo    Login: http://localhost:3003/login
    echo.
)
echo [INFO] App Flutter no se inicia automaticamente
echo       Para ejecutarla: cd medusse_app ^&^& flutter run -d windows
echo.
echo [STOP] Para detener todo: ejecutar detener.bat
echo.
echo [SIMULADOR] Iniciando datos de sensores
echo Presiona Ctrl+C para detener
echo.

REM Ejecutar simulador (bloquea hasta Ctrl+C)
python arduino/medusse_simulator.py

echo.
echo [INFO] Simulador detenido
echo.
echo Para detener todo el sistema:
echo detener.bat
pause