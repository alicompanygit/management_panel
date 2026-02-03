<template>
  <v-dialog
    v-if="!$vuetify.display.mobile"
    :model-value="isOpen"
    :max-width="width"
    :height="height"
    :persistent="persistent"
    :no-click-animation="noAnimation"
    @update:modelValue="$emit('close')"
  >
    <v-card ref="scrollableContent" class="px-4">
      <div class="d-flex justify-space-between pt-5">
        <div>
          <BaseIcon
            v-if="icon.name"
            :icon="icon.name"
            :color="icon.color"
            :bgColor="icon.bgColor"
            class="me-2"
            size="35"
          />
          <span v-if="title" class="modal-title">
            {{ noTranslate ? title : $t(title) }}
          </span>
        </div>
        <div class="d-flex align-center">
          <slot name="actions" />
          <v-icon
            icon="material-symbols-light:close-small-outline-rounded"
            class="close-btn"
            size="28"
            bgColor="grey1"
            color="grey4"
            @click="emit('close')"
          />
        </div>
      </div>
      <v-divider class="mt-4" />

      <div class="my-0 pt-5 pb-0 ps__content" v-if="$slots.titleBar">
        <slot name="titleBar"></slot>
      </div>
      <v-divider class="mt-0" v-if="$slots.titleBar" />

      <perfect-scrollbar style="max-height: 90dvh">
        <v-card-item
          class="my-0 py-0 px-4 ps__content"
          :class="{ 'px-0': noPadding }"
        >
          <slot></slot>
        </v-card-item>
      </perfect-scrollbar>

      <v-divider v-if="$slots.footer" />
      <v-card-actions v-if="$slots.footer" class="fixed-footer px-5 py-4">
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-bottom-sheet
    v-else
    :model-value="isOpen"
    @update:modelValue="$emit('close')"
  >
    <v-card class="rounded-b-0">
      <div class="mobile-line" />
      <div class="d-flex justify-space-between py-5 px-2">
        <div>
          <BaseIcon
            v-if="icon.name"
            :icon="icon.name"
            :color="icon.color"
            :bgColor="icon.bgColor"
            class="me-2"
            size="35"
          />
          <span v-if="title" class="font-weight-bold">
            {{ noTranslate ? title : $t(title) }}
          </span>
        </div>
        <div class="d-flex align-center">
          <div v-if="$slots.footer">
            <slot name="actions" />
          </div>
          <v-icon
            v-else
            class="close-btn"
            size="large"
            color="grey1"
            @click="emit('close')"
          >
            mdi:close-circle
          </v-icon>
        </div>
      </div>
      <v-divider />

      <perfect-scrollbar style="max-height: 90dvh">
        <v-card-item class="my-0 py-5 ps__content">
          <slot></slot>
        </v-card-item>
      </perfect-scrollbar>

      <v-divider v-if="$slots.footer" />
      <v-card-actions v-if="$slots.footer" class="fixed-footer px-5">
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100%',
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  noTranslate: Boolean,
  noAnimation: Boolean,
  icon: {
    type: Object,
    default: () => ({}),
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const scrollableContent = ref(null);

const checkScrollability = () => {
  const scrollbarElement = scrollableContent.value?.$el;
  if (scrollbarElement) {
    const content = scrollbarElement.querySelector('.ps__content');
    const container = scrollbarElement.querySelector('.ps');

    if (content && container) {
      const canScroll = content.scrollHeight > container.clientHeight;
      if (!canScroll) {
        container.classList.remove('ps--active-y');
      }
    }
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      nextTick(checkScrollability);
    }
  }
);
</script>

<style>
.scrollable-content {
  max-height: 80vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.ps__rail-x {
  display: none !important;
}

.mobile-line {
  width: 48px;
  height: 4px;
  border-radius: 12px;
  margin: 15px auto 0 auto;
  background: rgb(var(--v-theme-grey3));
}

.modal-title {
  color: rgb(var(--v-theme-grey6));
  font-size: 16px;
  font-weight: 600;
}

.fixed-footer {
  position: sticky;
  bottom: 0;
  background-color: rgb(var(--v-theme-containerBg));
  z-index: 2;
}
</style>
