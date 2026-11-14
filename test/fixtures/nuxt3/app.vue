<script setup lang="ts">
const date = ref('2024-03-15T10:30:00Z')
const full = useLuxon(date, 'date_full')
</script>

<template>
  <div>{{ full }}</div>
  <div>{{ $lf(date, 'yyyy-MM-dd') }}</div>
</template>
