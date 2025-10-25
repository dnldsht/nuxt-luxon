import { describe, it, expect, vi } from 'vitest'
import { computed, ref } from 'vue'
import { useLuxon } from '../src/runtime/composables/useLuxon'
import { DEFAULT_OPTIONS } from '../src/module'

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
    const { $luxon, $lf, $lp, luxon, lf, lp } = useLuxon()
    expect($luxon).toBeDefined()
    expect($lf).toBeDefined()
    expect($lp).toBeDefined()
    expect($luxon).toBe($lf)

    expect(luxon).toBeDefined()
    expect(lf).toBeDefined()
    expect(lp).toBeDefined()
    expect(luxon).toBe(lf)
  })

  it('should return formatted date when value is provided', () => {
    const dateString = '2024-03-10'
    const expectedFormattedDate = '03/10/2024'
    const formattedDate = useLuxon(dateString, 'MM/dd/yyyy')
    expect(formattedDate.value).toBe(expectedFormattedDate)
  })

  it('format must accept ref and getters', () => {
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

  it('parse must accept ref and getters', () => {
    const dateString = '03/10/2024'
    const expectedISODate = '2024-03-10'

    const { lp } = useLuxon()

    // value
    expect(lp(dateString, 'MM/dd/yyyy').value.toISODate()).toBe(expectedISODate)
    // ref
    expect(lp(ref(dateString), 'MM/dd/yyyy').value.toISODate()).toBe(expectedISODate)
    // getter
    expect(lp(() => dateString, 'MM/dd/yyyy').value.toISODate()).toBe(expectedISODate)
    // computed
    expect(lp(computed(() => dateString), 'MM/dd/yyyy').value.toISODate()).toBe(expectedISODate)
  })
})
