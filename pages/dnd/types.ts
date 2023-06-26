/** Number of sides on a die */
export type die = 4 | 6 | 8 | 10 | 12 | 20

export type dieSet = Set<die>

export interface roll {
  /** Number of sides on a die */
  die: die
  /** Natural result of a roll */
  natural: number
  /** Modifier */
  mod: number
  /** Total result (with modifier) */
  dirty: number
}
