<template>
  <v-data-table
    item-key="name"
    class="elevation-1"
    :headers="headers"
    :items="abilities_to_display"
    itemKey="index"
    :loading="loading"
    hide-default-footer
  >
    <template v-slot:item.shortInfo="{ item }">
      {{ item.shortInfo }}
      <v-tooltip top color="blue">
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" color="blue" class="ml-1"> mdi-information </v-icon>
        </template>
        <span>{{ item.longInfo }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
const ENGLISH = "en";
export default {
  props: {
    abilities: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    abilities_to_display() {
      return this.apiAbilities.map((ability, index) => {
        const enInfo = ability.effect_entries.find(
          (effect) => effect.language.name === ENGLISH
        );
        ability.shortInfo = enInfo?.short_effect ?? "No information about this ability";
        ability.index = index;
        ability.longInfo = enInfo?.effect ?? "No information about this ability";
        return ability;
      });
    },
  },
  async mounted() {
    this.loading = true;
    const pokemonDetailsPromises = this.abilities.map(async (ability) => {
      const result = await this.$http.get(ability.ability.url);
      return result?.data;
    });

    this.apiAbilities = await Promise.all(pokemonDetailsPromises);
    this.loading = false;
  },
  data() {
    return {
      apiAbilities: [],
      loading: false,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name",
        },
        {
          text: "Effects",
          align: "start",
          sortable: true,
          value: "shortInfo",
        },
      ],
    };
  },
};
</script>
