<template>
  <div class="multi-select-component">
    <span v-if="label" class="input-label">{{ $t(label) }}</span>
    <v-autocomplete
      v-if="!disabled"
      :loading
      :items
      :placeholder="placeholder ? $t(placeholder) : ''"
      :itemValue
      :itemTitle
      variant="outlined"
      rounded="lg"
      v-model="model"
      :return-object="returnObject"
      :rules
      multiple
      chips
      hide-details
      :no-data-text="$t(noDataText)"
      menu-icon="iconamoon:arrow-down-2-bold"
      :disabled
      @keydown.enter.prevent="$emit('enter')"
      :class="[customClass]"
    >
      <template v-slot:prepend-item>
        <div class="ps-4 d-flex justify-space-between align-center">
          <div class="d-flex gap-1 align-center">
            <v-checkbox-btn
              color="primary"
              v-model="selectedAll"
              @click="selectAllTenents"
            ></v-checkbox-btn>
            <span
              class="text-subtitle-1 cursor-pointer"
              @click="selectAllTenents"
              >{{ $t('Select all') }}</span
            >
          </div>
          <base-button
            @click="handleModalClearButtonClick"
            name="Delete All"
            variant="text"
            class="px-1 mr-3"
          />
        </div>

        <v-divider v-if="items.length" class="mt-2"></v-divider>
      </template>
      <template v-slot:chip="{ item, index }">
        <base-chip
          v-if="!index"
          :text="
            model?.length < 2
              ? item.title.slice(0, 6) + '...'
              : `${model?.length} انتخاب شده`
          "
          :color="'grey4'"
          @click:clear="model = []"
          clearable
          size="small"
        />
      </template>
    </v-autocomplete>
    <base-form-text-field v-else :disabled :class="[customClass]" />
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
  rules: {
    type: Array,
    default: [],
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  noDataText: {
    type: String,
    default: 'No Item Exist',
  },
  label: String,
  loading: Boolean,
  placeholder: String,
  removeableChips: Boolean,
  returnObject: Boolean,
  disabled: Boolean,
  customClass: String,
});

const model = defineModel({ required: true });

const selectedAll = computed(
  () => props.modelValue?.length === props.items?.length
);

const selectAllTenents = async () => {
  if (selectedAll.value) {
    model.value = [];
  } else {
    if (props.returnObject) {
      model.value = props.items;
    } else {
      model.value = props.items.map((item) => item[props.itemValue]);
    }
  }
};

const removeItem = (item) => {
  model.value = model.value.filter((tenant) => tenant !== item.value);
};

// handlers
function handleModalClearButtonClick() {
  model.value = [];
}
</script>

<style lang="scss">
.multi-select-component {
  .v-field__input {
    display: flex;
    flex-wrap: nowrap;

    overflow-x: hidden;
    padding-right: 6px;
  }

  .prepend-actions {
    display: flex;
    justify-content: space-between;
  }

  .input-label {
    margin-bottom: 4px;
    display: block;
  }
}
</style>
