<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  const pageTitle = useRoute().meta.title

  useHead({
    title: 'Nuxt-App',
    titleTemplate: pageTitle
      ?  `${pageTitle} - %s`
      : '%s',
    meta: [{
      name: 'description',
      content: 'My Nuxt app'
    }],
  })
</script>
  