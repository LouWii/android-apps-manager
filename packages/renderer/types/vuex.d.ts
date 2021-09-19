import type { Store } from 'vuex';

export interface State {
  selectedDeviceId: string
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
      $store: Store<State>
  }
}