# Formatting

`$luxon` turns a date into a string, through a template name, a token string, or an options object.

## Output Options

Formatting reads the `OutputOptions` interface:

```ts
import type { DateTimeFormatOptions, ToISOTimeOptions, ToRelativeOptions, ToSQLOptions, Zone } from 'luxon'

type OutputLocale = 'i18n' | (string & {})

interface OutputOptions {
  locale?: OutputLocale
  format?: string | DateTimeFormatOptions | Intl.DateTimeFormatOptions
  relative?: ToRelativeOptions
  sql?: ToSQLOptions
  iso?: ToISOTimeOptions
  zone?: string | Zone
}
```

## Format Options

- **format**: how to render the date.
  - **Set of tokens**: each token stands for a part of the date, like the year, the month or the hour. See [Tokens](/api/tokens).
  - **Template name**: the name of a built-in or custom template. See [Templates](/guide/configuration#templates).
  - **DateTimeFormatOptions**: an options object for `Intl`. See [DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

- **locale**: the locale to format with, or `'i18n'` to follow [`@nuxtjs/i18n`](/guide/i18n). Left unset, Luxon uses the locale of the environment.
- **relative**: Options for the relative format. See [Relative](https://moment.github.io/luxon/api-docs/index.html#datetimetorelative) for possible values.
- **sql**: Options for the SQL format. See [SQL](https://moment.github.io/luxon/api-docs/index.html#datetimetosql) for possible values.
- **iso**: Options for the ISO format. See [ISO](https://moment.github.io/luxon/api-docs/index.html#datetimetoiso) for possible values.

## Zone {#zone}

`zone` sets the timezone of the output.

Examples:
- `UTC`
- `America/New_York`
- `Asia/Tokyo`
- `local` (for the system's local zone)

Full list of timezone identifiers: [tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## Locale {#locale}

`locale` sets the language and the regional formatting rules.

Examples:
- `en`: English (primary language)
- `hi`: Hindi (primary language)
- `de-AT`: German as used in Austria (primary language with country code)
- `zh-Hans-CN`: Chinese written in simplified characters as used in China

Beyond a plain language tag, two values behave specially:

- The module resolves `i18n` to the locale of [`@nuxtjs/i18n`](/guide/i18n) at every format call, so
  dates react to a language switch and come out in the right language on the server too.
- `client` is not a real language tag: `Intl` ignores it and falls back to the locale of the
  environment (the browser one on the client, the one of the node process during SSR). Leaving the
  locale unset, or passing any other unrecognized value, does the same.

```ts
const { $luxon } = useLuxon()

$luxon(date, { format: 'full', locale: 'it' })     // '12 luglio 2024 alle ore 12:23 UTC'
$luxon(date, { format: 'full', locale: 'i18n' })   // the language the user is browsing in
$luxon(date, { format: 'full', locale: 'client' }) // the locale of the browser / server
```

## Examples

### Basic Formatting

```ts
const { $luxon } = useLuxon()

// Format current date with predefined templates
$luxon(new Date(), 'short')          // '7/12/2024, 12:23 PM'
$luxon(new Date(), 'full')           // 'July 12, 2024 at 12:23 PM UTC'
$luxon(new Date(), 'fulls')          // 'July 12, 2024 at 12:23:49 PM UTC'
$luxon(new Date(), 'huge')           // 'Friday, July 12, 2024 at 12:23 PM UTC'

// Format specific dates
$luxon('2024-07-12T12:23:49.000Z', 'short')   // '7/12/2024, 12:23 PM'
$luxon('2024-07-12', 'date_short')            // '7/12/2024'
```

### Date-Only Formatting

```ts
const { $luxon } = useLuxon()

// Date-specific formats
$luxon('2024-07-12', 'date_full')    // 'July 12, 2024'
$luxon('2024-07-12', 'date_huge')    // 'Friday, July 12, 2024'
$luxon('2024-07-12', 'date_med')     // 'Jul 12, 2024'
$luxon('2024-07-12', 'date_medd')    // 'Fri, Jul 12, 2024'
$luxon('2024-07-12', 'date_short')   // '7/12/2024'
```

### Time-Only Formatting

```ts
const { $luxon } = useLuxon()

// Time-specific formats
$luxon('16:20:00', 'time')                // '4:20 PM'
$luxon('16:20:00', 'times')               // '4:20:00 PM'
$luxon('16:20:00', 'time24')              // '16:20'
$luxon('16:20:00', 'time24s')             // '16:20:00'
$luxon('16:20:00', 'time24longoffset')    // '16:20:00 UTC'
```

### Specialized Formats

```ts
const { $luxon } = useLuxon()

// Special formats
$luxon('2024-07-12T12:23:49.000Z', 'iso')    // '2024-07-12T12:23:49.000Z'
$luxon('2024-07-12T12:23:49.000Z', 'sql')    // '2024-07-12 12:23:49.000 Z'
$luxon('2024-07-12T12:23:49.000Z', 'http')   // 'Fri, 12 Jul 2024 12:23:49 GMT'
$luxon('2024-07-12T12:23:49.000Z', 'rfc')    // 'Fri, 12 Jul 2024 12:23:49 +0000'

// Numeric formats
$luxon('2024-07-12T12:23:49.000Z', 'millis') // 1720787029000
$luxon('2024-07-12T12:23:49.000Z', 'unix')   // 1720787029
$luxon('2024-07-12T12:23:49.000Z', 'seconds') // 1720787029

// JavaScript Date object
const jsDate = $luxon('2024-07-12T12:23:49.000Z', 'jsdate') // returns Date object
```

### Custom Format Strings

```ts
const { $luxon } = useLuxon()

// Custom format strings
$luxon(new Date(), 'yyyy-MM-dd')            // '2024-07-12'
$luxon(new Date(), 'dd/MM/yyyy HH:mm:ss')   // '12/07/2024 12:23:49'
$luxon(new Date(), 'ccc, d LLL yyyy')       // 'Fri, 12 Jul 2024'
```

### With Timezone and Locale Options

```ts
const { $luxon } = useLuxon()

// Format with custom timezone
$luxon('2024-07-12T12:23:49.000Z', { 
  format: 'full', 
  zone: 'America/New_York'
}) // 'July 12, 2024 at 8:23 AM EDT'

// Format with custom locale
$luxon('2024-07-12T12:23:49.000Z', { 
  format: 'full', 
  locale: 'it'
}) // '12 luglio 2024 alle ore 12:23 UTC'

// Format with both custom timezone and locale
$luxon('2024-07-12T12:23:49.000Z', { 
  format: 'full', 
  zone: 'Europe/Rome',
  locale: 'it'
}) // '12 luglio 2024 alle ore 14:23 CEST'
```

### With the User Language

With [`@nuxtjs/i18n`](/guide/i18n) installed, dates follow the active locale:

```ts
const { $luxon, luxon } = useLuxon()

// formatted with the locale that is active right now
$luxon('2024-07-12T12:23:49.000Z', 'full')

// a computed ref: it updates by itself when the user switches language
const date = luxon('2024-07-12T12:23:49.000Z', 'full')
```

### Using with Custom Input Format

```ts
const { $luxon } = useLuxon()

// Format with custom input format
$luxon('12/07/2024', 'full', 'dd/MM/yyyy') 
// 'July 12, 2024 at 12:00 AM UTC'

// Format with custom input timezone
$luxon('2024-07-12T12:23:49', { format: 'huges', zone: 'Europe/Rome' }, { zone: 'Asia/Tokyo' })
// 'Friday, July 12, 2024 at 5:23:49 AM Central European Summer Time'
```

### Using Custom Templates

```ts
// In nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    templates: {
      date: { format: 'dd/MM/yyyy' },
      customTime: { format: 'HH:mm:ss (z)' }
    }
  }
})

// In your component
const { $luxon } = useLuxon()
$luxon('2024-07-12T12:23:49.000Z', 'date')      // '12/07/2024'
$luxon('2024-07-12T12:23:49.000Z', 'customTime') // '12:23:49 (UTC)'
```

### Relative Time Formatting

```ts
const { $luxon } = useLuxon()

// Format as relative time
$luxon(new Date(), 'relative')  // 'just now'
$luxon(DateTime.now().minus({ days: 1 }), 'relative') // '1 day ago'
$luxon(DateTime.now().plus({ hours: 5 }), 'relative') // 'in 5 hours'

// With custom options
$luxon(DateTime.now().minus({ months: 2 }), {
  format: 'relative',
  relative: { unit: 'months' }
}) // '2 months ago'
```

