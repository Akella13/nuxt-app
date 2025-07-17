<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type {
    rollMultiNat,
    diceMap,
  } from '~~/types'
  import gsap from 'gsap'

  /** Last roll object */
  const useLastRoll = useState<diceMap<rollMultiNat>>('lastRoll')

  /** Ref of a container, whose elements are animated */
  const container = ref<HTMLElement>()

  /** Context for killing animations and for defining a scope for selector text. */
  let context: gsap.Context

  /** Animation timeline config */
  const timeline = gsap.timeline({
    defaults: {
      rotation: 360,
      duration: 1,
      ease: 'bounce.out',
    },
  })

  onMounted(() => {
    context = gsap.context(({ selector }) => {
      // if selector() is defined => animate timeline
      timeline.to(selector?.('.js__animated'), {})
      /** Container scope for selector */
    }, container.value)
  })

  onUnmounted(() => {
    // clean up all animations
    context.revert()
  })

  watch(useLastRoll, () => {
    // BUG: freshly added dice of the same type are not animated
    timeline.restart()
  })

</script>
