const {
    contextBridge,
    ipcRenderer,
} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    showMessageBox: async(title, message) => {
        console.log(title);
        // dialog.showMessageBox(null);
        const result = await ipcRenderer.invoke(
            'showMessageBox', {
                title: title,
                message: message,
            }
        );
        return result;
    },
    showOpenDialog: async() => {
        const result = await ipcRenderer.invoke('showOpenDialog');
        return result;
    },
    showErrorBox: async(title, message) => {
        const result = await ipcRenderer.invoke('showErrorBox', {
            title: title,
            message: message,
        });
        return result;
    }
})