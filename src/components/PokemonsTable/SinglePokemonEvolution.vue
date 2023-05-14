<template>
  <v-row justify="center" class="my-2">
    <template v-if="!loader">
      <template v-if="images_to_display.length > 0">
        <div v-for="(pokemon, index) in images_to_display" :key="index">
          <v-col class="d-flex px-0">
            <v-img
              :src="pokemon.url"
              :lazy-src="pokemon.url"
              width="150px"
              height="150px"
              class="grey lighten-2 rounded"
            />
            <template v-if="index < images_to_display.length - 1">
              <v-icon color="primary" size="50">mdi-arrow-right-bold</v-icon>
            </template>
          </v-col>
          <div
            class="d-flex justify-content-center"
            :class="{ 'mr-10': index < images_to_display.length - 1 }"
          >
            <v-chip color="primary" dark>{{ pokemon.name }}</v-chip>
          </div>
        </div>
      </template>
      <template v-else>
        <v-alert type="warning"> No information about this pokemon evolutions. </v-alert>
      </template>
    </template>
    <template v-else>
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </template>
  </v-row>
</template>

<script>
export default {
  props: {
    evolutionUrl: {
      type: String,
    },
  },
  data() {
    return {
      names: [],
      pokemonsApiData: [],
      loader: false,
    };
  },
  computed: {
    images_to_display() {
      const imagesUrls = this.pokemonsApiData.map((pokemon) => {
        return {
          url: pokemon.sprites.front_default,
          name: pokemon.name,
        };
      });
      return imagesUrls.filter(
        (value) => value.url !== null && typeof value.url === "string"
      );
    },
  },
  async mounted() {
    this.loader = true;
    const evolutionChain = await this.$http.get(this.evolutionUrl);
    this.getNestedEvolutions(evolutionChain.data.chain);
    await this.getChainPokemons();
    this.loader = false;
  },
  methods: {
    getNestedEvolutions(chain) {
      this.extractNames(chain);
    },
    extractNames(obj) {
      if (obj == null) return;
      if (obj.species && obj.species.name) {
        if (obj?.species?.name == null) return;
        this.names.push(obj.species.name);
      }
      if (obj.evolves_to && obj.evolves_to.length > 0) {
        obj.evolves_to.forEach((evolves) => this.extractNames(evolves));
      }
    },
    async getChainPokemons() {
      const pokemonList = this.names;
      const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        const result = await this.$http.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        return result?.data;
      });

      this.pokemonsApiData = await Promise.all(pokemonDetailsPromises);
    },
  },
};
</script>

<style></style>
