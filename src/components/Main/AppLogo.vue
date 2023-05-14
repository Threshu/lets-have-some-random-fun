<template>
  <div
    class="d-flex justify-content-center align-items-center pointer"
    @click="$router.push({ name: 'Home' })"
  >
    <img :src="require('../../assets/pokemon_logo.svg')" height="100%" width="150px" />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
