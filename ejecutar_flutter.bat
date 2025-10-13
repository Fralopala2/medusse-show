@echo off
title APP FLUTTER MEDUSSE IoT
color 0B

echo ==========================================
echo   APP FLUTTER MEDUSSE IoT
echo ==========================================
echo.
echo NUEVA CARACTERÍSTICA: Configuración dinámica del servidor
echo - Ahora puedes cambiar la IP/URL del servidor desde la app
echo - Ve a Configuración (icono de engranaje) para cambiar URLs
echo - ¡Ya no necesitas recompilar cuando cambie la IP!
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