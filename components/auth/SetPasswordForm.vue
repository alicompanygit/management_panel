<template>
  <v-form ref="setForm" class="mt-sm-4" @submit.prevent="resetPassword">
    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">
      {{ $t("Enter Your New Password") }}
    </v-label>
    <BaseFormTextField
      v-model="password"
      placeholder="Password"
      :rules="[requiredRule, minLength(9)]"
      class="mb-8"
    />
    <BaseFormTextField
      v-model="confirmPassword"
      placeholder="Confirm Password"
      :rules="[requiredRule, confirmRule(password)]"
      class="mb-8"
    />
    <v-btn
      size="large"
      color="primary"
      block
      type="submit"
      rounded="pill"
      :loading="isLoading"
    >
      {{ $t("Submit") }}
    </v-btn>
  </v-form>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth/index";
import { requiredRule, confirmRule } from "@/utils/validation";

const route = useRoute();
const authStore = useAuthStore();

const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const setForm = ref(null);

const resetPassword = async () => {
  const { valid } = await setForm.value.validate();
  if (!valid) return;
  isLoading.value = true;
  const data = {
    token: route.query.token,
    password: password.value,
  };
  await authStore.resetPassword(data).then(() => (isLoading.value = false));
};
</script>
