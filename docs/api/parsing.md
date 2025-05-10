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

