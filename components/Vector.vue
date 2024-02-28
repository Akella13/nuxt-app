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
  import type { die } from 'types';
  import Sprite from '~~/assets/icons/Die.svg'

  defineProps<{
    dice: die,
    value: string,
  }>()
</script>

<style>
  .die {
    width: 100px;
    height: 100px;
    stroke: #000;
    fill: none;
  }

  .die__container {
    display: inline-block;
    position: relative;
  }

  .die__value {
    position: absolute;
    left: 45%;
    top: 45%;
  }
</style>