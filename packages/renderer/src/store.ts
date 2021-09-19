import type { State } from 'types/vuex';
import { createStore } from 'vuex';

export default createStore({
  state(): State {
    return {
      selectedDeviceId: '',
    };
  },
  mutations: {
    setSelectedDeviceId(state: State, selectedDeviceId: string) {
      state.selectedDeviceId = selectedDeviceId;
    },
  },
});