# Nuxt Luxon

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Wires [Luxon](https://moment.github.io/luxon/) into Nuxt: format a date in a template with `$luxon`, parse one in a script with `$lp`, and set the zone, locale and format once in `nuxt.config.ts`.

- [📚 &nbsp;Docs](https://nuxt-luxon.donld.me)
- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 &nbsp;Online playground](https://stackblitz.com/github/dnldsht/nuxt-luxon?file=playground%2Fapp.vue)

## Features

- 🕰️ Formatting and parsing through Luxon
- 🧩 19 built-in templates, plus the ones you name yourself
- 🌐 `$luxon` in templates, `useLuxon()` in scripts
- 🌍 Follows the `@nuxtjs/i18n` locale, on the client and during SSR
- 🎛️ Defaults for zone, locale and format set in `nuxt.config.ts`
- 📝 Types ship with the module

## Installation

```bash
# Using npm
npm install nuxt-luxon

# Using yarn
yarn add nuxt-luxon

# Using pnpm
pnpm add nuxt-luxon
```

## Setup

Add `nuxt-luxon` to the `modules` section of your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    output: { zone: 'Europe/Rome', locale: 'it' }, // optional
  },
})
```

## Basic Usage

```vue
<template>
  <div>
    <!-- Format dates with predefined templates -->
    <p>{{ $luxon(new Date()) }}</p>
    <p>{{ $luxon(new Date(), 'full') }}</p>
    
    <!-- Custom format strings -->
    <p>{{ $luxon(new Date(), 'yyyy-MM-dd') }}</p>
  </div>
</template>

<script setup>
// Access utilities via the composable
const { $luxon, $lp } = useLuxon()

// Parse dates
const parsedDate = $lp('2025-05-10')

// Format dates
const formattedDate = $luxon(parsedDate, 'full')
</script>
```

## Internationalization

With [`@nuxtjs/i18n`](https://i18n.nuxtjs.org) installed, dates follow the language the user is
browsing in, on the client and during server side rendering. Nothing else to configure:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon', '@nuxtjs/i18n'],
})
```

```vue
<template>
  <!-- en: July 12, 2024 at 12:23 PM UTC -->
  <!-- it: 12 luglio 2024 alle ore 12:23 UTC -->
  <p>{{ $luxon('2024-07-12T12:23:49.000Z', 'full') }}</p>
</template>
```

An explicit `output.locale` always wins, and you can set `locale: 'i18n'` on a single template or
call. See the [docs](https://nuxt-luxon.donld.me/guide/i18n).

## Custom Templates

A template names a set of options once and works for both parsing and formatting, so a date looks the same everywhere in the app.

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    templates: {
      userDate: {
        zone: 'local',
        format: 'dd MM yyyy',
      },
      serverAMS: {
        zone: 'Europe/Amsterdam',
        format: 'dd-MM-yyyy HH:mm:ss',
      },
      client: {
        zone: 'local',
        format: 'short',
      },
    }
  }
})
```

Use the name wherever a format goes:

```vue
<script setup>
const { $luxon, $lp } = useLuxon()

// Parse a date using a template
const parsedDate = $lp('15 05 2025', 'userDate')

// Format a date using a template
const amsterdamTime = $luxon(new Date(), 'serverAMS')
</script>
```

## API

### Composable: `useLuxon()`

Returns the formatting and parsing helpers:

```ts
const { $luxon, $lf, $lp } = useLuxon()
```

- `$luxon` / `$lf` - Format dates and times
- `$lp` - Parse dates and times

### Formatting: `$luxon(value, format?, inputFormat?)`

Formats a date value:

```ts
// Basic usage with predefined formats
$luxon(new Date(), 'short')       // '5/10/25, 12:00 PM'
$luxon('2025-05-10', 'full')      // 'May 10, 2025 at 12:00 PM UTC'
$luxon(1715270400000, 'date')     // '5/10/2025'

// Custom format
$luxon(new Date(), 'yyyy-MM-dd')  // '2025-05-10'

// With input format
$luxon('05/10/2025', 'full', 'MM/dd/yyyy')
```

### Parsing: `$lp(value, format?)`

Parses a value into a Luxon DateTime object:

```ts
// Parse from various formats
const date = $lp('2025-05-10')            // Parse ISO format
const fromUnix = $lp(1715270400, 'unix')  // Parse Unix timestamp (seconds)
const fromJs = $lp(new Date())            // Parse JS Date object

// Custom parsing
const custom = $lp('05/10/2025', 'MM/dd/yyyy')
```

### Built-in Templates

The module ships with 20 templates:

| Name | Description | Example |
|------|-------------|---------|
| `full` | Full date/time | May 10, 2025, 12:00 PM UTC |
| `fulls` | Full with seconds | May 10, 2025, 12:00:00 PM UTC |
| `huge` | Huge date/time | Saturday, May 10, 2025, 12:00 PM UTC |
| `med` | Medium date/time | May 10, 2025, 12:00 PM |
| `short` | Short date/time | 5/10/25, 12:00 PM |
| `date_full` | Full date | May 10, 2025 |
| `date` / `date_short` | Short date | 5/10/2025 |
| `time` | Simple time | 12:00 PM |
| `time24` | 24h time | 12:00 |
| And many more... | | |

## TypeScript Support

Type definitions ship with the module. No `@types` package to install.

## License

[MIT](./LICENSE)



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-luxon/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-luxon

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-luxon.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-luxon

[license-src]: https://img.shields.io/npm/l/nuxt-luxon.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-luxon

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
