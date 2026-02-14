<template>
  <v-container fluid class="pa-4">
    <v-row class="mb-4">
      <v-col cols="auto">
        <base-button
          variant="outlined"
          @click="toggleSelectAll"
          :name="allSelected ? t('UnselectAll') : t('SelectAll')"
          color="#FFD933"
        />
      </v-col>

      <v-col>
        <v-btn
          @click="exportToWhatsApp"
          color="#FFD933"
          :disabled="!selectedIds.length"
        >
          {{ t('Export') }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Products Grid -->
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="6" sm="4">
        <v-card
          elevation="2"
          class="pa-2 text-center bg-grey"
          :class="{ 'bg-grey-lighten-4': selectedIds.includes(product.id) }"
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
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/Product';

const { t } = useI18n();

const phone = '989XXXXXXXXX';

const selectedIds = ref<number[]>([]);

const products = computed(() => useProduct.productSummery?.products || []);

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

const config = useRuntimeConfig();

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return config.public.baseUrl.replace('/api', '') + path;
};

onMounted(async () => {
  await useProduct.apiGetProductsSummary();
});
</script>
