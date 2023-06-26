import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = toAnimate => {
  const tweened = reactive({ number: 0 })

  watch(toAnimate, n => {
    gsap.to(tweened, {
      duration: 0.5,
      number: Number(n.natural) || 0,
    })
  })

  return tweened
}