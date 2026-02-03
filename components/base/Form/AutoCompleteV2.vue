<template>
  <div>
    <span v-if="label" class="input-label">
      {{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span>
    </span>
    <div class="mt-1">
      <v-autocomplete
        v-model="model"
        v-model:search="search"
        :variant
        :placeholder="$t(placeholder)"
        :items
        @update:focused="hanldeFocuseChange"
        @update:search="handleSearchChange"
      >
        <template #prepend-item v-if="search">
          <Transition>
            <BaseButton
              icon="solar:add-square-linear"
              :name="addBtnText"
              variant="text"
              @click="handleActions"
            />
          </Transition>
        </template>
        <template #append-item v-if="loading">
          <div class="d-flex justify-center my-2">
            <v-progress-circular indeterminate size="20" color="primary" />
          </div>
        </template>
      </v-autocomplete>
    </div>
  </div>
  <!-- :menu-props="{ maxHeight: '250px' }" -->
</template>

<script setup lang="ts" generic="G">
import BaseButton from '@/components/base/Button/index.vue';
import { VAutocomplete } from 'vuetify/lib/components/index.mjs';
import { useDebounce } from '~/composables/useDebounce';
import { FetchingMethods, FetchingServices } from '~/plugins/fetching';

type TBaseProps = {
  variant?:
    | 'filled'
    | 'underlined'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled';
  placeholder?: string;
  loading?: boolean;
  items: Array<G>; // Items is REQUIRED because i have to determine the type of the generic G
};

type TAutoCompleteProps = TBaseProps & {
  label?: string;
  required?: boolean;
  forceSelect?: boolean;

  apiUrl?: string;
  serivce?: FetchingServices;
  method?: FetchingMethods;
  debounceDelay?: number;

  addBtnText?: string;
  addBtnIcon?: string;
};
type TAutoCompleteEmits = {
  (e: 'on-click:add'): void;
  (e: 'update:search'): void;
  (e: 'update:focused'): void;
};
const props = withDefaults(defineProps<TAutoCompleteProps>(), {
  variant: 'outlined',
  placeholder: '',

  debounceDelay: 0,

  addBtnText: 'add',
  addBtnIcon: 'solar:add-square-linear',
});
const emits = defineEmits<TAutoCompleteEmits>();
const model = defineModel<G>('model');
const search = defineModel<string>('search');

const debouncedSearchChange = useDebounce(onSearchChange, props.debounceDelay);

function onSearchChange() {
  emits('update:search');
}

// handlers
function handleActions(action: 'addClick') {
  switch (action) {
    case 'addClick':
      emits('on-click:add');
      break;

    default:
      break;
  }
}

function hanldeFocuseChange(isFocused: boolean) {
  // # Scenario 1
  // Condition: -On Blur and -NOT forced to select and -Model type is string and -Search input has value
  if (
    !isFocused &&
    !props.forceSelect &&
    typeof props.items[0] === 'string' &&
    search.value
  ) {
    // Then: set the search value to model value
    (model.value as string) = search.value;
  }
}
function handleSearchChange() {
  // apply inner debounce
  debouncedSearchChange();
}
</script>

<style>
.custom-placeholder-color input::placeholder {
  color: rgb(var(--v-theme-grey4)) !important;
}
.v-autocomplete .v-field__input,
.v-autocomplete .v-field.v-field--focused input {
  font-size: 13px !important;
}
</style>
