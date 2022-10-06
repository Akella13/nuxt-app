<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <NuxtExampleLayout example="server/routes">
      <p>Fetched from <pre>/api/mountain</pre>: {{ mountain }}</p>
    </NuxtExampleLayout>
  </section>
</template>

<script setup>
  const { data: mountain } = await useFetch('/api/mountain')
</script>
