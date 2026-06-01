# Compila APK release usando Flutter en C:\src\flutter
$ErrorActionPreference = "Stop"
$flutterBin = "C:\src\flutter\bin"

if (-not (Test-Path "$flutterBin\flutter.bat")) {
    Write-Error "No se encuentra Flutter en $flutterBin. Instala con: git clone https://github.com/flutter/flutter.git -b stable C:\src\flutter"
    exit 1
}

$env:Path = "$flutterBin;" + $env:Path
Set-Location $PSScriptRoot

Write-Host "[1/2] flutter pub get..." -ForegroundColor Cyan
& "$flutterBin\flutter.bat" pub get
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "[2/2] flutter build apk --release..." -ForegroundColor Cyan
& "$flutterBin\flutter.bat" build apk --release
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "APK:" -ForegroundColor Green
Write-Host "  $PSScriptRoot\build\app\outputs\flutter-apk\app-release.apk"
