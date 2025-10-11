@echo off
title APP FLUTTER MEDUSSE IoT
color 0B

echo ==========================================
echo   APP FLUTTER MEDUSSE IoT
echo ==========================================
echo.

cd /d "%~dp0medusse_app"

echo Ejecutando Flutter...
echo Controles: 'r'=reload, 'q'=salir
echo.

REM Intentar Android primero, luego web como fallback
echo Intentando Android primero...
flutter run
if errorlevel 1 (
    echo.
    echo Android fallo, intentando Chrome...
    flutter run -d chrome
)

echo.
echo Flutter cerrado
pause