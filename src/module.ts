import { defineNuxtModule, createResolver, addImportsDir, addPlugin, hasNuxtModule } from '@nuxt/kit'
import { DateTime } from 'luxon'
import type { LuxonOptions } from './runtime/types'
import { I18N_LOCALE } from './runtime/types'

const templates = {
  full: { format: DateTime.DATETIME_FULL },
  fulls: { format: DateTime.DATETIME_FULL_WITH_SECONDS },
  huge: { format: DateTime.DATETIME_HUGE },
  huges: { format: DateTime.DATETIME_HUGE_WITH_SECONDS },
  med: { format: DateTime.DATETIME_MED },
  meds: { format: DateTime.DATETIME_MED_WITH_SECONDS },
  short: { format: DateTime.DATETIME_SHORT },
  shorts: { format: DateTime.DATETIME_SHORT_WITH_SECONDS },
  date_full: { format: DateTime.DATE_FULL },
  date_huge: { format: DateTime.DATE_HUGE },
  date_med: { format: DateTime.DATE_MED },
  date_medd: { format: DateTime.DATE_MED_WITH_WEEKDAY },
  date: { format: DateTime.DATE_SHORT },
  date_short: { format: DateTime.DATE_SHORT },
  time24: { format: DateTime.TIME_24_SIMPLE },
  time24longoffset: { format: DateTime.TIME_24_WITH_LONG_OFFSET },
  time24s: { format: DateTime.TIME_24_WITH_SECONDS },
  time: { format: DateTime.TIME_SIMPLE },
  times: { format: DateTime.TIME_WITH_SECONDS },
}

export type ModuleOptions = LuxonOptions & { injectUtils?: boolean }

export const DEFAULT_OPTIONS: ModuleOptions = {
  input: {
    zone: 'utc',
    format: 'iso',
  },
  output: {
    format: 'short',
  },
  templates,
  injectUtils: true,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-luxon',
    configKey: 'luxon',
  },
  defaults: DEFAULT_OPTIONS,
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // follow the active @nuxtjs/i18n locale unless an explicit one was configured
    if (!_options.output?.locale && hasNuxtModule('@nuxtjs/i18n', _nuxt)) {
      _options.output = { ..._options.output, locale: I18N_LOCALE }
    }

    // @ts-expect-error don't know how to type this
    _nuxt.options.runtimeConfig.public.luxon = _options
    addImportsDir(resolve('./runtime/composables'))
    if (_options.injectUtils) {
      addPlugin(resolve('./runtime/plugins/luxon-utils'))
    }
  },
})
