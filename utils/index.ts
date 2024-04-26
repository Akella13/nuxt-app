import type {
  adv,
  die,
  rollMultiNat,
  diceMap,
  crit,
  dieDamage,
  dieD20,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod  = (stat = 10) => Math.floor((stat - 10) / 2)

/** Random result of a die roll */
export const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

class Roll {
  /** Natural result of a roll */
  natural

  constructor (sides: die) {
    this.natural = rollDie(sides)
  }
}

/** Result of rolling multiple damage die */
const rollGroup = (dieArr: dieDamage[]) => {
  return dieArr.reduce((acc: rollMultiNat, val) => {
    const { natural } = new Roll(val)
    // add result to group totalNat
    acc.totalNat += natural
    // add dice to group
    acc.rolls.push({ natural })
    return acc
  }, {
    totalNat: 0,
    rolls: [],
  })
}

/** Critical result of a single d20 roll */
export const critRoll = (natural: number): crit | void => {
  switch (natural) {
    case 1: return critBook.fail
    case 20: return critBook.success
    default: return
  }
}

class Roll20 extends Roll {
  /** Critical value of a d20 roll */
  critical

  constructor (sides: dieD20) {
    super(sides)
    this.critical = critRoll(this.natural)
  }
}

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

/** Result of rolling multiple d20s */
const rollGroup20 = (
  dieArr: dieD20[],
  adv: adv = advBook.straight
) => {
  return dieArr.reduce((acc: rollMultiNat, val) => {
    const {
      natural,
      critical,
    } = new Roll20(val)
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
    writableMap.set(key, key === 20
      ? rollGroup20(diceGroup as dieD20[], whatAdv(oneFromMulti))
      : rollGroup(diceGroup as dieDamage[])
    )
  })
  return writableMap
}
