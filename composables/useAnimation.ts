import gsap from 'gsap'

// by convention, composable function names start with "use"
export const useAnimation = () => {
  /** Context for killing animations and for defining a scope for selector text. */
  let context: gsap.Context

  /** Animation instance */
  let animation: gsap.core.Tween

  /** Ref of a container, whose elements are animated */
  const container = useTemplateRef('container')

  onMounted(() => {
    context = gsap.context(({ selector }) => {
      /** Scoped selector for container */
      if (selector) {
        animation = gsap
          .to(selector('.js__animated'), {
            rotation: 360,
          })
          .reverse()
      } else {
        throw new Error('Wrong animation context')
      }
    }, 
    /** Container scope for selector */
    container.value as HTMLElement)
  })

  onUnmounted(() => {
    // clean up all animations
    context.revert()
  })

  // animation is not assigned until mounted => return fucntion
  return () => animation
}