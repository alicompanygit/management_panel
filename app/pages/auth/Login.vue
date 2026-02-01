<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <div class="boxed-auth-wrap">
            <v-card elevation="10" class="px-sm-1 px-0 mx-auto" max-width="450">
              <v-card-item class="pa-sm-8">
                <div class="d-flex justify-center mb-5">
                  logo
                </div>
                <auth-login-form/>
              </v-card-item>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>