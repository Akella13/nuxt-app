import {
  expect,
  test,
  describe,
} from 'vitest'

describe('rollDie', () => {
  test('rolling d20 is <= 20', () => {
    expect(rollDie())
      .toBeLessThanOrEqual(20)
  })

  test('rolling d4 is > 0', () => {
    expect(rollDie(4))
      .toBeGreaterThan(0)
  })
})