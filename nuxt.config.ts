import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: 'build',
  },

  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [{
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
          }],
        },
      }),
    ],
  },

  modules: [
    '@nuxt/test-utils/module'
  ],

  compatibilityDate: '2025-02-03',
})