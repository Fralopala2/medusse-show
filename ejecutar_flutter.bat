@echo off
echo 📱 Iniciando App Flutter Medusse...
echo.

REM Verificar que Flutter esté instalado
flutter --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Flutter no está instalado
    echo    Instalar desde: https://flutter.dev/docs/get-started/install
    pause
    exit /b 1
)

REM Verificar que la API esté corriendo
echo 🔍 Verificando API REST...
curl -s http://localhost:3001/health >nul 2>&1
if errorlevel 1 (
    echo ⚠️  API REST no está corriendo en puerto 3001
    echo    Ejecutar: iniciar_api.bat
    echo.
    echo ❓ ¿Quieres continuar de todas formas? (s/n)
    set /p continuar=
    if /i not "%continuar%"=="s" (
        echo 👋 Cancelado por usuario
        pause
        exit /b 1
    )
)

REM Ir al directorio de Flutter
cd /d "%~dp0medusse_app"

REM Verificar dependencias
if not exist "pubspec.lock" (
    echo 📦 Instalando dependencias Flutter...
    flutter pub get
    echo.
)

echo ✅ Iniciando app Flutter...
echo    Dispositivos disponibles:
flutter devices --machine | findstr "chrome\|windows\|android" >nul 2>&1
if not errorlevel 1 (
    flutter devices
    echo.
)

echo 🚀 Ejecutando en modo debug...
echo    La app se abrirá automáticamente
echo    Presiona 'r' para hot reload
echo    Presiona 'q' para salir
echo.

REM Ejecutar Flutter
flutter run