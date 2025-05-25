import { describe, it, expect, vi } from 'vitest'
import type { DateTime } from 'luxon'
import { computed, ref, toValue } from 'vue'
import { useLuxon } from '../src/runtime/composables/useLuxon'
import type { ParseInput, FormatOutputOptions, FormatInputOptions } from '../src/runtime/types'
import { DEFAULT_OPTIONS } from '../src/module'

type LuxonFormatter = (value: ParseInput, outuputFormat?: FormatOutputOptions, inputFormat?: FormatInputOptions) => string | DateTime | null | undefined
type LuxonParser = (value: ParseInput, format?: FormatInputOptions) => DateTime | null

interface LuxonComposableUtils {
  $luxon: LuxonFormatter
  $lf: LuxonFormatter
  $lp: LuxonParser
}

vi.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      luxon: DEFAULT_OPTIONS,
    },
  }),
}))

describe('useLuxon', () => {
  it('should be defined', () => {
    expect(useLuxon).toBeDefined()
  })

  it('should return $luxon, $lf, and $lp when no arguments are provided', () => {
    const result = useLuxon() as LuxonComposableUtils // Type assertion
    const { $luxon, $lf, $lp } = result
    expect($luxon).toBeDefined()
    expect($lf).toBeDefined()
    expect($lp).toBeDefined()
    // Check if $luxon and $lf are the same function
    expect($luxon).toBe($lf)
  })

  it('should return formatted date when value is provided', () => {
    const dateString = '2024-03-10'
    const expectedFormattedDate = '03/10/2024'
    const formattedDate = useLuxon(dateString, 'MM/dd/yyyy')
    expect(formattedDate.value).toBe(toValue(expectedFormattedDate))
  })

  it('must accept ref and getters', () => {
    const dateString = '2024-03-10'
    const expectedFormattedDate = '03/10/2024'

    // value
    expect(useLuxon(dateString, 'MM/dd/yyyy').value).toBe(expectedFormattedDate)
    // ref
    expect(useLuxon(ref(dateString), 'MM/dd/yyyy').value).toBe(expectedFormattedDate)
    // getter
    expect(useLuxon(() => dateString, 'MM/dd/yyyy').value).toBe(expectedFormattedDate)
    // computed
    expect(useLuxon(computed(() => dateString), 'MM/dd/yyyy').value).toBe(expectedFormattedDate)
  })
})
