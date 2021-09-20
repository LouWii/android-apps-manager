<template>
  <div class="installed-apps">
    <button
      :disabled="!selectedDeviceId"
      @click="loadApps()"
    >
      Load apps
    </button>
    <input
      v-model="search"
      type="text"
      placeholder="Search"
    >
    <div class="apps-container">
      <div
        v-for="app in filteredList"
        :key="app.key"
        class="app-item"
      >
        {{ app.key }}
        <button @click="loadAppDetails(app.key)">
          L
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import type { AndroidPackage } from 'types';

export default defineComponent({
  name: 'InstalledApps',
  data() {
    return {
      apps: [] as AndroidPackage[],
      search: '',
    };
  },
  computed: {
    ...mapState(['selectedDeviceId']),
    filteredList() {
      return this.apps.filter(a => {
        return a.key.includes(this.search);
      });
    },
  },
  methods: {
    loadApps() {
      if (this.selectedDeviceId) {
        window.adbHelper.listApps(this.selectedDeviceId)
          .then((apps: string[]) => {
            apps.sort().forEach(app => {
              const packageApp: AndroidPackage = {
                key: app,
                name: '',
              };
              this.apps.push(packageApp);
            });
          })
          .catch(error => {
            this.apps = [];
            console.log(error);
          });
      }
    },
    loadAppDetails(appName: string) {
      console.log(appName);
      window.adbHelper.getAppDetails(this.selectedDeviceId, appName)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
});
</script>

<style scoped>
.app-item {
  margin: 1rem 0;
  width: 100%;
  text-align: left;
}
</style>