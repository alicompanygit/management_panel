<template>
  <div
    class="dashboard-container d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 my-8 rounded-lg font-weight-bold"
      style="color: #ffd933; font-size: 17px"
    >
      {{ t('AddProduct') }}
    </div>
  </div>

  <div
    class="dashboard-container d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 mb-8 rounded-lg font-weight-bold"
      style="color: #ffd933; font-size: 17px"
    >
      <v-form ref="formRef">
        <v-row>
          <v-col cols="3" v-for="field in textFields" :key="field.model">
            <base-form-select
              :items="[
                { title: 'Normal', value: 'normal' },
                { title: 'Forged', value: 'forged' },
              ]"
              v-if="field.model === 'type'"
              v-model="form[field.model]"
              :label="field.label"
              placeholder="Enter"
              clearable
              :rules="
                ['brand_name', 'tire_name', 'product_code', 'type'].includes(
                  field.model
                )
                  ? [requiredRule]
                  : []
              "
            ></base-form-select>
            <base-form-text-field
              v-else
              v-model="form[field.model]"
              :label="field.label"
              placeholder="Enter"
              clearable
              :rules="
                ['brand_name', 'tire_name', 'product_code', 'type'].includes(
                  field.model
                )
                  ? [requiredRule]
                  : []
              "
            />
          </v-col>

          <v-col cols="3">
            <span class="input-label">{{ t('Cover') }}</span>
            <v-file-input
              v-model="form.cover"
              accept="image/*"
              prepend-icon=""
              clearable
              hide-details
              density="compact"
              :label="t('SelectImg')"
              :rules="[requiredRule]"
            />
          </v-col>

          <v-col cols="3" v-for="i in 5" :key="i">
            <span class="input-label">{{ t('Image') }} {{ i }}</span>
            <v-file-input
              v-model="form.gallery[i - 1]"
              accept="image/*"
              prepend-icon=""
              clearable
              hide-details
              density="compact"
              :label="t('SelectImg')"
            />
          </v-col>

          <v-col cols="3">
            <v-switch
              v-model="form.is_active"
              :label="form.is_active ? t('Active') : t('NotActive')"
              :color="form.is_active ? '#da8989' : '#FFD933'"
              inset
            />
            <v-switch
              v-model="form.is_new"
              :label="form.is_new ? t('New') : t('Normal')"
              :color="form.is_new ? '#da8989' : '#FFD933'"
              inset
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-end">
            <base-button
              @click="handleSubmit"
              name="Add"
              color="#ffd933"
              class="px-8"
              :loading="loadingAddProduct"
            />
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
  <div
    class="dashboard-container dashboard-user-management d-flex justify-center align-center text-white px-4"
  >
    <base-table-server
      :headers="tableHeaders"
      :items="tableData?.products ?? []"
      :loading="loading"
      :totalItems="tableData?.count || 0"
      class="w-100 rounded rounded-lg"
    >
      <template v-slot:index="{ index }">{{ index + 1 }}</template>

      <template v-slot:brand_name="{ item }">{{
        item.brand_name || '-'
      }}</template>
      <template v-slot:tire_name="{ item }">{{
        item.tire_name || '-'
      }}</template>
      <template v-slot:product_code="{ item }">{{
        item.product_code || '-'
      }}</template>
      <template v-slot:type="{ item }">{{ item.type || '-' }}</template>
      <template v-slot:tire_size="{ item }">{{
        item.tire_size || '-'
      }}</template>
      <template v-slot:width="{ item }">{{ item.width || '-' }}</template>
      <template v-slot:color="{ item }">{{ item.color || '-' }}</template>
      <template v-slot:quality="{ item }">{{ item.quality || '-' }}</template>
      <template v-slot:bolt="{ item }">{{ item.bolt || '-' }}</template>
      <template v-slot:cb="{ item }">{{ item.cb || '-' }}</template>

      <template v-slot:cover="{ item }">
        <div class="d-flex justify-center">
          <img
            v-if="item.cover"
            :src="getFullImageUrl(item.cover)"
            alt="Cover"
            width="40"
            height="40"
            style="object-fit: cover; border-radius: 5px"
          />
        </div>
      </template>

      <template v-slot:gallery="{ item }">
        <div class="d-flex gap-2 justify-center">
          <img
            v-for="(img, i) in (item.images || []).filter(
              (img: any) => img.type === 'gallery'
            )"
            :key="i"
            :src="getFullImageUrl(img.url)"
            width="30"
            height="30"
            style="object-fit: cover; border-radius: 5px"
          />
        </div>
      </template>

      <template v-slot:created_at="{ item }">
        {{ returnDate(item.created_at) }}
      </template>

      <template v-slot:is_active="{ item }">
        <v-switch
          :model-value="item.is_active"
          @update:modelValue="(val: any) => handleChangeActiv(item, val)"
          :color="item.is_active ? '#da8989' : '#FFD933'"
          inset
          hide-details
        />
      </template>

      <template v-slot:is_new="{ item }">
        <v-switch
          :model-value="item.is_new"
          @update:modelValue="(val: any) => handleChangeNew(item, val)"
          :color="item.is_new ? '#da8989' : '#FFD933'"
          inset
          hide-details
        />
      </template>

      <template v-slot:action="{ item }">
        <v-icon
          @click="removeProuduct(item)"
          icon="fluent:delete-24-regular"
          color="#F95959"
          size="22"
          class="cursor-pointer"
        />
        <v-icon
          icon="solar:pen-linear"
          size="20"
          class="cursor-pointer ms-2"
          color="success"
          @click="openEdit(item)"
        />
      </template>
    </base-table-server>
  </div>

  <base-modal-drawer
    v-model="editDrawer"
    title="EditProduct"
    @close="editDrawer = false"
    class="product-edit-drawer"
  >
    <template #content>
      <v-form class="px-4 py-3">
        <v-row>
          <v-col cols="6" v-for="field in textFields" :key="field.model">
            <base-form-text-field
              v-model="editForm[field.model]"
              :label="field.label"
            />
          </v-col>

          <v-col cols="6">
            <v-switch
              v-model="editForm.is_active"
              :label="editForm.is_active ? t('Active') : t('NotActive')"
              :color="editForm.is_active ? '#da8989' : '#FFD933'"
            />
          </v-col>

          <v-col cols="6">
            <v-switch
              v-model="editForm.is_new"
              :label="editForm.is_new ? t('New') : t('Normal')"
              :color="editForm.is_new ? '#da8989' : '#FFD933'"
            />
          </v-col>

          <v-col cols="6">
            <v-file-input v-model="editForm.cover" :label="t('NewCover')" />
          </v-col>
        </v-row>
      </v-form>
    </template>

    <template #footer>
      <div class="pa-4 d-flex justify-end">
        <base-button
          name="Confirm"
          color="#FFD933"
          :loading="editLoading"
          @click="submitEdit"
        />
      </div>
    </template>
  </base-modal-drawer>
