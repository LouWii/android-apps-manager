import {contextBridge, ipcRenderer} from 'electron';

const apiKey = 'electron';
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
};

contextBridge.exposeInMainWorld('adbHelper', {
  listDevices: () => {
    return ipcRenderer.invoke('app:list-devices');
  },
  listApps: (deviceId: string) => {
    return ipcRenderer.invoke('app:list-apps', deviceId);
  },
  getAppDetails: (deviceId: string, appName: string) => {
    return ipcRenderer.invoke('app:app-details', deviceId, appName);
  },
});

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
