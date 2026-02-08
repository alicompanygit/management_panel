<template>
  <div class="dashboard-container d-flex justify-center align-center">
    <div class="container w-50 rounded-lg px-4 py-6">
      <div class="text-secondary2 text-custom w-100 d-flex justify-center">
        خوش آمدید به پنل مدیریت
      </div>
      <div class="d-flex justify-center ga-1 w-100 mt-3">
        <span class="text-white" v-text="useAuth.user?.name"></span>
        <span class="text-white">به پنل مدیریت یکپارچه RIMS خوش آمدید</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth';

definePageMeta({
  layout: 'dashboard',
});
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: calc(100vh - 100px) !important;
}

.container {
  background-color: #1c1c21;
}

.text-custom {
  font-size: 30px;
}
</style>
