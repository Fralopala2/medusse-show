@echo off
title COMPILAR APP FLUTTER - MEDUSSE
color 0B

echo ========================================
echo   COMPILANDO APP FLUTTER - MEDUSSE
echo ========================================
echo.

cd medusse_app

echo [1/3] Obteniendo dependencias...
flutter pub get
if errorlevel 1 (
    echo ❌ ERROR: No se pudieron obtener las dependencias
    pause
    exit /b 1
)

echo.
echo [2/3] Analizando código...
flutter analyze
if errorlevel 1 (
    echo ⚠️  WARN: Hay problemas de análisis, pero continuando...
)

echo.
echo [3/3] Compilando (verificación)...
flutter build apk --debug
if errorlevel 1 (
    echo ❌ ERROR: No se pudo compilar la app
    pause
    exit /b 1
)

echo.
echo ✅ COMPILACIÓN EXITOSA
echo.
echo La APK de debug está en: build\app\outputs\flutter-apk\app-debug.apk
echo.
echo Para instalar en dispositivo: flutter install
echo Para ejecutar en modo desarrollo: flutter run
echo.
pause