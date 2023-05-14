<template>
  <v-container>
    <template>
      <v-data-table
        :headers="headers"
        :items="pokemons_to_display"
        :expanded.sync="expanded"
        :loading="loader"
        no-results-text="No Pokemons in database"
        no-data-text="No Pokemons in database"
        :items-per-page="-1"
        hide-default-footer
        show-expand
        class="pokemon-table elevation-5"
      >
        <template v-slot:top>
          <v-toolbar flat class="bg-primary">
            <v-toolbar-title class="text-white">Pokemons Table</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <single-pokemon-details :item="item" />
          </td>
        </template>
        <template v-slot:item.id="{ item }">
          {{ `#${item.id}` }}
        </template>
        <template v-slot:item.img="{ item }">
          <v-img :src="item.img" width="100px" class="m-auto" />
        </template>
        <template v-slot:item.pokemonTypes="{ item }">
          <template v-for="type in item.pokemonTypes">
            <v-chip :color="TYPES[type]" dark :key="type" class="mx-1">
              {{ type }}
            </v-chip>
          </template>
        </template>
        <template #footer>
          <table-pagination
            :pagination="params"
            :count="api_items_count"
            @changePage="changePagination"
          />
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>

<script lang="ts">
import TablePagination from "@/components/Common/TablePagination.vue";
import SinglePokemonDetails from "@/components/PokemonsTable/SinglePokemonDetails.vue";
import { TYPES } from "@/data/pokemonTypes";
export default {
  data() {
    return {
      loader: false,
      expanded: [],
      TYPES: TYPES,
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        {
          text: "Pokemon",
          align: "center",
          sortable: false,
          value: "img",
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "pokemonName",
        },
        {
          text: "Weight",
          align: "start",
          sortable: true,
          value: "weight",
        },
        {
          text: "Height",
          align: "start",
          sortable: true,
          value: "height",
        },
        {
          text: "Types",
          align: "center",
          sortable: true,
          value: "pokemonTypes",
        },
        { text: "", value: "data-table-expand" },
      ],
      pokemonsApiData: [],
      apiItemsCount: 0,
      params: {
        offset: 0,
        limit: 10,
      },
    };
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.getPokemons();
      },
    },
  },
  computed: {
    pokemons_to_display() {
      const pokemons = this.pokemonsApiData;
      return pokemons.map((pokemon) => {
        const pokemonName = pokemon.name ?? "";
        pokemon.pokemonName = `${pokemonName.charAt(0).toUpperCase()}${pokemonName.slice(
          1
        )}`;
        const types = pokemon.types.map((type) => type.type.name);
        pokemon.pokemonTypes = types;
        pokemon.img = pokemon?.sprites?.front_default ?? "";
        return pokemon;
      });
    },
    api_items_count() {
      return this.apiItemsCount;
    },
  },
  async mounted() {
    await this.getPokemons();
  },
  methods: {
    async getPokemons() {
      this.loader = true;
      const response = await this.$http.get("pokemon", {
        params: { ...this.params },
      });
      this.apiItemsCount = response.data.count;
      const pokemonList = response.data.results;
      const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
        const result = await this.$http.get(pokemon.url);
        return result?.data;
      });

      this.pokemonsApiData = await Promise.all(pokemonDetailsPromises);
      this.loader = false;
    },
    changePagination(page: number, itemsPerPage: number) {
      this.params.offset = page;
      this.params.limit = itemsPerPage;
    },
  },
  components: {
    SinglePokemonDetails,
    TablePagination,
  },
};
</script>
