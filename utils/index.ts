import type {
  adv,
  die,
  rollMultiNat,
  diceMap,
  crit,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod = (stat: number = 0) => Math.floor((stat - 10) / 2)

/** Random result of a die roll */
const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

/** What kind of d20 roll is this */
const whatAdv = ({
  adv = false,
  dis = false,
}): adv => {
  if (adv && dis) {
    return 'straight'
  } else if (adv) {
    return 'adv'
  } else if (dis) {
    return 'dis'
  }
  return 'straight'
}

/** Select one roll from multiple within one dice type */
const selectRoll = (
  prev: number,
  next: number,
  adv: adv = 'straight'
): number | void => {
  switch (adv) {
    case 'adv': return Math.max(prev, next)
    case 'dis': return Math.min(prev, next)
    default: return
  }
}

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
/** Result of rolling multiple die */
const rollGroup20 = (dieArr: die[], adv: adv = 'straight') => {
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

/** Critical result of a single d20 roll */
const critRoll = (natural: number): crit | undefined => {
  switch (natural) {
    case 1: return 'fail'
    case 20: return 'success'
    default: return
  }
}
