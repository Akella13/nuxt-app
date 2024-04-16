/** Number of sides on a dice */
export type die = typeof diceArr[number]
/** Number of sides on a damage dice */
export type dieDamage = Exclude<die, 20>
/** Number of sides on a d20 */
export type dieD20 = Extract<die, 20>

/** Kinds of resulting dice of multiple rolls */
export type adv = keyof typeof advBook

/** Critical value */
export type crit = keyof typeof critBook

/** Result of rolling a single dice */
export interface roll {
  /** Natural result of a roll */
  natural: number
  /** Critical failure or success */
  critical?: crit
}

/** Result of rolling multiple die */
export interface rollMultiNat {
  /** Natural result of rolling a full hand of die */
  rolls: roll[]
  /** Total natural result */
  totalNat: number
  /** Advantage type */
  adv?: adv
}
/** Dirty result of rolling multiple die */
export interface rollMultiDirty extends rollMultiNat {
  /** Modifier */
  mod: number
  /** Total result with modifier */
  totalDirty: number
}

/** Map of dice group */
export type diceMap<T> = Map<die, T>