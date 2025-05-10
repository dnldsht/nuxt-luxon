# Configuration

Nuxt Luxon provides various configuration options to customize its behavior. These options can be set in your `nuxt.config.ts` file.

## Basic Configuration

Add the module to your Nuxt configuration and provide options:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    // your options here
  }
})
```

## Configuration Options

The `luxon` configuration accepts a `LuxonOptions` object with the following properties:

### Input Options

Control how string dates are parsed by default:

```ts
luxon: {
  input: {
    zone: 'utc', // Default timezone for parsing dates
    format: 'iso'      // Default format string for parsing dates
  }
}
```

| Option | Type | Description |
|--------|------|-------------|
| `zone` | `string \| Zone` | Default timezone to use when parsing dates. Can be a string like 'America/New_York' or a Luxon Zone object. |
| `format` | `string` | Default format string to use when parsing dates. |

### Output Options

Configure how dates are displayed by default:

```ts
luxon: {
  output: {
    zone: 'client',       // Timezone for output
    locale: 'client',     // Locale for formatting
    format: 'short',      // Default format string
    relative: {...},      // See below for options
    iso: {...},           // See below for options
    sql: {...},           // See below for options
  }
}
```

| Option | Type | Description |
|--------|------|-------------|
| `zone` | `string \| Zone` | Timezone to use for formatted output. Can be a string like 'UTC' or a Luxon Zone object. |
| `locale` | `string` | Locale to use for formatting (e.g., 'en-US', 'fr-FR'). |
| `format` | `string \| DateTimeFormatOptions \| Intl.DateTimeFormatOptions` | Format string or options object for date formatting. |
| `relative` | `ToRelativeOptions` | Options for relative time formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetorelative) |
| `sql` | `ToSQLOptions` | Options for SQL date formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetosql) |
| `iso` | `ToISOTimeOptions` | Options for ISO date formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetoiso) |

### Templates

Templates let you define reusable date formatting configurations. These can be used for both parsing and formatting dates across your application.

```ts
luxon: {
  templates: {
    // Define your custom templates
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
    // You can also override built-in templates
    full: { 
      format: 'EEEE, MMMM d, yyyy h:mm a',
      locale: 'en-US'
    }
  }
}
```

Each template accepts the same options as the `output` configuration. Templates can be used in both the `$luxon`/`$lf` and `$lp` functions:

```vue
<script setup>
const { $luxon, $lp } = useLuxon()

// Parse a date using a template
const parsedDate = $lp('15 05 2025', 'userDate')

// Format a date using a template
const amsterdamTime = $luxon(new Date(), 'serverAMS')
</script>
```

By default there are these templates available:

| format           | example _(with locale `en_US`)_                            |
| ---------------- | ---------------------------------------------------------- |
| short            | 10/14/1983, 1:30 PM                                        |
| shorts           | 10/14/1983, 1:30:23 PM                                     |
| med              | Oct 14, 1983, 1:30 PM                                      |
| meds             | Oct 14, 1983, 9:30:33 AM                                   |
| full             | October 14, 1983, 9:30 AM EDT                              |
| fulls            | October 14, 1983, 9:30:33 AM EDT                           |
| huge             | Friday, October 14, 1983, 9:30 AM Eastern Daylight Time    |
| huges            | Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time |
| time             | 9:30 AM                                                    |
| times            | 09:30:23 AM                                                |
| time24           | 09:30                                                      |
| time24s          | 09:30:23                                                   |
| time24longoffset | 09:30:23 Eastern Daylight Time                             |
| date_full        | October 14, 1983                                           |
| date_huge        | Tuesday, October 14, 1983                                  |
| date_med         | Oct 14, 1983                                               |
| date_medd        | Fri, Oct 14, 1983                                          |
| date_short       | 10/14/1983                                                 |
| date             | 10/14/1983                                                 |

