<template>
  <v-tooltip left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
    <span>Dark mode</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "DarkModeButton",
};
</script>
