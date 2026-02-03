<template>
  <div>
    <span v-if="label" class="input-label"
      >{{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span></span
    >
    <div class="mt-1">
      <v-select
        v-model="selectedItem"
        :loading="loading"
        :placeholder="placeholder ? $t(placeholder) : ''"
        :items
        :class="['rounded-lg', { 'bg-grey2': disabled }, customClass]"
        variant="outlined"
        loading-color="primary"
        :disabled="disabled"
        :readonly="readonly || disabled"
        :itemValue="itemValue"
        :itemTitle="itemTitle"
        :return-object="returnObject"
        :hideDetails
        :menu-props="computedMenuProps"
        :error="error"
        :error-messages="errorMessages"
        :density="density"
        :rounded="rounded"
        :rules="rules"
        :bgColor="bgColor"
        :no-data-text="$t('No Item Exist')"
        :clearable="clearable"
        @click:clear="emit('click:clear')"
        ref="mySelect"
        v-model:menu="isMenuOpen"
        @focus="addScrollListener"
        @blur="removeScrollListener"
        menu-icon="iconamoon:arrow-down-2-bold"
        @keydown.enter.prevent="$emit('enter')"
      >
      </v-select>
    </div>
  </div>
  <!-- :menu-props="{ maxHeight: '250px' }" -->
</template>

<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },

  modelValue: [String, Number, Object, null],
  required: {
    type: Boolean,
    default: false,
  },
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
  hideDetails: {
    type: [Boolean, String],
    default: 'auto',
  },
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
  customClass: String,

  // restrictHeight: {
  //   type: Boolean,
  //   default: false,
  // },
});

const emit = defineEmits(['update:modelValue', 'click:clear']);

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

const mySelect = ref(null);
const isMenuOpen = ref(false);

const handleScroll = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

const getScrollableElement = () => {
  const scrollableElement = document.querySelector('main');
  return scrollableElement;
};

const addScrollListener = () => {
  const scrollableElement = getScrollableElement();
  scrollableElement.addEventListener('scroll', handleScroll, true);
};

const removeScrollListener = () => {
  const scrollableElement = getScrollableElement();
  scrollableElement.removeEventListener('scroll', handleScroll, true);
};

onBeforeUnmount(() => {
  removeScrollListener();
});
</script>

<style>
.custom-placeholder-color input::placeholder {
  color: rgb(var(--v-theme-grey4)) !important;
  opacity: 1 !important;
}
</style>
