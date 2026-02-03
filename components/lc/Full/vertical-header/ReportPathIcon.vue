<script setup lang="ts">
import { useRoute } from 'nuxt/app';

const route = useRoute();

const routeIconMap: Record<string, { icon: string; destinationPath: string }> =
  {
    '/contacts/ticket': {
      icon: 'solar:presentation-graph-line-duotone',
      destinationPath: '/reports/ticketsReport',
    },
  };

const routingPage = computed(() => {
  return routeIconMap[route.path] || null;
});

const isReportsPage = computed(() => {
  return route.path?.split('/')[1] === 'reports';
});
</script>

<template>
  <NuxtLink
    v-if="routingPage || isReportsPage"
    :to="routingPage?.destinationPath || ''"
  >
    <div
      :class="[
        'd-flex align-center py-1 px-1 header-icon',
        { 'header-icon__selected': isReportsPage },
      ]"
    >
      <v-icon
        :icon="routingPage?.icon || 'solar:presentation-graph-line-duotone'"
        height="24"
        width="24"
        class="cursor-pointer"
        :color="isReportsPage ? 'primary' : ''"
      />
    </div>
  </NuxtLink>
</template>
