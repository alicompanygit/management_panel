<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/user/index";
const companyName = import.meta.env.VITE_COMPANY_NAME;

const config = useRuntimeConfig();

const logOut = async () => {
  const userStore = useUserStore();
  const accessToken = useCookie("accessToken");
  const adminNumber = useCookie("adminNumber");
  accessToken.value = null;
  adminNumber.value = null;
  await userStore.logOut();
  navigateTo("/auth/login");
};
</script>

<template>
  <v-sheet rounded="md" color="lightprimary" class="pa-4 ExtraBox hide-menu">
    <div class="d-flex align-center">
      <v-avatar size="50">
        <img src="~/public/images/profile/user6.jpg" width="50" :alt="companyName" />
      </v-avatar>
      <div class="w-100 text-center">
        <h6 class="text-h6 font-weight-semibold">{{ companyName }}</h6>
        <span class="text-subtitle-2 font-weight-medium text-grey100">
          مدیر
        </span>
      </div>
      <div>
        <v-btn icon class="bg-lightprimary" flat size="small" @click="logOut">
          <Icon
            icon="solar:logout-linear"
            class="text-primary"
            stroke-width="3"
            height="24"
            width="24"
          />
        </v-btn>
      </div>
    </div>
    <div class="ver">{{ config.public.VERSION }}</div>
  </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
  position: relative;
}
.line-height-none {
  line-height: normal;
}
.ver {
  text-align: center;
  color: #aaa;
  font-size: 10px;
  position: absolute;
  width: calc(100% - 32px);
}
</style>
