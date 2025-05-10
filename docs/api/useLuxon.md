# Composables

## useLuxon

The `useLuxon` composable provides convenient access to Luxon's date-time functionality with the configured options for your Nuxt application.

### Parameters

- `value` (optional): The date-time input to be formatted. Can be a string, Date object, or other valid input that Luxon can parse.
- `outputFormat` (optional): The format to output the date-time in. Can be a predefined format string or a custom format.
- `inputFormat` (optional): Format options to use when parsing the input value.

### Return Value

The return value depends on how you call the composable:

- When called with a `value`: Returns the formatted date-time string
- When called without arguments: Returns an object containing:
  - `$luxon`: The formatting function
  - `$lf`: Alias for the formatting function
  - `$lp`: The parsing function

### Basic Usage

```ts
// Format a date directly
const formattedDate = useLuxon('2023-01-01', 'DATE_SHORT')

// Get formatting and parsing functions
const { $luxon, $lf, $lp } = useLuxon()

// Format a date with the formatting function
const date = $luxon('2023-01-01', 'DATE_MED')

// Alias for formatting
const sameDate = $lf('2023-01-01', 'DATE_MED')

// Parse a date string
const dateObject = $lp('January 1, 2023', 'MMMM d, yyyy')
```

### Advanced Usage

You can use the composable with custom format options:

```ts
// Custom output format
const customFormat = useLuxon(new Date(), 'yyyy-MM-dd HH:mm:ss')

// With input format specified
const specificFormat = useLuxon('01/02/2023', 'DATE_MED', { format: 'MM/dd/yyyy' })

// With timezone handling
const timezoned = useLuxon('2023-01-01T12:00:00Z', { format: 'DATE_MED', timezone: 'America/New_York' })
```

