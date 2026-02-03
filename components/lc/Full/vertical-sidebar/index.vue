<script setup lang="ts">
import { shallowRef, computed, onMounted } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import { useDisplay } from "vuetify";
import { Icon } from '@iconify/vue';
import sidebarItems from "./sidebarItem";

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const { mobile } = useDisplay();

const activeRail = computed(() => !mobile.value && customizer.mini_sidebar);

const toggleSidebar = () => {
  customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar);
  if(customizer.mini_sidebar) {
    customizer.childernLocation.x = 100
    customizer.activeChilds = false 
    customizer.inActiveChildBody = false
  } else {
    customizer.activeChilds = false 
    customizer.inActiveChildBody = false
  }  
};

const handleHover = () => {
  customizer.inSidebar = true;
}

const handleLeave = () => {
    customizer.inSidebar = false;
    setTimeout(() => {
        if(!customizer.inSidebar && !customizer.inActiveChildBody) {
          customizer.activeChilds = false
          customizer.parentHovered = ''
        }
    }, 1000);
}

onMounted(() => {
  setTimeout(() => {
    document
        .querySelector('.v-list-item--active a')
        ?.scrollIntoView();
  }, 100);
});
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="10"
        app
        class="leftSidebar ml-sm-4 mt-sm-4 bg-containerBg"
        :rail="activeRail"
        rail-width="70"
        width="230"     
        style="background: #00406B !important;"   
    >
        <div class="d-flex justify-space-between px-4 pt-3">
            <LcFullLogo/>
        </div>

        <div
         @mouseenter="handleHover" 
         @mouseleave="handleLeave"
         class="bg-containerBg bg-primary menu-content" 
         style="height: calc(100vh - 160px); overflow-y: scroll; background: #00406B !important;"
         >
            <v-list class="px-4 bg-containerBg" style="background: #00406B !important;">
                <div v-for="(item, i) in sidebarMenu" style="color: #fff;">
                    <div v-if="item.permission">
                        <LcFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                        <LcFullVerticalSidebarNavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                        <LcFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                    </div>
                </div>
            </v-list>

        </div
         style="max-height: calc(100vh - 300px);">
        <div class="bottom-bar d-flex align-center" :class="{'justify-center': customizer.mini_sidebar, 'justify-end': !customizer.mini_sidebar, 'px-3': !customizer.mini_sidebar}">
          <Icon
            @click="toggleSidebar"
            icon="solar:round-double-alt-arrow-left-linear"
            height="24"
            width="24"
            class="cursor-pointer"
            color="#7C8FAC"
            v-if="customizer.mini_sidebar"
          />
          <Icon
            @click="toggleSidebar"
            icon="solar:round-double-alt-arrow-right-linear"
            height="24"
            width="24"
            class="cursor-pointer"
            color="#7C8FAC"
            v-else
          />
        </div>
    </v-navigation-drawer>
</template>


<style scoped>
.menu-content {
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}
.menu-content::-webkit-scrollbar {
  display: none;
}
.bottom-bar {
    height: 50px;
}
</style>