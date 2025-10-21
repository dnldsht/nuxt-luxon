<template>
  <div>
    <h1>nuxt-luxon</h1>
    <div class="language-selector">
      <select v-model="selectedLocale">
        <option
          v-for="loc in locales"
          :key="loc.code"
          :value="loc.code"
        >
          {{ loc.name }}
        </option>
      </select>
      {{ $t('current_locale') }}: {{ locale }}
    </div>

    <h2>formats</h2>
    <ul>
      <li
        v-for="format in formats"
        :key="format"
      >
        {{ format }}: {{ $luxon(now, format) }}
      </li>
    </ul>

    <h2>parse</h2>
    <input
      v-model="date"
      type="date"
    >
    +2 days = {{ plusTwoDays }}
    <button
      v-if="date"
      @click="moveDate(2)"
    >
      +2 days
    </button>

    <h2>humanization</h2>
    <input
      v-model="relativeOtherDate"
      type="datetime-local"
    >
    {{ relativeDate }}
  </div>
</template>

<script setup lang="ts">
const { $luxon, $lp } = useLuxon()

const { locale, locales, setLocale } = useI18n()

const selectedLocale = ref(locale.value)
watch(selectedLocale, (newLocale) => {
  setLocale(newLocale)
})
const now = new Date()
const formats = [
  'full',
  'fulls',
  'huge',
  'huges',
  'med',
  'meds',
  'short',
  'shorts',
  'date_full',
  'date_huge',
  'date_med',
  'date_medd',
  'date',
  'date_short',
  'time24',
  'time24longoffset',
  'time24s',
  'time',
  'times',
  'yyyy-MM-dd',
  'my_template',
]

const date = ref<string | null>(null)
const relativeOtherDate = ref(null)

const plusTwoDays = computed(() => {
  if (!date.value) return null
  const parsedDate = $lp(date.value)
  return $luxon(parsedDate.plus({ days: 2 }), 'yyyy-MM-dd')
})

const relativeDate = computed(() => {
  if (!relativeOtherDate.value) return null
  const parsedDate = $lp(relativeOtherDate.value)
  return $luxon(parsedDate, 'relative')
})

async function moveDate(days: number) {
  if (!date.value) return
  const parsedDate = $lp(date.value)
  date.value = $luxon(parsedDate.plus({ days }), 'yyyy-MM-dd')
}
</script>
