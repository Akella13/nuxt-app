<template>
  <div>
    <Sprite style="display: none" />
    <svg class="svg">
      <use :href="`#d${dice}`" />
    </svg> 
  </div>
</template>

<script lang="ts" setup>
  import Sprite from '~~/assets/icons/Die.svg'

  const props = defineProps<{
    dice: number,
  }>()
</script>

<style>
  .svg {
    width: 100px;
    height: 100px;
    stroke: #000;
    fill: none;
  }
</style>