<template>
  <v-btn icon @click="toggleDarkMode">
    <v-icon>mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DarkModeButton",
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        localStorage.setItem("darkMode", "true");
      } else {
        localStorage.setItem("darkMode", "false");
      }
    },
  },
});
</script>
