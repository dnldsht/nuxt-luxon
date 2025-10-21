import type { DateTime } from 'luxon'
import { toValue, type Ref, computed, type ComputedRef } from 'vue'
import type { ParseInput, FormatInputOptions, FormatOutputOptions, LuxonOptions } from '../types'
import { luxFormat, luxParse } from '../core/utils'

import { useRuntimeConfig } from '#app'

type MaybeRef<T> = T | Ref<T> | (() => T)

export function useLuxon(value: MaybeRef<ParseInput>, outputFormat?: MaybeRef<FormatOutputOptions | undefined>, inputFormat?: MaybeRef<FormatInputOptions | undefined>): ComputedRef<string>
export function useLuxon(): {
  $luxon: (value: MaybeRef<ParseInput>, outputFormat?: MaybeRef<FormatOutputOptions | undefined>, inputFormat?: MaybeRef<FormatInputOptions | undefined>) => string
  $lf: (value: MaybeRef<ParseInput>, outputFormat?: MaybeRef<FormatOutputOptions | undefined>, inputFormat?: MaybeRef<FormatInputOptions | undefined>) => string
  $lp: (value: MaybeRef<ParseInput>, format?: FormatInputOptions) => DateTime
}
export function useLuxon(value?: MaybeRef<ParseInput>, outputFormat?: MaybeRef<FormatOutputOptions | undefined>, inputFormat?: MaybeRef<FormatInputOptions | undefined>) {
  const options = useRuntimeConfig().public.luxon as Required<LuxonOptions>

  const $luxonInstance = formatter(options)

  if (value !== undefined) {
    return computed(() => $luxonInstance(value, outputFormat, inputFormat))
  }

  return { $luxon: $luxonInstance, $lf: $luxonInstance, $lp: luxParse(options) }
}

function formatter(options: Required<LuxonOptions>) {
  const coreLuxFormat = luxFormat(options)

  return (value: MaybeRef<ParseInput>, outputFormat?: MaybeRef<FormatOutputOptions | undefined>, inputFormat?: MaybeRef<FormatInputOptions | undefined>) => {
    const val = toValue(value)
    const outFmt = toValue(outputFormat)
    const inFmt = toValue(inputFormat)
    return coreLuxFormat(val, outFmt, inFmt)
  }
}
