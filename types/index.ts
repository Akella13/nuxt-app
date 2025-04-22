/** Number of sides on a dice */
export type die = typeof diceArr[number]

/** Kinds of resulting dice of multiple rolls */
export type adv = keyof typeof advBook

/** Critical value */
export type crit = keyof typeof critBook

/** Total */
export type total = number | number []

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
  totalNat: total
  /** Advantage type */
  adv?: adv
}
/** Dirty result of rolling multiple die */
export interface rollMultiDirty extends rollMultiNat {
  /** Modifier */
  mod: number
  /** Total result with modifier */
  totalDirty: total
}

/** Map of dice group */
export type diceMap<T> = Map<die, T>

/** Index Signature */
export interface Sign {
  [key: string]: any;
}
