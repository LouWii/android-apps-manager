import Adb from '@devicefarmer/adbkit';
import type {DeviceWithPath} from '@devicefarmer/adbkit';

//const ADB_COMMAND = 'adb';

const adbCommand = Adb.createClient();

export const listDevices = function(): Promise<Array<DeviceWithPath>> {
  return adbCommand.listDevicesWithPaths();
};

export const listApps = function(id: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const deviceClient = adbCommand.getDevice(id);
    if (!deviceClient) {
      reject(`Client not found for id ${id}`);
      return;
    }
    deviceClient.getPackages()
      .then(packages => resolve(packages))
      .catch(error => reject(error));
  });
};

export const getAppDetails = function(id: string, appName: string) {
  return new Promise((resolve, reject) => {
    const deviceClient = adbCommand.getDevice(id);
    if (!deviceClient) {
      reject(`Client not found for id ${id}`);
      return;
    }
    deviceClient.shell(`dumpsys package ${appName}`)
      .then(Adb.util.readAll)
      .then(output => resolve(output.toString()))
      .catch(error => reject(error));
  });
};

//export const listDevicesMan = function() {
//  return new Promise((resolve, reject) => {
//    child_process.exec(`${ADB_COMMAND} devices -l`, (error, stdout, stderr) => {
//      if (error) {
//        reject(error);
//        return;
//      }
//      resolve(stdout);
//      console.error(`stderr: ${stderr}`);
//    });
//  });
//};