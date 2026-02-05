<template>
    <div class="mobile-child-content py-2 px-3 fade_animation_1"
         v-if="customizer.selectedItem.length != 0"
        :style="{
            top: customizer.childernLocation.y+'px',
        }"
    >
    <span class="custom-title">{{ $t(customizer.parentHovered) }}</span>
        <div 
            class="item-style cursor-pointer fade_animation_1"
            v-for="item in customizer.selectedItem"
            @click="navigate(`${item.to}`)"
            :class="{'active-bg': route.path == item.to}"
            v-show="item.permission"
            >
            <div class="item py-1 mt-1">{{ $t(item.title) }}</div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();

const navigate = (path) => {
    customizer.activeParent = customizer.parentHovered 
    customizer.selectedItem = []
    customizer.mobileSidebar = false
    navigateTo(path);
}

</script>

<style scoped lang="scss">
.light-style {
    background: #00406B;
    color: #fff;
}

.mobile-child-content {
    width: 180px;
    position: absolute;
    z-index: 1000;
    right: 180px;
    border-radius: 8px;
    box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.068);
    user-select: none;
}

.custom-title{
    font-size: 14px;
    font-weight: 600;
}

.item {
 width: 100%;
 font-size: 12px;
 font-weight: 500;
}

.active-bg {
  background-color: rgba(var(--v-theme-primary),20%);
  border-radius: 8px;
  padding: 0 10px;
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