import gsap from 'gsap'

/** Animated state number transition */
export const useTweened = toAnimate => {
  let tweenedRolls = reactive([])

  watch(toAnimate, n => {
    n.forEach((roll, index) => {
      tweenedRolls[index] = { number: 0 }
    });
    
    gsap.to(tweenedRolls, {
      duration: 0.5,
      number: function(index) {
        const value = n[index].natural
        return value || 0
      },
    })
  })

  return tweenedRolls
}