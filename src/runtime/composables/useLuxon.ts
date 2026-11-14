import type { DateTime } from 'luxon'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { FormatInput, ParseInput, FormatInputOptions, FormatOutputOptions, LuxonOptions } from '../types'
import { makeFormatter, makeParser, makeReactiveFormatter, makeReactiveParser } from '../core'
import { useI18nLocaleResolver } from '../i18n'

import { useRuntimeConfig } from '#app'

export function useLuxon(value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>): ComputedRef<string>
export function useLuxon(): {
  luxon: (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => ComputedRef<string>
  lf: (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => ComputedRef<string>
  lp: (value: MaybeRefOrGetter<ParseInput>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => ComputedRef<DateTime>

  $luxon: (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => string
  $lf: (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => string
  $lp: (value: MaybeRefOrGetter<ParseInput>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => DateTime
}

export function useLuxon(value?: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) {
  const options = useRuntimeConfig().public.luxon as Required<LuxonOptions>
  const resolveLocale = useI18nLocaleResolver()

  const reactiveFormatter = makeReactiveFormatter(options, resolveLocale)

  // ponytail: a bare `useLuxon(undefined)` still returns the helpers, pass a ref/getter for maybe-empty values
  if (value !== undefined || outputFormat !== undefined || inputFormat !== undefined) {
    return reactiveFormatter(value, outputFormat, inputFormat)
  }

  const reactiveParser = makeReactiveParser(options)
  const parser = makeParser(options)
  const formatter = makeFormatter(options, resolveLocale)

  return {
    luxon: reactiveFormatter,
    lf: reactiveFormatter,
    lp: reactiveParser,

    $luxon: formatter,
    $lf: formatter,
    $lp: parser,
  }
}