</template>

<script setup lang="ts">
import { requiredRule } from '@/utils/validation';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProduct } from '~/composables/product';

definePageMeta({ layout: 'dashboard' });

const { t } = useI18n();

const selectedProduct = ref<any>(null);
const loadingAddProduct = ref(false);
const editLoading = ref(false);
const formRef = ref<any>(null);
const editDrawer = ref(false);
const loading = ref(false);
const editForm = ref<any>({});
const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useProduct.config.public.baseUrl}${path}`;
};

const returnDate = (input: string) => {
  if (!input) return '-';
  const [datePart, timePart] = input.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.split(':');
  return `${hour}:${minute} - ${year}/${day}/${month}`;
};

const tableHeaders = computed(() => [
  { title: t('Index'), key: 'index' },
  { title: t('Brand'), key: 'brand_name' },
  { title: t('TireName'), key: 'tire_name' },
  { title: t('ProductId'), key: 'product_code' },
  { title: t('Type'), key: 'type' },
  { title: t('TireSize'), key: 'tire_size' },
  { title: t('Width'), key: 'width' },
  { title: t('Color'), key: 'color' },
  { title: t('Quality'), key: 'quality' },
  { title: 'bolt', key: 'bolt' },
  { title: 'CB', key: 'cb' },
  { title: t('Cover'), key: 'cover' },
  { title: t('Gallery'), key: 'gallery' },
  { title: t('CreatedDate'), key: 'created_at' },
  { title: t('Status'), key: 'is_active' },
  { title: t('New'), key: 'is_new' },
  { title: t('Action'), key: 'action' },
]);

const textFields = computed(() => [
  { model: 'brand_name', label: t('Brand') },
  { model: 'tire_name', label: t('TireName') },
  { model: 'product_code', label: t('ProductId') },
  { model: 'type', label: t('Type') },
  { model: 'tire_size', label: t('TireSize') },
  { model: 'width', label: t('Width') },
  { model: 'color', label: t('Color') },
  { model: 'quality', label: t('Quality') },
  { model: 'bolt', label: 'bolt' },
  { model: 'cb', label: 'cb' },
]);

const form = ref<any>({
  brand_name: null,
  tire_name: null,
  product_code: null,
  type: null,
  tire_size: null,
  width: null,
  color: null,
  quality: null,
  bolt: null,
  cb: null,
  cover: null,
  gallery: Array(5).fill(null) as (File | null)[],
  is_active: false,
  is_new: false,
});

const tableData = computed(() => useProduct.fullProductData);

const resetForm = () => {
  form.value = {
    brand_name: null,
    tire_name: null,
    product_code: null,
    type: null,
    tire_size: null,
    width: null,
    color: null,
    quality: null,
    bolt: null,
    cb: null,
    cover: null,
    gallery: Array(5).fill(null),
    is_active: false,
    is_new: false,
  };
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loadingAddProduct.value = true;

  const payload: Record<string, any> = {};

  Object.entries(form.value).forEach(([key, value]) => {
    if (value == null || value === '') return;

    if (key === 'gallery' && Array.isArray(value)) {
      const files = value.filter(Boolean);
      if (files.length > 0) payload[key] = files;
    } else {
      payload[key] = value;
    }
  });

  await useProduct.apiAddProduct(payload);

  resetForm();
  loadingAddProduct.value = false;

  await fetchProductList();
};

const fetchProductList = async () => {
  loading.value = true;
  await useProduct.apiGetProductsFull();
  loading.value = false;
};

const removeProuduct = async (data: any) => {
  if (!data.id) return;

  await useProduct.apiRemoveProduct(data.id);
  await fetchProductList();
};

const handleChangeActiv = async (item: any, value: boolean) => {
  if (!item?.id) return;

  await useProduct.apiChangeActive(item.id, value);
  await fetchProductList();
};

const handleChangeNew = async (item: any, value: boolean) => {
  if (!item?.id) return;

  await useProduct.apiChangeNew(item.id, value);
  await fetchProductList();
};

const openEdit = (item: any) => {
  selectedProduct.value = item;

  editForm.value = {
    brand_name: item.brand_name,
    tire_name: item.tire_name,
    product_code: item.product_code,
    type: item.type,
    tire_size: item.tire_size,
    width: item.width,
    color: item.color,
    quality: item.quality,
    bolt: item.bolt,
    cb: item.cb,
    is_active: item.is_active,
    is_new: item.is_new,
    cover: null,
    gallery: [],
  };

  editDrawer.value = true;
};

const submitEdit = async () => {
  if (!selectedProduct.value?.id) return;

  editLoading.value = true;

  await useProduct.apiEditProduct(selectedProduct.value.id, editForm.value);

  editLoading.value = false;
  editDrawer.value = false;

  await fetchProductList();
};

watch(editDrawer, (val: boolean) => {
  if (!val) {
    editForm.value = {
      brand_name: null,
      tire_name: null,
      product_code: null,
      type: null,
      tire_size: null,
      width: null,
      color: null,
      quality: null,
      bolt: null,
      cb: null,
      cover: null,
      gallery: [],
      is_active: false,
      is_new: false,
    };
    selectedProduct.value = null; // اختیاری
  }
});

onMounted(async () => {
  await fetchProductList();
});
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
