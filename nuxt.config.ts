// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    typeCheck: 'build',
  },
  modules: ['nuxt-svgo'],
  svgo: {
    // BUG: auto-import prevents from importing assets as an <img>
    // https://github.com/cpsoinos/nuxt-svgo/issues/138
    // this option should fix it, but it doesn't
    explicitImportsOnly: true,
    // // configure importing icons from directory
    // autoImportPath: './assets/other-icons/',
    // // use auto import but don't use the <nuxt-icon>
    // defaultImport: 'component',
    // // By default module registers all icons inside 'autoImportPath' globally
    // // it generates chunks for each icon to be used globally
    // global: false,
    // // disable auto importing
    // autoImportPath: false,
    // // Disable SVGO entirely:
    svgo: false,
  },
})
