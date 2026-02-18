<template>
  //slider
  <v-carousel cycle interval="3000" class="custom-carousel-page">
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
  <v-sheet
    class="mx-auto my-8 custom-carousel-page"
    elevation="8"
    max-width="800"
  >
    <v-slide-group
      class="pa-4"
      selected-class="bg-success"
      show-arrows
      id="newproduct"
      style="background-color: #030306"
    >
      <v-slide-group-item
        v-for="item in useProduct.searchNewProducts.products"
        :key="item"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <div
          class="bg-grey py-3 px-3 mx-8 rounded-lg cursor-pointer"
          @click="handleGoDetile(item.id)"
        >
          <img
            v-if="item.images"
            :src="
              getFullImageUrl(
                item.images.filter((item) => item.type === 'cover')[0]?.url
              )
            "
            alt="Banner"
            width="250"
            height="250"
            style="object-fit: cover; border-radius: 10px"
          />
          <div
            v-text="`${item.brand_name ?? ''} - ${item.tire_name ?? ''}`"
            class="text-white pt-3"
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
  <!-- <div class="w-100 d-flex justify-center mt-10">
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
  </div> -->
  <div class="w-100 d-flex justify-center align-center mt-4">
    <div class="py-5 px-10 rounded-lg d-flex align-center ga-4">
      <div style="width: 250px">
        <base-form-text-field
          v-model="folderSearch"
          customClass="bg-grey rounded-lg text-waith"
          placeholder="SearchInCode"
        />
      </div>
    </div>
  </div>
  <div class="w-100 d-flex justify-center align-center mt-4">
    <div
      class="w-75 py-5 px-5 rounded-lg"
      style="max-height: 500px; overflow: scroll"
    >
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6">
          <v-card
            elevation="2"
            class="pa-2 text-center bg-grey d-flex justify-end align-center px-5 py-4 cursor-pointer"
            @click="handleGoProduct(product.brand_name, product.tire_name)"
          >
            <div
              class="text-white mx-2 mt-1"
              style="font-size: 14px !important"
            >
              {{ product.brand_name + ' - ' + product.tire_name }}
            </div>
            <v-icon icon="solar:folder-linear" color="#FFD933" size="35px" />
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';

const { t } = useI18n();

const folderSearch = ref(null);

const banners = computed(() => useBanner.bannerData?.banners ?? []);
const products = computed(() => useProduct.folders?.items ?? []);

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

const handleGoProduct = async (b: string, t: string) => {
  localStorage.setItem(
    'productData',
    JSON.stringify({ brand_name: b, tire_name: t })
  );
  await nextTick();
  navigateTo('/product');
};

const handleGoDetile = async (id: any) => {
  if (!id) return;

  localStorage.setItem('productDetail', id);
  await nextTick();
  navigateTo(`/product/detail`);
};

watch(
  () => folderSearch.value,
  async () => {
    await useProduct.apiGetFolders({
      product_code: folderSearch.value ?? null,
    });
  }
);

onMounted(async () => {
  await useBanner.apiGetBanners();
  await useProduct.apiSearchProductsNew();
  await useProduct.apiGetFolders({ product_code: folderSearch.value ?? null });
});
</script>

<style>
.custom-carousel-page {
  .v-btn {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.168);
    color: white;
    transition: all 0.3s ease;
  }
}
.v-slide-group__next,
.v-slide-group__prev {
  svg {
    color: rgb(255, 255, 255);
  }
}
</style>
