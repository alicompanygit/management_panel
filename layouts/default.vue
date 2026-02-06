<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRtl, useTheme } from 'vuetify';

const theme = useTheme()
theme.global.name.value = 'light'

const { locale } = useI18n()
const rtl = useRtl()

watch(locale, (val) => {
  rtl.value = val === 'fa'
  document.documentElement.dir = val === 'fa' ? 'rtl' : 'ltr'
  document.body.dir = val === 'fa' ? 'rtl' : 'ltr'
  document.body.classList.toggle('v-rtl', val === 'fa')
}, { immediate: true })
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>عنوان اپلیکیشن</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view /> 
        <h1>سلام، این صفحه اصلی است</h1>
        <p>محتوای شما اینجا نمایش داده می‌شود</p>
      </v-container>
    </v-main>

    <v-footer app>
      <span>© 2024</span>
    </v-footer>
  </v-app>
</template>

<style>
/* نیازی به direction LTR نیست */
</style>
