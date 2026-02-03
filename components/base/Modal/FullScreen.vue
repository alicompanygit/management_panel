<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    :transition="{
      name: 'dialog-bottom-transition',
    }"
    class="b-full-screen-modal"
    @update:model-value="handleModelUpdate"
  >
    <div class="modal-container">
      <!-- Header -->
      <slot name="header">
        <div class="header-container">
          <div class="header">
            <Button
              variant="text"
              color="white"
              @click="handleAction('return')"
            >
              <v-icon
                icon="solar:alt-arrow-right-outline"
                size="20"
                color="white"
              />
              <span class="button-text-small">{{ $t('return') }}</span>
            </Button>
            <span class="text-grey4"> / </span>
            <span class="h5">{{ translate ? $t(title) : title }} </span>
          </div>
        </div>
      </slot>
      <!-- Body -->
      <div class="body">
        <slot name="body" />
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import Button from '@/components/base/Button/index.vue';

export type TActions = 'return' | 'close';

// I/O
const props = withDefaults(
  defineProps<{
    title: string;
    translate?: boolean;
  }>(),
  {
    translate: true,
  }
);
const emits = defineEmits<{
  (e: 'actionTriggered', action: TActions): void;
}>();

const isOpen = defineModel<boolean>('isOpen', { required: true });

// handlers
function handleAction(action: TActions) {
  switch (action) {
    case 'return':
      emits('actionTriggered', action);
      break;
    default:
      break;
  }
}

function handleModelUpdate(state: boolean) {
  if (!state) emits('actionTriggered', 'close');
}
</script>

<style lang="scss">
.b-full-screen-modal {
  .modal-container {
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    background-color: white;

    display: flex;
    flex-direction: column;
    gap: 24px;

    .header-container {
      .header {
        background-color: rgb(var(--v-theme-primary8));
        padding: 16px 24px 16px 0;
        color: white;

        display: flex;
        align-items: center;
        gap: 8px;

        .h5 {
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
        }

        .button-text-small {
          font-size: 13px;
          line-height: 22px;
          font-weight: 450;
        }
      }
    }

    .body {
      overflow: auto;
    }
  }
}
</style>
