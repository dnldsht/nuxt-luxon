export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/i18n',
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
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'fi',
        name: 'Finnish',
        file: 'fi.json',
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json',
      },
    ],
  },
  luxon: {
    templates: {
      my_template: {
        format: 'yyyy___MM______dd',
      },
    },
  },
})
