param(
    [int]$TimeoutSec = 120,
    [int]$IntervalSec = 2
)

$urls = @(
    "http://localhost:3001/health",
    "http://localhost:3003"
)

$deadline = (Get-Date).AddSeconds($TimeoutSec)
$pending = [System.Collections.Generic.List[string]]::new($urls)

while ($pending.Count -gt 0 -and (Get-Date) -lt $deadline) {
    foreach ($url in @($pending.ToArray())) {
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                Write-Host "[OK] $url"
                [void]$pending.Remove($url)
            }
        } catch {
            Write-Host "[WAIT] $url"
        }
    }

    if ($pending.Count -gt 0) {
        Start-Sleep -Seconds $IntervalSec
    }
}

if ($pending.Count -gt 0) {
    Write-Warning "Timeout esperando: $($pending -join ', ')"
    exit 1
}

exit 0
