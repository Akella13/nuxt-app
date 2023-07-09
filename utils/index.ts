// TODO: add 'die' type
/** Random result of a die roll */
export const rollDie = (sides: number) => Math.round(Math.random() * (sides - 1)) + 1

// TODO: add 'stat' type
/** Modifier of a characteristic stat */
export const calcMod = (stat: number) => Math.floor((stat - 10) / 2)