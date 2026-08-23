$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$vp = if ($args.Count -ge 1) { $args[0] } else { '1280,900' }
$p = Start-Process -FilePath $chrome -ArgumentList @(
  '--headless=new','--disable-gpu','--no-sandbox','--allow-file-access-from-files',
  '--user-data-dir=C:/Users/sreya/AppData/Local/Temp/chrome-e2e-profile',
  "--window-size=$vp",
  '--virtual-time-budget=40000','--dump-dom',
  'file:///C:/Users/sreya/OneDrive/Desktop/echo/index.html?e2e=1'
) -RedirectStandardOutput 'assets\_e2e_dom.html' -RedirectStandardError 'assets\_e2e_err.txt' -PassThru -Wait -NoNewWindow

$title = (Select-String -Path 'assets\_e2e_dom.html' -Pattern '<title>([^<]+)</title>' | Select-Object -First 1).Matches[0].Groups[1].Value
$out = New-Object System.Collections.Generic.List[string]
$out.Add('TITLE: ' + $title)
$r = Select-String -Path 'assets\_e2e_dom.html' -Pattern 'id="e2e-results"[^>]*>([^<]+)<'
if ($r) {
  $json = [string]($r.Matches[0].Groups[1].Value -replace '&quot;', '"')
  $arr = ConvertFrom-Json -InputObject $json
  foreach ($item in $arr) {
    $mark = if ($item.p) { 'PASS' } else { 'FAIL' }
    $out.Add($mark + '  ' + $item.n + '  ' + $item.i)
  }
} else {
  $out.Add('NO RESULTS DIV')
}
Set-Content -Path 'assets\_e2e_report.txt' -Value $out -Encoding UTF8