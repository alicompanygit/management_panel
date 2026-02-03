<template>
  <div>
    <span v-if="label" class="input-label">
      {{ $t(label) }}
    </span>
    <div class="file-input-wrapper mt-1">
      <v-file-input
        dir="ltr"
        :model-value="internalValue"
        append-inner-icon="mdi-paperclip"
        prepend-icon=""
        :density="density"
        :rounded="rounded"
        variant="outlined"
        :accept="accept"
        @update:modelValue="updateValue"
        @click:clear="emit('clear')"
        :rules="rules"
        validate-on="submit"
        :multiple="multiple"
        :hint="hint ? $t(hint) : ''"
        persistent-hint
        :bg-color="bgColor"
        :disabled="disabled"
        hide-details="auto"
      >
        <!-- <template v-slot:label>
          <span v-if="!internalValue" class="text-grey4">
            {{ $t(placeholder) }}
          </span>
        </template> -->
        <template v-slot:selection="{ fileNames, totalBytesReadable }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
                v-if="index < 2"
                class="me-2 file-name"
                color="deep-purple-accent-4"
                size="small"
                label
            >
              {{
                typeof modelValue === "string"
                    ? (selectedFile || modelValue)
                    : `${fileName} (${totalBytesReadable})`
              }}
            </v-chip>
          </template>
        </template>
      </v-file-input>
      <div v-if="shouldShowPlaceholder" class="always-placeholder">{{ $t(placeholder) }}</div>

    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "clear"]);

const props = defineProps({
  label: String,
  modelValue: {
    type: [Array, File, String],
    default: [],
  },
  disabled: Boolean,
  readonly: Boolean,
  rules: {
    type: Array,
    default: [],
  },
  accept: {
    type: String,
    default: "image/*",
  },
  density: {
    type: String,
    default: "default",
  },
  rounded: {
    type: String,
    default: "lg",
  },
  selectedFile: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  multiple: Boolean,
  hint: String,
  bgColor: String,
});

const updateValue = (files: File[]) => {
  emit("update:modelValue", files);
};

const internalValue = computed({
  get() {
    return props.modelValue === "" ? null : props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const shouldShowPlaceholder = computed(() => {
  if(!props.placeholder) return false;
  const value = props.modelValue;

  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof File) return false;
  return !value;
});
</script>
