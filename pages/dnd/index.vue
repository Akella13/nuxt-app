<template>
  <section>
    <Stats />

    <Roller @first-roll.once="historyVisible = true" />

    <History v-if="historyVisible" />
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Dice roller'
  })

  const historyVisible = ref(false)
</script>