$ErrorActionPreference = 'Stop'

# Check if MongoDB is installed
$mongodbPath = 'C:\Program Files\MongoDB\Server'
if (Test-Path $mongodbPath) {
    Write-Host "MongoDB is already installed at $mongodbPath"
    exit 0
}

# Download MongoDB installer
$installerUrl = 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.0-signed.msi'
$installerPath = Join-Path $env:TEMP 'mongodb.msi'

Write-Host "Downloading MongoDB installer..."
Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath

# Install MongoDB
Write-Host "Installing MongoDB..."
Start-Process msiexec.exe -ArgumentList "/i `"$installerPath`" /quiet" -Wait

# Start MongoDB service
Write-Host "Starting MongoDB service..."
Start-Service MongoDB

Write-Host "MongoDB installation complete!"
