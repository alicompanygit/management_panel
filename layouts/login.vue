<template>
  <v-app>
    <v-app-bar elevation="0" :height="65" id="top" class="sticky app-bar">
      <v-row class="px-5">
        <v-col cols="6" class="d-flex align-center">
          <div
            @click="toggleLang"
            :class="[
              'rounded-sm d-flex text-secondary2 py-0 ms-7 cursor-pointer px-2 align-center',
              locale === 'en' ? 'px-2' : 'px-1',
            ]"
            style="border: 1px solid #ffd933; height: max-content"
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
              >en</span
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
              fa
            </div>
          </div>
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
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import { useRtl, useTheme } from 'vuetify';

const theme = useTheme();
theme.global.name.value = 'light';

const { t, locale } = useI18n({ useScope: 'global' });
const rtl = useRtl();

const toggleLang = () => {
  locale.value = locale.value === 'en' ? 'fa' : 'en';
  rtl.isRtl.value = locale.value === 'fa';
};
</script>

<style>
.app-bar,
footer {
  background-color: #1c1c21 !important;
}
</style>
<style scoped>
.title {
  font-size: 24px;
}
</style>
