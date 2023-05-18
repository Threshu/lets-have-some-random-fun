<template>
  <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    generation: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    generation_number(): number {
      console.log(this.generation);
      return this.generation?.id ?? 1;
    },
    series(): Array<any> {
      return [
        {
          data: [
            this.generation.abilities.length,
            this.generation.moves.length,
            this.generation.pokemon_species.length,
            this.generation.names.length,
            this.generation.version_groups.length,
          ],
        },
      ];
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        colors: ["#33b2df", "#90ee7e", "#f48024", "#13d8aa", "#f9a3a4"],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val: number, opt: any) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: ["Abilities", "Moves", "Pokemons", "Countries", "Games versions"],
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        title: {
          text: `Generation ${this.generation.id}`,
          align: "center",
          floating: true,
        },
        tooltip: {
          theme: "dark",
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        },
      },
    };
  },
});
</script>
