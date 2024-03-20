/** Kinds of resulting dice of multiple rolls */
export type adv = 'adv' | 'dis' | 'straight'

/** Number of sides on a dice */
export type die = 4 | 6 | 8 | 10 | 12 | 20

/** Critical value */
export type crit = 'fail' | 'success'

// TODO: flatten roll
/** Result of rolling a single dice */
export interface roll {
  /** Natural result of a roll */
  natural: number
}

/** Result of rolling multiple die */
export interface rollMultiNat {
  /** Natural result of rolling a full hand of die */
  rolls: roll[]
  /** Total natural result */
  totalNat: number
  /** Critical failure or success */
  critical?: crit
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