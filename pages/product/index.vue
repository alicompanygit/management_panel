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

    <v-row class="justify-center">
      <div
        class="d-flex justify-center ga-4 bg-grey py-3 px-5 rounded rounded-lg"
      >
        <base-button
          name="Forged"
          :variant="type === 'forged' ? 'outlined' : ''"
          color="#FFD933"
          class="px-8"
          @click="handleChangeType('forged')"
        />
        <base-button
          name="Normal"
          :variant="type === 'normal' ? 'outlined' : ''"
          color="#FFD933"
          class="px-8"
          @click="handleChangeType('normal')"
        />
      </div>
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
            class="mb-2 rounded-lg cursor-pointer"
            @click="handleGoDetile(product.id)"
          />

          <div
            class="mt-6 text-white text-secondary2 cursor-pointer"
            style="font-size: 18px !important"
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
      <div
        :class="[
          mobile ? 'w-100' : 'w-50',
          'd-flex justify-space-between align-center',
        ]"
      >
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
import { computed, nextTick, onMounted, ref } from 'vue';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';
import { navigateTo } from 'nuxt/app';
import { useDisplay } from 'vuetify';
import { useI18n } from 'vue-i18n';

const { mobile } = useDisplay();
const { t } = useI18n();

const selectedIds = ref<number[]>([]);
const type = ref('normal');
const phone = '971566794959';
const page = ref(1);

const products = computed(() => useProduct.foldersProduct?.products ?? []);

const allSelected = computed(
  () =>
    products.value.length > 0 &&
    selectedIds.value.length === products.value.length
);

const getProductData = () => {
  const dataStr = localStorage.getItem('productData');
  const productData = dataStr ? JSON.parse(dataStr) : null;

  if (!productData?.brand_name || !productData?.tire_name) return null;
  return productData;
};

const fetchProducts = async () => {
  const productData = getProductData();
  if (!productData) return;

  await useProduct.apiGetFolderProduct({
    page: page.value,
    per_page: 10,
    brand_name: productData.brand_name,
    tire_name: productData.tire_name,
    search_type: type.value,
  });
};

const toggleSelectAll = () => {
  selectedIds.value = allSelected.value ? [] : products.value.map((p) => p.id);
};

const exportToWhatsApp = () => {
  if (!selectedIds.value.length) return;

  const message =
    'Selected Product IDs:\n\n' +
    selectedIds.value
      .map((product_code) => `product-code: ${product_code}`)
      .join('\n');

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

const nextPage = async () => {
  page.value++;
  await fetchProducts();
};

const previousPage = async () => {
  if (page.value <= 1) return;
  page.value--;
  await fetchProducts();
};

const handleGoDetile = async (id: number) => {
  if (!id) return;

  localStorage.setItem('productDetail', id.toString());
  await nextTick();
  navigateTo(`/product/detail`);
};

const handleChangeType = async (typeValue: string) => {
  type.value = typeValue;
  page.value = 1;
  await fetchProducts();
};

onMounted(fetchProducts);
</script>
