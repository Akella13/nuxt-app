<template>
  <section>
    <h2 class="font__dnd heading--small">
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
  .font__dnd {
    font-family: $font-family__dnd;
  }

  .heading--small {
    font-size: $font-size__heading--small;
  }
</style>