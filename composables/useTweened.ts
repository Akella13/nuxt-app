import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = (
  watcher: ComputedRef<{ value: number }>
) => {
  /** Reactive wrapper for a number to tween */
  const tweenedNumber = reactive({ value: 0 })

  /** Animating instance function */
  const animation = useAnimation()

  // $watch reactive object to change
  watch(watcher, async ({ value }) => {
    // trigger tween
    gsap.to(tweenedNumber, {
      value,
      duration: 1,
    })
    // wait for DOM update
    await nextTick()
    animation().restart()
  },
  // invoke it after component mounts for initial animation
  { immediate: true })

  return tweenedNumber
}