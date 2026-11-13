# Composables

## useLuxon

`useLuxon` formats and parses dates with the options you configured in `nuxt.config.ts`.

### Parameters

- `value` (optional): the date-time to format. A string, a number, a `Date`, or a Luxon `DateTime`.
- `outputFormat` (optional): a template name, a token string, or an options object.
- `inputFormat` (optional): the format options for parsing the input.

### Return Value

The return value depends on how you call the composable:

- with a `value`: the formatted date-time string
- without arguments: an object holding
  - `$luxon`: the formatting function
  - `$lf`: alias of `$luxon`
  - `$lp`: the parsing function

### Basic Usage

```ts
// Format a date directly
const formattedDate = useLuxon('2023-01-01', 'date_short')

// Get formatting and parsing functions
const { $luxon, $lf, $lp } = useLuxon()

// Format a date with the formatting function
const date = $luxon('2023-01-01', 'date_med')

// Alias for formatting
const sameDate = $lf('2023-01-01', 'date_med')

// Parse a date string
const dateObject = $lp('January 1, 2023', 'MMMM d, yyyy')
```

### Advanced Usage

Pass an options object instead of a format name:

```ts
// Custom output format
const customFormat = useLuxon(new Date(), 'yyyy-MM-dd HH:mm:ss')

// With input format specified
const specificFormat = useLuxon('01/02/2023', 'date_med', { format: 'MM/dd/yyyy' })

// With timezone handling
const timezoned = useLuxon('2023-01-01T12:00:00Z', { format: 'date_med', zone: 'America/New_York' })
```

