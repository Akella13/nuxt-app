<template>
  <footer class="footer">
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    padding: 1em 0;
    background-color: map-get($colors, "blue");
  }
</style>
