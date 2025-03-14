<template>
  <div>
    <Header />
    <NuxtLoadingIndicator />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
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
  