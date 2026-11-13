import type { DateTime } from 'luxon'
import type { LocaleResolver, OutputOptions } from '../types'
import { I18N_LOCALE } from '../types'

export default function format(dt: DateTime, options: OutputOptions, resolveLocale?: LocaleResolver) {
  dt = dt.setZone(options.zone)

  const locale = options.locale === I18N_LOCALE ? resolveLocale?.() : options.locale
  if (locale) {
    dt = dt.setLocale(locale)
  }

  if (typeof options.format === 'object') {
    return dt.toLocaleString(options.format)
  }

  switch (options.format) {
    case 'relative':
      return dt.toRelative(options.relative)
    case 'sql':
      return dt.toSQL(options.sql)
    case 'iso':
      return dt.toISO(options.iso)
    case 'http':
      return dt.toHTTP()
    case 'jsdate':
      return dt.toJSDate()
    case 'rfc':
    case 'rfc2822':
      return dt.toRFC2822()
    case 'millis':
      return dt.toMillis()
    case 'unix':
    case 'seconds':
      return dt.toSeconds()
    default:
      if (typeof options.format !== 'string') {
        throw new TypeError(`Invalid format argument: ${options.format} must be a string`)
      }
      return dt.toFormat(options.format)
  }
}
