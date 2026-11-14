# Formatting

```ts
$luxon(value, output?, input?)
```

`$luxon` reads `value` (an ISO string by default, a number, a `Date` or a `DateTime`), converts it to the output zone and prints it. `$lf` is an alias.

The examples on this page format `'2024-07-12T12:23:49.000Z'` with `zone: 'utc'` and `locale: 'en-US'`.

## Templates

| Name | Output |
|------|--------|
| `short` | 7/12/2024, 12:23 PM |
| `shorts` | 7/12/2024, 12:23:49 PM |
| `med` | Jul 12, 2024, 12:23 PM |
| `meds` | Jul 12, 2024, 12:23:49 PM |
| `full` | July 12, 2024 at 12:23 PM UTC |
| `fulls` | July 12, 2024 at 12:23:49 PM UTC |
| `huge` | Friday, July 12, 2024 at 12:23 PM UTC |
| `huges` | Friday, July 12, 2024 at 12:23:49 PM UTC |
| `date_short`, `date` | 7/12/2024 |
| `date_med` | Jul 12, 2024 |
| `date_medd` | Fri, Jul 12, 2024 |
| `date_full` | July 12, 2024 |
| `date_huge` | Friday, July 12, 2024 |
| `time` | 12:23 PM |
| `times` | 12:23:49 PM |
| `time24` | 12:23 |
| `time24s` | 12:23:49 |
| `time24longoffset` | 12:23:49 UTC |

These follow the locale: with `locale: 'it'`, `full` prints `12 luglio 2024 alle ore 12:23 UTC`. Add your own in [Configuration](/guide/configuration#templates).

## Machine formats

| Name | Output |
|------|--------|
| `iso` | `'2024-07-12T12:23:49.000Z'` |
| `sql` | `'2024-07-12 12:23:49.000 Z'` |
| `http` | `'Fri, 12 Jul 2024 12:23:49 GMT'` |
| `rfc`, `rfc2822` | `'Fri, 12 Jul 2024 12:23:49 +0000'` |
| `millis` | `1720787029000` (number) |
| `unix`, `seconds` | `1720787029` (number) |
| `jsdate` | a `Date` |
| `relative` | `'1 day ago'`, `'in 5 hours'` |

## Tokens

Any other string is a [token](/api/tokens) pattern:

```ts
$luxon(date, 'dd/MM/yyyy HH:mm')   // '12/07/2024 12:23'
$luxon(date, 'ccc, d LLL yyyy')    // 'Fri, 12 Jul 2024'
$luxon(date, "'Week' W, yyyy")     // 'Week 28, 2024'
```

Wrap literal text in single quotes.

## Output options

Pass an object to change more than the format for one call. It accepts the same keys as [`output`](/guide/configuration#output):

```ts
$luxon(date, { format: 'full', zone: 'America/New_York' })
// 'July 12, 2024 at 8:23 AM EDT'

$luxon(date, { format: 'full', zone: 'Europe/Rome', locale: 'it' })
// '12 luglio 2024 alle ore 14:23 CEST'

$luxon(date, { format: { weekday: 'long', day: 'numeric', month: 'long' } })
// 'Friday, July 12'

$luxon(DateTime.now().minus({ months: 2 }), { format: 'relative', relative: { unit: 'months' } })
// '2 months ago'
```

## Reading the input

The third argument tells `$luxon` how to read the value. It takes the same values as [`$lp`](/api/parsing):

```ts
$luxon('12/07/2024', 'date_full', 'dd/MM/yyyy')
// 'July 12, 2024'

$luxon('2024-07-12T12:23:49', { format: 'huges', zone: 'Europe/Rome' }, { zone: 'Asia/Tokyo' })
// 'Friday, July 12, 2024 at 5:23:49 AM Central European Summer Time'
```

## Empty and invalid values

`null`, `undefined` and dates Luxon can't read print as `output.fallback`, an empty string by default:

```ts
$luxon(null)                                  // ''
$luxon('not a date', 'full')                  // ''
$luxon(user.deletedAt, { fallback: 'never' }) // 'never' when deletedAt is null
```
