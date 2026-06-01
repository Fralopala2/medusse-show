# Instala Android SDK Command-line Tools si faltan (flutter doctor: cmdline-tools missing)
$ErrorActionPreference = "Stop"
$sdkRoot = "$env:LOCALAPPDATA\Android\Sdk"
$zipUrl = "https://dl.google.com/android/repository/commandlinetools-win-13114758_latest.zip"
$zip = "$env:TEMP\commandlinetools-win.zip"
$dest = "$sdkRoot\cmdline-tools\latest"
$sdkmanager = "$dest\bin\sdkmanager.bat"

if (Test-Path $sdkmanager) {
    Write-Host "cmdline-tools ya instaladas en $dest" -ForegroundColor Green
    exit 0
}

if (-not (Test-Path $sdkRoot)) {
    Write-Error "No existe $sdkRoot. Abre Android Studio y completa el asistente Standard primero."
}

Write-Host "Descargando command-line tools..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $zipUrl -OutFile $zip -UseBasicParsing

$extract = "$env:TEMP\cmdline-extract"
if (Test-Path $extract) { Remove-Item $extract -Recurse -Force }
New-Item -ItemType Directory -Path $extract | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $extract)

$src = Join-Path $extract "cmdline-tools"
if (-not (Test-Path $src)) { Write-Error "ZIP con estructura inesperada" }

New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
Copy-Item -Path $src -Destination $dest -Recurse -Force

$studioJbr = "C:\Program Files\Android\Android Studio\jbr"
if (Test-Path $studioJbr) {
    $env:JAVA_HOME = $studioJbr
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $studioJbr, "User")
}

Write-Host "Aceptando licencias SDK..." -ForegroundColor Cyan
1..50 | ForEach-Object { "y" } | & $sdkmanager --sdk_root=$sdkRoot --licenses | Out-Null

Write-Host "Listo. Ejecuta: flutter doctor" -ForegroundColor Green
