import type {
  adv,
  die,
} from '~~/types'
// TODO: add 'die' type
/** Random result of a die roll */
export const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

// TODO: add 'stat' type
/** Modifier of a characteristic stat */
export const calcMod = (stat: number = 0) => Math.floor((stat - 10) / 2)

/** What kind of d20 roll is this */
export const whatAdv = (oneFromMulti = {
  adv: false,
  dis: false,
}) => {
  let haveAdv: adv
  if (oneFromMulti.adv && oneFromMulti.dis) {
    haveAdv = 'straight'
  } else if (oneFromMulti.adv) {
    haveAdv = 'adv'
  } else if (oneFromMulti.dis) {
    haveAdv = 'dis'
  } else {
    haveAdv = 'straight'
  }
  return haveAdv
}

/** Select one roll from multiple within one dice type */
export const selectRoll = (
  dieArr: number[] = [],
  haveAdv: adv = 'straight'
) => {
  return dieArr.reduce((prev, cur, ind, arr) => {
    // first loop
    if (prev === undefined) {
      return cur
    }
    // next loops
    if (haveAdv === 'adv') {
      if (cur > prev) {
        return cur
      }
      return prev
    } else if (haveAdv === 'dis') {
      if (cur < prev) {
        return cur
      }
      return prev
    } else {
      return arr
    }
  }, undefined)
}