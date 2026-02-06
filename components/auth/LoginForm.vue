<template>
  <v-form ref="loginForm" class="loginForm my-4" @submit.prevent="login">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('Email') }}
    </v-label>
    <base-form-text-field
      v-model="form.email"
      :rules="[isValidEmail, requiredRule]"
      class="mb-8"
      hide-details="auto"
    ></base-form-text-field>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('Password') }}
    </v-label>
    <base-form-text-field
      v-model="form.password"
      :rules="[requiredRule]"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="
        showPassword ? 'solar:eye-linear' : 'solar:eye-closed-linear'
      "
      @click:appendInner="showPassword = !showPassword"
      class="pwdInput"
      validate-on="blur"
    ></base-form-text-field>
    <div class="my-4">
      <NuxtLink
          to="/auth/forgot-password"
          class="text-primary text-body-1 opacity-1 font-weight-medium "
        >
          {{ $t('Rejister') }}
        </NuxtLink>    
    </div>
    <v-btn
      size="large"
      rounded="pill"
      :loading="isLoading"
      color="primary"
      block
      type="submit"
      flat
    >
      {{ $t('Login') }}
    </v-btn>
  </v-form>
  <v-snackbar
    v-model="showAlert"
    timeout="2000"
    color="error"
    location="top left"
  >
    <v-icon icon="material-symbols:error-outline-rounded"/>
    {{ t('WrongEmailOrPassword') }}
  </v-snackbar>
</template>

<script setup>
import { isValidEmail, requiredRule } from '@/utils/validation';
import { navigateTo } from 'nuxt/app';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '~/composables/auth';

const { t } = useI18n();

const showPassword = ref(false);
const isLoading = ref(false);
const showAlert = ref(false);
const loginForm = ref(null);
const form = ref({
  email: '',
  password: ''
})

const login = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  const config = useRuntimeConfig();
  const appType = config.public.APP_TYPE;

  const broadcast = new BroadcastChannel('app_type');
  broadcast.postMessage({
    type: 'application-type',
    payload: appType,
    timestamp: Date.now(),
  });

  isLoading.value = true;
  const user = useAuth.apiUserLogin(form.value)
  isLoading.value = false;

  if(user && user.id) {
    navigateTo('/');
  } else showAlert.value = true
};
</script>
<style scoped>
.loginForm{
  min-width: 300px;
}
</style>
