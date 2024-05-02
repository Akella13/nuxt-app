import type {
  adv,
  die,
  rollMultiNat,
  diceMap,
  crit,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod  = (stat = 10) => Math.floor((stat - 10) / 2)

/** Random result of a die roll */
export const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

/** Select one roll from multiple within one dice type */
export const selectRoll = (
  prev: number,
  next: number,
  adv: adv = advBook.straight
): number | void => {
  /** if first dice is 0 => always choose the other dice */
  if (prev === 0) return next
  switch (adv) {
    case advBook.adv: return Math.max(prev, next)
    case advBook.dis: return Math.min(prev, next)
    default: return
  }
}

/** Critical result of a single d20 roll */
export const critRoll = (natural: number): crit | void => {
  switch (natural) {
    case 1: return critBook.fail
    case 20: return critBook.success
    default: return
  }
}

/** Result of rolling multiple d20s */
const rollGroup = (
  dieArr: die[],
  adv?: adv
) => {
  return dieArr.reduce((acc: rollMultiNat, val) => {
    /** Natural result of a roll */
    const natural = rollDie(val)
    /** Add result to group totalNat or select adv/dis */
    acc.totalNat = selectRoll(acc.totalNat, natural, adv)
      ?? acc.totalNat + natural
    /** Critical value of a d20 roll */
    const critical = val === 20 && critRoll(natural)
    // add dice to group
    acc.rolls.push({ 
      natural,
      ...(critical && { critical }),
    })
    return acc
  }, {
    totalNat: 0,
    rolls: [],
    adv,
  })
}

/** What kind of d20 roll is this */
export const whatAdv = ({
  adv = false,
  dis = false,
}): adv => {
  if (adv && dis) return advBook.straight
  else if (adv) return advBook.adv
  else if (dis) return advBook.dis
  return advBook.straight
}

/** Result of rolling multiple die from a hand */
export const rollResult = (
  diceMap: diceMap<die[]>,
  oneFromMulti = {
    adv: false,
    dis: false,
  }
) => {
  const writableMap: diceMap<rollMultiNat> = new Map()
  diceMap.forEach((diceGroup, key) => {
    writableMap.set(key, rollGroup(
      diceGroup,
      key === 20 ? whatAdv(oneFromMulti) : undefined
    ))
  })
  return writableMap
}
