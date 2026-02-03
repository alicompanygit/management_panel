<template>
  <v-menu class="select-menu" :offset="offset" v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>
    <slot name="content">
      <v-list>
        <template v-for="(menuItem, index) in menuItems" :key="index">
          <v-divider v-if="menuItem.divider" />
          <v-list-item
            v-if="menuItem.show ?? true"
            :value="index"
            :style="{
              backgroundColor: menuItem.highlight
                ? `rgba(var(--v-theme-${menuItem.highlight}), 0.1)`
                : 'transparent',
            }"
            :type="menuItem.do ? 'action' : 'statement'"
          >
            <v-list-item-title
              @click="handleItemClick(menuItem)"
              :class="[
                `d-flex align-center ga-2 bg-${menuItem.bgColor} rounded-lg`,
                menuItem.padding,
              ]"
            >
              <v-icon
                v-if="menuItem.icon"
                :icon="menuItem.icon"
                size="18"
                :color="menuItem.color"
              />
              <span
                :style="{
                  color: `rgb(var(--v-theme-${menuItem.color}))`,
                }"
              >
                <text-ellipsis
                  :text="menuItem.title"
                  :max-width="textMaxWidth"
                  :clamp="textClamp"
                  width="max-content"
                />
              </span>
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </slot>
  </v-menu>
</template>

<script setup lang="ts">
import TextEllipsis from '~/components/base/tools/TextEllipsis.vue';

export type TMenuItem = {
  icon?: string;
  title: string;
  color?: string;
  bgColor?: string;
  padding?: string;
  divider?: boolean;
  highlight?: string;
  show?: boolean;
  do?: (...args: any) => void;
};

import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    menuItems: TMenuItem[];
    offset?: number;
    modelValue?: boolean;
    textMaxWidth?: string;
    textClamp?: number;
  }>(),
  {
    textClamp: 1,
  }
);

const emit = defineEmits(['update:modelValue']);

const isActive = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) isActive.value = val;
  },
  { immediate: true }
);

watch(isActive, (val) => {
  emit('update:modelValue', val);
});

function handleItemClick(menuItem: TMenuItem) {
  menuItem.do && menuItem.do();
}
</script>

<style lang="scss">
.select-menu {
  .v-list {
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 4px;
    box-shadow: 0 8px 24px 2px #959da533 !important;

    .v-list-item {
      border-radius: 8px !important;
      min-height: 28px !important;
      padding: 0 !important;
      min-width: 154px !important;

      .v-list-item-title {
        padding: 4px 8px;
      }

      &[type='statement'] {
        pointer-events: none;
      }
    }
  }
}
</style>
