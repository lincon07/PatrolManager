import { app, BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater'; // Assuming you've installed electron-updater

const { exec } = require('child_process');

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null;
let updateInterval: NodeJS.Timeout | null = null;

function createWindow(): void {
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
    mainWindow = null;
  });
}

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'lincon07',
  repo: 'PatrolManager',
});

app.on('ready', () => {
  exec('npx json-server ./src/db/community.json --port 3001', (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`Error starting JSON server: ${error}`);
      return;
    }
    console.log(`JSON server started: ${stdout}`);
  });

  createWindow();

  // Initialize autoUpdater
  autoUpdater.checkForUpdatesAndNotify();

  // Check for updates every 10 minutes
  updateInterval = setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 600000);
});

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});

autoUpdater.on('update-available', () => {
  console.log('Update available');
  const dialogOpts: Electron.MessageBoxOptions = {
    type: 'info', // Adjust type as needed (info, error, none, question, warning)
    buttons: ['OK'],
    title: 'Update Available',
    message: 'A new update is available. Downloading now...',
  };
  dialog.showMessageBox(dialogOpts);
});

autoUpdater.on('update-not-available', () => {
  console.log('Update not available');
});

autoUpdater.on('error', (err) => {
  console.error('Error in auto-updater:', err);
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded');
  const dialogOpts: Electron.MessageBoxOptions = {
    type: 'info', // Adjust type as needed (info, error, none, question, warning)
    buttons: ['OK'],
    title: 'Update Available',
    message: 'A new update issdaddsads available. Downloading now...',
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
