<template>
  <figure class="die__container">
    <svg class="die">
      <use :href="`#d${dice}`" />
    </svg> 
    <figcaption class="die__value">
      {{ tweenedNumber.value.toFixed(0) }}
    </figcaption>
  </figure>
</template>

<script lang="ts" setup>
  import type { die } from '~~/types'

  const props = defineProps<{
    dice: die,
    value: number,
  }>()

  /** props must be extendable => new reactive entity that will be watched for changes */
  const valueWatcher = computed(() => ({ value: props.value }))

  /** tweened natural roll value */
  const tweenedNumber = useTweened(valueWatcher)
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
      margin: unset;
    }

    &__value {
      position: absolute;
      left: 45%;
      top: 45%;
    }
  }
</style>