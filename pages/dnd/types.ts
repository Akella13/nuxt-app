/** Number of sides on a die */
export type die = 4 | 6 | 8 | 10 | 12 | 20

export type dieSet = Set<die>

export interface roll {
  die: die
  /** Result of a roll */
  result: number
}
