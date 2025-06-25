import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: 'build',
  },

  app: {
    head: {
      link: [{
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css',
      }]
    },
    rootAttrs: {
      class: 'root',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_vars.scss" as *;'
        }
      }
    },
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

  css: ['~/assets/styles/main.scss'],

  // BUG: firefox warning
  // https://github.com/FortAwesome/Font-Awesome/issues/19925
  googleFonts: {
    families: {
      'Cinzel Decorative': true,
    },
  },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxtjs/google-fonts',
  ],

  compatibilityDate: '2025-02-03',
})