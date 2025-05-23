
# Get Started with Nuxt Luxon

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
  modules: [
    'nuxt-luxon', // Add the module here
  ],
  // Default options
  luxon: {
    input: {
      zone: 'utc',
      format: 'iso',
    },
    output: {
      format: 'short',
      zone: 'local',
      locale: 'client',
    },
    templates: {
      // Custom templates
    },
  },
})
```

That's it! The module is now installed and ready to use in your Nuxt application.

## Usage

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
