<template>
  <div class="devices-container">
    <select v-model="localSelectedDeviceId">
      <option
        v-for="device in devices"
        :key="device.id"
        :value="device.id"
      >
        {{ device.brand }} {{ device.name }}
      </option>
      <option v-if="!devices.length">
        No Devices
      </option>
    </select>
    <button @click="fetchDevices()">
      refresh
    </button>
    <div class="device-info" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type {DeviceWithPath} from '@devicefarmer/adbkit';
import androidDeviceList from 'android-device-list';
import type { DeviceInfo } from 'types';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'Devices',
  data() {
    return {};
  },
  computed: {
    ...mapState(['devices']),
    localSelectedDeviceId: {
      get() {
        return this.$store.state.selectedDeviceId;
      },
      set(newValue) {
        this.$store.commit('setSelectedDeviceId', newValue);
      },
    },
  },
  mounted() {
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      window.adbHelper.listDevices()
      .then((newDevices: Array<DeviceWithPath>) => {
        const devicesInfo: DeviceInfo[] = [];
        newDevices.forEach(d => {
          const device: DeviceInfo = {
            product: d.product.replace('product:', ''),
            name: this.getCleanDeviceModel(d.model),
            id: d.id,
            brand: '',
          };
          const devicesExtraInfo = androidDeviceList.getDevicesByDeviceId(d.product.replace('product:', ''));
          if (devicesExtraInfo.length) {
            const deviceExtraInfo = devicesExtraInfo.find(Boolean);
            device.name = deviceExtraInfo.name;
            device.brand = deviceExtraInfo.brand;
          }
          devicesInfo.push(device);
        });
        this.$store.commit('setDevices', devicesInfo);
        if (this.devices.length) {
          // Select first item in the list
          this.$store.commit('setSelectedDeviceId', this.devices.find(Boolean).id);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    getCleanDeviceModel(rawModel: string): string {
      return rawModel.replaceAll('model:', '').replaceAll('_', ' ');
    },
  },
});
</script>
