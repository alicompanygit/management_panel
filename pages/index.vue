<template>
  <v-carousel cycle interval="3000">
    <v-carousel-item
      v-for="item in banners"
      :src="getFullImageUrl(item.image)"
      cover
    ></v-carousel-item>
  </v-carousel>
  <v-sheet class="mx-auto mt-10" elevation="8" max-width="800">
    <v-slide-group
      class="pa-4"
      selected-class="bg-success"
      show-arrows
      id="newproduct"
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card :class="['ma-4']" height="200" width="100" @click="toggle">
          test
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useBanner } from '~/composables/banner';

const banners = computed(() => useBanner.bannerData?.banners ?? []);

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

onMounted(async () => {
  await useBanner.apiGetBanners();
});
</script>
