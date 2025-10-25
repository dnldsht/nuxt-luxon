export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/ui',
  ],
  ssr: false,
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/css/main.css',
  ],
  compatibilityDate: '2025-05-23',
  luxon: {
    templates: {
      my_template: {
        format: 'yyyy___MM______dd',
      },
    },
  },
})
