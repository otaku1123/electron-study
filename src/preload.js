const {
    contextBridge,
    ipcRenderer,
} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    showMessageBox: async(options) => {
        console.log(options.title);
        const result = await ipcRenderer.invoke(
            'showMessageBox', options
        );
        return result;
    },
    showMessageBoxSync: async(options) => {
        console.log(options.title);
        const result = await ipcRenderer.invoke(
            'showMessageBoxSync',
            options
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