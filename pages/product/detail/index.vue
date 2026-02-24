<template>
  <v-container
    class="pa-4 fill-height d-flex align-center justify-center"
    :dir="locale === 'fa' ? 'rtl' : 'ltr'"
  >
    <v-card class="bg-grey px-7 py-7" max-width="1000" width="100%">
      <v-row>
        <!-- Image Section -->
        <v-col
          cols="12"
          md="6"
          order="1"
          :order-md="locale === 'fa' ? 1 : 2"
          class="px-8"
        >
          <v-img
            eager
            :src="getFullImageUrl(selectedImage)"
            height="400"
            cover
            class="mb-4 rounded-lg"
          />

          <!-- Thumbnails -->
          <v-row dense :justify="locale === 'fa' ? 'start' : 'end'">
            <v-col
              v-for="(img, index) in product?.images"
              :key="index"
              cols="3"
              class="d-flex justify-center"
            >
              <v-img
                :src="getFullImageUrl(img.url)"
                height="60"
                width="60"
                cover
                class="rounded cursor-pointer"
                @click="selectedImage = img.url"
              />
            </v-col>
          </v-row>
        </v-col>

        <!-- Info Section -->
        <v-col
          cols="12"
          md="6"
          order="2"
          :order-md="locale === 'fa' ? 2 : 1"
          :style="
            locale === 'fa'
              ? 'border-right: 3px solid #ffda3320'
              : 'border-left: 3px solid #ffda3320'
          "
        >
          <div
            class="pa-4 text-white"
            :class="locale === 'fa' ? 'text-left' : 'text-right'"
          >
            <div class="text-h2 mb-5 text-secondary2">
              {{ product?.brand_name }}
            </div>

            <div class="mt-2">
              {{ `${t('TireName')}: ${product?.tire_name ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('TireSize')}: ${product?.tire_size ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('Type')}: ${product?.type ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('Width')}: ${product?.width ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('Color')}: ${product?.color ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('Quality')}: ${product?.quality ?? '-'}` }}
            </div>

            <!-- Bolt -->
            <div class="mt-2">
              <span v-if="locale === 'fa'">
                bolt:
                <span dir="rtl">{{ product?.bolt ?? '-' }}</span>
              </span>
              <span v-else>
                <span>{{ product?.bolt ?? '-' }}</span> :bolt
              </span>
            </div>

            <!-- CB -->
            <div class="mt-2">
              <span v-if="locale === 'fa'">
                CB:
                <span dir="rtl">{{ product?.cb ?? '-' }}</span>
              </span>
              <span v-else>
                <span>{{ product?.cb ?? '-' }}</span> :CB
              </span>
            </div>

            <div class="mt-2">
              {{ `${t('ProductId')}: ${product?.product_code ?? '-'}` }}
            </div>

            <div class="mt-2">
              {{ `${t('Status')}: ${product?.is_active ? 'فعال' : 'غیرفعال'}` }}
            </div>

            <div class="mt-2" v-if="product?.is_active">
              {{ t('New') }}
            </div>
          </div>
        </v-col>

        <!-- Whatsapp Button -->
        <v-col
          cols="12"
          class="d-flex"
          order="3"
          :class="locale === 'fa' ? 'justify-end' : 'justify-start'"
        >
          <base-button
            style="margin-top: -30px"
            name="Whatsapp"
            icon="fa7-brands:whatsapp"
            color="#25D366"
            @click="openWhatsapp"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/Product';
import { useBanner } from '~/composables/banner';

const { t, locale } = useI18n();

const selectedImage = ref<string>('');
const phoneNumber = '971566794959';

const product = computed(() => useProduct.detail?.product ?? {});

const whatsappLink = () => {
  const text =
    `Brand: ${product.value?.brand_name ?? '-'}\n` +
    `Tire: ${product.value?.tire_name ?? '-'}\n` +
    `product-code: ${product.value?.product_code ?? '-'}`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};

const openWhatsapp = () => {
  window.open(whatsappLink(), '_blank');
};

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner?.config?.public?.baseUrl}${path}`;
};

onMounted(async () => {
  const id = localStorage.getItem('productDetail');
  if (!id) return;

  await useProduct.apiGetProductDetail(Number(id));

  if (product.value?.cover) {
    selectedImage.value = product.value.cover;
  }
});
</script>
