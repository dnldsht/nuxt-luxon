# Parsing

```ts
$lp(value, input?)
```

`$lp` turns a string, a number, a `Date` or a `DateTime` into a Luxon [`DateTime`](https://moment.github.io/luxon/api-docs/index.html#datetime). From there you have the whole Luxon API: `plus`, `startOf`, `diff` and the rest.

```ts
import { DateTime } from 'luxon'

const { $lp } = useLuxon()

const due = $lp(invoice.issuedAt).plus({ days: 30 })
const overdue = due < DateTime.now()
```

## Input formats

Without a second argument, `$lp` uses [`input.format`](/guide/configuration#input), which defaults to `iso`. Numbers count as milliseconds; `Date` and `DateTime` values pass through.

| Format | Reads |
|--------|-------|
| `iso` | `'2024-07-12'`, `'2024-07-12T12:23:49Z'` |
| `sql` | `'2024-07-12 12:23:49'` |
| `http` | `'Fri, 12 Jul 2024 12:23:49 GMT'` |
| `rfc2822` | `'Fri, 12 Jul 2024 12:23:49 +0000'` |
| `millis` | `1720787029000` |
| `seconds`, `unix` | `1720787029` |
| a template name | whatever its `format` describes |
| [tokens](/api/tokens) | `'12/07/2024'` with `'dd/MM/yyyy'` |

```ts
$lp('12/07/2024', 'dd/MM/yyyy') // 2024-07-12T00:00:00.000Z
$lp(1720787029, 'seconds')      // 2024-07-12T12:23:49.000Z
$lp('2024-07-12 12:23:49', 'sql')
```

## Input zone

Strings without an offset are read in [`input.zone`](/guide/configuration#input), UTC by default. Pass a zone to read them somewhere else:

```ts
$lp('2024-07-12 09:00', { format: 'sql', zone: 'Europe/Rome' })
// 2024-07-12T09:00:00.000+02:00
```

## Errors

A string Luxon can't read returns an invalid `DateTime`; check it with `.isValid`. A value of the wrong type for its format throws a `TypeError`:

```ts
$lp('yesterday').isValid      // false
$lp('2024-07-12', 'millis')   // TypeError: Value must be an integer, received string
```
