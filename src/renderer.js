'use strict';

let btnShowMessageBox = document.getElementById('btnShowMessageBox');
console.log(btnShowMessageBox);
btnShowMessageBox.addEventListener('click', () => {
    window.electron.showMessageBox('test title', 'test body');
});