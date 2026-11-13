import type { Ref } from 'vue'
import type { LocaleResolver } from './types'
import { tryUseNuxtApp } from '#app'

/** Minimal shape of the `$i18n` instance injected by `@nuxtjs/i18n`. */
interface I18nLocaleSource {
  locale: Ref<string> | string
}

let warned = false

/**
 * Builds the resolver used by `output.locale: 'i18n'`.
 *
 * The locale is read from `nuxtApp.$i18n` on every format call, so it stays reactive inside
 * `computed` and resolves on the server too (no hydration mismatch).
 */
export function useI18nLocaleResolver(): LocaleResolver {
  const nuxtApp = tryUseNuxtApp() as { $i18n?: I18nLocaleSource } | null | undefined

  return () => {
    const i18n = nuxtApp?.$i18n
    if (!i18n) {
      if (import.meta.dev && !warned) {
        warned = true
        console.warn('[nuxt-luxon] `locale: "i18n"` needs `@nuxtjs/i18n` to be installed and registered, falling back to the default locale.')
      }
      return undefined
    }

    return typeof i18n.locale === 'string' ? i18n.locale : i18n.locale.value
  }
}
