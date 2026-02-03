<template>
  <v-radio-group color="primary" v-model="selectedItem" inline hide-details>
    <v-radio
      v-for="(item, index) in items"
      :value="item?.value"
      style="height: 25px !important"
      density="compact"
      :class="[{ 'ms-16': index !== 0 }]"
      base-color="grey5"
    >
      <template v-slot:label>
        <span
          v-text="item?.title"
          class="text-body3-semibold text-grey5"
        ></span>
      </template>
    </v-radio>
  </v-radio-group>
</template>
<script setup lang="ts">
const props = defineProps<{
  items: {
    title: string | number;
    value: string | number | null;
  }[];
  modelValue: string | number | null;
}>();
const emit = defineEmits(['update:modelValue']);
const selectedItem = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
