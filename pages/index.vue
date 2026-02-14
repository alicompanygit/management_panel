<template>
  //slider
  <v-carousel cycle interval="3000">
    <v-carousel-item
      v-for="item in banners"
      :src="getFullImageUrl(item.image)"
      cover
    ></v-carousel-item>
  </v-carousel>

  <h2 class="text-waith text-center mt-16 pt-10">
    {{ t('NewProduct') }}
  </h2>
  <v-divider
    :thickness="2"
    color="#FFD933"
    class="border-opacity-100 my-5"
  ></v-divider>
  <v-sheet class="mx-auto my-8" elevation="8" max-width="800">
    <v-slide-group
      class="pa-4"
      style="background-color: #030306"
      selected-class="bg-success"
      show-arrows
      id="newproduct"
    >
      <v-slide-group-item
        v-for="item in useProduct.searchNewProducts.products"
        :key="item"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <div
          class="bg-grey py-3 px-3 rounded-lg cursor-pointer"
          @click="navigateTo('/auth/login')"
        >
          <img
            v-if="item.images"
            :src="
              getFullImageUrl(
                item.images.filter((item) => item.type === 'cover')[0]?.url
              )
            "
            alt="Banner"
            width="200"
            height="200"
            style="object-fit: cover; border-radius: 10px"
          />
          <div
            v-text="`${item.brand_name} - ${item.tire_name}`"
            class="text-white"
          ></div>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  <v-divider
    :thickness="2"
    color="#FFD933"
    class="border-opacity-100 my-5"
  ></v-divider>

  //product
  <div class="w-100 d-flex justify-center mt-10">
    <div
      style="background-color: #1c1c21"
      class="py-5 px-10 rounded-lg d-flex ga-4"
    >
      <base-button
        name="Normal"
        class="px-6"
        color="#FFD933"
        textColor="text-waith font-weight-bold"
      />
      <base-button
        name="Forged"
        class="px-6"
        color="#FFD933"
        textColor="text-waith font-weight-bold"
      />
    </div>
  </div>
  <div class="w-100 d-flex justify-center align-center mt-4">
    <div class="py-5 px-10 rounded-lg d-flex align-center ga-4">
      <base-button
        name="AllSizes"
        class="px-6"
        color="#1c1c21"
        textColor="font-weight-bold"
      />
      <base-button
        name="AllBrands"
        class="px-6"
        color="#1c1c21"
        textColor="font-weight-bold"
      />
      <div style="width: 250px">
        <base-form-text-field
          customClass="bg-grey rounded-lg text-waith"
          placeholder="DoSearch"
        />
      </div>
    </div>
  </div>
  <div class="w-100 d-flex justify-center align-center mt-4">
    <div class="w-75 bg-grey py-5 px-5 rounded-lg">
      <v-row>
        <v-col cols="6" class="border-lg border-error"></v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';

const { t } = useI18n();

const banners = computed(() => useBanner.bannerData?.banners ?? []);

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

onMounted(async () => {
  await useBanner.apiGetBanners();
  await useProduct.apiSearchProductsNew();
  await useProduct.apiSearchProducts();
});
</script>
