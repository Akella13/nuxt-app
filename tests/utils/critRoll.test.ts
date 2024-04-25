import {
  expect,
  test,
  describe,
} from 'vitest'

describe('critRoll', () => {
  test('Critical value of 10 is undefined', () => {
    expect(critRoll(10))
      .toBeUndefined()
  })

  test('Critical value of 1 is fail', () => {
    expect(critRoll(1))
      .toBe('fail')
  })

  test('Critical value of 20 is success', () => {
    expect(critRoll(20))
      .toBe('success')
  })
})