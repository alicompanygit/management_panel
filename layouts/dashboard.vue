<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-app-bar elevation="0" :height="65" id="top" class="sticky app-bar">
          <v-row class="px-5">
            <v-col cols="6" class="d-flex align-center">
              <base-button
                v-if="useAuth.user?.is_god || useAuth.user?.is_super_user"
                name="Dashboard"
                variant="outlined"
                color="#ffd933"
                @click="navigateTo('/dashboard')"
              />
              <div
                @click="toggleLang"
                :class="[
                  'd-flex text-secondary2 py-0 ms-7 cursor-pointer px-2 align-center',
                  locale === 'en' ? 'px-2' : 'px-1',
                ]"
                style="
                  border: 1px solid #ffd933;
                  height: max-content;
                  border-radius: 6px;
                "
              >
                <span
                  :class="[
                    'px-1 my-1',
                    {
                      'opacity-50': locale === 'fa',
                    },
                    {
                      'text-white bg-secondary3 rounded-sm': locale === 'en',
                    },
                  ]"
                  >EN</span
                >
                <span class="px-2">/</span>
                <div
                  :class="[
                    'px-2 my-1',
                    {
                      'opacity-50 text-white': locale === 'en',
                    },
                    {
                      'text-white bg-secondary3 rounded-sm': locale === 'fa',
                    },
                  ]"
                >
                  FA
                </div>
              </div>
              <span
                v-if="!useAuth.user?.id"
                class="text-waith ms-7 cursor-pointer"
                @click="navigateTo('/auth/login')"
                >{{ t('Login') }}</span
              >
            </v-col>
            <v-col cols="6" class="d-flex justify-end align-center">
              <span
                class="text-waith me-9 cursor-pointer"
                @click="navigateTo('/#newproduct')"
                >{{ t('NewProduct') }}</span
              >
              <span
                class="text-waith me-9 cursor-pointer"
                @click="navigateTo('/')"
                >{{ t('Home') }}</span
              >
              <span class="text-secondary2 title">Rims</span>
            </v-col>
          </v-row>
        </v-app-bar>
        <v-navigation-drawer
          left
          class="leftSidebar"
          :rail="false"
          rail-width="70"
          width="230"
          style="background: #1c1c21 !important"
        >
          <div
            class="bg-containerBg bg-primary menu-content"
            style="
              height: calc(100vh - 160px);
              overflow-y: scroll;
              background: #1c1c21 !important;
            "
          >
            <v-list
              class="px-4 py-6 bg-containerBg"
              style="background: #1c1c21 !important"
            >
              <div v-for="(item, i) in sidebarItem">
                <NuxtLink :to="item.to" @click="handleLogout(item.title)">
                  <div style="color: #fff" class="d-flex ga-3 mt-6">
                    <v-icon :icon="item.icon" />
                    <apan v-text="t(item.title)" />
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

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import { useRtl, useTheme } from 'vuetify';
import { useAuth } from '~/composables/auth';

const theme = useTheme();
theme.global.name.value = 'light';

const { t, locale } = useI18n({ useScope: 'global' });
const rtl = useRtl();

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
];

const handleLogout = (title: string) => {
  if (title === 'logout') {
    localStorage.removeItem('token');
    useAuth.user = null;
    return navigateTo('/auth/login');
  }
};

const toggleLang = () => {
  locale.value = locale.value === 'en' ? 'fa' : 'en';
  rtl.isRtl.value = locale.value === 'fa';
};
</script>

<style>
.app-bar {
  background-color: #1c1c21 !important;
}
</style>
<style scoped>
.title {
  font-size: 24px;
}
</style>
