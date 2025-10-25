<template>
  <div>
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
