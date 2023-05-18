<template>
  <v-app :class="{ 'mobile-style': is_mobile }">
    <app-navigation />
    <v-main>
      <router-view />
    </v-main>
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script lang="ts">
import AppNavigation from "./components/Main/AppNavigation.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    AppNavigation,
  },
  computed: {
    is_mobile(): boolean {
      return window.matchMedia("(max-width: 767px)").matches;
    },
  },
  mounted() {
    this.setDarkMode();
  },
  methods: {
    setDarkMode() {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "true") this.$vuetify.theme.dark = true;
    },
  },
});
</script>
