import type { FormatInput, FormatInputOptions, FormatOutputOptions, LocaleResolver, LuxonOptions, ParseInput } from '../types'
import { toValue, computed, type MaybeRefOrGetter } from 'vue'
import formatDateTime from './format'
import parseInput from './parse'
import { extendInput, extendOutput } from './utils'

export function makeParser(luxOptions: Required<LuxonOptions>) {
  return (value: MaybeRefOrGetter<ParseInput>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => parseInput(extendInput(luxOptions, toValue(value), toValue(inputFormat)))
}

export function makeFormatter(luxOptions: Required<LuxonOptions>, resolveLocale?: LocaleResolver) {
  const parser = makeParser(luxOptions)
  return (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => {
    const output = extendOutput(luxOptions, toValue(outputFormat))
    const raw = toValue(value)
    if (raw == null) {
      return output.fallback
    }
    const dt = parser(raw, inputFormat)
    return dt.isValid ? formatDateTime(dt, output, resolveLocale) : output.fallback
  }
}

export function makeReactiveParser(options: Required<LuxonOptions>) {
  const parse = makeParser(options)

  return (value: MaybeRefOrGetter<ParseInput>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => {
    return computed(() => parse(value, inputFormat))
  }
}

export function makeReactiveFormatter(options: Required<LuxonOptions>, resolveLocale?: LocaleResolver) {
  const format = makeFormatter(options, resolveLocale)

  return (value: MaybeRefOrGetter<FormatInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => {
    return computed(() => format(value, outputFormat, inputFormat))
  }
}
