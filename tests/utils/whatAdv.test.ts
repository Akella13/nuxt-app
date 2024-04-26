import {
  expect,
  test,
  describe,
} from 'vitest'

describe('whatAdv', () => {
  test('Advantage', () => {
    expect(whatAdv({ adv: true }))
      .toBe('adv')
  })

  test('Disdvantage', () => {
    expect(whatAdv({ dis: true }))
      .toBe('dis')
  })

  test('Straight roll', () => {
    expect(whatAdv({
      adv: false,
      dis: false,
    }))
      .toBe('straight')
  })

  test('Cancelling straight roll', () => {
    expect(whatAdv({
      adv: true,
      dis: true,
    }))
      .toBe('straight')
  })
})