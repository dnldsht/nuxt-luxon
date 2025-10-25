<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'Formats',
    to: '/formats',
    active: route.path.startsWith('/formats'),
  },

])
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        nuxt-luxon
      </template>
      <UNavigationMenu :items="items" />
    </UHeader>
    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>
  </UApp>
</template>
