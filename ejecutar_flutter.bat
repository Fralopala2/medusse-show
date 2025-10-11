@echo off
title APP FLUTTER MEDUSSE IoT
color 0B

echo ==========================================
echo   APP FLUTTER MEDUSSE IoT
echo ==========================================
echo.
echo Aplicacion movil para monitoreo IoT
echo - Tiempo real via WebSocket
echo - Graficos interactivos
echo - Sistema de alertas
echo - Multiplataforma
echo.

REM Verificar que Flutter este instalado
echo [1/5] Verificando Flutter SDK
where flutter >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Flutter no esta instalado
    echo.
    echo SOLUCION:
    echo 1. Descargar Flutter desde: https://flutter.dev/
    echo 2. Extraer en C:\flutter
    echo 3. Agregar C:\flutter\bin al PATH
    echo 4. Ejecutar: flutter doctor
    echo.
    pause
    exit /b 1
)
echo [OK] Flutter SDK encontrado

REM Verificar Flutter doctor (rapido)
echo Verificando configuracion Flutter
flutter doctor --version >nul 2>&1
if errorlevel 1 (
    echo [WARN] Problemas con configuracion Flutter
    echo    Ejecutar: flutter doctor
) else (
    echo [OK] Flutter configurado correctamente
)

REM Verificar que la API este corriendo (opcional)
echo.
echo [2/5] Verificando API REST (opcional)
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/health' -TimeoutSec 2 -UseBasicParsing; Write-Host '[OK] API REST disponible' } catch { Write-Host '[WARN] API REST no disponible - app funcionara con datos limitados' }" 2>nul

REM Verificar servicios Docker (opcional)
echo.
echo [3/5] Verificando servicios Docker (opcional)
docker ps --format "table {{.Names}}\t{{.Status}}" 2>nul | findstr "medusse" >nul 2>&1
if errorlevel 1 (
    echo [WARN] Servicios Docker no corriendo
    echo    Para datos completos ejecutar: sistema_completo.bat
) else (
    echo [OK] Servicios Docker activos
)

REM Ir al directorio de Flutter
echo.
echo [4/5] Preparando proyecto Flutter
cd /d "%~dp0medusse_app"

REM Verificar que estamos en el directorio correcto
if not exist "pubspec.yaml" (
    echo [ERROR] Directorio de proyecto Flutter no encontrado
    echo    Archivo pubspec.yaml no existe
    echo    Verifica la estructura del proyecto
    pause
    exit /b 1
)
echo [OK] Proyecto Flutter encontrado

REM Verificar e instalar dependencias
echo Verificando dependencias
if not exist "pubspec.lock" (
    echo [INFO] Instalando dependencias Flutter (puede tardar 1-2 minutos)
    flutter pub get
    if errorlevel 1 (
        echo [ERROR] Fallo la instalacion de dependencias
        echo.
        echo POSIBLES SOLUCIONES:
        echo 1. Verificar conexion a internet
        echo 2. Ejecutar: flutter clean
        echo 3. Ejecutar: flutter pub get
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas correctamente
) else (
    echo [OK] Dependencias ya instaladas
    
    REM Verificar si necesita actualizar dependencias
    echo Verificando actualizaciones
    flutter pub deps >nul 2>&1
    if errorlevel 1 (
        echo [WARN] Posibles problemas con dependencias
        echo    Considera ejecutar: flutter pub get
    )
)

echo.
echo [5/5] Iniciando aplicacion Flutter
echo.

REM Mostrar dispositivos disponibles
echo [INFO] Dispositivos disponibles:
flutter devices --machine >nul 2>&1
if errorlevel 1 (
    echo [WARN] No se pudieron detectar dispositivos
    echo    Flutter intentara usar el dispositivo por defecto
) else (
    flutter devices 2>nul | findstr -v "No devices" | findstr -v "^$"
)

echo.
echo ==========================================
echo   INICIANDO APLICACION
echo ==========================================
echo.
echo [RUN] Ejecutando Flutter en modo debug
echo.
echo CONTROLES DISPONIBLES:
echo - Presiona 'r' para hot reload (recarga rapida)
echo - Presiona 'R' para hot restart (reinicio completo)
echo - Presiona 'q' para salir de la aplicacion
echo - Presiona Ctrl+C para detener completamente
echo.
echo INTERFACES DISPONIBLES:
echo - API REST: http://localhost:3001 (si esta corriendo)
echo - Grafana: http://localhost:3000 (si esta corriendo)
echo.
echo La aplicacion se abrira automaticamente...
echo.

REM Ejecutar Flutter con manejo de errores
flutter run
if errorlevel 1 (
    echo.
    echo [ERROR] La aplicacion Flutter fallo al iniciar
    echo.
    echo DIAGNOSTICO:
    echo 1. Verificar que Flutter este correctamente instalado
    echo 2. Ejecutar: flutter doctor
    echo 3. Verificar que hay dispositivos disponibles
    echo 4. Intentar: flutter clean && flutter pub get
    echo.
    echo DISPOSITIVOS SUGERIDOS:
    echo - Chrome (Web): Instalar Google Chrome
    echo - Windows (Desktop): Habilitar desarrollo Windows
    echo - Android: Conectar dispositivo o usar emulador
    echo.
    pause
    exit /b 1
)

echo.
echo [INFO] Aplicacion Flutter cerrada
echo.
echo Para volver a ejecutar: ejecutar_flutter.bat
pause