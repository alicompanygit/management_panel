<template>
  <div>
    <span v-if="label" class="input-label">
      {{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span>
    </span>
    <div class="mt-1">
      <v-autocomplete
        class="customClass"
        v-model="selectedItem"
        :loading="loading"
        :placeholder="placeholder ? $t(placeholder) : ''"
        :items="items"
        variant="outlined"
        loading-color="primary"
        :disabled="disabled"
        :readonly="readonly"
        :itemValue="itemValue"
        :itemTitle="itemTitle"
        :return-object="returnObject"
        :hide-details="showDetails ? false : 'auto'"
        :menu-props="computedMenuProps"
        :error="error"
        :error-messages="errorMessages"
        :density="density"
        :rounded="rounded"
        :rules="rules"
        :bgColor="bgColor"
        :no-data-text="$t('No Item Exist')"
        :clearable="clearable"
        menu-icon="iconamoon:arrow-down-2-bold"
      >
      </v-autocomplete>
    </div>
  </div>
  <!-- :menu-props="{ maxHeight: '250px' }" -->
</template>

<script setup>
const props = defineProps({
  customClass: { default: '', type: String },
  modelValue: [String, Number, Object, null],
  items: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: '',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  returnObject: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
  showDetails: Boolean,
  restrictHeight: Boolean,
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: String,
    default: '',
  },
  isNewVersion: Boolean,
  density: {
    type: String,
    default: 'default',
  },
  rounded: {
    type: String,
    default: 'lg',
  },
  placeholder: String,
  clearable: Boolean,
  bgColor: String,
  required: Boolean,

  // restrictHeight: {
  //   type: Boolean,
  //   default: false,
  // },
});

const emit = defineEmits(['update:modelValue']);

const selectedItem = computed({
  get() {
    return props.modelValue; // Sync the parent's value to the child
  },
  set(newValue) {
    emit('update:modelValue', newValue); // Emit changes back to the parent
  },
});

const computedMenuProps = computed(() => {
  const res = props.restrictHeight
    ? { maxHeight: '230px' }
    : {
        'scroll-strategy': 'close',
        location: 'bottom',
      };
  return res;
});
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
