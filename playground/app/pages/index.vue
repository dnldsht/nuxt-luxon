<template>
  <div class="mt-4">
    <UCard>
      <template #header>
        format
      </template>

      <code>$luxon(now, 'full')</code>{{ $luxon(now, 'full') }}<br>
      <code>$luxon('2025-04-01', 'date')</code>{{ $luxon('2025-04-01', 'date') }}<br>
      <code>$luxon(null, 'full')</code>{{ $luxon(null, 'full') }}
    </UCard>
    <USeparator class="my-4" />
    <UCard>
      <template #header>
        parse & manipulate
      </template>
      add days
      <UInput
        v-model="days"
        type="number"
        placeholder="+ days"
      />
      <code class="ml-1">$lp(now).plus({ days: Number(days) })</code>{{ $luxon($lp(now).plus({ days: Number(days) }), 'full') }}<br>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { $luxon, $lp } = useLuxon()
const now = new Date()
const days = ref(0)
</script>
