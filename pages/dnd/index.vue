<template>
  <section>
    <h2 class="font__dnd">Dice roller</h2>

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

<style lang="scss">
  .font__dnd {
    font-family: 'Cinzel Decorative';
  }
</style>