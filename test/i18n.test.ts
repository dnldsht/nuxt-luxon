import { describe, expect, it, vi } from 'vitest'
import defu from 'defu'
import { ref } from 'vue'
import { makeFormatter, makeReactiveFormatter } from '../src/runtime/core'
import { DEFAULT_OPTIONS } from '../src/module'
import type { ModuleOptions } from '../src/module'
import type { LocaleResolver, LuxonOptions } from '../src/runtime/types'
import { useLuxon } from '../src/runtime/composables/useLuxon'

const date = '2024-07-12T12:23:49.000Z'

// locale of the mocked @nuxtjs/i18n instance, shared by the `useLuxon` tests below
const i18nLocale = ref('it')

vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      luxon: defu({ output: { zone: 'utc', locale: 'i18n' } }, DEFAULT_OPTIONS),
    },
  }),
  tryUseNuxtApp: () => ({ $i18n: { locale: i18nLocale } }),
}))

function init(_options: ModuleOptions = {}, resolveLocale?: LocaleResolver) {
  const options = defu(_options, DEFAULT_OPTIONS) as Required<LuxonOptions>
  return {
    $luxon: makeFormatter(options, resolveLocale),
    luxon: makeReactiveFormatter(options, resolveLocale),
  }
}

describe('output.locale: i18n', () => {
  it('formats with the locale returned by the resolver', () => {
    const { $luxon } = init({ output: { zone: 'utc', locale: 'i18n' } }, () => 'it')

    expect($luxon(date, 'full')).toBe('12 luglio 2024 alle ore 12:23 UTC')
  })

  it('resolves the locale on every call, so it works on the server too', () => {
    // no `import.meta.client` involved: the same code path runs on both sides
    let locale = 'it'
    const { $luxon } = init({ output: { zone: 'utc', locale: 'i18n' } }, () => locale)

    expect($luxon(date, 'full')).toBe('12 luglio 2024 alle ore 12:23 UTC')
    locale = 'fi'
    expect($luxon(date, 'full')).toBe('12. heinäkuuta 2024 klo 12.23 UTC')
  })

  it('can be picked per call, on top of a different default locale', () => {
    const { $luxon } = init({ output: { zone: 'utc', locale: 'fi' } }, () => 'it')

    expect($luxon(date, 'full')).toBe('12. heinäkuuta 2024 klo 12.23 UTC')
    expect($luxon(date, { format: 'full', locale: 'i18n' })).toBe('12 luglio 2024 alle ore 12:23 UTC')
  })

  it('falls back to the luxon default locale when i18n is unavailable', () => {
    const { $luxon } = init({ output: { zone: 'utc', locale: 'i18n' } }, () => undefined)
    const { $luxon: $luxonNoLocale } = init({ output: { zone: 'utc' } })

    expect($luxon(date, 'full')).toBe($luxonNoLocale(date, 'full'))
  })

  it('reacts to locale changes', () => {
    const locale = ref('it')
    const { luxon } = init({ output: { zone: 'utc', locale: 'i18n' } }, () => locale.value)

    const formatted = luxon(date, 'full')
    expect(formatted.value).toBe('12 luglio 2024 alle ore 12:23 UTC')

    locale.value = 'fi'
    expect(formatted.value).toBe('12. heinäkuuta 2024 klo 12.23 UTC')
  })
})

describe('useLuxon with @nuxtjs/i18n', () => {
  it('follows nuxtApp.$i18n and updates when the locale changes', () => {
    i18nLocale.value = 'it'
    const formatted = useLuxon(date, 'full')
    expect(formatted.value).toBe('12 luglio 2024 alle ore 12:23 UTC')

    i18nLocale.value = 'fi'
    expect(formatted.value).toBe('12. heinäkuuta 2024 klo 12.23 UTC')
  })

  it('resolves the locale for $luxon too', () => {
    i18nLocale.value = 'fr'
    const { $luxon } = useLuxon()

    expect($luxon(date, 'full')).toBe('12 juillet 2024 à 12:23 UTC')
  })
})
