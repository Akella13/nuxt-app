<template>
  <section ref="container">
    <slot :animation-class="animationClass" />
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

  const animationClass = 'js__animated'

  /** Ref of a container, whose elements are animated */
  const container = ref<HTMLElement>()

  /** Context for killing animations and for defining a scope for selector text. */
  let context: gsap.Context

  /** Animation timeline config */
  const timeline = gsap.timeline({
    defaults: {
      ...animationConfig,
      rotation: 360,
    },
  })

  onMounted(() => {
    // Set context for all animations
    context = gsap.context(self => {
      /** Trigger animation of the timeline */
      const animate = () => {
        timeline.to(self.selector?.(`.${animationClass}`), {}, '<')
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
