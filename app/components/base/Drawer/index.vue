<template>
  <div class="base-drawer-content" v-if="isOpen">
    <div
      class="content slid-right-animation-8"
      :style="{ borderRadius: borderRadius, height: height, width: width }"
    >
      <div class="header">
        <div class="w-50 d-flex align-center">
          <div class="icon-content">
            <slot name="icon"></slot>
          </div>
          <span class="font-weight-bold ms-2">{{ $t(title) }}</span>
        </div>
        <div class="w-50 d-flex justify-end">
          <v-icon @click="emit('close')" size="small"> mdi-close </v-icon>
        </div>
      </div>
      <v-divider />
      <perfect-scrollbar style="height: calc(88dvh - 70px)">
        <div class="content-style">
          <slot name="content"></slot>
        </div>
      </perfect-scrollbar>
      <div class="footer-content">
        <v-divider />
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  borderRadius: {
    type: String,
    default: "10px",
  },
  width: {
    type: String,
    default: "500px",
  },
  height: {
    type: String,
    default: "96dvh",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.base-drawer-content {
  width: 100%;
  height: 100dvh;
  background: #0000002f;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: end;
  align-items: center;
}

.base-drawer-content .content {
  background: #fff;
  margin: 0 20px;
}

.base-drawer-content .content .header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.header .icon-content {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ccebff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-style {
  width: 100%;
}

.footer-content {
  width: 100%;
  height: 70px;
}
</style>
