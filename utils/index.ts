import type {
  adv,
  die,
  rollMultiNat,
  diceMap,
  crit,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod  = (stat = 10) => Math.floor((stat - 10) / 2)

/** Select one roll from multiple within one dice type */
export const selectRoll = (
  prev: number,
  next: number,
  adv: adv = advBook.straight
): number | void => {
  switch (adv) {
    case advBook.adv: return Math.max(prev, next)
    case advBook.dis: return Math.min(prev, next)
    default: return
  }
}

/** Random result of a die roll */
const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

/** Result of rolling multiple die */
const rollGroup = (dieArr: die[]) => {
  return dieArr.reduce((acc: rollMultiNat, val: die) => {
    /** Natural result of a single roll */
    const natural = rollDie(val)
    // add result to group totalNat
    acc.totalNat += natural
    // add dice to group
    acc.rolls.push({ natural })
    return acc
  }, {
    /** Sum of natural rolls by hand */
    totalNat: 0,
    /** Array of roll results */
    rolls: [],
  })
}

/** Critical result of a single d20 roll */
const critRoll = (natural: number): crit | void => {
  switch (natural) {
    case 1: return critBook.fail
    case 20: return critBook.success
    default: return
  }
}

/** Result of rolling multiple die */
const rollGroup20 = (
  dieArr: die[],
  adv: adv = advBook.straight
) => {
  return dieArr.reduce((acc: rollMultiNat, val: die) => {
    const natural = rollDie(val)
    const critical = critRoll(natural)
    const selected = selectRoll(acc.totalNat, natural, adv)
    if (selected) {
      acc.totalNat = selected
    } else {
      acc.totalNat += natural
    }
    // add dice to group
    acc.rolls.push({ 
      natural,
      ...(critical && { critical }),
     })
    return acc
  }, {
    /** Sum of natural rolls by hand */
    totalNat: 0,
    /** Array of roll results */
    rolls: [],
    /** Type of advantage */
    adv,
  })
}

/** What kind of d20 roll is this */
const whatAdv = ({
  adv = false,
  dis = false,
}): adv => {
  if (adv && dis) {
    return advBook.straight
  } else if (adv) {
    return advBook.adv
  } else if (dis) {
    return advBook.dis
  }
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
    writableMap.set(key, key === 20
      /** Roll group of d20s */
      ? rollGroup20(diceGroup, whatAdv(oneFromMulti))
      /** Roll group of damage die */
      : rollGroup(diceGroup)
      )
  })
  return writableMap
}
