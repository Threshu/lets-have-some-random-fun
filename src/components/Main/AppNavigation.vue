<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary class="position-fixed">
      <app-logo class="bg-primary" />
      <v-list-item class="bg-primary">
        <v-list-item-avatar class="mw-fit-content ma-0" height="96px">
          <v-img :src="pokemon_img" width="70px" height="96px" class="ma-0"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h5 text-white pl-1">{{
            pokemon_name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="black-divider" dark />

      <v-list dense class="pt-0">
        <v-list-item
          v-for="item in navigation"
          :key="item.title"
          link
          :to="{ name: item.routeName }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-btn icon dark @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <app-logo />
      <v-spacer />
      <dark-mode-button />
    </v-app-bar>
  </div>
</template>

<script>
import AppLogo from "./AppLogo.vue";
import DarkModeButton from "./DarkModeButton.vue";
const NUMBER_OF_POKEMONS = 150;
const PIKACHU = "Pikachu";
const PIKACHU_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
export default {
  data() {
    return {
      drawer: false,
      navigation: [
        { title: "Home", icon: "mdi-pokeball", routeName: "Home" },
        { title: "Pokemon Table", icon: "mdi-table-large", routeName: "PokemonTable" },
        {
          title: "Generations",
          icon: "mdi-compost",
          routeName: "PokemonGenerations",
        },
        {
          title: "Statistics",
          icon: "mdi-chart-pie-outline",
          routeName: "PokemonGenerationsComparison",
        },
      ],
      randomPokemonId: 1,
      apiResponse: {},
    };
  },
  computed: {
    random_pokemon() {
      return this.apiResponse?.data;
    },
    pokemon_name() {
      const name = this.random_pokemon?.name ?? PIKACHU;
      const firstLetter = name.charAt(0).toUpperCase();
      return `${firstLetter}${name.slice(1)}`;
    },
    pokemon_img() {
      return this.random_pokemon?.sprites?.front_default ?? PIKACHU_IMG;
    },
  },
  created() {
    this.getRandomPokemon();
  },
  async mounted() {
    const randomPokemonID = this.randomPokemonId ?? 1;
    this.apiResponse = await this.$http.get(`pokemon/${randomPokemonID}`);
  },
  methods: {
    async getRandomPokemon() {
      this.randomPokemonId = Math.floor(Math.random() * NUMBER_OF_POKEMONS) + 1;
    },
  },
  components: {
    DarkModeButton,
    AppLogo,
  },
};
</script>

<style></style>
