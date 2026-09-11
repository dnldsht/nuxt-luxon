---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Nuxt Luxon"
  tagline: "Dates and times in Nuxt, handled by Luxon"
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/dnldsht/nuxt-luxon

features:
  - icon: 🧩
    title: Composable API
    details: Access date/time utilities with the useLuxon() composable
  - icon: 🎛️
    title: Configurable
    details: Set the default zone, locale and format in nuxt.config.ts, and name your own templates
  - icon: 🌍
    title: i18n Ready
    details: Dates follow the @nuxtjs/i18n locale, on the client and during SSR
  - icon: 📝
    title: TypeScript Support
    details: Type definitions ship with the module
  - icon: ✅
    title: Tested
    details: Parsing, formatting and the i18n locale are covered on client and server

---
## 
Nuxt Luxon wires [Luxon](https://moment.github.io/luxon/) into Nuxt. Format a date in a template with `$luxon`, parse one in a script with `$lp`, and set the zone, locale and format once in `nuxt.config.ts`.

