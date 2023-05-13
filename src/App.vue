<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>

          <!--<div v-bind="attrs" v-on="on" @click="$vuetify.theme.dark" class="pointer">
            <v-switch
              :value="$vuetify.theme.dark"
              prepend-icon="mdi-theme-light-dark"
              hide-details
              class="mt-0 py-2 pl-1"
              color="white"
            />
          </div>-->
        </template>
        <span>Dark mode</span>
      </v-tooltip>
    </v-app-bar>
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
    const xd = await this.$http.get("pokemon");
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
