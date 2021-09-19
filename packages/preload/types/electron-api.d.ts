
interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
}

interface AdbHelper {
  readonly listDevices: () => Promise<string>
  readonly listApps: (string) => Promise
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
  adbHelper: AdbHelper
}
