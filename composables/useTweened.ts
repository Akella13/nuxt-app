import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = (watcher: ComputedRef<{ value: number }>) => {
  /** reactive wrapper for a number to tween */
  const tweenedNumber = reactive({ value: 0 })

  // $watch reactive object to change => trigger tween()
  watch(watcher, ({ value }) => {
    gsap.to(tweenedNumber, {
      duration: 0.5,
      value,
    })
  },
  // invoke it immedeatly after component mounts for initial animation
  { immediate: true })

  return tweenedNumber
}