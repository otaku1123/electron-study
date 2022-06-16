const {
    contextBridge,
    ipcRenderer,
} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    showMessageBox: async(title, body) => {
        console.log(title);
        // dialog.showMessageBox(null);
        await ipcRenderer.invoke(
            'showMessageBox', {
                data: "some data",
            }
        );
    }
})