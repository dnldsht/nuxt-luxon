import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
    '@nuxtjs/i18n',
  ],
  i18n: {
    defaultLocale: 'it',
    strategy: 'no_prefix',
    locales: [
      { code: 'it' },
      { code: 'fi' },
    ],
  },
  luxon: {
    output: {
      zone: 'utc',
    },
  },
})
