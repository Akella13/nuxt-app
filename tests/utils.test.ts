import {
  expect,
  test,
  describe,
} from 'vitest'

describe('calcMod', () => {
  test('Modifier of 16 is +3', () => {
    expect(calcMod(16)).toEqual(3)
  })
  test('Modifier of 0 is -5', () => {
    expect(calcMod(0)).toEqual(-5)
  })
})
describe('selectRoll', () => {
  test('Advantage (2, 3) => 3', () => {
    expect(selectRoll(2, 3, 'adv')).toBe(3)
  })
  test('Disadvantage (2, 3) => 2', () => {
    expect(selectRoll(2, 3, 'dis')).toBe(2)
  })
  test('Disadvantage (3, 3) => 3', () => {
    expect(selectRoll(3, 3, 'dis')).toBe(3)
  })
  test('Straight roll (2, 3) => undefined', () => {
    expect(selectRoll(2,3)).toBe(undefined)
  })
})
describe('rollDie', () => {
  test('rolling d20 is <= 20', () => {
    expect(rollDie(undefined)).toBeLessThanOrEqual(20)
  })
  test('rolling d4 is >= 1', () => {
    expect(rollDie(4)).toBeGreaterThanOrEqual(1)
  })
})
