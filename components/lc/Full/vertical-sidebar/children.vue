<script setup>
import { useRoute } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();
const route = useRoute();

const handleHover = (event) => {
  customizer.inActiveChildBody = true;
};

const mouseleaveHandler = () => {
  customizer.inActiveChildBody = false;
  customizer.activeChilds = false;
  customizer.parentHovered = '';
  if (customizer.mini_sidebar) {
    customizer.activeChilds = false;
    customizer.parentHovered = '';
  }
};

const navigate = async (path) => {
  customizer.activeParent = customizer.parentHovered;
  await navigateTo(path);
  customizer.activeChilds = false;
};

const darkTheme = computed(() => {
  const theme = customizer.actTheme;
  if (theme.split('_')[0] == 'DARK') {
    return true;
  } else {
    return false;
  }
});

const clickHandler = () => {
  customizer.activeChilds = false;
};
</script>

<template>
  <div
    class="custom-style rounded fade_animation_1"
    @click="clickHandler"
    @mouseenter="handleHover"
    @mouseleave="mouseleaveHandler"
    :class="{ 'dark-style': darkTheme, 'light-style': !darkTheme }"
    :style="{
      top: customizer.alignFromBottom
        ? 'auto'
        : `${customizer.childernLocation.y}px`,
      bottom: customizer.alignFromBottom ? '10px' : 'auto',
      right: customizer.childernLocation.x + 'px',
    }"
  >
    <span class="custom-title">{{ $t(customizer.parentHovered) }}</span>
    <nuxt-link
      class="item-style cursor-pointer fade_animation_1 mt-2 py-2 px-2"
      v-for="item in customizer.selectedItem"
      :class="{ 'active-bg': route.path == item.to }"
      v-show="item?.permission"
      :to="item.to"
    >
      <span>{{ $t(item.title) }}</span>
    </nuxt-link>
  </div>
</template>

<style scoped>
.light-style {
  background: #00406b;
  color: #fff;
}
.dark-style {
  background-color: #00406b;
  color: #fff;
}

.custom-style {
  width: 200px;
  padding: 12px 12px;
  position: absolute;
  z-index: 5000;
  top: 30px;
  right: 20px;
  /* background-color: #fff; */
  /* dark */
  /* background-color: #212e41; */
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.068);
}

.item-style {
  font-size: 14px;
  font-weight: 400;
  color: #cacfd9;
}

.item-style:hover {
  background-color: rgba(var(--v-theme-secondary), 20%);
  border-radius: 8px;
}

.custom-title {
  font-size: 14px;
  font-weight: 600;
}

.active-bg {
  background-color: rgba(var(--v-theme-primary), 20%);
  border-radius: 8px;
}
</style>
