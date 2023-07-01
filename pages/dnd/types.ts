/** Number of sides on a dice */
export type die = 4 | 6 | 8 | 10 | 12 | 20

/** All the die possible */
export type dieSet = Set<die>

/** Critical value */
export type crit = 'fail' | 'success'

/** Result of rolling a single die */
export interface roll {
  /** Number of sides on a dice */
  dice: die
  /** Natural result of a roll */
  natural: number
  /** Critical failure or success */
  critical?: crit
}

export interface rollMulti {
  /** Result of rolling a full hand of die */
  rolls: roll[]
  /** Modifier */
  mod: number
  /** Total natural result */
  totalNat: number
  /** Total result with modifier */
  totalDirty: number
}
