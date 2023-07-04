import gsap from 'gsap'
import { roll } from '~~/pages/dnd/types'

/** Animated state number transition */
export const useTweened = toAnimate => {
  /** Reactive array of numbers, waiting to be animated */
  const tweenedRolls = reactive<{ number: number }[]>([])

  watch(toAnimate, n => {
    // cycle through natural rolls
    n.rolls.forEach((roll: roll, index: number) => {
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
  })

  return tweenedRolls
}