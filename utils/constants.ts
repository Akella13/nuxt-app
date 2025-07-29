/** Dice range */
export const diceArr = [ 4, 6, 8, 10, 12, 20 ] as const

/** Advantage range */
export const advBook = {
  adv: 'adv',
  dis: 'dis',
  straight: 'straight',
} as const

/** Critical roll range */
export const critBook = {
  fail: 'fail',
  success: 'success',
} as const

export const defaultColor = '#000000'

export const animationConfig = {
  duration: 1,
  ease: 'bounce.out',
  stagger: 0.1,
} as const
