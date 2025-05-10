# Formatting

This section covers how to format DateTime objects into various string representations using Nuxt Luxon.

## Output Options

Nuxt Luxon provides flexible formatting options through the `OutputOptions` interface:

```ts
import type { DateTimeFormatOptions, ToISOTimeOptions, ToRelativeOptions, ToSQLOptions, Zone } from 'luxon'

interface OutputOptions {
  locale?: string
  format?: string | DateTimeFormatOptions | Intl.DateTimeFormatOptions
  relative?: ToRelativeOptions
  sql?: ToSQLOptions
  iso?: ToISOTimeOptions
  zone?: string | Zone
}
```

## Format Options

- **format**: The format to use for formatting.
  - **Set of Tokens**: You can use a set of tokens to define the output format. Tokens represent different parts of the date and time, such as year, month, day, hour, minute, etc. See [Tokens](#tokens) for possible values.
  - **Template Name**: You can specify the name of a predefined template. Templates are predefined formats that can be used to quickly format dates and times. See [Templates](#templates) for possible values.
  - **DateTimeFormatOptions**: Options for the DateTime format. See [DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) for possible values.

- **locale**: The locale to use for formatting. If not set, the client's locale will be used.
- **relative**: Options for the relative format. See [Relative](https://moment.github.io/luxon/api-docs/index.html#datetimetorelative) for possible values.
- **sql**: Options for the SQL format. See [SQL](https://moment.github.io/luxon/api-docs/index.html#datetimetosql) for possible values.
- **iso**: Options for the ISO format. See [ISO](https://moment.github.io/luxon/api-docs/index.html#datetimetoiso) for possible values.

## Zone {#zone}

The `zone` option allows you to specify the timezone for the formatted output.

Examples:
- `UTC`
- `America/New_York`
- `Asia/Tokyo`
- `local` (for the system's local zone)

For a comprehensive list of timezone identifiers, refer to the [list on Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## Locale {#locale}

The `locale` option determines the language and regional formatting rules to use.

Examples:
- `en`: English (primary language)
- `hi`: Hindi (primary language)
- `de-AT`: German as used in Austria (primary language with country code)
- `zh-Hans-CN`: Chinese written in simplified characters as used in China

If not specified, the client's locale will be used by default.

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

