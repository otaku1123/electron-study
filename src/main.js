const {
    app,
    BrowserWindow,
    dialog
} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain;

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('./src/index.html');
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

ipc.handle('showMessageBox', (event, args) => {
    console.log('Main showMessageBox');

    const response = dialog.showMessageBox(mainWindow, {
        title: 'message box title',
        message: args.data,
    });
});