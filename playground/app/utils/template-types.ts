// type-level check, run by `pnpm test:types`: configured template names autocomplete
import type { TemplateName } from '../../../src/module'

export const custom: TemplateName = 'my_template'
export const builtin: TemplateName = 'date_short'
// @ts-expect-error not a configured template
export const unknown: TemplateName = 'nope'
