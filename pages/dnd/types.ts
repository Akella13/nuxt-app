/** Number of sides on a dice */
export type die = 4 | 6 | 8 | 10 | 12 | 20

/** All the die possible */
export type dieSet = Set<die>

/** Result of rolling a single die */
export interface roll {
  /** Number of sides on a dice */
  dice: die
  /** Natural result of a roll */
  natural: number
  /** Modifier */
  mod: number
  /** Total result (with modifier) */
  dirty: number
}
