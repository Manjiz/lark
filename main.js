'use strict';
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const dialog = electron.dialog;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start(); //%%

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.on('window-all-closed', function() {
    // OSX 通常会在 tray 保持应用 active 除非用户用 Cmd + Q 关闭它
    if (process.platform!='darwin' || app.listeners('window-all-closed').length==1) {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 500, height: 500, autoHideMenuBar: true, useContentSize: true
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.focus();
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});