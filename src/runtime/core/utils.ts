import { defu } from 'defu'
import type { FormatInputOptions, FormatOutputOptions, InputOptions, LuxonOptions, OutputOptions, ParseInput } from '../types'
import type { ParseOptions } from './parse'

export function extendInput(luxOptions: Required<LuxonOptions>, value: ParseInput, format?: FormatInputOptions): ParseOptions {
  let options = typeof format === 'string' ? { format } : format
  if (options === undefined) {
    options = {}
  }

  let template: Partial<InputOptions> | undefined

  if (typeof options.format === 'string' && options.format in luxOptions.templates) {
    const { format: templateFormat, ...rest } = luxOptions.templates[options.format as keyof typeof luxOptions.templates]
    template = {
      ...rest,
      ...(templateFormat && typeof templateFormat === 'string' && { format: templateFormat }),
    }
  }

  if (!options.format) {
    if (value instanceof Date) {
      options.format = 'jsdate'
    }
    else if (typeof value === 'number') {
      options.format = 'millis'
    }
  }

  const opts = defu(template, options, luxOptions.input)
  return { value, ...opts } as ParseOptions
}

export function extendOutput(luxOptions: Required<LuxonOptions>, format?: FormatOutputOptions): OutputOptions {
  if (!format) {
    format = luxOptions.output
  }
  const base = typeof format === 'string' ? { format } : format

  let template: Partial<OutputOptions> | undefined

  if (typeof base.format === 'string' && base.format in luxOptions.templates) {
    template = luxOptions.templates[base.format as keyof typeof luxOptions.templates] as Partial<OutputOptions>
  }

  const opts = defu(template, base, luxOptions.output)
  return opts as OutputOptions
}
