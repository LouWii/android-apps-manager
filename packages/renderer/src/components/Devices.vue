<template>
  <div class="devices-container">
    <select v-model="localSelectedDeviceId">
      <option
        v-for="device in devices"
        :key="device.id"
        :value="device.id"
      >
        {{ getCleanDeviceModel(device.model) }}
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

export default defineComponent({
  name: 'Devices',
  data() {
    return {
      devices: [] as Array<DeviceWithPath>,
      localSelectedDeviceId: null,
      deviceInfo: null,
    };
  },
  computed: {
    selectedDevice() {
      return this.devices.find(d => d.id === this.localSelectedDeviceId);
    },
  },
  watch: {
    localSelectedDeviceId: function() {
      this.$store.commit('setSelectedDeviceId', this.localSelectedDeviceId);
      if (this.selectedDevice) {
        const devicesInfo = androidDeviceList.getDevicesByDeviceId(this.selectedDevice.product.replace('product:', ''));
        if (devicesInfo.length) {
          this.deviceInfo = devicesInfo.find(Boolean);
        } else {
          this.deviceInfo = null;
        }
      } else {
        this.deviceInfo = null;
      }
    },
  },
  mounted() {
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      window.adbHelper.listDevices()
      .then((result: Array<DeviceWithPath>) => {
        console.log(result);
        this.devices = result;
        if (this.devices.length) {
          // Select first item in the list
          this.localSelectedDeviceId = this.devices.find(Boolean).id;
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
