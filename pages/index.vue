<template>
  <section>
    <h1 class="heading">
      Welcome to the homepage
    </h1>
    <Alert class="heading--small">
      This is an auto-imported component
    </Alert>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({ title: 'Home' })
</script>

<style lang="scss" scoped>
  .heading {
    font-size: $font-size__heading;
    color: map-get($colors, "red" );

    &--small {
      font-size: $font-size__heading--small;
    }
  }
</style>
