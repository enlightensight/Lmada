Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

$log = 'D:\projects\Lamda-CDMO\dev-server.log'
Remove-Item $log -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c npm run dev > dev-server.log 2>&1' -WorkingDirectory 'D:\projects\Lamda-CDMO' -WindowStyle Hidden -PassThru
Write-Output ('Started PID: ' + $proc.Id)
