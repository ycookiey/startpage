param(
    [string]$IndexPath = "$PSScriptRoot/../index.html",
    [string]$OutDir = "$PSScriptRoot/../favicons",
    [ValidateSet('google', 'duckduckgo')]
    [string]$Provider = 'google',
    [switch]$Force
)

$IndexPath = (Resolve-Path $IndexPath).Path
if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}
$OutDir = (Resolve-Path $OutDir).Path

$iconUrlTemplate = switch ($Provider) {
    'google' { 'https://www.google.com/s2/favicons?domain={0}&sz=64' }
    'duckduckgo' { 'https://icons.duckduckgo.com/ip3/{0}.ico' }
}

$hrefs = Select-String -Path $IndexPath -Pattern 'href="([^"]+)"' -AllMatches |
    ForEach-Object { $_.Matches.Groups[1].Value } |
    Sort-Object -Unique

$hosts = $hrefs |
    ForEach-Object {
        try {
            $u = [Uri]$_
            if ($u.Scheme -in @('http', 'https')) {
                $u.Host
            }
        } catch {}
    } |
    Sort-Object -Unique

foreach ($hostname in $hosts) {
    $ext = if ($Provider -eq 'duckduckgo') { '.ico' } else { '.png' }
    $outFile = Join-Path $OutDir "$hostname$ext"

    if ((Test-Path $outFile) -and -not $Force) {
        Write-Output "skip $hostname"
        continue
    }

    $url = $iconUrlTemplate -f $hostname
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing -Headers @{ 'User-Agent' = 'Mozilla/5.0' } -ErrorAction Stop | Out-Null
        Write-Output "ok $hostname"
    } catch {
        Write-Output "fail ${hostname}: $($_.Exception.Message)"
    }
}
