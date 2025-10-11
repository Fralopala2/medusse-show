@echo off
title VERIFICACION RAPIDA PROYECTO MEDUSSE
color 0B

echo ========================================
echo   VERIFICACION RAPIDA PROYECTO MEDUSSE
echo ========================================
echo.
echo Verificacion basica (sin timeouts largos)
echo.

echo [1/5] Verificando Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python: NO ENCONTRADO
) else (
    python --version
    echo [OK] Python: OK
)

echo.
echo [2/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js: NO ENCONTRADO
) else (
    node --version
    echo [OK] Node.js: OK
)

echo.
echo [3/5] Verificando Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker: NO ENCONTRADO
) else (
    docker --version
    echo [OK] Docker: OK
)

echo.
echo [4/5] Verificando Flutter (rapido)...
where flutter >nul 2>&1
if errorlevel 1 (
    echo [WARN] Flutter: NO ENCONTRADO (opcional)
) else (
    echo [OK] Flutter: ENCONTRADO
)

echo.
echo [5/5] Verificando archivos proyecto...
if exist "arduino\medusse_simulator.py" (
    echo [OK] Simulador: OK
) else (
    echo [ERROR] Simulador: NO ENCONTRADO
)

if exist "api\server.js" (
    echo [OK] API REST: OK
) else (
    echo [ERROR] API REST: NO ENCONTRADA
)

if exist "medusse_app\pubspec.yaml" (
    echo [OK] App Flutter: OK
) else (
    echo [ERROR] App Flutter: NO ENCONTRADA
)

echo.
echo ========================================
echo   VERIFICACION RAPIDA COMPLETADA
echo ========================================
echo.
echo OPCIONES DE EJECUCION:
echo.
echo [RUN] sistema_completo.bat  - Ecosistema completo
echo [WEB] demo.bat              - Solo Dashboard Grafana  
echo [API] iniciar_api.bat       - Solo API REST
echo [APP] ejecutar_flutter.bat  - Solo App Flutter
echo [CHK] verificar.bat         - Verificacion completa (mas lenta)
echo.
pause