import type {
  adv,
  die,
  rollMultiNat,
  naturalCollection,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod = (stat: number = 0) => Math.floor((stat - 10) / 2)

/** Random result of a die roll */
const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

/** What kind of d20 roll is this */
const whatAdv = ({
  adv = false,
  dis = false,
}) => {
  let haveAdv: adv
  if (adv && dis) {
    haveAdv = 'straight'
  } else if (adv) {
    haveAdv = 'adv'
  } else if (dis) {
    haveAdv = 'dis'
  } else {
    haveAdv = 'straight'
  }
  return haveAdv
}

/** Select one roll from multiple within one dice type */
const selectRoll = (
  prev: number,
  next: number,
  adv: adv = 'straight'
): number | void => {
  if (adv === 'adv') {
    return Math.max(prev, next)
  } else if (adv === 'dis') {
    return Math.min(prev, next)
  }
  return
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
    /** Natural result of a single roll */
    const natural = rollDie(val)
    /** Critical result of a single d20 roll */
    if (natural === 1) {
      acc.critical = 'fail'
    } else if (natural === 20) {
      acc.critical = 'success'
    }
    // TODO: assign totalNat using whatAdv & selectRoll
    const selected = selectRoll(acc.totalNat, natural, adv)
    if (selected) {
      acc.totalNat = selected
    } else {
      acc.totalNat += natural
    }
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

/** Result of rolling multiple die from a hand */
export const rollResult = (
  collection: Map<die, die[]>,
  oneFromMulti = {
    adv: false,
    dis: false,
  }
) => {
  // create new writable Map()
  const writableMap: naturalCollection = new Map()
  collection.forEach((diceGroup, key) => {
    writableMap.set(key, key === 20
      /** Roll group of d20s */
      ? rollGroup20(diceGroup, whatAdv(oneFromMulti))
      /** Roll group of damage die */
      : rollGroup(diceGroup)
    )
  })
  return writableMap
}
