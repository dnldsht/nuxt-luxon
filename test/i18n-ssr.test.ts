import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr with @nuxtjs/i18n', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/i18n', import.meta.url)),
  })

  it('renders server side with the i18n locale', async () => {
    const html = await $fetch('/')

    // no `output.locale` configured: the module follows @nuxtjs/i18n on its own
    expect(html).toContain('<div id="composable">12 luglio 2024 alle ore 12:23 UTC</div>')
    expect(html).toContain('<div id="plugin">12 luglio 2024 alle ore 12:23 UTC</div>')
  })
})
