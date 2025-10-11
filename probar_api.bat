@echo off
echo 🧪 Probando Medusse API REST...
echo.

REM Verificar que Node.js esté instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    pause
    exit /b 1
)

REM Ir al directorio de la API
cd /d "%~dp0api"

REM Verificar que las dependencias estén instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
    echo.
)

echo 🔍 Ejecutando pruebas de la API...
echo    Asegúrate de que la API esté corriendo en puerto 3001
echo.

REM Ejecutar script de pruebas
node test-api.js

echo.
echo ✅ Pruebas completadas
pause