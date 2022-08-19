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
    // console.log(args);

    const nativeImage = require('electron').nativeImage;
    const imageInstance = nativeImage.createFromPath('./assets/icon.png');
    // const imageInstance = nativeImage.createEmpty();
    return dialog.showMessageBox(mainWindow, {
        type: args.type,
        title: args.title,
        message: args.message,
        detail: args.detail,
        icon: imageInstance
    })
        .then(result => {
            return result;
        });
});

ipc.handle('showMessageBoxSync', (event, args) => {
    return dialog.showMessageBoxSync(mainWindow, args)
        .then(result => {
            return result;
        });
});

ipc.handle('showOpenDialog', async(event, args) => {
    return dialog.showOpenDialog(mainWindow, {
            title: 'test',
            properties: ['openFile'],
        })
        .then(result => {
            if (result.canceled) return '';

            return result.filePaths[0];
        })
});

ipc.handle('showErrorBox', async(event, args) => {
    return dialog.showErrorBox(args.title, args.message);
});