<template>
  <v-checkbox
    :value
    @update:modelValue="emit('update:modelValue', $event)"
    hide-details="auto"
    :color="color"
    v-model="model"
    :checked="model"
  >
    <template v-slot:label>
      <span v-if="label" class="input-label">
        {{ $t(label) }}
      </span>
    </template>
  </v-checkbox>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    color: string;
    value: string;
  }>(),
  {
    label: '',
    color: 'primary5',
    value: '',
  }
);

const emit = defineEmits(['update:modelValue']);

const model = defineModel<string>();
</script>

<style lang="scss">
@use '@/assets/scss/_mixins.scss' as mixins;

.v-checkbox {
  .input-label {
    @include mixins.apply-typography('body2');
    color: rgb(var(--v-theme-grey5));
  }

  &:has(input:checked) {
    .input-label {
      @include mixins.apply-typography('body2-Semibold');
      color: rgb(var(--v-theme-grey6));
    }
  }
}
</style>
