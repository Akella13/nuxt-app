<template>
  <figure ref="container"
    class="die__container"
  >
    <svg class="die js__animated">
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
  import type { die } from '~~/types'
  import gsap from 'gsap'

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

  /** Ref of a container, whose elements are animated */
  const container = ref<HTMLElement>()

  /** Animation instance */
  let animation: gsap.core.Tween

  /** Context for killing animations and for defining a scope for selector text. */
  let context: gsap.Context

  onMounted(() => {
    context = gsap.context(({ selector }) => {
      /** Scoped selector for container */
      if (selector) {
        /** Selected descendants */
        const boxes: HTMLElement[] = selector('.js__animated')
        animation = gsap
          .to(boxes, {
            rotation: 360,
          })
          .reverse()
      } else {
        throw new Error('Wrong animation context')
      }
    }, 
    /** Container scope for selector */
    container.value)
    // trigger initial animation
    toggleTimeline()
  })

  onUnmounted(() => {
    // clean up all animations
    context.revert()
  })

  /** Animation toggle event */
  const toggleTimeline = () => {
    animation.reversed(!animation.reversed())
  }
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