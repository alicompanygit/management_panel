<template>
  <div :class="{ 'space-placeholder': placeHolderSpace }">
    <span v-if="label" class="input-label">
      {{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span>
    </span>
    <v-textarea
      :class="['mt-1', customClass, { 'hide-scroll': !needsScroll }]"
      style="font-size: 16px"
      :model-value="modelValue"
      color="primary"
      variant="outlined"
      :type="type"
      :disabled="disabled"
      loading-color="primary"
      :placeholder="placeholder ? $t(placeholder) : ''"
      :readonly="readonly"
      @input="
        $emit('update:modelValue', $event.target.value);
        checkScroll();
      "
      :rows="rows"
      :no-resize="noResize"
      :density="density"
      :rounded="rounded"
      :hideDetails
      :rules="rules"
      :auto-grow="autoGrow"
      :max-rows="maxRows"
      v-bind="{ bgColor: bgColor || undefined }"
      :hint="hint ? $t(hint) : ''"
      persistent-hint
      :counter="counter"
      ref="textareaRef"
      @keydown="handleKeydown"
      @keydown.enter.stop
    ></v-textarea>
  </div>
</template>

<script setup lang="ts">
import { boolean } from 'yup';

const emit = defineEmits(['enter']);
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  placeHolderSpace: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  hideDetails: {
    type: [Boolean, String],
    default: 'auto',
  },
  placeholder: {
    type: String,
    default: '',
  },
  customClass: {
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
  rows: {
    type: String,
    default: '3',
  },
  rules: {
    type: Array,
    default: [],
  },
  noResize: Boolean,
  density: {
    type: String,
    default: 'default',
  },
  rounded: {
    type: String,
    default: 'lg',
  },
  autoGrow: Boolean,
  bgColor: String,
  hint: String,
  counter: {
    type: [String, Boolean, Number],
    default: false,
  },
  maxRows: {
    type: Number,
    default: null,
  },
  enterStop: Boolean,
});

const textareaRef = ref(null);
const needsScroll = ref(false);
const checkScroll = () => {
  if (textareaRef.value) {
    const textarea = textareaRef.value.$el.querySelector('textarea');
    needsScroll.value = textarea.scrollHeight > textarea.clientHeight;
  }
};
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    if (props.enterStop) event.preventDefault();
    emit('enter');
  }
};
</script>

<style>
/* .space-placeholder textarea::placeholder {
  line-height: 35px !important;
}
.space-placeholder textarea::-moz-placeholder {
  line-height: 35px !important;
}
.space-placeholder textarea::-webkit-input-placeholder {
  line-height: 35px !important;
}
.space-placeholder textarea::-ms-placeholder {
  line-height: 35px !important;
} */

/* Hide scrollbar if content doesn't overflow */
.hide-scroll textarea {
  overflow: hidden !important;
}
</style>
