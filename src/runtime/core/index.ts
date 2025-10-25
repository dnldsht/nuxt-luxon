import type { FormatInputOptions, FormatOutputOptions, LuxonOptions, ParseInput } from '../types'
import { toValue, computed, type MaybeRefOrGetter } from 'vue'
import formatDateTime from './format'
import parseInput from './parse'
import { extendInput, extendOutput } from './utils'

export function makeParser(luxOptions: Required<LuxonOptions>) {
  return (value: ParseInput, format?: FormatInputOptions) => parseInput(extendInput(luxOptions, value, format))
}

export function makeFormatter(luxOptions: Required<LuxonOptions>) {
  const parser = makeParser(luxOptions)
  return (value: ParseInput, format?: FormatOutputOptions, inputFormat?: FormatInputOptions) => {
    const dt = parser(value, inputFormat)
    return formatDateTime(dt, extendOutput(luxOptions, format))
  }
}

export function makeReactiveParser(options: Required<LuxonOptions>) {
  const parse = makeParser(options)

  return (value: MaybeRefOrGetter<ParseInput>, inputFormat?: FormatInputOptions) => {
    return computed(() => parse(toValue(value), toValue(inputFormat)))
  }
}

export function makeReactiveFormatter(options: Required<LuxonOptions>) {
  const format = makeFormatter(options)

  return (value: MaybeRefOrGetter<ParseInput>, outputFormat?: MaybeRefOrGetter<FormatOutputOptions>, inputFormat?: MaybeRefOrGetter<FormatInputOptions>) => {
    return computed(() => format(toValue(value), toValue(outputFormat), toValue(inputFormat)))
  }
}
