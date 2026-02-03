<template>
    <v-switch
      :disabled="disabled"
      :class="customClass"
      v-model="selectedState"
      :label="$t(label)"
      color="primary"
      hide-details="auto"></v-switch>
</template>

<script setup>
  const props = defineProps({
    modelValue: [String, Number, Object, null, Boolean],
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const selectedState = computed({
    get() {
      return props.modelValue; // Sync the parent's value to the child
    },
    set(newValue) {
      emit("update:modelValue", newValue); // Emit changes back to the parent
    },
  });
</script>

<style lang="scss">
  .table-switch {
    min-width: 110px;
    .v-label {
      font-size: 0.8rem;
    }
  }
</style>
