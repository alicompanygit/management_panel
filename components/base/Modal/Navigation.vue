<template>
  <v-navigation-drawer
    app
    temporary
    elevation="10"
    location="left"
    :model-value="modelValue"
    width="500"
    rounded="md"
    class="custom-navigation"
    @update:modelValue="emit('close')"
  >
    <div class="d-flex justify-space-between pa-4">
      <div>
        <base-icon
          icon="solar:rounded-magnifer-outline"
          color="primaryLighten1"
          bgColor="primaryLighten5"
        />
        <span class="font-weight-bold ms-2">
          {{ $t("Advance Filter") }}
        </span>
      </div>
      <div>
        <span class="text-primary text-sm">
          {{$t("Delete All")}}
        </span>
        <v-icon
          class="close-btn"
          size="large"
          color="greyLighten2"
          @click="emit('close')"
        >
          mdi-close
        </v-icon>
      </div>
    </div>
    <v-divider />

    <perfect-scrollbar style="height: calc(100vh - 150px)">
      <slot />
    </perfect-scrollbar>

    <template v-slot:append>
      <v-divider />
      <slot name="footer" />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: Boolean,
});
</script>

<style scoped lang="scss">
.custom-navigation {
  height: 96vh !important;
  top: 20px !important;
  bottom: auto !important;
  z-index: 1200 !important;

  &.v-navigation-drawer--active {
    margin-left: 2vh !important;
  }
}
</style>
