# Parsing

This section covers how to parse various date and time formats into a DateTime object using Nuxt Luxon.

## Input Types

The input can be one of the following types:

- **string**: A string representation of a date or time.
- **number**: A numeric representation of a date or time, such as a timestamp.
- **Date**: A JavaScript Date object.
- **DateTime**: A DateTime object from the Luxon library.

## Input Options

Along with the input, you can also specify the input format and zone.

```ts
import type { Zone } from 'luxon'

interface InputOptions {
  format: string
  zone?: string | Zone
}
```

## Available Formats

| format         | description                          | example                                                     |
| -------------- | ------------------------------------ | ----------------------------------------------------------- |
| sql            | SQL dates, times, and datetimes      | `2017-05-15 09:24:15`                                       |
| iso            | ISO 8601 date time string            | `2018-01-06T13:07:04.054`                                   |
| rfc2822        | RFC 2822                             | `Tue, 01 Nov 2016 13:23:12 +0630`                           |
| http           | HTTP header specs (RFC 850 and 1123) | `Sun, 06 Nov 1994 08:49:37 GMT`                             |
| seconds        | Unix timestamp                       | `1542674993`                                                |
| millis         | Unix timestamp milliseconds          | `1542674993410`                                             |
| Date           | JavaScript Date object               | `new Date('2020-10-05T14:48:00.000Z')`                      |
| DateTime       | Luxon DateTime object                | `DateTime.fromISO('2020-10-05T14:48:00.000Z')`              |
| _tokens_       | see: Tokens               | `yyyy-MM-dd`                                                |
| *templateName* | see: Templates         |                                                             |

## Examples

Here are some examples of how to parse different types of inputs using the `$lp` function:

### Parsing String Inputs with Format Patterns

```ts
// Using a format string directly
const date1 = $lp('12/07/2024', 'dd/MM/yyyy')
console.log(date1.toISODate()) // '2024-07-12'

// Using a format in an options object
const date2 = $lp('12/07/2024', { format: 'dd/MM/yyyy' })
console.log(date2.toISODate()) // '2024-07-12'
```

### Using Custom Templates

```ts
// Configure a custom template
// In nuxt.config.ts:
// luxon: {
//   templates: {
//     my_template: { format: 'dd-MM--yyyy' }
//   }
// }

// Use the template for parsing
const date = $lp('12-07--2024', { format: 'my_template' })
console.log(date.toISODate()) // '2024-07-12'
```

### Parsing Timestamps

```ts
// Parse from Unix timestamp (milliseconds)
const fromMillis = $lp(1720742400 * 1000)
console.log(fromMillis.toISODate()) // '2024-07-12'

// Parse from Unix timestamp (seconds)
const fromSeconds = $lp(1720787029, { format: 'seconds' })
console.log(fromSeconds.toISODate()) // '2024-07-12'
```

### Parsing Date Objects

```ts
// Parse from Luxon DateTime object
import { DateTime } from 'luxon'
const luxonDate = DateTime.fromObject({ year: 2024, month: 7, day: 12 }, { zone: 'utc' })
const parsedLuxon = $lp(luxonDate)
console.log(parsedLuxon.toISODate()) // '2024-07-12'

// Parse from JavaScript Date object
const jsDate = new Date()
jsDate.setUTCFullYear(2024, 6, 12) // Note: month is 0-indexed in JavaScript Date
jsDate.setUTCHours(0, 0, 0, 0)
const parsedJsDate = $lp(jsDate)
console.log(parsedJsDate.toISODate()) // '2024-07-12'
```

### Parsing with Built-in Formats

```ts
// ISO format
const isoDate = $lp('2024-07-12', { format: 'iso' })
console.log(isoDate.toISODate()) // '2024-07-12'

// SQL format
const sqlDate = $lp('2024-07-12', { format: 'sql' })
console.log(sqlDate.toISODate()) // '2024-07-12'

// HTTP format (RFC 850 and 1123)
const httpDate = $lp('Fri, 12 Jul 2024 12:23:49 GMT', { format: 'http' })
console.log(httpDate.toISODate()) // '2024-07-12'

// RFC 2822 format
const rfcDate = $lp('Fri, 12 Jul 2024 12:23:49 +0000', { format: 'rfc2822' })
console.log(rfcDate.toISODate()) // '2024-07-12'
```

