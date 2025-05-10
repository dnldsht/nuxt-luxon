# Nuxt Luxon

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Integrates the [Luxon library](https://moment.github.io/luxon/) with Nuxt 3, providing a simple and powerful way to work with dates and times in your Nuxt application.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/dnldsht/nuxt-luxon?file=playground%2Fapp.vue)

## Features

- 🕰️ Easy DateTime formatting & parsing with Luxon
- 🧩 Predefined templates for common date formats
- 🌐 Global date/time utilities via composables
- 🎛️ Fully customizable via module options
- 📝 Fully typed with TypeScript support
- ✅ Thoroughly tested for reliability

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
  modules: ['nuxt-luxon']
})
```

## Basic Usage

```vue
<template>
  <div>
    <!-- Format dates with predefined templates -->
    <p>Date (short): {{ $luxon(new Date(), 'short') }}</p>
    <p>Date (full): {{ $luxon(new Date(), 'full') }}</p>
    
    <!-- Custom format strings -->
    <p>Custom format: {{ $luxon(new Date(), 'yyyy-MM-dd') }}</p>
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

## Configuration

You can customize the default options and add your own templates in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    // Default input options
    input: {
      zone: 'utc',      // Default timezone for parsing
      format: 'iso',    // Default format for parsing
    },
    
    // Default output options
    output: {
      format: 'short', // Default output format
      // You can also specify locale, timezone, etc.
    },
    
    // Custom templates
    templates: {
      my_custom_format: { 
        format: 'yyyy___MM___dd',
      },
      // You can also override built-in templates
    }
  }
})
```

## Custom Templates

Templates can be used for both parsing and formatting dates. This is especially useful when you need consistent date formats across your application or when working with specific regional formats.

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    templates: {
      userDate: {
        zone: 'client',
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

Then you can use these templates for both parsing and formatting:

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

The main composable that provides formatting and parsing utilities:

```ts
const { $luxon, $lf, $lp } = useLuxon()
```

- `$luxon` / `$lf` - Format dates and times
- `$lp` - Parse dates and times

### Formatting: `$luxon(value, format?, inputFormat?)`

Format a date value using the specified format:

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

Parse a value into a Luxon DateTime object:

```ts
// Parse from various formats
const date = $lp('2025-05-10')            // Parse ISO format
const fromUnix = $lp(1715270400, 'unix')  // Parse Unix timestamp (seconds)
const fromJs = $lp(new Date())            // Parse JS Date object

// Custom parsing
const custom = $lp('05/10/2025', 'MM/dd/yyyy')
```

### Built-in Templates

The module includes several predefined format templates:

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

This module includes TypeScript definitions for all features.

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
