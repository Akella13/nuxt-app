/** Dice range */
const diceArr = [ 4, 6, 8, 10, 12, 20 ] as const

/** Advantage range */
const advBook = {
  adv: 'adv',
  dis: 'dis',
  straight: 'straight',
} as const

/** Critical roll range */
const critBook = {
  fail: 'fail',
  success: 'success',
} as const

const defaultColor = '#000000'

const animationConfig = {
  duration: 1,
  ease: 'bounce.out',
  stagger: 0.1,
} as const

const statsDefault = [
  {
    name: 'Strength',
    value: 18,
  },
  {
    name: 'Dexterity',
    value: 12,
  },
  {
    name: 'Constitution',
    value: 14,
  },
  {
    name: 'Intelligence',
    value: 8,
  },
  {
    name: 'Wisdom',
    value: 12,
  },
  {
    name: 'Charisma',
    value: 10,
  },
]

export {
  diceArr,
  advBook,
  critBook,
  defaultColor,
  animationConfig,
  statsDefault,
}
