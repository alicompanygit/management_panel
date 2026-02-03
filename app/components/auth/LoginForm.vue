<template>
  <v-form ref="loginForm" @submit.prevent="login" class="my-4">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('email') }}
    </v-label>
    <v-text-field
        v-model="username"
        :rules="[requiredRule]"
        class="mb-8"
        validate-on="blur"
        hide-details="auto"
        is-number
    ></v-text-field>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-grey200">
      {{ $t('password') }}
    </v-label>
    <v-text-field
        v-model="password"
        :rules="[requiredRule]"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="
        showPassword ? 'solar:eye-linear' : 'solar:eye-closed-linear'
      "
        @click:appendInner="showPassword = !showPassword"
        class="pwdInput"
        validate-on="blur"
    ></v-text-field>
    <div class="d-flex flex-wrap align-center my-3 mr-n2">
      <v-checkbox v-model="remember" hide-details color="primary" class="me-14">
        <template v-slot:label class="">
          <v-label class="text-subtitle-1 font-weight-semibold text-grey200">
            {{ $t('Remember Me') }}
          </v-label>
        </template>
      </v-checkbox>
      <div class="ml-sm-auto">
        <NuxtLink
            to="/auth/forgot-password"
            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium ms-14"
        >
          {{ $t('Forget Password') }}
        </NuxtLink>
      </div>
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
</template>

<script setup>
import { requiredRule } from '~/app/utils/validation';

const remember = ref(false);
const showPassword = ref(false);
const password = ref('');
const username = ref('');
const isLoading = ref(false);
const loginForm = ref(null);

const login = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;
  isLoading.value = true;
  rauth.login({
    username: username.value,
    password: password.value,
    remember: remember.value,
  });
  isLoading.value = false;
};
</script>
