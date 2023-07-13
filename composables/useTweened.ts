import gsap from 'gsap'
import { rollMultiDirty } from '~~/types'

/** Animated state number transition */
export const useTweened = toAnimate => {
  /** Reactive array of numbers, waiting to be animated */
  const tweenedRolls = reactive<{ number: number }[]>([])

  // each time lastRoll changes => update tweenedRolls
  watch(toAnimate, (lastRoll: rollMultiDirty) => {
    // cycle through natural rolls
    lastRoll.rolls.forEach((roll, index: number) => {
      // if reactive object is not initialized, do so
      if (!tweenedRolls[index]) {
        // assign reactive object with a number
        tweenedRolls[index] = { number: 0 }
      }
      // animate number to a value of natural roll
      gsap.to(tweenedRolls[index], {
        duration: 0.5,
        number: roll.natural || 0
      })
    })
  },
  // eager watcher: because <History> renders conditionally
  { immediate: true })

  return tweenedRolls
}