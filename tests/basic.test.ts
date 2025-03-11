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

  // BUG: error TS2321: Excessive stack depth comparing types
  // it('Renders Hello Nuxt', async () => {
  //   expect(await $fetch('/')).toMatch('Welcome to the homepage')
  // })

  if (isDev()) {
    // error TS2321: Excessive stack depth comparing types
    // it('[dev] ensure vite client script is added', async () => {
    //   expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"')
    // })
  }
})
