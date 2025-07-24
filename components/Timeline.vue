<template>
  <section ref="container">
    <slot />
  </section>
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
      stagger: 0.1,
    },
  })

  onMounted(() => {
    // Set context for all animations
    context = gsap.context(self => {
      /** Trigger animation of the timeline */
      const animate = () => {
        timeline.to(self.selector?.('.js__animated'), {}, '<')
      }
      animate()
      // declare an event for context
      self.add('addAnimations', async () => {
        // await render of new dom elements
        await nextTick()
        // add them to context
        animate()
      })
      /** Container scope for selector */
    }, container.value)
  })

  onUnmounted(() => {
    // clean up all animations
    context.revert()
  })

  watch(useLastRoll, () => {
    // add new animations to context
    context.addAnimations()
    // play all animations
    timeline.restart()
  })

</script>
