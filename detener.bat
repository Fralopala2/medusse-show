@echo off
set SILENT=0
if /i "%1"=="/silent" set SILENT=1

title Detener Medusse IoT
color 0C
cd /d "%~dp0"

if "%SILENT%"=="0" (
    echo ========================================
    echo   DETENER MEDUSSE IoT
    echo ========================================
    echo.
)

echo [1/4] Deteniendo procesos Node.js (API y Web)
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    if "%SILENT%"=="0" echo [OK] Procesos Node.js detenidos
) else (
    if "%SILENT%"=="0" echo [INFO] No habia procesos Node.js corriendo
)

if "%SILENT%"=="0" echo.
echo [2/4] Deteniendo procesos Python (Simulador)
taskkill /F /IM python.exe >nul 2>&1
if %errorlevel% equ 0 (
    if "%SILENT%"=="0" echo [OK] Procesos Python detenidos
) else (
    if "%SILENT%"=="0" echo [INFO] No habia procesos Python corriendo
)

if "%SILENT%"=="0" echo.
echo [3/4] Deteniendo servicios Docker
docker compose -f docker/docker-compose.yml down >nul 2>&1
if %errorlevel% equ 0 (
    if "%SILENT%"=="0" echo [OK] Servicios Docker detenidos
) else (
    if "%SILENT%"=="0" echo [WARN] Error al detener servicios Docker
)

if "%SILENT%"=="0" echo.
echo [4/4] Limpiando puertos ocupados
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3003"') do taskkill /F /PID %%a >nul 2>&1

if "%SILENT%"=="1" (
    powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Todos los servicios Medusse han sido detenidos.','Medusse IoT',[System.Windows.Forms.MessageBoxButtons]::OK,[System.Windows.Forms.MessageBoxIcon]::Information)" >nul 2>&1
    exit /b 0
)

echo.
echo ========================================
echo   SISTEMA DETENIDO
echo ========================================
echo.
echo Todos los servicios han sido detenidos.
echo Puedes volver a iniciar con: iniciar.bat
echo.
pause
