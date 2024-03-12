<template>
  <div class="die__container">
    <svg class="die">
      <use :href="`#d${dice}`" />
    </svg> 
    <div class="die__value">{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
  import type { die } from '~~/types'

  defineProps<{
    dice: die,
    value: string,
  }>()
</script>

<style lang="scss">
  .die {
    width: 100px;
    height: 100px;
    stroke: #000;
    fill: none;

    &__container {
      display: inline-block;
      position: relative;
    }

    &__value {
      position: absolute;
      left: 45%;
      top: 45%;
    }
  }
</style>