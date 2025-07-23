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
    context = gsap.context(self => {
      /** Elements to be animated in a timeline */
      const collectElements = (): HTMLCollection => self.selector?.('.js__animated')
      // if selector() is defined => animate timeline
      timeline.to(collectElements(), {})
      // declare an event for context
      self.add('addAnimations', async () => {
        // await render of new dom elements
        await nextTick()
        // add them to context
        timeline.to(collectElements(), {}, '<')
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
