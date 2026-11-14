export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', 'nuxt-luxon'],
  i18n: {
    defaultLocale: 'it',
    strategy: 'no_prefix',
    locales: [{ code: 'it' }, { code: 'en' }],
  },
})
