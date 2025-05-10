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

