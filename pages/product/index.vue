<template>
  <v-container fluid class="pa-4">
    <v-row class="mb-4">
      <v-col cols="auto">
        <base-button
          variant="outlined"
          @click="toggleSelectAll"
          :name="allSelected ? t('UnselectAll') : t('SelectAll')"
          color="#FFD933"
          :icon="
            allSelected
              ? 'fluent:select-all-on-16-filled'
              : 'fluent:select-all-on-16-regular'
          "
        />
      </v-col>

      <v-col>
        <base-button
          icon="circum:export"
          @click="exportToWhatsApp"
          color="#FFD933"
          :disabled="!selectedIds.length"
          name="Export"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="6" sm="4">
        <v-card
          elevation="2"
          class="pa-2 text-center bg-grey"
          :class="{
            'border-lg border-primary': selectedIds.includes(product.id),
          }"
        >
          <v-img
            :src="getFullImageUrl(product.cover)"
            max-height="350"
            aspect-ratio="1"
            cover
            class="mb-2 rounded-lg"
          />

          <div
            class="text-caption mb-1 text-white"
            style="font-size: 14px !important"
            @click="handleGoDetile(product.id)"
          >
            ID: {{ product.product_code }}
          </div>

          <v-checkbox
            :value="product.id"
            v-model="selectedIds"
            density="compact"
            hide-details
          />
        </v-card>
      </v-col>
    </v-row>
    <div class="w-100 d-flex justify-center align-center my-10">
      <div class="w-50 d-flex justify-space-between align-center">
        <base-button
          name="NextPage"
          color="#FFD933"
          @click="nextPage"
          :disabled="useProduct.foldersProduct?.count ?? 0 / 10 >= page"
          icon="fluent:arrow-right-20-regular"
          iconSize="16px"
        />
        <base-button
          name="previouspage"
          color="#FFD933"
          @click="previousPage"
          :disabled="page <= 1"
          icon="fluent:arrow-left-28-filled"
          iconLocation="left"
          iconSize="15px"
        />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#imports';
import { navigateTo } from 'nuxt/app';
import { computed, nextTick, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const page = ref(1);

const phone = '989XXXXXXXXX';

const selectedIds = ref<number[]>([]);

const path = computed(() => ({
  brand_name: route?.query?.brand_name,
  tire_name: route?.query?.tire_name,
}));

const products = computed(() => useProduct.foldersProduct?.products ?? []);

const allSelected = computed(
  () =>
    products.value.length > 0 &&
    selectedIds.value.length === products.value.length
);

const toggleSelectAll = () => {
  selectedIds.value = allSelected.value ? [] : products.value.map((p) => p.id);
};

const exportToWhatsApp = () => {
  if (!selectedIds.value.length) return;

  const message =
    'Selected Product IDs:\n\n' +
    selectedIds.value.map((id) => `ID: ${id}`).join('\n');

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

const nextPage = async () => {
  const dataStr = localStorage.getItem('productData');
  const productData = dataStr ? JSON.parse(dataStr) : null;

  if (!productData.brand_name || !productData.tire_name) return;

  page.value++;
  await useProduct.apiGetFolderProduct({
    page: page.value,
    per_page: 10,
    brand_name: productData.brand_name,
    tire_name: productData.tire_name,
  });
};

const previousPage = async () => {
  const dataStr = localStorage.getItem('productData');
  const productData = dataStr ? JSON.parse(dataStr) : null;

  if (!productData.brand_name || !productData.tire_name) return;

  page.value--;
  await useProduct.apiGetFolderProduct({
    page: page.value,
    per_page: 10,
    brand_name: productData.brand_name,
    tire_name: productData.tire_name,
  });
};

const handleGoDetile = async (id) => {
  if (!id) return;

  localStorage.setItem('productDetail', id);
  await nextTick();
  navigateTo(`/product/detail`);
};

onMounted(async () => {
  const dataStr = localStorage.getItem('productData');
  const productData = dataStr ? JSON.parse(dataStr) : null;

  if (!productData.brand_name || !productData.tire_name) return;

  await useProduct.apiGetFolderProduct({
    page: page.value,
    per_page: 10,
    brand_name: productData.brand_name,
    tire_name: productData.tire_name,
  });
});
</script>
