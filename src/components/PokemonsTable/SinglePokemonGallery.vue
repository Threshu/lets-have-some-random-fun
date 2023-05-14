<template>
  <v-row justify="center" class="my-2">
    <template v-if="images_to_display.length > 0">
      <div v-for="(n, index) in images_to_display" :key="index">
        <v-col>
          <v-img
            :src="n"
            :lazy-src="n"
            width="96px"
            height="96px"
            class="grey lighten-2 rounded"
          />
        </v-col>
      </div>
    </template>
    <template v-else>
      <v-alert type="warning"> No gallery for this pokemon available. </v-alert>
    </template>
  </v-row>
</template>

<script>
export default {
  props: {
    images: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    images_to_display() {
      return Object.values(this.images)
        .reverse()
        .filter((value) => value !== null && typeof value === "string");
    },
  },
};
</script>

<style></style>
