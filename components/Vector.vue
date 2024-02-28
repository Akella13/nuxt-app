<template>
  <div class="die__container">
    <Sprite style="display: none" />
    <svg class="die">
      <use :href="`#d${dice}`" />
    </svg> 
    <div class="die__value">{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
  import type { die } from '~~/types'
  import Sprite from '~~/assets/icons/Die.svg'

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