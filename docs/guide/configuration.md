# Configuration

Every option lives under the `luxon` key in `nuxt.config.ts`.


```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-luxon'],
  luxon: {
    input: {}, // Default input options
    output: {}, // Default output options
    templates: {}, // Custom templates
  }
})
```

## Input

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
| `zone` | `string` | Default timezone to use when parsing dates. Can be a string like 'America/New_York' |
| `format` | `string` | Default format string to use when parsing dates. |

### Output Options

Configure how dates are displayed by default:

```ts
luxon: {
  output: {
    zone: 'local',       // Timezone for output
    locale: 'en-US',     // Locale for formatting (omit it to use the environment locale)
    format: 'short',      // Default format string
    relative: {...},      // See below for options
    iso: {...},           // See below for options
    sql: {...},           // See below for options
    fallback: '',         // Output for null/undefined or invalid dates
  }
}
```

| Option | Type | Description |
|--------|------|-------------|
| `zone` | `string` | Timezone to use for formatted output. Can be a string like 'UTC' |
| `locale` | `string` | Locale to use for formatting (e.g., 'en-US', 'fr-FR'), or `'i18n'` to follow [`@nuxtjs/i18n`](/guide/i18n). Defaults to the [environment locale](/guide/i18n#default-locale). |
| `format` | `string \| DateTimeFormatOptions \| Intl.DateTimeFormatOptions` | Format string or options object for date formatting. |
| `relative` | `ToRelativeOptions` | Options for relative time formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetorelative) |
| `sql` | `ToSQLOptions` | Options for SQL date formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetosql) |
| `iso` | `ToISOTimeOptions` | Options for ISO date formatting. [See Luxon documentation](https://moment.github.io/luxon/api-docs/index.html#datetimetoiso) |
| `fallback` | `string` | Returned when the value is `null`/`undefined` or the date is invalid, instead of `'Invalid DateTime'`. Defaults to `''`. |

### Internationalization

By default no locale is set, so dates are formatted with the locale of the environment: the browser
one on the client, the one of the node process during SSR. The value `'client'` behaves the same way.

Set an explicit locale to make the output predictable, or `'i18n'` to follow the user language.
`'i18n'` is the default as soon as [`@nuxtjs/i18n`](https://i18n.nuxtjs.org) is registered:

```ts
luxon: {
  output: {
    locale: 'en-US', // a fixed locale
    // locale: 'i18n', // ...or follow @nuxtjs/i18n
  },
}
```

See [Internationalization](/guide/i18n).

### Templates

A template is a named set of output options. Use the name for parsing and for formatting.

```ts
luxon: {
  templates: {
    // Define your custom templates
    userDate: {
      zone: 'local',
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

A template accepts the same options as `output`, and works in `$luxon`/`$lf` as well as `$lp`:

```vue
<script setup>
const { $luxon, $lp } = useLuxon()

// Parse a date using a template
const parsedDate = $lp('15 05 2025', 'userDate')

// Format a date using a template
const amsterdamTime = $luxon(new Date(), 'serverAMS')
</script>
```

The module ships with these 20 templates:

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

