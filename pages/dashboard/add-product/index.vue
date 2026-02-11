<template>
  <div
    class="dashboard-container d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 my-8 rounded-lg font-weight-bold"
      style="color: #ffd933; font-size: 17px"
    >
      افزودن محصول
    </div>
  </div>

  <div
    class="dashboard-container d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 mb-8 rounded-lg font-weight-bold"
      style="color: #ffd933; font-size: 17px"
    >
      <v-row>
        <!-- TEXT FIELDS -->
        <v-col cols="3" v-for="field in textFields" :key="field.model">
          <base-form-text-field
            v-model="form[field.model]"
            :label="field.label"
            placeholder="وارد کنید"
            clearable
          />
        </v-col>

        <!-- COVER -->
        <v-col cols="3">
          <span class="input-label">کاور</span>
          <v-file-input
            v-model="form.cover"
            accept="image/*"
            clearable
            hide-details
            density="compact"
          />
        </v-col>

        <!-- GALLERY 1-5 -->
        <v-col cols="3" v-for="i in 5" :key="i">
          <span class="input-label">تصویر {{ i }}</span>
          <v-file-input
            :model-value="form.gallery[i - 1] || null"
            @update:modelValue="(val) => handleGalleryChange(val, i - 1)"
            accept="image/*"
            clearable
            hide-details
            density="compact"
          />
        </v-col>

        <!-- SUBMIT -->
        <v-col cols="12" class="d-flex justify-end">
          <base-button
            @click="handleSubmit"
            name="افزودن"
            color="#ffd933"
            class="px-8"
            :loading="loading"
          />
        </v-col>
      </v-row>
    </div>
  </div>
  <div
    class="dashboard-container dashboard-user-management d-flex justify-center align-center text-white px-4"
  >
    <base-table-server
      :headers="tableHeaders"
      :items="tableData?.banners ?? []"
      :loading="loading"
      :totalItems="tableData?.count || 0"
      class="w-100 rounded rounded-lg"
    >
      <template v-slot:created_at="{ item }"> </template>
      <template v-slot:image="{ item }">
        <div class="d-flex justify-center">
          <img
            v-if="item.image"
            alt="Banner"
            width="40"
            height="40"
            style="object-fit: cover; border-radius: 50%"
          />
        </div>
      </template>

      <template v-slot:is_active="{ item }">
        <div class="d-flex justify-center">
          <v-switch
            :label="item.is_active ? 'فعال' : 'غیرفعال'"
            :model-value="item.is_active"
            :color="item.is_active ? '#da8989' : '#FFD933'"
          ></v-switch>
        </div>
      </template>
    </base-table-server>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/product';

definePageMeta({ layout: 'dashboard' });

const { t } = useI18n();

const loading = ref(false);
const tableHeaders = ref([
  { title: t('Index'), key: 'index', align: 'start' },
  { title: t('شناسه'), key: 'id' },
  { title: t('تاریخ ایجاد'), key: 'created_at' },
  { title: t('تصویر'), key: 'image' },
  { title: t('وضعیت'), key: 'is_active' },
]);

const textFields = [
  { model: 'brand_name', label: 'نام برند' },
  { model: 'tire_name', label: 'نام تایر' },
  { model: 'product_code', label: 'شناسه محصول' },
  { model: 'type', label: 'نوع' },
  { model: 'tire_size', label: 'سایز تایر' },
  { model: 'width', label: 'عرض' },
  { model: 'color', label: 'رنگ' },
  { model: 'quality', label: 'quality' },
  { model: 'bolt', label: 'bolt' },
  { model: 'cb', label: 'cb' },
];

const form = ref<any>({
  brand_name: '',
  tire_name: '',
  product_code: '',
  type: '',
  tire_size: '',
  width: '',
  color: '',
  quality: '',
  bolt: '',
  cb: '',
  cover: null,
  gallery: [] as File[],
});

const tableData = computed(() => useProduct.bannerData);

const handleGalleryChange = (file: File | null, index: number) => {
  if (!file) {
    form.value.gallery.splice(index, 1);
    return;
  }

  form.value.gallery[index] = file;
};

const handleSubmit = async () => {
  loading.value = true;

  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    if (key === 'gallery') return;
    if (form.value[key]) formData.append(key, form.value[key]);
  });

  if (form.value.cover) formData.append('cover', form.value.cover);

  form.value.gallery.forEach((file: File) => {
    formData.append('gallery', file);
  });

  await useProduct.apiAddProduct(formData);

  loading.value = false;
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  align-items: start !important;
}
.base-color {
  background-color: #26262c;
}
</style>
