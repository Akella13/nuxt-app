import {
  expect,
  test,
  describe,
} from 'vitest'

describe('rollGroup.natural is > 0', () => {
  test('rolling d20 is <= 20', () => {
    expect(rollGroup([4]).totalNat)
      .toBeGreaterThan(0)
  })

  test('rollGroup.natural is <= max value of dice side * dice quantity', () => {
    expect(rollGroup([12, 8, 6,  6]).totalNat)
      .toBeLessThanOrEqual(32)
  })
})