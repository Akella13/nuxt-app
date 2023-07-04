import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = toAnimate => {
  // Only works if tweenedRolls are same length as rolls
  // TODO: find a way to declare tweenedRolls on watch triggering
  const tweenedRolls = reactive([
    { number: 0 },
    { number: 0 },
    { number: 0 },
    { number: 0 },
    { number: 0 },
  ])

  watch(toAnimate, n => {
      gsap.to(tweenedRolls, {
        duration: 0.5,
        number: function(index) {
          const value = n.rolls[index].natural
          return value || 0
        },
      })
  })

  return tweenedRolls
}