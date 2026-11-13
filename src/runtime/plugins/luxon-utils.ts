import type { Plugin } from '#app'
import { defineNuxtPlugin, useLuxon } from '#imports'

type Utils = ReturnType<typeof useLuxon>

// explicit type: the inferred one points into node_modules/.pnpm and breaks the declaration build
const plugin: Plugin<{ luxon: Utils['$luxon'], lf: Utils['$lf'], lp: Utils['$lp'] }> = defineNuxtPlugin(() => {
  const { $luxon, $lp } = useLuxon()

  return {
    provide: {
      luxon: $luxon,
      lf: $luxon,
      lp: $lp,
    },
  }
})

export default plugin
