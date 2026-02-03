<script setup>
import sidebarItems from '@/components/lc/Full/vertical-sidebar/sidebarItem.ts';
import { useCustomizerStore } from '@/stores/customizer';
import { Icon } from '@iconify/vue';
const props = defineProps({ item: Object, level: Number });

const customizer = useCustomizerStore();
const arrow = ref(false);

const sidebarItemLength = computed(() => {
  return sidebarItems.filter((item) => {
    return item.permission == true;
  });
});

const adjustSubmenuPosition = (event) => {
  const parentEl = event.currentTarget;
  const rect = parentEl.getBoundingClientRect();

  const visibilChildren = props.item.children.filter(
    (child) => child.permission
  );

  const estimatedChildrenHeight = visibilChildren.length * 40;
  const spaceBelow = window.innerHeight - rect.top - 80;

  const hasEnoughSpace = spaceBelow > estimatedChildrenHeight;

  customizer.childernLocation.x = customizer.mini_sidebar ? 100 : 256;

  if (hasEnoughSpace) {
    customizer.childernLocation.y = rect.top - 40;
    customizer.alignFromBottom = false;
  } else {
    customizer.childernLocation.y = 0;
    customizer.alignFromBottom = true;
  }
};

const handleHover = (event) => {
  customizer.parentHovered = props.item.title;
  customizer.arrow = true;
  arrow.value = true;

  customizer.selectedItem = props.item.children;
  customizer.activeChilds = true;

  adjustSubmenuPosition(event);
};

const handleClick = (event) => {
  customizer.parentHovered = props.item.title;

  if (!customizer.mini_sidebar) {
    customizer.selectedItem = props.item.children;
    customizer.activeChilds = !customizer.activeChilds;

    adjustSubmenuPosition(event);

    customizer.selectedMenu = customizer.selectedMenu ? null : props.item;
  }
};

const mouseleaveHandler = () => {
  arrow.value = false;
};

onMounted(() => {
  customizer.selectedMenu = null;
  customizer.selectedItem = [];
  customizer.inSidebar = false;
  customizer.activeChilds = false;
  customizer.inActiveChildBody = false;
  customizer.parentHovered = '';
  customizer.mobileSidebar = false;
});
</script>

<template>
  <div class="rounded">
    <div
      class="item d-flex mt-2"
      :class="{
        'justify-center': customizer.mini_sidebar,
        'active-bg': customizer.activeParent == item.title,
        'hover-bg': customizer.parentHovered == item.title,
      }"
      @click="handleClick"
      @mouseenter="handleHover"
      @mouseleave="mouseleaveHandler"
    >
      <div class="item-content">
        <Icon
          :icon="item.icon"
          height="20"
          width="20"
          :level="level"
          :class="'position-relative z-index-2 texthover-' + item.BgColor"
        />
        <span
          class="title fade_animations"
          v-if="!customizer.mini_sidebar || customizer.mobileSidebar"
          >{{ $t(item.title) }}</span
        >
      </div>
      <div
        class="arrow-content fade_animations"
        v-if="customizer.arrow && customizer.parentHovered == item.title"
      >
        <Icon
          v-if="!customizer.mini_sidebar && customizer.arrow"
          icon="solar:alt-arrow-left-linear"
          height="18"
          width="18"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  cursor: pointer;
  border: none;
  padding: 8px 8px;
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hover-bg {
  transition: 0.5s;
  background-color: rgba(var(--v-theme-primary), 20%);
  border-radius: 12px;
}

.item-content {
  display: flex;
  width: 97%;
}

.arrow-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.active-bg {
  background-color: rgba(var(--v-theme-primary), 20%);
  border-radius: 12px;
}

.custom-opacity {
  opacity: 0.2;
}

.title {
  font-size: 14px;
  font-weight: 500;
  padding: 0 5px;
}
</style>
