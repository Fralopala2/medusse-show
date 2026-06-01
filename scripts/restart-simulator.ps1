# Reinicia el simulador MQTT (necesario tras docker compose restart)
$ErrorActionPreference = "SilentlyContinue"
$projectRoot = Split-Path -Parent $PSScriptRoot

$pidFile = Join-Path $projectRoot "logs\simulator.pid"
if (Test-Path $pidFile) {
    $oldPid = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($oldPid -match '^\d+$') {
        Stop-Process -Id ([int]$oldPid) -Force -ErrorAction SilentlyContinue
    }
}

Get-CimInstance Win32_Process -Filter "Name = 'python.exe'" |
    Where-Object { $_.CommandLine -match 'medusse_simulator' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Start-Sleep -Seconds 1
$vbs = Join-Path $projectRoot "scripts\start-simulator.vbs"
if (-not (Test-Path $vbs)) {
    Write-Error "No se encuentra start-simulator.vbs"
    exit 1
}

wscript //nologo $vbs
