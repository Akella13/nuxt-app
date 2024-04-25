import {
  expect,
  test,
  describe,
} from 'vitest'

describe('calcMod', () => {
  test('Modifier of 16 is +3', () => {
    expect(calcMod(16))
      .toEqual(3)
  })

  test('Modifier of 0 is -5', () => {
    expect(calcMod(0))
      .toEqual(-5)
  })
})