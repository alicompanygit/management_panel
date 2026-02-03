<template>
  <v-expansion-panels class="expansion" v-model="openPanel">
    <v-expansion-panel>
      <slot name="title"></slot>
      <v-expansion-panel-text>
        <slot name="body"></slot>
      </v-expansion-panel-text>
      <v-expansion-panel-title class="expansion--title py-2">
        <template v-slot:actions="{ expanded }">
          <slot name="actions"></slot>
        </template>
      </v-expansion-panel-title>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const emit = defineEmits(['expanded']);

const openPanel = ref(null);

watch(openPanel, (newVal) => {
  if (newVal === 0) {
    emit('expanded', true);
  } else {
    emit('expanded', false);
  }
});
</script>

<style lang="scss">
.expansion {
  padding: 0 !important;
  margin: 0 !important;

  &--title {
    .v-expansion-panel-title__icon {
      display: block;
      width: 100%;
    }
  }
  .v-expansion-panel__shadow {
    display: none !important;
  }

  .v-expansion-panel-title {
    min-height: auto !important;
  }
}
</style>
