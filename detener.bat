@echo off
title Detener Medusse IoT
color 0C

echo ========================================
echo   DETENER MEDUSSE IoT
echo ========================================
echo.

echo [1/4] Deteniendo procesos Node.js (API y Web)
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Procesos Node.js detenidos
) else (
    echo [INFO] No habia procesos Node.js corriendo
)

echo.
echo [2/4] Deteniendo procesos Python (Simulador)
taskkill /F /IM python.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Procesos Python detenidos
) else (
    echo [INFO] No habia procesos Python corriendo
)

echo.
echo [3/4] Deteniendo servicios Docker
docker compose -f docker/docker-compose.yml down
if %errorlevel% equ 0 (
    echo [OK] Servicios Docker detenidos
) else (
    echo [WARN] Error al detener servicios Docker
)

echo.
echo [4/4] Limpiando puertos ocupados
netstat -ano | findstr ":3001" >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARN] Puerto 3001 aun ocupado
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

netstat -ano | findstr ":3003" >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARN] Puerto 3003 aun ocupado
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3003"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo.
echo ========================================
echo   SISTEMA DETENIDO
echo ========================================
echo.
echo Todos los servicios han sido detenidos.
echo Puedes volver a iniciar con: sistema_completo.bat
echo.
pause
