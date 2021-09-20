import type { DeviceInfo } from 'types';
import type { State } from 'types/vuex';
import { createStore } from 'vuex';

export default createStore({
  state(): State {
    return {
      selectedDeviceId: '',
      devices: [],
    };
  },
  mutations: {
    setDevices(state: State, devices: DeviceInfo[]) {
      state.devices = devices;
    },
    setSelectedDeviceId(state: State, selectedDeviceId: string) {
      state.selectedDeviceId = selectedDeviceId;
    },
  },
});