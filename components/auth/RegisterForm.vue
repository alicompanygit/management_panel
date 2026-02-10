<template>
  <v-form ref="loginForm" class="loginForm my-4" @submit.prevent="register">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('UserName') }}
    </v-label>
    <base-form-text-field
      v-model="form.name"
      :rules="[requiredRule]"
      class="mb-4"
      hide-details="auto"
    ></base-form-text-field>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('Email') }}
    </v-label>
    <base-form-text-field
      v-model="form.email"
      :rules="[isValidEmail, requiredRule]"
      class="mb-4"
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
      class="pwdInput mb-4"
      validate-on="blur"
    ></base-form-text-field>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('PasswordConfirm') }}
    </v-label>
    <base-form-text-field
      v-model="passwordConfirm"
      :rules="[requiredRule, passwordConfirmRule]"
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
        to="/auth/login"
        class="text-primary text-body-1 opacity-1 font-weight-medium"
      >
        {{ $t('Login') }}
      </NuxtLink>
    </div>
    <v-btn
      size="large"
      rounded="pill"
      :loading="isLoading"
      block
      type="submit"
      flat
      color="#FFD933"
    >
      {{ $t('Register') }}
    </v-btn>
  </v-form>
  <v-snackbar
    v-model="showAlert"
    timeout="2000"
    color="error"
    location="top left"
  >
    <v-icon icon="material-symbols:error-outline-rounded" />
    {{ t(errorRegisterText) }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { isValidEmail, requiredRule } from '@/utils/validation';
import { navigateTo } from 'nuxt/app';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '~/composables/auth';

const { t } = useI18n();

const errorRegisterText = ref('AnErrorOccurred');
const showPassword = ref(false);
const isLoading = ref(false);
const showAlert = ref(false);
const loginForm = ref(null);
const form = ref({
  email: '',
  name: '',
  password: '',
});
const passwordConfirm = ref('');

const passwordConfirmRule = (value: string) => {
  if (!value) return true;

  return value === form.value.password || t('PasswordsDoNotMatch');
};

const register = async () => {
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
  const res = await useAuth.apiAddUser(form.value);
  isLoading.value = false;

  if (res.message) navigateTo('/auth/login');
  else if (res.error) {
    errorRegisterText.value = res.error;
    showAlert.value = true;
  } else {
    errorRegisterText.value = 'AnErrorOccurred';
    showAlert.value = true;
  }
};
</script>
<style scoped>
.loginForm {
  min-width: 300px;
}
</style>
