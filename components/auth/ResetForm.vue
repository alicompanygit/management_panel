<template>
  <v-form
    ref="resetForm"
    lazy-validation
    class="mt-sm-4"
    @submit.prevent="resetPassword"
  >
    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">
      {{ $t("Enter Your Navatel") }}
    </v-label>
    <BaseFormTextField
      :rules="[requiredRule]"
      v-model="number"
      placeholder="Number in Navatel"
      isNumber
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
      {{ $t("Send") }}
    </v-btn>
  </v-form>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth/index";
import { requiredRule } from "@/utils/validation";

const authStore = useAuthStore();

const resetForm = ref(null);
const isLoading = ref(false);
const number = ref("");

const resetPassword = async () => {
  const { valid } = await resetForm.value.validate();
  if (!valid) return;
  isLoading.value = true;
  await authStore
    .forgotPassword(number.value)
    .then(() => (isLoading.value = false));
};
</script>
