import gsap from 'gsap'
import type { die } from '~~/types'

export interface Props{
  dice: die
  value: number
}

/** Animated state number transition */
export const useTweened = (props: Props) => {
  /** reactive wrapper for a number to tween */
  const tweenedNumber = reactive({
    value: 0,
  })

  // $watch reactive object to change => trigger tween()
  watch(props, ({ value }) => {
    gsap.to(tweenedNumber, {
      duration: 0.5,
      value,
    })
  },
  // invoke it immedeatly after component mounts for initial animation
  { immediate: true }
  )

  return tweenedNumber
}