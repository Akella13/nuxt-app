import gsap from 'gsap'

// by convention, composable function names start with "use"
export const useAnimation = (container: Ref<HTMLElement>) => {
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
  })

  onUnmounted(() => {
    // clean up all animations
    context.revert()
  })

  // animation is not assigned until mounted => return fucntion
  return () => animation
}