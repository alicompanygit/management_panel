<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="5" class="d-flex align-center">
          <div class="boxed-auth-wrap">
            <v-card elevation="10" class="px-sm-1 px-0 mx-auto" max-width="450">
              <v-card-item class="pa-sm-8">
                <div class="d-flex justify-center my-5">
                    <LcFullLogoLogin />
                </div>
                <h2 class=" text-h4 font-weight-semibold">
                  {{ $t("Forgot Password") }}
                </h2>
                <p class="text-subtitle-1 text-grey100 py-4 text-10">
                {{ $t("Forgot Password Guide") }}
                </p>
                <ResetPassword />
                <v-btn
                  size="large"
                  color="lightprimary"
                  to="/auth/login"
                  block
                  class="mt-5 text-primary"
                  rounded="pill"
                  flat
                >
                  {{ $t("Back to Login") }}
                </v-btn>
              </v-card-item>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import ResetPassword from "@/components/auth/ResetForm.vue";
definePageMeta({
  layout: "blank",
});
</script>
