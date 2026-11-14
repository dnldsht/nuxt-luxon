# useLuxon

`useLuxon` is auto-imported. Call it with a value to get a formatted computed ref, or without arguments to get the helpers.

## With a value

```ts
useLuxon(value, output?, input?): ComputedRef<string>
```

The arguments match [`$luxon`](/api/formatting). Each one also accepts a ref or a getter, and the result recomputes when they change or when the [i18n locale](/guide/i18n) switches:

```vue
<script setup lang="ts">
const props = defineProps<{ order: Order }>()

const createdAt = useLuxon(() => props.order.createdAt, 'date_med')
</script>

<template>
  <time>{{ createdAt }}</time>
</template>
```

## Without arguments

```ts
const { $luxon, $lp, luxon, lp } = useLuxon()
```

| Helper | Returns |
|--------|---------|
| `$luxon(value, output?, input?)` | the formatted value |
| `$lp(value, input?)` | a `DateTime` |
| `luxon(value, output?, input?)` | a computed ref of `$luxon` |
| `lp(value, input?)` | a computed ref of `$lp` |

`$lf` and `lf` are aliases of `$luxon` and `luxon`.

In templates you can skip the composable: the module's plugin exposes `$luxon`, `$lf` and `$lp` directly, unless you set [`injectUtils: false`](/guide/configuration#injectutils).
