import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nuxt Luxon',
  description: 'Easy DateTime formatting & parsing with Luxon in Nuxt applications',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
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
