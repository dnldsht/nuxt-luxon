# Configuration

You configure the module under the `luxon` key of `nuxt.config.ts`. These are the defaults:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    input: {
      zone: 'utc',
      format: 'iso',
    },
    output: {
      format: 'short',
      fallback: '',
    },
    templates: {}, // added to the built-in ones
    injectUtils: true,
  },
})
```

## Input

`input` sets how `$lp` and `$luxon` read a value when the call doesn't say otherwise.

| Option | Type | Default | |
|--------|------|---------|---|
| `zone` | `string \| Zone` | `'utc'` | Zone for strings that carry no offset, like `'2024-07-12 09:00'`. |
| `format` | `string` | `'iso'` | Parser for strings: `iso`, `sql`, `http`, `rfc2822`, a template name or [tokens](/api/tokens). |

Numbers and `Date` objects skip `format`: the module reads numbers as milliseconds and passes `Date` and `DateTime` through.

## Output

`output` sets how `$luxon` prints a date.

| Option | Type | Default | |
|--------|------|---------|---|
| `format` | `string \| DateTimeFormatOptions` | `'short'` | Template name, [tokens](/api/tokens) or an `Intl` options object. |
| `zone` | `string \| Zone` | browser / server zone | Zone to convert to before printing, e.g. `'Europe/Rome'`. |
| `locale` | `string` | environment locale | A language tag like `'it'`, or `'i18n'` to follow [@nuxtjs/i18n](/guide/i18n). |
| `fallback` | `string` | `''` | What `$luxon` returns for `null`, `undefined` and invalid dates. |
| `relative` | `ToRelativeOptions` | | Options for the `relative` format. See [Luxon](https://moment.github.io/luxon/api-docs/index.html#datetimetorelative). |
| `sql` | `ToSQLOptions` | | Options for the `sql` format. See [Luxon](https://moment.github.io/luxon/api-docs/index.html#datetimetosql). |
| `iso` | `ToISOTimeOptions` | | Options for the `iso` format. See [Luxon](https://moment.github.io/luxon/api-docs/index.html#datetimetoiso). |

::: warning Set a zone and a locale with SSR
Without them, the server prints with its own zone and locale and the browser with the user's. The two outputs can differ and cause a hydration mismatch. Set both, or use `locale: 'i18n'`.
:::

## Templates

A template is a named set of output options. Use its name wherever a format goes, for formatting and for parsing:

```ts
luxon: {
  templates: {
    invoice: { format: 'dd/MM/yyyy' },
    server: { zone: 'utc', format: "yyyy-MM-dd'T'HH:mm:ss" },
    // override a built-in one
    full: { format: 'EEEE d MMMM yyyy, HH:mm' },
  },
}
```

```ts
const { $luxon, $lp } = useLuxon()

$luxon(order.paidAt, 'invoice') // '12/07/2024'
$lp('2024-07-12T12:23:49', 'server') // DateTime in UTC
```

The module ships with [19 templates](/api/formatting#templates). It also generates a type with every template name, so your editor suggests them in `$luxon` and `$lp`. Import the type if you need it:

```ts
import type { TemplateName } from 'nuxt-luxon'
```

## injectUtils

`$luxon`, `$lf` and `$lp` come from a Nuxt plugin. Set `injectUtils: false` to skip the plugin and use only `useLuxon()`.
