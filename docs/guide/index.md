# Getting started

Nuxt Luxon adds [Luxon](https://moment.github.io/luxon/) to your Nuxt app as two helpers: `$luxon` formats a date, `$lp` parses one into a Luxon `DateTime`. You configure the zone, locale and format once in `nuxt.config.ts`.

## Install

::: code-group
```bash [pnpm]
pnpm add nuxt-luxon
```

```bash [npm]
npm install nuxt-luxon
```

```bash [yarn]
yarn add nuxt-luxon
```
:::

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
})
```

With no options, the module reads strings as ISO dates in UTC and prints them with the `short` template, in the zone and locale of the browser.

::: tip Using @nuxtjs/i18n?
Dates follow the active language with no extra setup. See [Internationalization](/guide/i18n).
:::

## Format in a template

`$luxon` is available in every template:

```vue
<template>
  <p>{{ $luxon(post.publishedAt) }}</p>
  <!-- 7/12/2024, 12:23 PM -->

  <p>{{ $luxon(post.publishedAt, 'date_full') }}</p>
  <!-- July 12, 2024 -->

  <p>{{ $luxon(post.publishedAt, 'yyyy-MM-dd') }}</p>
  <!-- 2024-07-12 -->
</template>
```

The second argument takes a [template name](/api/formatting#templates), a string of [tokens](/api/tokens) or an [options object](/api/formatting#output-options).

## Format and parse in a script

`useLuxon()` returns the same helpers:

```vue
<script setup lang="ts">
const { $luxon, $lp } = useLuxon()

const due = $lp('12/07/2024', 'dd/MM/yyyy').plus({ days: 30 })
$luxon(due, 'date_med') // 'Aug 11, 2024'
</script>
```

Pass a value to get a computed ref back. It updates when the value or the locale changes:

```ts
const label = useLuxon(() => post.value.publishedAt, 'date_med')
```

## Next steps

- [Configuration](/guide/configuration): default zone, locale and format, and your own templates.
- [Formatting](/api/formatting): every built-in template with its output.
- [Parsing](/api/parsing): reading SQL, HTTP, timestamps and custom strings.
