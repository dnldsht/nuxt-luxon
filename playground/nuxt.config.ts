export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-05-23',
  i18n: {
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
    output: {
      locale: 'i18n',
    },
  },
})
