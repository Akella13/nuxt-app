<template>
  <figure class="die__container">
    <svg class="die">
      <use :href="`#d${dice}`" />
    </svg> 
    <figcaption class="die__value"
      :class="{ 'die__value--large': tweenedNumberPrinted.length > 1 }"
    >
      {{ tweenedNumberPrinted }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
  import type { die } from '~~/types'

  const props = defineProps<{
    dice: die,
    value: number,
  }>()

  /** props must be extendable => new reactive entity that will be watched for changes */
  const valueWatcher = computed(() => ({ value: props.value }))

  /** tweened natural roll value */
  const tweenedNumber = useTweened(valueWatcher)

  /** tweened natural roll integer */
  const tweenedNumberPrinted = computed(() => tweenedNumber.value.toFixed(0))

  const diceColor = useState<string>('diceColor')
</script>

<style lang="scss" scoped>
  .die {
    width: 100px;
    height: 100px;
    stroke: v-bind(diceColor);
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

      &--large {
        left: 40%;
      }
    }
  }
</style>