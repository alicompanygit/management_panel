<template>
  <div
    class="dashboard-container d-flex justify-center flex-column align-center"
  >
    <div class="container w-75 rounded-lg px-4 py-6">
      <div
        class="text-secondary2 text-custom w-100 d-flex justify-center"
        style="font-weight: bold"
      >
        خوش آمدید به پنل مدیریت
      </div>
      <div class="d-flex justify-center ga-1 w-100 mt-3">
        <span class="text-white" v-text="useAuth.user?.name"></span>
        <span class="text-white">به پنل مدیریت یکپارچه RIMS خوش آمدید</span>
      </div>
    </div>
    <div class="w-75 mt-4 d-flex ga-4">
      <div class="container w-50 d-flex rounded-lg px-4 py-6 ga-3">
        <div
          style="
            background-color: #ffda332d;
            width: max-content;
            height: max-content;
          "
          class="d-flex py-2 px-2 rounded-sm"
        >
          <v-icon icon="proicons:box-add" color="#ffd933" size="40" />
        </div>
        <div>
          <span style="color: #fff; font-weight: bold">محصولات</span>
          <div class="mt-1" style="color: #fff">
            <span>تعداد:</span>
            <span class="ms-1">{{
              useProduct.dashboardData?.stats?.products?.total ?? 0
            }}</span>
            <span class="ms-5">فعال:</span>
            <span class="ms-1">{{
              useProduct.dashboardData?.stats?.products?.active ?? 0
            }}</span>
          </div>
        </div>
      </div>
      <div class="container w-50 d-flex rounded-lg px-4 py-6 ga-3">
        <div
          style="
            background-color: #ffda332d;
            width: max-conten;
            height: max-content;
          "
          class="d-flex py-2 px-2 rounded-sm"
        >
          <v-icon
            size="40"
            icon="material-symbols:planner-banner-ad-pt-outline"
            color="#ffd933"
          />
        </div>
        <div>
          <span style="color: #fff; font-weight: bold">بنر ها</span>
          <div class="mt-1" style="color: #fff">
            <span>تعداد:</span>
            <span class="ms-1">{{
              useProduct.dashboardData?.stats?.banners?.total ?? 0
            }}</span>
            <span class="ms-5">فعال:</span>
            <span class="ms-1">{{
              useProduct.dashboardData?.stats?.banners?.active ?? 0
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '~/composables/auth';
import { useProduct } from '~/composables/product';

definePageMeta({
  layout: 'dashboard',
});

onMounted(async () => {
  useProduct.apiDashboardData();
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
