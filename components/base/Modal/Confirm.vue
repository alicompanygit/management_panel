<template>
  <v-dialog
    :model-value="isOpen"
    max-width="600"
    :persistent="persistent"
    @update:modelValue="$emit('close')"
  >
    <v-card>
      <div
        v-if="icon"
        class="confirm-header"
        :style="`background-color:${backgroundColor};`"
      >
        <div class="confirm-header-icon" :style="`background:${iconTheme};`">
          <icon :icon="icon" :color="iconColor" width="32" height="32" />
        </div>
      </div>
      <div class="confirm-container">
        <div v-if="title" class="confirm-title" v-html="title"></div>
        <div v-if="text" class="confirm-text" v-html="text"></div>
        <slot></slot>
        <div v-if="cancelText || confirmText">
          <v-divider></v-divider>
          <div>
            <div class="confirm-footer">
              <base-button
                v-if="cancelText"
                :name="cancelText"
                variant="tonal"
                @click="emit('close')"
                class="confirm-btn-cancel-text"
              />
              <base-button
                :disabled="confrimDisabled"
                v-if="confirmText"
                :style="`background-color:${confirmBtnTheme};`"
                :name="confirmText"
                variant="flat"
                :loading="isLoading"
                @click="
                  isLoading = true;
                  emit('confirmed');
                "
                class="confirm-btn-confirm-text"
              />
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const emit = defineEmits(['close', 'confirmed']);
const props = defineProps({
  error: Boolean,
  info: Boolean,
  success: Boolean,
  isOpen: Boolean,
  persistent: {
    type: Boolean,
    default: true,
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: '',
  },
  iconTheme: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  confrimDisabled: {
    type: Boolean,
    default: false,
  },
});

var isLoading = ref(false);
onBeforeUpdate(() => {
  isLoading.value = false;
});
const backgroundColor = computed(() => {
  if (props.backgroundColor != '') return props.backgroundColor;
  else if (props.error) return '#FFF7F5';
  else if (props.info) return '#F1FBFE';
  else if (props.success) return '#EFFBF5';
  else return '';
});
const iconColor = computed(() => {
  if (props.iconColor != '') return props.iconColor;
  else if (props.error) return '#F84C20';
  else if (props.info) return '#16AACF';
  else if (props.success) return '#2CAA69';
  else return '';
});
const iconTheme = computed(() => {
  if (props.iconTheme != '') return props.iconTheme;
  else if (props.error)
    return 'radial-gradient(ellipse at center, #FDCBBF 30%, #FCB7A6 31%, #FDCBBF 32%, #FDCBBF 37%, #FCB7A6 38%, #FEDBD2 39%, #FEDBD2 44%, #FEEFEB 45%, #FEEFEB 50%, #FEDBD2 51%, #FEDBD2 51%, #FFF7F5 52%, #FFF7F5 100%)';
  else if (props.info)
    return 'radial-gradient(ellipse at center, #A3E5F5 30%, #83DBF2 31%, #A3E5F5 32%, #A3E5F5 37%, #83DBF2 38%, #C3EEF9 39%, #C3EEF9 44%, #DFF6FC 45%, #DFF6FC 50%, #C3EEF9 51%, #C3EEF9 51%, #F1FBFE 52%, #F1FBFE 100%)';
  else if (props.success)
    return 'radial-gradient(ellipse at center, #A6E8C6 30%, #86DFB1 31%, #A6E8C6 32%, #A6E8C6 37%, #86DFB1 38%, #C2EFD8 39%, #C2EFD8 44%, #E3F8ED 45%, #E3F8ED 50%, #C2EFD8 51%, #C2EFD8 51%, #EFFBF5 52%, #EFFBF5 100%)';
  else return '';
});
const confirmBtnTheme = computed(() => {
  if (props.error) return '#FB977D !important';
  else if (props.info) return '#0085DB !important';
  else if (props.success) return '#2CAA69 !important';
  else return '';
});
</script>

<style lang="scss">
.confirm-header {
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  z-index: -1;
  border-radius: 0 0 50% 50% / 20% 20% 70% 70%;
}
.confirm-header-icon {
  // margin: 10px;
  padding: 40px 40px 30px;
  border-radius: 100%;
}
.confirm-container {
  text-align: center;
  padding: 30px;
  hr {
    margin: 30px auto;
  }
}
.confirm-title {
  font-weight: bold;
}
.confirm-text {
  margin-top: 15px;
}
.confirm-footer {
  text-align: center;
  .confirm-btn-cancel-text,
  .confirm-btn-confirm-text {
    min-width: 110px;
    margin: auto 10px;
  }
  .confirm-btn-cancel-text {
    background-color: #f2f6fa;
    color: #5a6a85 !important;
  }
  .confirm-btn-confirm-text {
    color: #ffffff !important;
  }
}
</style>
