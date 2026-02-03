<template>
  <v-range-slider
    v-model="rangeValue"
    :max="max"
    :min="min"
    :step="step"
    class="align-center"
    hide-details
    color="primary"
  />
  <v-row class="align-center">
    <v-col class="pe-0 mb-3">
      <base-form-text-field
        :model-value="
          rawMinValue == 0 || rawMinValue === '0' ? '' : rawMinValue
        "
        @update:modelValue="(value) => handleInput(value, 'min')"
        :prefix="prefix"
        :suffix="suffix"
        :placeholder="placeholder[0]"
      />
      <span
        v-if="changeType && rawMinValue"
        v-text="handleChangeData(changeType, rawMinValue)"
        class="text-caption text-grey4 position-absolute mt-1"
      ></span>
    </v-col>
    <v-col cols="auto">
      {{ $t('To') }}
    </v-col>
    <v-col class="ps-0 mb-3">
      <base-form-text-field
        :model-value="
          rawMaxValue == 0 || rawMaxValue === '0' ? '' : rawMaxValue
        "
        @update:modelValue="(value) => handleInput(value, 'max')"
        :prefix="prefix"
        :suffix="suffix"
        :placeholder="placeholder[1]"
      />

      <span
        v-if="changeType && rawMaxValue"
        v-text="handleChangeData(changeType, rawMaxValue)"
        class="text-caption text-grey4 position-absolute mt-1"
      ></span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { fa2en, formatPrice } from '@/utils/helpers/inputFormatter';

const props = defineProps({
  changeType: String,
  minValue: {
    type: [Number, String],
    default: 0,
  },
  maxValue: {
    type: [Number, String],
    default: 0,
  },
  prefix: String,
  suffix: String,
  isPrice: Boolean,
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  placeholder: {
    type: Array,
    default: ['', ''],
  },
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

const inputFormat = (value: number) => {
  if (props.isPrice) {
    return formatPrice(`${value}`);
  }
  return `${+value}`;
};
const parsePrice = (value: string): number => {
  const price = value.replaceAll('٬', '');
  return price ? fa2en(price) : 0;
};

const rawMinValue = ref(inputFormat(+props.minValue));
const rawMaxValue = ref(inputFormat(+props.maxValue));

const rangeValue = ref<[number, number]>([+props.minValue, +props.maxValue]);

watch(
  () => [props.minValue, props.maxValue],
  ([newMin, newMax]) => {
    rangeValue.value = [+newMin, +newMax];
  }
);

watch(
  () => props.minValue,
  (newValue) => {
    rawMinValue.value = inputFormat(+newValue);
  }
);
watch(
  () => props.maxValue,
  (newValue) => {
    rawMaxValue.value = inputFormat(+newValue);
  }
);

watch(rangeValue, ([newMin, newMax]) => {
  rawMinValue.value = inputFormat(newMin);
  rawMaxValue.value = inputFormat(newMax);
  emit('update:minValue', newMin);
  emit('update:maxValue', newMax);
});

const updateRange = ([newMin, newMax]: [number, number]) => {
  rawMinValue.value = inputFormat(newMin);
  rawMaxValue.value = inputFormat(newMax);

  emit('update:minValue', newMin);
  emit('update:maxValue', newMax);
};

const handleInput = (value: string, type: 'min' | 'max') => {
  let parsedValue = parsePrice(value);

  if (type === 'min') {
    rawMinValue.value = inputFormat(parsedValue);
    emit('update:minValue', parsedValue);
    rangeValue.value = [parsedValue, rangeValue.value[1]];
  } else if (type === 'max') {
    parsedValue = parsedValue > props.max ? props.max : parsedValue;
    rawMaxValue.value = inputFormat(parsedValue);
    emit('update:maxValue', parsedValue);
    rangeValue.value = [rangeValue.value[0], parsedValue];
  }
};

function formatSecondsToTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts = [];

  if (hours > 0) parts.push(`${hours} ساعت`);
  if (minutes > 0) parts.push(`${minutes} دقیقه`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ثانیه`);

  return parts.join(' و ');
}
function formatPrice(value) {
  if (!value || isNaN(value)) return '0 تومان';

  const tomanValue = Math.floor(value / 10);

  const formatted = tomanValue.toLocaleString('fa-IR');

  return `${formatted} تومان `;
}

const handleChangeData = (type, value) => {
  if (!type) return '';

  const numericValue = Number(value);
  if (!numericValue || isNaN(numericValue)) return '';

  switch (type) {
    case 'time':
      return formatSecondsToTime(numericValue);
    case 'price':
      return formatPrice(numericValue);
    default:
      return '';
  }
};
</script>
