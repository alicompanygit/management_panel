<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute } from 'nuxt/app';

const route = useRoute();

const isNotificationPage = computed(() => {
  return route.path?.split('/')[1] === 'notification';
});
</script>
<template>
  <div
    :class="[
      'd-flex align-center mx-1 cursor-pointer py-1 px-1 header-icon',
      { 'header-icon__selected': isNotificationPage },
    ]"
    @click="navigateTo('/notification')"
  >
    <Icon
      icon="solar:bell-bing-line-duotone"
      height="24"
      width="24"
      :style="{
        color: isNotificationPage ? 'rgb(var(--v-theme-primary))' : '',
      }"
    />
  </div>
</template>
