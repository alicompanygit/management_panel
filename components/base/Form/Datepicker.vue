<template>
  <div>
    <span v-if="label" class="input-label">
      {{ $t(label) }}
      <span class="required-input-star">{{ required ? '*' : '' }}</span>
    </span>
    <div :class="{ 'mt-1': label }">
      <v-text-field
        :disabled="disabled"
        class="custom-clearable-input cursor-pointer"
        :id="inputId"
        style="font-size: 16px"
        v-model="formattedDate"
        color="primary"
        variant="outlined"
        hide-details
        readonly
        :clearable="!disabled"
        :placeholder="placeholder"
        @click:clear="changeSelected()"
        :density="density"
        :rounded="rounded"
        v-bind="{
          ...(isPrimary && formattedDate
            ? {
                prependInnerIcon: 'solar:calendar-outline',
                clearIcon: 'solar:close-circle-linear',
                baseColor: 'primary',
                bgColor: 'primaryLightest',
                persistentClear: true,
              }
            : {}),
          bgColor: bgColor || undefined,
        }"
        :append-inner-icon="appendInnerIcon"
      />
      <DatePicker
        :format="computedFormat"
        :display-format="computedDisplayFormat"
        :color="getPrimary"
        :auto-submit="autoSubmit"
        :highlight="highlight"
        :model-value="modelValue"
        :custom-input="'#' + inputId"
        @change="changeSelected($event)"
        v-bind="{
          ...(type ? { type: type, compactTime: true } : {}),
        }"
        append-to="body"
        :min="computedMin"
        :max="computedMax"
      >
        <template #header-year="{ vm, selectedDate }"> انتخاب سال</template>
      </DatePicker>
    </div>
  </div>
</template>

<script setup>
import {
  getDateWithAddedDays,
  getShamsiDate,
} from '~/utils/helpers/dateTimeFormatter';
import { getPrimary } from '~/utils/UpdateColors';
import { highlight } from '~/utils/vacation';

const props = defineProps({
  modelValue: [String],
  clearable: Boolean,
  disabled: Boolean,
  label: String,
  name: String,
  type: String,
  isNewVersion: Boolean,
  min: String,
  max: String,
  minToday: Boolean,
  maxToday: Boolean,
  isPrimary: Boolean,
  density: {
    type: String,
    default: 'default',
  },
  rounded: {
    type: String,
    default: 'lg',
  },
  format: String,
  appendInnerIcon: String,
  bgColor: String,
  placeholder: String,
  autoSubmit: {
    type: Boolean,
    default: true,
  },
  timeFirst: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
  required: Boolean,
});

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const inputId =
  characters.charAt(Math.floor(Math.random())) +
  Math.random().toString().replaceAll('.', '');

const formattedDate = computed(() => {
  if (!props.modelValue || typeof props.modelValue === 'number') return '';
  const date = props.modelValue.split(' ');
  if (props.timeFirst) {
    const format = getShamsiDate(date[1]);
    return `${format} ${date[0] ? date[0] : '00:00'}`;
  } else {
    const format = getShamsiDate(date[0]);
    return props.type === 'datetime'
      ? `${format} ${date[1] ? date[1] : '00:00'}`
      : format;
  }
});

const emit = defineEmits(['update:modelValue']);
const changeSelected = (timestamp = null) => {
  let format = null;
  if (props.timeFirst) {
    format = 'HH:mm YYYY-MM-DD';
  } else {
    format = props.type === 'datetime' ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
  }
  emit('update:modelValue', timestamp ? timestamp.format(format) : '');
};

const computedDisplayFormat = computed(() => {
  if (props.timeFirst) {
    return props.format ? props.format : (props.type = 'HH:mm jYYYY/jMM/jDD');
  } else {
    return props.format
      ? props.format
      : props.type === 'datetime'
        ? 'jYYYY/jMM/jDD HH:mm'
        : 'jYYYY/jMM/jDD';
  }
});
const computedFormat = computed(() => {
  if (props.timeFirst) {
    return (props.type = 'HH:mm YYYY-MM-DD');
  } else {
    return props.type === 'datetime' ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
  }
});
const computedMax = computed(() => {
  if (props.maxToday) {
    return getDateWithAddedDays();
  }
  return props.max;
});
const computedMin = computed(() => {
  if (props.minToday) {
    return getDateWithAddedDays();
  }
  return props.min;
});
</script>

<style lang="scss">
.vpd-header {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  // display: none;
}

.vpd-date {
  display: none;
}

.vpd-body,
.vpd-content {
  background-color: rgb(var(--v-theme-surface)) !important;
  border-radius: 20px;
}

.vpd-month-label {
  color: rgb(var(--v-theme-primary));
  width: unset !important;
}

.vpd-controls::after {
  margin-bottom: 6px;
  content: '';
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background-color: rgba(
    var(--v-theme-grey100),
    var(--v-medium-emphasis-opacity)
  );
}

.vpd-day {
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.vpd-prev svg path,
.vpd-next svg path {
  fill: rgb(var(--v-theme-on-surface));
}

.vacation {
  color: rgb(var(--v-theme-error));
  font-weight: bold;

  .vpd-day-effect {
    background-color: rgb(var(--v-theme-error)) !important;
  }

  &.vpd-addon-list-item {
    color: rgb(var(--v-theme-error)) !important;

    &.vpd-selected {
      background-color: #f1d4de;
    }
  }
}

.custom-clearable-input .v-field__clearable {
  position: absolute;
  left: -4px;
  top: 8px;
}

.custom-clearable-input input {
  margin-inline-end: 16px !important;
}

.primary-input .v-field__field,
.primary-input .v-field__prepend-inner,
.primary-input .v-field__clearable {
  color: rgb(var(--v-theme-primary));
}

.cursor-not-allowed-style {
  cursor: not-allowed !important;
}
</style>
