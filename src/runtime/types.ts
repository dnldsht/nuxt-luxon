import type { DateTime, DateTimeFormatOptions, ToISOTimeOptions, ToRelativeOptions, ToSQLOptions, Zone } from 'luxon'

/** Special `output.locale` value: follow the locale of `@nuxtjs/i18n` at runtime. */
export const I18N_LOCALE = 'i18n'

/** A BCP 47 locale tag, or `'i18n'` to follow the active `@nuxtjs/i18n` locale. */
export type OutputLocale = typeof I18N_LOCALE | (string & Record<never, never>)

/**
 * Names of the configured templates (built-in + `luxon.templates`), filled in by a type
 * template the module generates, so editors autocomplete them.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LuxonTemplates {}

type AnyString = string & Record<never, never>
export type TemplateName = keyof LuxonTemplates & string

/** A template name, a built-in parser (`'iso'`, `'sql'`…) or a Luxon token string. */
export type InputFormat = TemplateName | 'iso' | 'sql' | 'http' | 'rfc2822' | 'jsdate' | 'luxon' | 'millis' | 'seconds' | 'unix' | AnyString
/** A template name, a built-in output (`'relative'`, `'iso'`…) or a Luxon token string. */
export type OutputFormat = TemplateName | 'relative' | 'iso' | 'sql' | 'http' | 'rfc' | 'rfc2822' | 'jsdate' | 'millis' | 'seconds' | 'unix' | AnyString

export interface InputOptions {
  zone?: string | Zone
  format?: InputFormat
}

export interface OutputOptions {
  zone?: string | Zone
  locale?: OutputLocale
  format?: OutputFormat | DateTimeFormatOptions | Intl.DateTimeFormatOptions
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
export type FormatInputOptions = InputFormat | Partial<InputOptions>
export type FormatOutputOptions = OutputFormat | Partial<OutputOptions>
