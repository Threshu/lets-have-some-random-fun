<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class App extends Vue {
  async mounted() {
    try {
      //const response = await this.$axios.get("pokemon", {
      //  params: {
      //    limit: 100000,
      //    offset: 0,
      //  },
      //});
      console.log(this.$http);
      this.$http.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
