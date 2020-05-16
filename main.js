const { ipcMain, app, BrowserWindow, mainWindow } = require('electron');

const path = require('path')

let pluginName
switch (process.platform) {
  case 'darwin':
    pluginName = 'pepflashplayer.plugin'
    pluginVersion = ''
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    pluginVersion = ''
    break
}
switch (process.arch) {
  case 'x32':
    pluginName = 'pepflashplayer_32.dll'
    pluginVersion = '28.0.0.137'
    break
    case 'x64':
    pluginName = 'pepflashplayer_64.dll'
    pluginVersion = '29.0.0.171'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

app.commandLine.appendSwitch('ppapi-flash-version', pluginVersion)

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    maximizable: true,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`);
  //win.webContents.openDevTools();

})

ipcMain.on('exit', () => {
   app.exit(0)
 });
app.on('window-all-closed', () => {
  app.quit()
})
