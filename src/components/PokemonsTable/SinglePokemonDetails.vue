<template>
  <v-card color="primary ma-3">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h4 text-white">{{ pokemon_name }}</h1>
    </v-card-title>

    <v-tabs v-model="tab" grow>
      <v-tab v-for="tab in pokemonDetailsTabs" :key="tab">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tab in pokemonDetailsTabs" :key="tab">
        <v-card flat>
          <component
            :is="getComponent(tab)"
            :evolution-url="pokemon_evolution_chain_url"
            :statistics="item.stats"
            :abilities="item.abilities"
            :images="item.sprites"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SinglePokemonStats from "./SinglePokemonStats.vue";
import SinglePokemonAbilities from "./SinglePokemonAbilities.vue";
import SinglePokemonGallery from "./SinglePokemonGallery.vue";
import SinglePokemonEvolution from "./SinglePokemonEvolution.vue";
import * as POKEMON_DETAILS_TABS from "@/data/pokemonDetailsTabs";
const TABS = {
  [POKEMON_DETAILS_TABS.STATISTICS]: SinglePokemonStats,
  [POKEMON_DETAILS_TABS.ABILITIES]: SinglePokemonAbilities,
  [POKEMON_DETAILS_TABS.GALLERY]: SinglePokemonGallery,
  [POKEMON_DETAILS_TABS.EVOLUTION]: SinglePokemonEvolution,
};
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    pokemon_name() {
      return this.item?.name?.toUpperCase() ?? "";
    },
    pokemon_species() {
      return this.pokemonSpecies?.data;
    },
    pokemon_evolution_chain_url() {
      return this.pokemon_species?.evolution_chain?.url ?? "";
    },
  },
  data() {
    return {
      tab: null,
      pokemonDetailsTabs: ["statistics", "abilities", "gallery", "evolution"],
      pokemonSpecies: {},
    };
  },
  async mounted() {
    this.pokemonSpecies = await this.$http.get(
      `https://pokeapi.co/api/v2/pokemon-species/${this.item.id}/`
    );
  },
  methods: {
    getComponent(componentName) {
      return TABS[componentName];
    },
  },
};
</script>

<style></style>
