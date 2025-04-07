<template>
  <Header />
  <NuxtLoadingIndicator />
  <main class="main">
    <NuxtPage />
  </main>
  <Footer />
</template>

<script setup lang="ts">
  /** Current route page title */
  const pageTitle = useRoute().meta.title as string

  useHead({
    title: 'Nuxt-App',
    titleTemplate: pageTitle
      ?  `${pageTitle} - %s`
      : '%s',
    meta: [{
      name: 'description',
      content: 'My Nuxt app',
    }],
  })
</script>

<style lang="scss" scoped>
  .main {
    flex: 1;
  }
</style>