import type { DeviceInfo } from 'types';
import type { Store } from 'vuex';

export interface State {
  selectedDeviceId: string
  devices: DeviceInfo[]
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
      $store: Store<State>
  }
}