const { ipcMain, app, BrowserWindow, mainWindow } = require('electron');

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    maximizable: true,
  })
  win.loadURL(`file://${__dirname}/index.html`);
  
  // commment this out when you are finished debugging ...
  win.webContents.openDevTools();

})

ipcMain.on('exit', () => {
   app.exit(0)
 });
app.on('window-all-closed', () => {
  app.quit()
})
