@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cd /d "%~dp0"

echo [Medusse] Iniciando sistema completo (sin terminales)...

docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker no instalado
    exit /b 1
)

docker info >nul 2>&1
if not errorlevel 1 goto docker_ok

echo [INFO] Iniciando Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe" >nul 2>&1
if errorlevel 1 (
    start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" >nul 2>&1
)

set /a contador=0

:wait_docker
timeout /t 10 /nobreak >nul
docker info >nul 2>&1
if not errorlevel 1 goto docker_ok

set /a contador+=1
if !contador! lss 12 goto wait_docker

echo [ERROR] Docker Desktop no disponible
echo Abre Docker Desktop manualmente y vuelve a ejecutar iniciar.bat
exit /b 1

:docker_ok

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no instalado
    exit /b 1
)

python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no instalado
    exit /b 1
)

if not exist logs mkdir logs

echo [1/4] Docker compose...
docker compose -f docker/docker-compose.yml up -d
if errorlevel 1 exit /b 1

docker ps | findstr "medusse_grafana" | findstr "Up" >nul 2>&1
if errorlevel 1 (
    echo [WAIT] Servicios Docker inicializandose...
    timeout /t 15 /nobreak >nul
)

echo [2/4] API REST (segundo plano)...
curl -s http://localhost:3001/health >nul 2>&1
if errorlevel 1 (
    wscript //nologo "%~dp0scripts\start-api.vbs"
    timeout /t 5 /nobreak >nul
)

echo [3/4] Web Next.js (segundo plano)...
curl -s http://localhost:3003 >nul 2>&1
if errorlevel 1 (
    wscript //nologo "%~dp0scripts\start-web.vbs"
)

echo [4/4] Simulador (segundo plano)...
wscript //nologo "%~dp0scripts\start-simulator.vbs"

echo [WAIT] Esperando servicios web...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\wait-for-url.ps1"
if errorlevel 1 (
    echo [WARN] Algunos servicios tardan mas. Abriendo portal igualmente...
)

start http://localhost:3003/control
exit /b 0
