<template>
  <div class="table-container">
    <v-data-table-server
      ref="dataTable"
      class="base-table-server fade_animations custom-table"
      :class="items && items.length === 0 ? 'hide-body' : ''"
      :headers="processedHeaders"
      :items="sortedItems"
      :page.sync="currentPage"
      :items-per-page="itemsPerPage"
      :items-per-page-text="$t('ItemsPerPage')"
      :items-per-page-options="options"
      :items-length="totalItems"
      :hide-default-footer="hideFooter || !items.length"
      :loading="loading"
      sort-asc-icon="solar:sort-from-bottom-to-top-linear"
      sort-desc-icon="solar:sort-from-top-to-bottom-linear"
      :loading-text="$t('Loading Table Text')"
      @update:options="handlePaginationChange"
      :page-text="'{0} ' + $t('To') + ' {1} ' + $t('From') + ' {2}'"
      :show-select="showSelect"
      :model-value="modelValue"
      @update:modelValue="onUpdateSelected"
      @update:sort-by="
        (event) => {
          sortObj = event[0];
          preventFetch = true;
        }
      "
      return-object
      :fixed-header="fixedHeader"
      :height
      :row-props="rowProps"
      :item-selectable="itemSelectable"
      first-icon="solar:double-alt-arrow-left-linear"
      last-icon="solar:double-alt-arrow-right-linear"
      next-icon="solar:alt-arrow-right-line-duotone"
      prev-icon="solar:alt-arrow-left-line-duotone"
    >
      <template v-slot:loader>
        <div class="w-100" v-if="skeletonLoading">
          <v-skeleton-loader
            :type="`table-row@${itemsPerPage}`"
            :loading="loading"
          ></v-skeleton-loader>
        </div>
      </template>
      <template v-slot:loading>
        <v-progress-circular
          v-if="!skeletonLoading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </template>
      <template
        v-for="header in processedHeaders"
        v-slot:[`item.${header.key}`]="{ item, index }"
      >
        <template v-if="header.key === 'index'">
          {{ (currentPage - 1) * itemsPerPage + index + 1 }}
        </template>
        <template v-else>
          <slot :name="header.key" :item="item" :index="index">
            {{ item[header.key] }}
          </slot>
        </template>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTableStore } from '~/stores/tableHandler';
import { convertDateToUnix } from '~/utils/dateTimeFormatter';

const emit = defineEmits(['selectedRows', 'rowClick', 'pageControler']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  showSelect: {
    type: Boolean,
    default: false,
  },
  headers: {
    type: Array,
    default: [],
  },
  items: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
  fixedHeader: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: null,
  },
  rowProps: Object,
  itemSelectable: {
    type: String,
    default: false,
  },
});

const onUpdateSelected = (newSelected) => {
  emit('update:modelValue', newSelected);
};

const tableStore = useTableStore();
const { currentPage, itemsPerPage } = storeToRefs(tableStore);

const processedHeaders = computed(() =>
  props.headers.map((header) => ({
    align: header.align || 'center',
    sortable: header.sortable || false,
    ...header,
  }))
);

const oldEvent = ref({});
const preventFetch = ref(false);

const handlePaginationChange = (event) => {
  currentPage.value = event.page;
  if (preventFetch.value) {
    preventFetch.value = false;
    nextTick(() => (currentPage.value = oldEvent.value.page || 1));
    return;
  }
  itemsPerPage.value = event.itemsPerPage;
  emit('pageControler', event);
  oldEvent.value = event;
  const container = document.getElementById('scroll-container');
  if (container) {
    container.scrollIntoView();
  }
};

const sortObj = ref([]);

const sortedItems = computed(() => {
  if (!Array.isArray(props.items)) return [];

  const newItems = [...props.items];
  if (sortObj.value?.key === props.headers[1].key)
    return newItems.sort((a, b) =>
      dateCompare(a.created_at_UTC, b.created_at_UTC, sortObj.value.order)
    );
  if (sortObj.value?.key === props.headers[2].key)
    return newItems.sort((a, b) =>
      stringCompare(a.name, b.name, sortObj.value.order)
    );
  return newItems;
});

function dateCompare(dateA, dateB, order) {
  const [newDateA, newDateB] = [
    convertDateToUnix(dateA),
    convertDateToUnix(dateB),
  ];
  if (order === 'asc') return newDateB - newDateA;
  else return newDateA - newDateB;
}

function stringCompare(strA, strB, order) {
  if (order === 'asc') return strA.localeCompare(strB, 'fa');
  else return strB.localeCompare(strA, 'fa');
}

const dataTable = ref(null);
const options = [
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 20, title: '20' },
  { value: 30, title: '30' },
];

const resetPage = () => {
  currentPage.value = 1;
  itemsPerPage.value = 10;
};
defineExpose({
  resetPage,
});
</script>

<style lang="scss">
.v-selection-control__input:has(input:checked) svg {
  color: rgb(var(--v-theme-primary)) !important;
}
.v-data-table-header__sort-icon {
  margin-left: -20px;
}
.base-table-server {
  [class^='v-skeleton-loader']:not(:has([class^='v-skeleton-loader'])) {
    background-color: rgb(var(--v-theme-grey1)) !important;
  }
}
</style>
