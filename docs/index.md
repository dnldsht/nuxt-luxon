---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Nuxt Luxon"
  text: "Easy DateTime handling for Nuxt"
  tagline: Simple & powerful date/time formatting and parsing with Luxon in your Nuxt applications
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/dnldsht/nuxt-luxon

features:
  - icon: 🕰️
    title: Easy Formatting & Parsing
    details: Format and parse dates with a simple API, using predefined templates or custom formats
  - icon: 🧩
    title: Composable API
    details: Access date/time utilities with the useLuxon() composable or directly in your templates
  - icon: 🌐
    title: Global Utilities
    details: Use the $luxon plugin in your Vue templates with zero configuration
  - icon: 🎛️
    title: Fully Customizable
    details: Create custom templates, set default timezones, locales, and more via module options
  - icon: 📝
    title: TypeScript Support
    details: Fully typed API with TypeScript definitions for all features
  - icon: ✅
    title: Thoroughly Tested
    details: Reliable date handling you can trust in your applications
---

## Quick Example

```vue
<template>
  <!-- Format dates with predefined templates -->
  <p>Date (short): {{ $luxon(new Date(), 'short') }}</p>
  <p>Date (full): {{ $luxon(new Date(), 'full') }}</p>
</template>

<script setup>
const { $luxon, $lp } = useLuxon()

// Parse ISO date
const date = $lp('2025-05-10')

// Format with custom format
console.log($luxon(date, 'yyyy-MM-dd')) // '2025-05-10'
</script>
```

::: info
Integrates the [Luxon library](https://moment.github.io/luxon/) with Nuxt 3, providing a simple and powerful way to work with dates and times in your Nuxt applications.
:::

