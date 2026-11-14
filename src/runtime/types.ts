import type { DateTime, DateTimeFormatOptions, ToISOTimeOptions, ToRelativeOptions, ToSQLOptions, Zone } from 'luxon'

/** Special `output.locale` value: follow the locale of `@nuxtjs/i18n` at runtime. */
export const I18N_LOCALE = 'i18n'

/** A BCP 47 locale tag, or `'i18n'` to follow the active `@nuxtjs/i18n` locale. */
export type OutputLocale = typeof I18N_LOCALE | (string & Record<never, never>)

export interface InputOptions {
  zone?: string | Zone
  format?: string
}

export interface OutputOptions {
  zone?: string | Zone
  locale?: OutputLocale
  format?: string | DateTimeFormatOptions | Intl.DateTimeFormatOptions
  relative?: ToRelativeOptions
  sql?: ToSQLOptions
  iso?: ToISOTimeOptions
  /** Returned instead of formatting when the value is `null`/`undefined` or the date is invalid. Defaults to `''`. */
  fallback?: string
}

export interface LuxonOptions {
  templates?: Record<string, OutputOptions>
  input?: InputOptions
  output?: OutputOptions
}

/** Resolves the locale to use when `output.locale` is set to `'i18n'`. */
export type LocaleResolver = () => string | undefined

export type ParseInput = string | number | Date | DateTime
/** Formatting also accepts empty values: they render as `output.fallback`. */
export type FormatInput = ParseInput | null | undefined
export type FormatInputOptions = string | Partial<InputOptions>
export type FormatOutputOptions = string | Partial<OutputOptions>
