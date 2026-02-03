<template>
    <div class="content fade_animations" @click="close">
      <div class="sidebar-content slid-left-animation-5" :class="{'dark-style': darkTheme , 'light-style': !darkTheme}">
      
        <div class="w-100 d-flex align-center px-2 py-3">
         <div class="w-50 d-flex align-center">
            <LcFullLogoLightRtl width="90px" class="mt-2" />
         </div>
         <div class="w-50 d-flex justify-end px-2">
            <Icon
                icon="solar:close-circle-linear"
                height="24"
                width="24"
                class="cursor-pointer"
                color="#7C8FAC"
                @click="close"
            />
         </div>
        </div>

        <div class="menu-items">
            <LcFullNavMobile 
             v-for="(item, index) in sidebarMenu" 
             :key="index"
             :item="item"
             @clickOnNav="handleClick"
            />
            <!-- <div 
                class="d-flex px-3 py-2 mx-1 mt-3" 
                :class="{
                    'active-bg': customizer.activeParent == item.title, 
                    'active-clicked-bg': customizer.parentHovered == item.title
                }" 
                v-for="(item, index) in sidebarMenu" 
                :key="index"
                @click.stop="(event) => handleClick(item, event)"
            >
                <Icon
                    :icon="'solar:' + item.icon"
                    height="24"
                    width="24"
                    :level="level"
                    :class="
                        'position-relative z-index-2 texthover-' + item.BgColor
                    "
                    v-if="item.permission"
                />
                <span class="item px-1" >{{ $t(item.title) }}</span>
            </div> -->
        </div>
      </div>
      <LcFullMobileChilds />
    </div>
</template>

<script setup>
import { useCustomizerStore } from "@/stores/customizer";
import { Icon } from "@iconify/vue";
import { shallowRef } from "vue";

import sidebarItems from "@/components/lc/Full/vertical-sidebar/sidebarItem.ts";

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);

const sidebarItemLength = computed(() => {
  return sidebarItems.filter((item) => {
    return item.permission == true
  })
})

const darkTheme = computed(() => {
    const theme = customizer.actTheme
    if(theme.split('_')[0] == 'DARK') {
        return true
    } else {
        return false
    }
})

const close = () => {
    customizer.mobileSidebar = false
    customizer.selectedItem = []
    customizer.parentHovered = ""
}

const handleClick = (data) => {      
    customizer.parentHovered = data.item.title;
    customizer.selectedItem = data.item.children;
    if(customizer.parentHovered == 'Call Setting') {
        setTimeout(() => {
            if(sidebarItemLength.value.length <= 7) {
                customizer.childernLocation.y = data.event.y
            } else {
                customizer.childernLocation.y = data.event.y - 250;
            }
        },0)
    } 
    if(customizer.parentHovered == 'Connect to CRM') {
        setTimeout(() => {
            customizer.childernLocation.y = data.event.y - 120;
        }, 0);
    } 
    if(customizer.parentHovered == 'Support') {
        customizer.childernLocation.y = data.event.y - 50;
    } else {
        customizer.childernLocation.y = data.event.y - 10;
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100dvh;
    background-color: #00000056;
    position: fixed;
    z-index: 3000;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.sidebar-content{
    width: 220px;
    height: 97dvh;
    border-radius: 12px;
}

.light-style {
    background: #00406B;
    color: #fff;
}

.dark-style {
    background: #00406B;
    color: #fff;
}

.menu-items{
    width: 100%;
    height: 80dvh;
    overflow-y: scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none;
    display: flex;
    flex-direction: column; 
}

.menu-items::-webkit-scrollbar {
  display: none;
}

.item{
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}

.active-bg {
  background-color: rgba(var(--v-theme-primary),20%);
  border-radius: 12px;
}

.active-clicked-bg {
  background-color: rgba(var(--v-theme-secondary),20%);
  border-radius: 8px;
  padding: 0 10px;
  transition: 0.5s;
}
</style>