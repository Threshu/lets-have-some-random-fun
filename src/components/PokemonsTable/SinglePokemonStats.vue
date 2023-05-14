<template>
  <v-simple-table height="350px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Base stat</th>
          <th class="text-left">Effort</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in statistics" :key="stat.stat.name">
          <td>{{ stat.stat.name }}</td>
          <td>{{ stat.base_stat }}</td>
          <td>{{ stat.effort }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    statistics: {
      type: Array,
      default: () => {},
    },
  },
};
</script>
