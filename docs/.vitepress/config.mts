import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://nuxt-luxon.donld.me',
  },
  title: 'Nuxt Luxon',
  description: 'Format and parse dates in Nuxt with Luxon',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API', link: '/api/useLuxon', activeMatch: '/api/' },
      { text: 'Changelog', link: 'https://github.com/dnldsht/nuxt-luxon/blob/main/CHANGELOG.md' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Internationalization', link: '/guide/i18n' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'useLuxon', link: '/api/useLuxon' },
          { text: 'Formatting', link: '/api/formatting' },
          { text: 'Parsing', link: '/api/parsing' },
          { text: 'Tokens', link: '/api/tokens' },
        ],
      },
    ],
    editLink: {
      pattern: 'https://github.com/dnldsht/nuxt-luxon/edit/main/docs/:path',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dnldsht/nuxt-luxon' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/nuxt-luxon' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present <a href="https://donld.me">Donald Shtjefni</a>',
    },
  },
})
