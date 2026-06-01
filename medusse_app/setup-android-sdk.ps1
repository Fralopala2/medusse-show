# Configura ANDROID_HOME y comprueba el SDK para Flutter (Windows)
$ErrorActionPreference = "Stop"
$sdkRoot = "$env:LOCALAPPDATA\Android\Sdk"
$flutterBin = "C:\src\flutter\bin\flutter.bat"

Write-Host "SDK esperado: $sdkRoot" -ForegroundColor Cyan

# Variables de usuario permanentes
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkRoot, "User")
[Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdkRoot, "User")
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$toAdd = @(
    "$sdkRoot\platform-tools",
    "$sdkRoot\cmdline-tools\latest\bin"
)
foreach ($p in $toAdd) {
    if ($userPath -notlike "*$p*") {
        $userPath = "$userPath;$p"
    }
}
[Environment]::SetEnvironmentVariable("Path", $userPath, "User")
$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot

if (-not (Test-Path $sdkRoot)) {
    Write-Host ""
    Write-Host "El SDK aun no existe. Instala Android Studio:" -ForegroundColor Yellow
    Write-Host "  winget install Google.AndroidStudio --accept-package-agreements --accept-source-agreements"
    Write-Host ""
    Write-Host "Luego abre Android Studio una vez:" -ForegroundColor Yellow
    Write-Host "  - Setup Wizard -> Standard -> Finish (descarga SDK)"
    Write-Host "  - O: More Actions -> SDK Manager -> Android SDK Platform 34+ y Build-Tools"
    Write-Host ""
    Write-Host "Vuelve a ejecutar: .\setup-android-sdk.ps1"
    exit 1
}

# local.properties para Gradle
$localProps = Join-Path $PSScriptRoot "android\local.properties"
$sdkDirEscaped = $sdkRoot -replace '\\', '\\\\'
@"
sdk.dir=$sdkDirEscaped
flutter.sdk=C:\\src\\flutter
"@ | Set-Content -Path $localProps -Encoding UTF8
Write-Host "Actualizado: android\local.properties" -ForegroundColor Green

if (-not (Test-Path "$sdkRoot\cmdline-tools\latest\bin\sdkmanager.bat")) {
    Write-Host "Instalando cmdline-tools..." -ForegroundColor Cyan
    & (Join-Path $PSScriptRoot "install-cmdline-tools.ps1")
}

$sdkmanager = @(
    "$sdkRoot\cmdline-tools\latest\bin\sdkmanager.bat",
    "$sdkRoot\cmdline-tools\bin\sdkmanager.bat"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($sdkmanager) {
    Write-Host "Instalando componentes SDK recomendados..." -ForegroundColor Cyan
    & $sdkmanager --sdk_root=$sdkRoot "platform-tools" "platforms;android-35" "build-tools;35.0.0" 2>&1
}

if (Test-Path $flutterBin) {
    Write-Host ""
    Write-Host "Aceptando licencias Android..." -ForegroundColor Cyan
    $sm = "$sdkRoot\cmdline-tools\latest\bin\sdkmanager.bat"
    if (Test-Path $sm) {
        1..50 | ForEach-Object { "y" } | & $sm --sdk_root=$sdkRoot --licenses | Out-Null
    } else {
        & $flutterBin doctor --android-licenses
    }
    Write-Host ""
    & $flutterBin doctor
} else {
    Write-Host "Flutter no encontrado en $flutterBin" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Listo. Cierra y abre la terminal, luego:" -ForegroundColor Green
Write-Host "  flutter build apk --release"
