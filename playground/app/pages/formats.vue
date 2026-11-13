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
  </div>
</template>

<script setup lang="ts">
const { $luxon } = useLuxon()

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
</script>
