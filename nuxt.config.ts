import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  typescript: {
    typeCheck: 'build',
  },
  vite: {
    plugins: [svgLoader()]
  }
})
