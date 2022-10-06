<template>
  <section>
    <article>Fetched from
      <pre>/api/mountain</pre>:
      <code>{{ mountain }}</code>
    </article>
  </section>
</template>

<script setup>
  definePageMeta({
    title: 'About'
  })
  const { data: mountain } = await useFetch('/api/mountain')
</script>
