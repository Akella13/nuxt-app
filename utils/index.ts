import type {
  adv,
  die,
  crit,
  roll,
} from '~~/types'

// TODO: add 'stat' type
/** Modifier of a characteristic stat */
export const calcMod = (stat: number = 0) => Math.floor((stat - 10) / 2)

// TODO: add 'die' type
/** Random result of a die roll */
const rollDie = (sides: die = 20) => Math.round(Math.random() * (sides - 1)) + 1

/** What kind of d20 roll is this */
const whatAdv = (oneFromMulti = {
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
const selectRoll = (
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

/** Result of rolling multiple die */
const rollNats = (dieArr: die[]) => {
  return dieArr.reduce((acc, val) => {
    /** Natural result of a single roll */
    const natural = rollDie(val)
    /** Accumulated sum of natural rolls by hand */
    const totalNat = acc.totalNat + natural
    /** Critical result of a single d20 roll */
    let critical: crit
    /** Accumulated d20s picked by hand */
    const d20s = [ ...acc.d20s ]
    if (val === 20) {
      // add d20 roll result to d20s array
      d20s.push(natural)
      // if roll is critical
      if (natural === 1 || natural === 20) {
        // mutate roll: add crit
        critical = natural === 1 ? 'fail' : 'success'
      }
    }
    /** Accumulated rolls array */
    const rolls = [
      ...acc.rolls,
      {
        dice: val,
        natural,
        ...(critical && { critical }),
      },
    ]
    // accumulator return value
    return {
      totalNat,
      d20s,
      rolls,
    }
  }, {
    /** Sum of natural rolls by hand */
    totalNat: 0,
    /** Array of fresh rolled d20s */
    d20s: <number[]>[],
    /** Array of roll results */
    rolls: <roll[]>[],
  })
}

/** Result of rolling multiple die from a hande */
export const rollResult = (
  dieArr: die[],
  oneFromMulti = {
    adv: false,
    dis: false,
  }
) => {
  /** What kind of d20 roll is this */
  const haveAdv = whatAdv(oneFromMulti)

  const { d20s, totalNat, rolls } = rollNats(dieArr)

  /** One winning dice from multiple d20s */
  const d20Result = selectRoll(d20s, haveAdv)

  return {
    rolls,
    totalNat,
    haveAdv,
    d20Result,
  }
}