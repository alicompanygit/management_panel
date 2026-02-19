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
                  ' d-flex text-secondary2 py-0 ms-7 cursor-pointer px-2 align-center',
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
                v-if="!mobile"
                class="text-waith me-9 cursor-pointer"
                @click="navigateTo('/#newproduct')"
                >{{ t('NewProduct') }}</span
              >
              <span
                v-if="!mobile"
                class="text-waith me-9 cursor-pointer"
                @click="navigateTo('/')"
                >{{ t('Home') }}</span
              >
              <span class="text-secondary2 title">Rims</span>
            </v-col>
          </v-row>
        </v-app-bar>
        <router-view />
      </v-container>
      <v-footer app>
        <div class="w-100 d-flex justify-center text-white py-2">
          Address Al Mamoun Tyres Trading CO LLC Sharhah - industrial 8 - WH:C6
        </div>
      </v-footer>
    </v-main>
    <a :href="whatsappLink" target="_blank" class="whatsapp-float">
      <div
        style="background-color: #25d366; border-radius: 999px"
        class="px-2 py-2"
      >
        <v-icon icon="fa7-brands:whatsapp" size="40px" />
      </div>
    </a>
  </v-app>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import { useDisplay, useRtl, useTheme } from 'vuetify';
import { useAuth } from '~/composables/auth';

const theme = useTheme();
theme.global.name.value = 'light';

const { t, locale } = useI18n({ useScope: 'global' });
const rtl = useRtl();
const { mobile } = useDisplay();

const phoneNumber = '971566794959';

const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  'Hello!'
)}`;

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

.whatsapp-float {
  position: fixed;
  bottom: 80px; /* بالاتر از ارتفاع فوتر */
  right: 30px;
  z-index: 2000;
}
</style>
