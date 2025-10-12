@echo off
title Configurar Firewall para Medusse IoT
color 0B

echo ==========================================
echo   CONFIGURAR FIREWALL MEDUSSE IoT
echo ==========================================
echo.
echo Este script configura el firewall de Windows
echo para permitir conexiones a la API Medusse
echo.
echo IMPORTANTE: Ejecutar como ADMINISTRADOR
echo.

REM Verificar permisos de administrador
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Ejecutandose como administrador
) else (
    echo [ERROR] Este script requiere permisos de administrador
    echo.
    echo Solucion:
    echo 1. Click derecho en este archivo
    echo 2. Seleccionar "Ejecutar como administrador"
    echo.
    pause
    exit /b 1
)

echo.
echo [1/3] Configurando regla de firewall para puerto 3001...
netsh advfirewall firewall add rule name="Medusse API Port 3001" dir=in action=allow protocol=TCP localport=3001
if %errorLevel% == 0 (
    echo [OK] Puerto 3001 configurado
) else (
    echo [ERROR] No se pudo configurar puerto 3001
)

echo.
echo [2/3] Configurando regla de firewall para puerto 3002...
netsh advfirewall firewall add rule name="Medusse WebSocket Port 3002" dir=in action=allow protocol=TCP localport=3002
if %errorLevel% == 0 (
    echo [OK] Puerto 3002 configurado
) else (
    echo [ERROR] No se pudo configurar puerto 3002
)

echo.
echo [3/3] Verificando configuracion...
netsh advfirewall firewall show rule name="Medusse API Port 3001"
netsh advfirewall firewall show rule name="Medusse WebSocket Port 3002"

echo.
echo ==========================================
echo   CONFIGURACION COMPLETADA
echo ==========================================
echo.
echo Ahora tu movil deberia poder conectarse a:
echo - API: http://192.168.1.128:3001
echo - WebSocket: ws://192.168.1.128:3002
echo.
echo Para probar desde el movil:
echo 1. Asegurate de estar en la misma red WiFi
echo 2. Abre la app Medusse IoT
echo 3. Deberia conectarse automaticamente
echo.
pause