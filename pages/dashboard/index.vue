<template>
  <div class="dashboard-container">
    <v-container fluid>
      <!-- Welcome Box -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="box pa-6 rounded-lg text-center">
            <div class="text-secondary2 text-title font-weight-bold">
              {{ t('welcomePanelText') }}
            </div>

            <!-- فقط متن welcome معکوس شود -->
            <div class="d-flex justify-center align-center mt-3">
              <span
                class="text-white"
                :class="locale === 'fa' ? 'me-1' : 'ms-1'"
              >
                {{ useAuth.user?.name }}
              </span>
              <span class="text-white">
                {{ t('welcomePanelTextRims') }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Stats Boxes -->
      <v-row class="mt-4" justify="center">
        <!-- Products -->
        <v-col cols="12" md="4">
          <div class="box pa-6 rounded-lg d-flex align-center ga-4">
            <div class="icon-box">
              <v-icon icon="proicons:box-add" color="#ffd933" size="40" />
            </div>

            <div class="flex-grow-1">
              <div class="text-white font-weight-bold">
                {{ t('Products') }}
              </div>

              <div class="d-flex flex-wrap mt-2 text-white">
                <div class="me-4">
                  {{ t('Number') }}:
                  {{ useProduct.dashboardData?.stats?.products?.total ?? 0 }}
                </div>

                <div>
                  {{ t('Active') }}:
                  {{ useProduct.dashboardData?.stats?.products?.active ?? 0 }}
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Banners -->
        <v-col cols="12" md="4">
          <div class="box pa-6 rounded-lg d-flex align-center ga-4">
            <div class="icon-box">
              <v-icon
                icon="material-symbols:planner-banner-ad-pt-outline"
                color="#ffd933"
                size="40"
              />
            </div>

            <div class="flex-grow-1">
              <div class="text-white font-weight-bold">
                {{ t('Banners') }}
              </div>

              <div class="d-flex flex-wrap mt-2 text-white">
                <div class="me-4">
                  {{ t('Number') }}:
                  {{ useProduct.dashboardData?.stats?.banners?.total ?? 0 }}
                </div>

                <div>
                  {{ t('Active') }}:
                  {{ useProduct.dashboardData?.stats?.banners?.active ?? 0 }}
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '~/composables/auth';
import { useProduct } from '~/composables/product';

definePageMeta({
  layout: 'dashboard',
});

const { t, locale } = useI18n();

onMounted(() => {
  useProduct.apiDashboardData();
});
</script>

<style scoped>
.dashboard-container {
  min-height: calc(100vh - 100px);
  padding: 16px;
}

.box {
  background-color: #1c1c21;
  width: 100%;
}

.text-title {
  font-size: 26px;
}

.icon-box {
  background-color: #ffda332d;
  padding: 8px;
  border-radius: 6px;
}
</style>
