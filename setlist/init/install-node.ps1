# https://spin.atomicobject.com/2018/06/18/windows-node-js/

#if permission is not set
Set-ExecutionPolicy RemoteSigned -scope CurrentUser

#download and install 7zip and scoop
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

#download and install nodejs with nvm for version management
scoop install nodejs nvm