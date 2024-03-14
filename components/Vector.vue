<template>
  <div class="die__container">
    <svg class="die">
      <use :href="`#d${dice}`" />
    </svg> 
    <div class="die__value">
      {{ tweenedNumber.value.toFixed(0) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Props } from '~/composables/useTweened';

  const props = defineProps<Props>()

  /** tweened natural roll value */
  const tweenedNumber = useTweened(props)
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