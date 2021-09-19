<template>
  <div class="app-container">
    <devices />
    <installed-apps />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Devices from '/@/components/Devices.vue';
import InstalledApps from '/@/components/InstalledApps.vue';

export default defineComponent({
  name: 'App',
  components: {
    Devices,
    InstalledApps,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
