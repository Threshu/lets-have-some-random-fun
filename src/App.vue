<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  async mounted() {
    const xd = await this.$http.get("pokemona");
    console.log(xd);

    //const response = await this.$axios.get("pokemon", {
    //  params: {
    //    limit: 100000,
    //    offset: 0,
    //  },
    //});
    //this.$http.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
  }
}
</script>
