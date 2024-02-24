import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  typescript: {
    typeCheck: 'build',
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // https://github.com/svg/svgo/issues/1962
                  // disable plugins
                  removeHiddenElems: false, // don't remove invisible elements
                  removeUselessDefs: false, // don't remove unused symbols
                  cleanupIds: false // don't remove symbol ids
                },
              },
            },
          ],
        },
      }),
    ],
  },
})
