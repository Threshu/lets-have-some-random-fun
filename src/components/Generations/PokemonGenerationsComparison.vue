<template>
  <div class="h-100">
    <div id="generationStats" class="mt-6 w-100">
      <apexchart
        type="pie"
        width="55%"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script lang="ts">
import { Generation } from "@/types/Generation";
import { mapGetters, mapMutations } from "vuex";
import { ApexOptions } from "apexcharts";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    ...mapGetters({
      getAllGenerations: "getAllGenerations",
    }),
    series(): Array<number> {
      const generations = this.generationsApiData;
      return generations.map((generation) => generation.pokemon_species.length);
    },
    series_names(): Array<string> {
      const generations = this.generationsApiData;
      return generations.map((_, index) => `Generation ${index + 1}`);
    },
    chartOptions(): ApexOptions {
      return {
        chart: {
          type: "pie",
        },
        labels: this.series_names as Array<string>,
        title: {
          text: "Comparing the number of pokemons from all generations",
          align: "center",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      loader: false as boolean,
      generationsApiData: [] as Array<Generation>,
    };
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

<style></style>
