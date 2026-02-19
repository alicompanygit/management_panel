<template>
  <div
    class="dashboard-container dashboard-user-management d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 my-8 rounded-lg font-weight-bold"
      style="color: #ffd933; font-size: 17px"
    >
      {{ t('AddBanner') }}
    </div>
  </div>
  <div
    class="dashboard-container -user-management d-flex justify-center align-center text-white px-4"
  >
    <div
      class="base-color w-100 px-4 py-3 mb-8 rounded-lg font-weight-bold d-flex justify-space-between align-center ga-5"
      style="color: #ffd933; font-size: 17px"
    >
      <v-file-input
        v-model="file"
        :label="t('SelectImg')"
        accept="image/*"
        prepend-icon="mdi-image"
        show-size
        clearable
        hide-details
        max-height="10px"
      />
      <div>
        <base-button
          @click="handleAddBanner()"
          name="Add"
          color="#ffd933"
          :disabled="!file || addBannerLoading"
          :loading="addBannerLoading"
          class="px-6"
        />
      </div>
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
      <template v-slot:created_at="{ item }">
        {{ returnDate(item.created_at) }}
      </template>
      <template v-slot:image="{ item }">
        <div class="d-flex justify-center">
          <img
            v-if="item.image"
            :src="getFullImageUrl(item.image)"
            alt="Banner"
            width="40"
            height="40"
            style="object-fit: cover; border-radius: 50%"
          />
        </div>
      </template>

      <template v-slot:is_active="{ item }">
        <div class="d-flex justify-center" style="min-width: max-content">
          <v-switch
            :label="item.is_active ? t('Active') : t('NotActive')"
            :model-value="item.is_active"
            @update:modelValue="(val: any) => handleChangeActiv(item, val)"
            :color="item.is_active ? '#da8989' : '#FFD933'"
          ></v-switch>
        </div>
      </template>
    </base-table-server>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBanner } from '~/composables/banner';

definePageMeta({
  layout: 'dashboard',
});

const { t } = useI18n();

const addBannerLoading = ref(false);
const file = ref<File | null>(null);
const loading = ref(false);
const tableHeaders = computed(() => [
  { title: t('Index'), key: 'index', align: 'start' },
  { title: t('Id'), key: 'id' },
  { title: t('CreatedDate'), key: 'created_at' },
  { title: t('Image'), key: 'image' },
  { title: t('Status'), key: 'is_active' },
]);

const tableData = computed(() => useBanner.bannerData);

const handleChangeActiv = async (item: any, value: boolean) => {
  if (!item?.id) return;

  await useBanner.apiSetBannerStatus(item.id, value);
  await fetchBannerList();
};

const fetchBannerList = async () => {
  loading.value = true;
  await useBanner.apiGetBanners();
  loading.value = false;
};

const handleAddBanner = async () => {
  if (!file.value) return;

  addBannerLoading.value = true;
  await useBanner.apiAddBanner(file.value);
  file.value = null;
  addBannerLoading.value = false;
  await fetchBannerList();
};

const returnDate = (input: string) => {
  if (!input) return;

  const [datePart, timePart] = input.split('T');
  const [year, month, day] = datePart.split('-');
  const [hour, minute] = timePart.split(':');
  return `${hour}:${minute} - ${year}/${day}/${month}`;
};

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  return `${useBanner.config.public.baseUrl}${path}`;
};

onMounted(async () => {
  useBanner.bannerData = {};
  await fetchBannerList();
});
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  max-height: calc(100vh - 100px) !important;
  align-items: start !important;
}

.container {
  background-color: #1c1c21;
}

.text-custom {
  font-size: 30px;
}

.base-color {
  background-color: #26262c;
}
</style>

<style>
.dashboard-user-management {
  .v-table {
    color: #ffffff;
    background-color: #26262c;
  }
}
</style>
