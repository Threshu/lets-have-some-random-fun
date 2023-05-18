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
        :items-per-page="limit"
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
import { Pokemon } from "@/types/Pokemon";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      loader: false as boolean,
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
      pokemonsApiData: [] as Array<Pokemon>,
      apiItemsCount: 0 as number,
      params: {
        offset: 0 as number,
        limit: 10 as number,
      },
    };
  },
  watch: {
    params: {
      deep: true,
      handler: "getPokemons",
    },
  },
  computed: {
    limit(): number {
      return this.params?.limit ?? 10;
    },
    pokemons_to_display(): Array<Pokemon> {
      const pokemons = this.pokemonsApiData;
      if (!Array.isArray(pokemons) || pokemons == null) return [];
      return pokemons.map((pokemon: Pokemon) => {
        const pokemonName = pokemon.name ?? "";
        pokemon.pokemonName = `${pokemonName.charAt(0).toUpperCase()}${pokemonName.slice(
          1
        )}`;
        const types = pokemon.types.map((pokemonType) => pokemonType.type.name);
        pokemon.pokemonTypes = types;
        pokemon.img = pokemon?.sprites?.front_default ?? "";
        return pokemon;
      });
    },
    api_items_count(): number {
      return this.apiItemsCount ?? 0;
    },
  },
  mounted() {
    this.getPokemons();
  },
  methods: {
    async getPokemons() {
      this.loader = true;
      const response = await this.$http.get("pokemon", {
        params: { ...this.params },
      });
      this.apiItemsCount = response.data.count;
      const pokemonList = response.data.results;
      const pokemonDetailsPromises = pokemonList.map(async (pokemon: Pokemon) => {
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
});
</script>
