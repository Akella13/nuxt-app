import {
  expect,
  test,
  describe,
} from 'vitest'

describe('rollDie', () => {
  test('rolling d20 is <= 20', () => {
    expect(rollDie(undefined))
      .toBeLessThanOrEqual(20)
  })

  test('rolling d4 is >= 1', () => {
    expect(rollDie(4))
      .toBeGreaterThanOrEqual(1)
  })
})