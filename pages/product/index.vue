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

    <v-row class="justify-center mb-4">
      <div
        class="d-flex justify-center align-center ga-4 bg-grey py-3 px-5 rounded-lg"
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
        <base-form-text-field
          v-model="code_search"
          clearable
          placeholder="SearchInCode"
          bgColor="#26262c"
          style="max-width: 250px; min-width: 150px"
        />
      </div>
    </v-row>

    <v-row class="justify-center">
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex justify-center mb-4"
        style="max-width: max-content !important"
      >
        <v-card
          elevation="2"
          class="bg-grey text-center justify-center px-2 py-2"
          :class="{
            'border-lg border-primary': selectedIds.includes(product.id),
          }"
          :style="{
            width: mobile ? '210px' : '460px',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between',
          }"
        >
          <v-img
            :src="getFullImageUrl(product.cover)"
            :height="mobile ? '267px' : '533px'"
            :width="mobile ? '200px' : '450px'"
            class="rounded-lg cursor-pointer"
            @click="handleGoDetile(product.id)"
          />
          <div class="d-flex justify-center align-center text-break ga-2">
            <v-checkbox
              v-model="selectedIds"
              :value="product.product_code"
              density="compact"
              hide-details
              class="mt-1"
            />
            <div
              class="text-white text-secondary2 mt-2 cursor-pointer text-break"
              style="font-size: 18px; color: #01c0c8"
              @click="handleGoDetile(product.id)"
            >
              ID: {{ product.product_code }}
            </div>
          </div>
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
          :disabled="
            page >= Math.ceil((useProduct.foldersProduct?.count ?? 0) / 10)
          "
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
import { navigateTo } from 'nuxt/app';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';

const { mobile } = useDisplay();
const { t } = useI18n();

const selectedIds = ref<string[]>([]);
const code_search = ref<string>('');
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
    search_product_code: code_search.value,
  });
};

const toggleSelectAll = () => {
  selectedIds.value = allSelected.value
    ? []
    : products.value.map((p) => p.product_code);
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

watch(
  () => code_search.value,
  (newVal: string) => {
    fetchProducts();
    page.value = 1;
  }
);

onMounted(fetchProducts);
</script>
