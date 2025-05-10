import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nuxt Luxon',
  description: 'Easy DateTime formatting & parsing with Luxon in Nuxt applications',
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      // { text: 'Examples', link: '/examples/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Api',
        items: [
          { text: 'useLuxon', link: '/api/useLuxon' },
          { text: 'Parsing', link: '/api/parsing' },
          { text: 'Formatting', link: '/api/formatting' },
          { text: 'Tokens', link: '/api/tokens' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dnldsht/nuxt-luxon' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Donald Shtjefni',
    },
  },
})
