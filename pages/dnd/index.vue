<template>
  <section>
    <h2 class="heading">
      Dice roller
    </h2>

    <ClientOnly fallback-tag="span"
      fallback="Loading stats..."
    >
      <Stats />
    </ClientOnly>

    <Roller @first-roll.once="historyVisible = true" />

    <History v-if="historyVisible" />
  </section>
</template>

<script setup lang="ts">
  definePageMeta({ title: 'Dice roller' })

  const historyVisible = ref(false)
</script>

<style lang="scss" scoped>
  .heading {
    font-family: $font-family__dnd;
    font-size: $font-size__heading--small;
    color: map-get($colors, "red");
  }
</style>