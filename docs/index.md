---
layout: home

hero:
  name: Nuxt Luxon
  text: Dates without the boilerplate
  tagline: Format and parse dates in your Nuxt app with Luxon. Set the zone, locale and format once, then write <code>$luxon(date)</code>.
  image:
    src: /logo.svg
    alt: Nuxt Luxon
  actions:
    - theme: brand
      text: Get started
      link: /guide/
    - theme: alt
      text: API
      link: /api/useLuxon

features:
  - title: One call in the template
    details: <code>$luxon(order.createdAt, 'date_med')</code> parses the API string, converts the zone and formats it.
  - title: Your formats, named
    details: Define <code>invoice</code> or <code>server</code> once in <code>nuxt.config.ts</code> and use the name everywhere. Editors autocomplete it.
  - title: Follows @nuxtjs/i18n
    details: Dates switch language with the rest of the app, and the server renders the same locale as the client.
  - title: Empty values render empty
    details: <code>$luxon(null)</code> gives you <code>''</code>, so a missing <code>deletedAt</code> needs no <code>v-if</code>.
---

<div class="vp-doc" style="max-width: 688px; margin: 64px auto 0; padding: 0 24px;">

## In practice

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    output: { zone: 'Europe/Rome', locale: 'it' },
    templates: {
      invoice: { format: 'dd/MM/yyyy' },
    },
  },
})
```

```vue
<template>
  <p>{{ $luxon(order.createdAt, 'full') }}</p>
  <!-- 12 luglio 2024 alle ore 14:23 CEST -->

  <p>{{ $luxon(order.paidAt, 'invoice') }}</p>
  <!-- 12/07/2024 -->
</template>
```

</div>
