# Getting Started

Welcome to Nuxt Luxon! This guide will help you get up and running with date and time formatting in your Nuxt application.

## Introduction

Nuxt Luxon integrates the powerful [Luxon library](https://moment.github.io/luxon/) with Nuxt 3, providing a simple and intuitive way to work with dates and times in your application. Whether you need to format dates for display, parse user inputs, or perform complex date calculations, Nuxt Luxon makes it easy and consistent.

## Features

- 🕰️ Easy DateTime formatting & parsing with Luxon
- 🧩 Predefined templates for common date formats
- 🌐 Global date/time utilities via composables
- 🎛️ Fully customizable via module options
- 📝 Fully typed with TypeScript support
- ✅ Thoroughly tested for reliability

## Installation

::: code-group
```bash [npm]
npm install nuxt-luxon
```

```bash [yarn]
yarn add nuxt-luxon
```

```bash [pnpm]
pnpm add nuxt-luxon
```
:::

## Setup

Add `nuxt-luxon` to the `modules` section of your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon']
})
```

That's it! The module is now installed and ready to use in your Nuxt application.

## Basic Usage

### In Templates

You can use the `$luxon` helper in your Vue templates to format dates:

```vue
<template>
  <div>
    <!-- Format dates with predefined templates -->
    <p>Today (short): {{ $luxon(new Date(), 'short') }}</p>
    <p>Today (full): {{ $luxon(new Date(), 'full') }}</p>
    
    <!-- Custom format strings -->
    <p>Custom format: {{ $luxon(new Date(), 'yyyy-MM-dd') }}</p>
  </div>
</template>
```

### In JavaScript/TypeScript

For more advanced usage, you can access all the utilities via the `useLuxon` composable:

```vue
<script setup>
// Import the composable
const { $luxon, $lp } = useLuxon()

// Parse dates
const parsedDate = $lp('2025-05-10')
console.log(parsedDate.toISO()) // '2025-05-10T00:00:00.000Z'

// Format dates
const formattedDate = $luxon(parsedDate, 'full')
console.log(formattedDate) // 'May 10, 2025, 12:00 PM UTC'
</script>
```

## Quick Reference

### Formatting Dates: `$luxon` (or `$lf`)

```ts
// Basic usage with predefined formats
$luxon(new Date(), 'short')       // '5/10/25, 12:00 PM'
$luxon('2025-05-10', 'full')      // 'May 10, 2025 at 12:00 PM UTC'
$luxon(1715270400000, 'date')     // '5/10/2025'

// Custom format
$luxon(new Date(), 'yyyy-MM-dd')  // '2025-05-10'
```

### Parsing Dates: `$lp`

```ts
// Parse from various formats
const date = $lp('2025-05-10')            // Parse ISO format
const fromUnix = $lp(1715270400, 'unix')  // Parse Unix timestamp (seconds)
const fromJs = $lp(new Date())            // Parse JS Date object

// Custom parsing
const custom = $lp('05/10/2025', 'MM/dd/yyyy')
```

## Next Steps

- Learn about [configuration options](/guide/configuration) to customize Nuxt Luxon for your project
- Explore the [built-in templates](/guide/templates) for quick and consistent formatting
- Check out the [API reference](/api/) for detailed information on all available methods
