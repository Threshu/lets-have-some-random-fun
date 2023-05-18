<template>
  <v-container class="h-inherit">
    <v-row class="justify-content-center">
      <div class="pokemon-text pokemon-big-text">WHO'S THAT POKEMON?</div>
    </v-row>
    <div class="d-flex justify-content-center">
      <template v-if="!loader">
        <vue-flip :value="flipped" width="50%" height="50%" transition="1.5s">
          <template v-slot:front>
            <template v-if="!flipped">
              <div
                class="overlay"
                :style="{
                  maskImage: `url(${pokemon_home_img})`,
                }"
              />
              <button
                @click="flipped = !flipped"
                class="pokemon-text reveal-pokemon-text"
              >
                REVEAL POKEMON
              </button>
            </template>
          </template>
          <template v-slot:back>
            <template v-if="flipped">
              <div>
                <img :src="pokemon_home_img" width="100%" />
                <div class="pokemon-text pokemon-big-text text-center">
                  {{ pokemon_name }}
                </div>
              </div>
            </template>
          </template>
        </vue-flip>
      </template>
      <template v-else>
        <v-progress-circular
          :size="100"
          color="primary"
          class="home-loader"
          indeterminate
        />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Pokemon } from "@/types/Pokemon";
import { AxiosResponse } from "axios";
import VueFlip from "vue-flip";
import { defineComponent } from "vue";
const NUMBER_OF_POKEMONS = 150;
const PIKACHU = "Pikachu";
const PIKACHU_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      flipped: false as boolean,
      loader: false as boolean,
      randomPokemonId: 1 as number,
      apiResponse: {
        data: null,
      } as AxiosResponse,
    };
  },
  computed: {
    random_pokemon(): Pokemon {
      return this.apiResponse?.data;
    },
    pokemon_name(): string {
      const name = this.random_pokemon?.name ?? PIKACHU;
      const firstLetter = name.charAt(0).toUpperCase();
      return `${firstLetter}${name.slice(1)}`;
    },
    pokemon_img(): string {
      return this.random_pokemon?.sprites?.front_default ?? PIKACHU_IMG;
    },
    pokemon_home_img(): string {
      return this.random_pokemon?.sprites?.other?.home?.front_default ?? PIKACHU_IMG;
    },
  },
  async mounted() {
    this.randomPokemonId = Math.floor(Math.random() * NUMBER_OF_POKEMONS) + 1;
    const randomPokemonID = this.randomPokemonId ?? 1;
    this.loader = true;
    this.apiResponse = await this.$http.get(`pokemon/${randomPokemonID}`);
    this.loader = false;
  },
  components: {
    VueFlip: VueFlip as any,
  },
});
</script>
