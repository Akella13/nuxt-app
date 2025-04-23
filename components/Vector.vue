<template>
  <figure ref="container"
    class="die__container"
  >
    <svg class="die box">
      <use :href="`#d${dice}`" />
    </svg> 
    <figcaption class="die__value"
      :class="{ 'die__value--large': tweenedNumberPrinted.length > 1 }"
    >
      {{ tweenedNumberPrinted }}
    </figcaption>
  </figure>
  <button @click="toggleTimeline">
    Toggle Timeline
  </button>
</template>

<script setup lang="ts">
  //@ts-nocheck
  import type { die } from '~~/types'
  import gsap from 'gsap'

  /** Ref of a container, whose elements are animated */
  const container = ref()
  let animation, context

  /** Animation toggle event */
  const toggleTimeline = () => {
    animation.reversed(!animation.reversed())
  }

  onMounted(() => {
    context = gsap.context((self) => {
      const boxes = self.selector('.box')
      animation = gsap
        .to(boxes[0], {
          rotation: 360,
        })
        .reverse()
    }, container.value)
    // trigger initial animation
    toggleTimeline()
  })

  onUnmounted(() => {
    context.revert()
  })

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