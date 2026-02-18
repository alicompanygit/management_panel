<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" class="d-flex align-center">
          <div class="boxed-auth-wrap">
            <v-card elevation="10" class="px-sm-1 px-0 mx-auto" max-width="450">
              <v-card-item class="pa-sm-8">
                <div
                  class="d-flex justify-center mb-5"
                  style="font-size: 30px; color: #ffd620"
                >
                  Rims
                </div>
                <v-divider
                  :thickness="2"
                  color="#FFD933"
                  class="border-opacity-100"
                ></v-divider>
                <AuthLoginForm />
              </v-card-item>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login',
});
</script>
