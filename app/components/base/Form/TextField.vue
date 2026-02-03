<template>
  <div>
    <span v-if="label" class="input-label">
      {{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span></span
    >
    <small v-if="subLabel" class="subLabel"> {{ $t(subLabel) }}</small>
    <div class="mt-1">
      <v-text-field
        :class="customClass"
        :model-value="inputValue"
        color="primary"
        variant="outlined"
        :type="type"
        :disabled="disabled"
        loading-color="primary"
        :placeholder="placeholder ? $t(placeholder) : ''"
        :hint="hint"
        persistent-hint
        :readonly="readonly"
        @input="onInput"
        @click:prepend="$emit('click:prepend')"
        @click:appendInner="$emit('click:appendInner')"
        :rules="rules"
        :hide-details="hideDetails"
        validate-on="blur"
        :append-icon="appendIcon"
        :prepend-icon="prependIcon"
        :prepend-inner-icon="prependInnerIcon"
        :append-inner-icon="appendInnerIcon"
        :prefix="prefix"
        :suffix="suffix"
        :density="density"
        :rounded="rounded"
        :maxlength="maxlength"
        @keypress="handleKeypress"
        @paste="handlePaste"
        :bg-color="bgColor"
        v-bind="{ maxWidth: maxWidth || undefined }"
        :clearable="clearable"
        @click:clear="$emit('update:modelValue', '')"
        @keydown.enter.prevent="$emit('enter')"
        :counter
      >
      </v-text-field>
    </div>
  </div>
</template>

<script setup>
import { numbersOnly, pasteNumber } from '@/utils/helpers/inputFormatter';

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  subLabel: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  appendIcon: {
    type: String,
    default: '',
  },
  appendInnerIcon: {
    type: String,
    default: '',
  },
  prependIcon: {
    type: String,
    default: '',
  },
  prependInnerIcon: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
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
  customClass: {
    type: String,
    default: '',
  },
  hint: String,
  isNumber: Boolean,
  isPrice: Boolean,
  hideDetails: {
    type: [Boolean, String],
    default: 'auto',
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
  prefix: String,
  suffix: String,
  maxWidth: {
    type: String,
    required: false,
  },
  bgColor: String,
  clearable: Boolean,
  hint: String,
  maxlength: {
    type: [String, Number],
    default: '',
  },
  counter: {
    type: [String, Boolean, Number],
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleKeypress = (event) => {
  if (props.isNumber) {
    numbersOnly(event);
  }
  if (props.type == 'phone') {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 1775 && charCode < 1786) ||
      (charCode > 1631 && charCode < 1642) ||
      (charCode > 47 && charCode < 58)
    ) {
      return true;
    } else {
      event.preventDefault();
    }
  }
};

const handlePaste = (event) => {
  if (props.isNumber) {
    pasteNumber(event);
  }
  if (props.type == 'phone') {
    event.preventDefault();
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    const filteredPaste = paste.replace(/[^\d۰-۹]/g, ''); // Remove non-numeric characters
    document.execCommand('insertText', false, filteredPaste);
  }
};

const inputValue = ref('');
const unformat = (val) => val?.toString().replace(/[^\d]/g, '');
const formatPrice = (val) => {
  const raw = unformat(val);
  return isNaN(raw) || !raw ? '' : Number(raw).toLocaleString('en-US');
};

watch(
  () => props.modelValue,
  (val) => {
    if (props.isPrice) {
      inputValue.value = formatPrice(val);
    } else {
      inputValue.value = val;
    }
  },
  { immediate: true }
);

const onInput = (event) => {
  const val = event.target.value;
  if (props.isPrice) {
    const raw = unformat(val);
    inputValue.value = formatPrice(raw);
    emit('update:modelValue', raw);
  } else {
    inputValue.value = val;
    emit('update:modelValue', val);
  }
};
</script>

<style lang="scss" scoped>
// .v-input:not(.v-input--error) .v-messages {
//   opacity: unset !important;
//   .v-messages__message {
//     color: rgb(var(--v-theme-grey4));
//   }
// }
</style>
