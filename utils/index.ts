import type {
  adv,
  die,
  crit,
  roll,
  rollMultiNat,
} from '~~/types'

/** Modifier of a characteristic stat */
export const calcMod = (stat: number = 0) => Math.floor((stat - 10) / 2)

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
  switch (dieArr.length) {
    case 0:
      throw new Error('No dice rolled => nothing to select from')
    case 1:
      // if only one dice was rolled => it is selected by default
      return dieArr[0]
    default:
      /** Copy of die array (to avoid mutation during cycle on early breaking) */
      const copy = [...dieArr]
      return copy.reduce((acc: number | number[], val, index, arr) => {
        // if there is no advantage
        if (haveAdv === 'straight') {
          // break the cycle on first loop
          // callback won't be called on second element, since there will be none
          arr.splice(0)
          // return whole array
          return dieArr
        } else if (Array.isArray(acc)) {
          // HACK: omit acc: number[], though cycle shouldn't reach here anyway
          throw new Error('dieArr.reduce() is not working properly')
        } else {
          // first loop
          if (acc === -1) {
            return val
          }
          // next loops
          if (haveAdv === 'adv') {
            // advantage
            return val > acc ? val : acc
          }
          // disadvantage
          return val < acc ? val : acc
        }
      }, -1)
  }
}

/** Result of rolling multiple die */
const rollNats = (dieArr: die[]) => {
  return dieArr.reduce((acc, val) => {
    /** Natural result of a single roll */
    const natural = rollDie(val)
    /** Accumulated sum of natural rolls by hand */
    const totalNat = acc.totalNat + natural
    /** Critical result of a single d20 roll */
    let critical: crit | undefined = undefined
    /** Accumulated d20s picked by hand */
    const d20s = [...acc.d20s]
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

/** Result of rolling multiple die from a hand */
export const rollResult = (
  dieArr: die[],
  oneFromMulti = {
    adv: false,
    dis: false,
  }
): rollMultiNat => {
  const { d20s, ...result } = rollNats(dieArr)

  // if at least one d20 present
  if (d20s.length > 0) {
    /** What kind of d20 roll is this */
    const haveAdv = whatAdv(oneFromMulti)
    /** One winning dice from multiple d20s */
    const d20Result = selectRoll(d20s, haveAdv)

    return {
      ...result,
      haveAdv,
      d20Result,
    }
  }

  return result
}
