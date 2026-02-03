<template>
  <v-dialog
    v-if="!$vuetify.display.mobile"
    :model-value="isVisible"
    max-width="600"
    :persistent="false"
    @update:modelValue="$emit('close')"
    @click:outside="handleClickOutside"
    open-delay
  >
    <v-card>
      <v-progress-linear
        v-if="timerProgressBar"
        :class="{ 'animate-width': progressPercentage != 100 }"
        v-model="progressPercentage"
        :color="iconColor"
        height="2"
        stream
      ></v-progress-linear>
      <div class="confirm-header" :style="`background-color:${background};`">
        <div class="confirm-header-icon" :style="`background:${iconTheme};`">
          <Icon :icon="modalIcon" :color="iconColor" width="32" height="32" />
        </div>
      </div>
      <div class="confirm-container">
        <div v-if="title" class="confirm-title">
          {{ $t(title) }}
        </div>
        <div
          v-if="text"
          class="confirm-text"
          v-html="
            $t(text, {
              item: item ? `<strong>&quot;${item}&quot;</strong>` : '',
            })
          "
        />
        <template v-if="customContent">
          <component :is="customContent" />
        </template>
        <div v-if="showDenyButton || showConfirmButton || showCloseButton">
          <v-divider></v-divider>
          <div class="confirm-footer" :class="footerClass">
            <base-button
              v-if="showCloseButton"
              color="grey4"
              :name="closeButtonText"
              variant="text"
              @click="closeModal()"
              class="confirm-btn-close-text"
            />
            <base-button
              v-if="showDenyButton"
              :name="denyButtonText"
              variant="tonal"
              @click="toastStore.deny"
              class="confirm-btn-cancel-text"
            />
            <base-button
              v-if="showConfirmButton"
              :color="confirmBtnTheme"
              :name="confirmButtonText"
              variant="flat"
              :loading="isLoading"
              @click="toastStore.confirm"
              class="confirm-btn-confirm-text"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>

  <v-bottom-sheet
    v-else
    :model-value="isVisible"
    @update:modelValue="$emit('close')"
  >
    <v-card class="rounded-b-0">
      <v-progress-linear
        v-if="timerProgressBar"
        :class="{ 'animate-width': progressPercentage != 100 }"
        v-model="progressPercentage"
        :color="iconColor"
        height="2"
        stream
      ></v-progress-linear>
      <div class="confirm-header" :style="`background-color:${background};`">
        <div class="confirm-header-icon" :style="`background:${iconTheme};`">
          <Icon :icon="modalIcon" :color="iconColor" width="32" height="32" />
        </div>
      </div>
      <div class="confirm-container">
        <div v-if="title" class="confirm-title">
          {{ $t(title) }}
        </div>
        <div
          v-if="text"
          class="confirm-text"
          v-html="
            $t(text, {
              item: item ? `<strong>&quot;${item}&quot;</strong>` : '',
            })
          "
        />
        <component v-if="customContent" :is="customContent" />
        <div v-if="showDenyButton || showConfirmButton || showCloseButton">
          <v-divider></v-divider>
          <div class="confirm-footer" :class="footerClass">
            <base-button
              v-if="showCloseButton"
              color="grey4"
              :name="closeButtonText"
              variant="text"
              @click="closeModal()"
              class="confirm-btn-close-text"
            />
            <base-button
              v-if="showDenyButton"
              :name="denyButtonText"
              variant="tonal"
              @click="toastStore.deny"
              class="confirm-btn-cancel-text"
            />
            <base-button
              v-if="showConfirmButton"
              :color="confirmBtnTheme"
              :name="confirmButtonText"
              variant="flat"
              :loading="isLoading"
              @click="toastStore.confirm"
              class="confirm-btn-confirm-text"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();

const {
  isVisible,
  title,
  text,
  item,
  confirmButtonText,
  denyButtonText,
  closeButtonText,
  showConfirmButton,
  showDenyButton,
  showCloseButton,
  timerProgressBar,
  duration,
  background,
  modalIcon,
  iconColor,
  iconTheme,
  confirmBtnTheme,
  isLoading,
  customContent,
  type,
  footerClass,
} = storeToRefs(toastStore);

const progress = ref(0);
const progressPercentage = computed(
  () => (progress.value / duration.value) * 100
);

const closeModal = () => {
  progress.value = false;
  toastStore.close();
};

const handleClickOutside = () => {
  if (type.value === 'success') {
    closeModal();
  }
};

watch(
  () => isVisible.value,
  (newVal) => {
    if (newVal && timerProgressBar.value) {
      progress.value = duration.value;
      const interval = setInterval(() => {
        progress.value -= 1;
        if (progress.value < 0) {
          clearInterval(interval);
          toastStore.close();
        }
      }, 500);
    }
  }
);
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
  padding: 20px;
  hr {
    margin: 15px auto;
  }
}
.confirm-title {
  font-weight: bold;
}
.confirm-text {
  margin-top: 15px;
  color: rgb(var(--v-theme-grey5));
}
.confirm-text strong {
  color: rgb(var(--v-theme-textPrimary));
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
  .confirm-btn-close-text {
    border: 1px solid rgb(var(--v-theme-grey3));
  }
}

.animate-width {
  transition: width 0.5s linear;
}
</style>
