@echo off
echo ========================================
echo   Medusse IoT - Web Next.js
echo ========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado
    echo.
    echo Por favor, instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js instalado: 
node --version
echo.

REM Navegar a la carpeta web
cd web

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Error al instalar dependencias
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas correctamente
    echo.
)

echo ========================================
echo   Iniciando servidor de desarrollo
echo ========================================
echo.
echo [INFO] La web estara disponible en:
echo        http://localhost:3100
echo.
echo [NOTA] Grafana usa el puerto 3000, por eso usamos 3100
echo.
echo [INFO] Para detener el servidor: Ctrl+C
echo.
echo ========================================
echo.

REM Iniciar servidor en puerto 3100 para evitar conflicto con Grafana
set PORT=3100
call npm run dev

pause
