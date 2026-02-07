<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRtl, useTheme } from 'vuetify';

const theme = useTheme()
theme.global.name.value = 'light'

const { t } = useI18n();
const rtl = useRtl()


const sidebarItem = [
  {
    title: 'Dashboard',
    icon: 'duo-icons:dashboard',
    BgColor: 'primary',
    to: '/dashboard',
  },
  {
    title: 'AddProuduct',
    icon: 'proicons:box-add',
    BgColor: 'primary',
    to: '/dashboard/add-product',
  },
  {
    title: 'AddBanner',
    icon: 'material-symbols:planner-banner-ad-pt-outline',
    BgColor: 'primary',
    to: '/dashboard/add-baner',
  },
  {
    title: 'UserManagement',
    icon: 'solar:user-linear',
    BgColor: 'primary',
    to: '/dashboard/user-management',
  },
  {
    title: 'logout',
    icon: 'tabler:logout',
    BgColor: 'primary',
    to: '',
  },
]
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar
          elevation="0"
          :height="65"
          id="top"
          class="sticky app-bar"
        >ff</v-app-bar>
        <v-navigation-drawer
          left
          class="leftSidebar"
          :rail="false"
          rail-width="70"
          width="230"     
          style="background: #1c1c21 !important;"   
        >
        <div
         class="bg-containerBg bg-primary menu-content" 
         style="height: calc(100vh - 160px); overflow-y: scroll; background: #1c1c21 !important;"
         >
            <v-list class="px-4 py-6 bg-containerBg" style="background: #1c1c21 !important;">
              <div v-for="(item, i) in sidebarItem">
                <NuxtLink
                  :to="item.to"
                >
                  <div style="color: #fff;" class="d-flex ga-3 mt-6">
                    <v-icon :icon="item.icon"/>
                    <apan v-text="t(item.title)"/>
                  </div>
                </NuxtLink>   
              </div>
            </v-list>

        </div>
        </v-navigation-drawer>
        <router-view /> 
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.app-bar {
  background-color: #1c1c21 !important;
}
</style>