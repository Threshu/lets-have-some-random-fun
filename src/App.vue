<template>
  <v-app>
    <app-navigation />
    <v-main>
      <router-view />
    </v-main>
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script lang="ts">
import AppNavigation from "./components/Main/AppNavigation.vue";
export default {
  name: "App",
  components: {
    AppNavigation,
  },
};
</script>

<!--import { Component, Vue } from "vue-property-decorator";
//import DarkModeButtonVue from "./components/Main/DarkModeButton.vue";

//@Component({
//  components: {
//    DarkModeButton: DarkModeButtonVue,
//  },
//})
//export default class App extends Vue {
//  async mounted() {
//    const xd = await this.$http.get("pokemon");
//  }
//}
//
</script>-->
