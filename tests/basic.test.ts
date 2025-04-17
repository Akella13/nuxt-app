
import { fileURLToPath } from 'node:url'
import {
  describe,
  expect,
  it,
} from 'vitest'
import {
  setup,
  $fetch,
  isDev,
} from '@nuxt/test-utils'

describe('example', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true
  })

  it('Renders Hello Nuxt', async () => {
    // BUG: error TS2321: Excessive stack depth comparing types
    // @ts-ignore
    expect(await $fetch('/')).toMatch('Welcome to the homepage')
  })

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
    })
  }
})
