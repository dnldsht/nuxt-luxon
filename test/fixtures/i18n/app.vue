<template>
  <div>
    <div id="composable">
      {{ $luxon(date, 'full') }}
    </div>
    <div id="plugin">
      {{ $lf(date, 'full') }}
    </div>
  </div>
</template>

<script setup>
const { $luxon } = useLuxon()
const { $lf } = useNuxtApp()
const date = '2024-07-12T12:23:49.000Z'
</script>
