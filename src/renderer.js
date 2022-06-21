'use strict';

const textContent = document.getElementById('openDialogFilepath')

document.getElementById('btnShowMessageBox')
    .addEventListener('click', async() => {
        await window.electron.showMessageBox('test title', 'test body')
            .then(result => {
                console.log(result);
            });
    });

document.getElementById('btnShowOpenDialog')
    .addEventListener('click', async() => {
        await window.electron.showOpenDialog()
            .then((result) => {
                console.log(result);
                textContent.innerText = result;
            }).catch((err) => {
                console.error(err);
            });
    });

document.getElementById('btnShowErrorBox')
    .addEventListener('click', async() => {
        await window.electron.showErrorBox('error title', 'error message')
            .then(result => {
                console.log('done')
            });
    });
