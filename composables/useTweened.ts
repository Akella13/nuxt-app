import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = (
  watcher: ComputedRef<{ value: number }>
) => {
  /** Reactive wrapper for a number to tween */
  const tweenedNumber = reactive({ value: 0 })

  // $watch reactive object to change
  watch(watcher, ({ value }) => {
    // trigger tween
    gsap.to(tweenedNumber, {
      value,
      ...animationConfig,
    })
  },
  // invoke it after component mounts for initial animation
  { immediate: true })

  return tweenedNumber
}