import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { exec } from 'child_process';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null;

console.log('main.js is being executed');

function createWindow(): void {
  console.log('Creating main window');
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Uncomment to open DevTools
  // mainWindow.webContents.openDevTools();

  // Uncomment to hide the menu bar
  // mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed', () => {
    console.log('Main window closed');
    mainWindow = null;
  });
}

app.on('ready', () => {
  console.log('App is ready');
  
  const appDataPath = app.getPath('appData');
  console.log(`App data path: ${appDataPath}`);
  const communityFilePath = 'C:/Users/peakl/AppData/Local/patrol_manager/community.json'
  const currentUserFilePath = 'C:/Users/peakl/AppData/Local/patrol_manager/currentUser.json'

  console.log(`Starting community JSON server with file: ${communityFilePath}`);
  const communityCommand = `npx json-server ${communityFilePath} --port 3101`;
  console.log(`Executing command: ${communityCommand}`);
  
  exec(communityCommand, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`Error starting community JSON server: ${error}`);
      console.error('error detected:', stderr);
      return;
    }
    console.log(`Community JSON server started: ${stdout}`);
  });


  console.log(`Starting currentUser JSON server with file: ${currentUserFilePath}`);
  const currentUserCommand = `npx json-server ${currentUserFilePath} --port 3102`;
  console.log(`Executing command: ${currentUserCommand}`);

  exec(currentUserCommand, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`Error starting currentUser JSON server: ${error}`);
      console.error(stderr);
      return;
    }
    console.log(`CurrentUser JSON server started: ${stdout}`);
  });

  let thePath = path.join(app.getPath('desktop'), 'ticket.txt');

  var fs = require('fs');
  fs.readFile(thePath, 'utf8', function (err: any, data: any) {
    if (err) return console.log(`Error reading file: ${err}`);
    console.log(`File data: ${data}`);
  });

  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

const paths = app.getAppPath();
console.log(`App version: ${app.getVersion()}`);

app.on('window-all-closed', () => {
  console.log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('App activated');
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
