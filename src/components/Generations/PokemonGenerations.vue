<template>
  <v-row no-gutters class="h-100 overflow-hidden">
    <template v-if="loader">
      <template v-for="generation in numberOfGenerations">
        <v-col
          cols="4"
          class="d-flex justify-content-center align-items-center"
          :key="generation"
        >
          <v-progress-circular :size="50" color="primary" indeterminate />
        </v-col>
      </template>
    </template>
    <template v-else>
      <template v-for="generation in generations_to_display">
        <v-col
          cols="4"
          class="d-flex justify-content-center align-items-center"
          :key="generation.id"
        >
          <div :id="`chart-${generation.id}`" class="w-100 mt-5">
            <generation-chart :generation="generation" />
          </div>
        </v-col>
      </template>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Generation } from "@/types/Generation";
import GenerationChart from "./GenerationChart.vue";
import { mapGetters, mapMutations } from "vuex";
import { defineComponent } from "vue";
const NUMBER_OF_GENERATIONS = 9;
export default defineComponent({
  components: { GenerationChart },
  data() {
    return {
      numberOfGenerations: NUMBER_OF_GENERATIONS as number,
      loader: false as boolean,
      generationsApiData: [] as Array<Generation>,
    };
  },
  computed: {
    ...mapGetters({
      getAllGenerations: "getAllGenerations",
    }),
    generations_to_display(): Array<Generation> {
      const generations = this.generationsApiData;
      if (!Array.isArray(generations) || generations == null) return [];
      return generations.map((generation: Generation) => {
        generation.numberOfPokemons = generation.pokemon_species.length;
        return generation;
      });
    },
  },
  mounted() {
    if (this.getAllGenerations?.length > 0) {
      this.generationsApiData = this.getAllGenerations;
      return;
    }
    this.getGenerations();
    this.setGenerations(this.generationsApiData);
  },
  methods: {
    ...mapMutations({
      setGenerations: "setGenerations",
    }),
    async getGenerations() {
      this.loader = true;
      const apiResult = await this.$http.get(`generation`);
      const generationsList = apiResult?.data?.results ?? [];
      const generationDetailsPromises = generationsList.map(
        async (generation: Generation) => {
          const result = await this.$http.get(generation.url);
          return result?.data;
        }
      );
      this.generationsApiData = await Promise.all(generationDetailsPromises);
      this.loader = false;
    },
  },
});
</script>
