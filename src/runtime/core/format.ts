import type { DateTime } from 'luxon'
import type { useI18n } from 'vue-i18n'
import type { OutputOptions } from '../types'

let useI18nInstance: typeof useI18n | null = null
await import('vue-i18n').then(({ useI18n }) => {
  useI18nInstance = useI18n
}).catch(() => {
  useI18nInstance = undefined
})

let lastKnownLocale: string | null = null

export default function format(dt: DateTime, options: OutputOptions) {
  dt = dt.setZone(options.zone)
  if (options.locale) {
    if (options.locale === 'i18n') {
      if (!useI18nInstance) {
        throw new Error('vue-i18n is not available, do not use locale: "i18n"')
      }
      try {
        const { locale } = useI18nInstance()
        lastKnownLocale = locale.value
      }
      catch (error) {
        if (error.code === 26) {
          // Must be called on top of setup, this happens if, for example, used in async function
          // revert to last known locale
        }
        else {
          throw error
        }
      }
      if (lastKnownLocale) {
        dt = dt.setLocale(lastKnownLocale)
      }
    }
    else {
      dt = dt.setLocale(options.locale)
    }
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
