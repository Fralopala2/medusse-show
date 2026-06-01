param(
    [int]$TimeoutSec = 120,
    [int]$IntervalSec = 2
)

$pending = @(
    "http://localhost:4001/health",
    "http://localhost:4003"
)

$deadline = (Get-Date).AddSeconds($TimeoutSec)

while ($pending.Count -gt 0 -and (Get-Date) -lt $deadline) {
    $stillPending = @()

    foreach ($url in $pending) {
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                Write-Host "[OK] $url"
            } else {
                Write-Host "[WAIT] $url"
                $stillPending += $url
            }
        } catch {
            Write-Host "[WAIT] $url"
            $stillPending += $url
        }
    }

    $pending = $stillPending

    if ($pending.Count -gt 0) {
        Start-Sleep -Seconds $IntervalSec
    }
}

if ($pending.Count -gt 0) {
    Write-Warning "Timeout esperando: $($pending -join ', ')"
    exit 1
}

exit 0
