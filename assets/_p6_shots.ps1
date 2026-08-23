param([string]$Frags = 'atlas', [string]$Kind = 'd', [int]$W = 1440, [int]$H = 1150)
$ErrorActionPreference = 'SilentlyContinue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path $chrome)) { $chrome = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe' }
$root = 'c:/Users/sreya/OneDrive/Desktop/echo/assets'
$log = New-Object System.Collections.Generic.List[string]

$list = $Frags -split ','
foreach ($f in $list) {
  $name = "_p6_$Kind-$f"
  $prof = "p6u-$Kind-$f"
  $url = if ($f -eq 'top') { 'file:///C:/Users/sreya/OneDrive/Desktop/echo/index.html' } else { "file:///C:/Users/sreya/OneDrive/Desktop/echo/index.html#$f" }
  Start-Process -FilePath $chrome -ArgumentList @(
    '--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
    '--allow-file-access-from-files','--disable-extensions','--disable-sync','--no-first-run',
    '--host-resolver-rules=MAP * ~NOTFOUND',
    "--user-data-dir=C:/Users/sreya/AppData/Local/Temp/$prof",
    "--window-size=$W,$H",
    '--virtual-time-budget=5000',
    "--screenshot=$root/$name.png",
    $url
  ) -PassThru -Wait -NoNewWindow | Out-Null
  $len = 0
  if (Test-Path "$root/$name.png") { $len = (Get-Item "$root/$name.png").Length }
  if ($len -gt 20000) { $log.Add("OK $name $len") } else { $log.Add("FAIL $name $len") }
}
Set-Content -Path "$root/_p6_last_run.txt" -Value ($log -join "`n") -Encoding UTF8
