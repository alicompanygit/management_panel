<template>
  <div class="text-white">{{ useProduct.detail }}</div>
</template>

<script setup lang="ts">
import { useRoute } from '#imports';
import { onMounted } from 'vue';
import { useProduct } from '~/composables/Product';

const route = useRoute();

onMounted(async () => {
  if (!route?.params?.id) return;

  await useProduct.apiGetProductDetail(Number(route?.params?.id));
});
</script>
