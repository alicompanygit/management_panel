<script setup lang="ts">
import { CircleXIcon } from 'vue-tabler-icons';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user/index';
import { usePermissionStore } from '@/stores/permission/index';
import { RoleType } from '~/types/permission/Types';
import { useUsersOperatorStore } from '@/stores/users/operator';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const permissionStore = usePermissionStore();
var { rolePermission } = permissionStore;

const userStore = useUserStore();
const { avatarUrl } = storeToRefs(userStore);

const isOpenMenu = ref(false);

var role = '';
switch (rolePermission?.role) {
  case RoleType.Operator:
    role = rolePermission.role2;
    if (role == 'operator') role = 'callcenter operator';
    break;
  case RoleType.Agent:
    role = '';
    break;
  default:
    role = 'admin';
    break;
}

const logOut = async () => {
  const userStore = useUserStore();
  const accessToken = useCookie('accessToken');
  const adminNumber = useCookie('adminNumber');
  accessToken.value = null;
  adminNumber.value = null;
  await userStore.logOut();
  // navigateTo("/auth/login");
  reloadNuxtApp({ path: '/auth/login', ttl: 100 });
};

const usersOperatorStore = useUsersOperatorStore();
const userNumber = computed(() => {
  const phone = useCookie('adminNumber');
  return phone.value;
});
const userName = computed(() => {
  const name = usersOperatorStore.getOperatorName(userNumber.value);
  return name;
});

onMounted(() => {
  if (!usersOperatorStore.nnavaNumber) {
    usersOperatorStore.getNNavaNumber();
  }
});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu
    :close-on-content-click="true"
    class="profile_popup"
    v-model="isOpenMenu"
  >
    <template v-slot:activator="{ props }">
      <div
        class="custom-hover-primary text-left px-0 me-2 cursor-pointer"
        variant="text"
        v-bind="props"
      >
        <div
          :class="[
            'd-flex align-center py-1 px-1 header-icon',
            { 'header-icon__selected': isOpenMenu },
          ]"
        >
          <base-tooltip title="User Profile">
            <v-avatar size="24" color="grey2" v-ripple>
              <img v-if="avatarUrl" :src="avatarUrl" class="w-100" />
              <div
                v-else
                class="d-flex align-center py-1 px-1 header-icon-i-element"
              >
                <v-icon
                  icon="solar:user-rounded-line-duotone"
                  size="24"
                  :style="{
                    color: isOpenMenu ? 'rgb(var(--v-theme-primary))' : '',
                  }"
                />
              </div>
            </v-avatar>
          </base-tooltip>
        </div>
      </div>
    </template>
    <v-sheet rounded="lg" width="385" elevation="10" class="mt-5">
      <div class="px-8 pt-6">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-h5 font-weight-semibold">{{ $t('User Profile') }}</h6>
          <CircleXIcon
            size="22"
            class="text-grey100 cursor-pointer opacity-50"
          />
        </div>

        <div class="d-flex align-center mt-5 pb-3">
          <v-avatar size="64" color="grey2">
            <img v-if="avatarUrl" :src="avatarUrl" class="w-100" />
            <v-icon v-else icon="solar:user-rounded-line-duotone" size="52" />
          </v-avatar>
          <div class="ml-5">
            <h6 class="text-h5 mb-n1">{{ userName }}</h6>
            <div
              class="text-subtitle-1 font-weight-regular text-grey100 font-weight-medium mt-1"
            >
              {{ $t(role) }}
            </div>
            <span
              class="text-subtitle-1 font-weight-regular text-grey100 font-weight-medium"
              >{{ userNumber }}</span
            >
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <div class="pb-6 px-8 mt-3 text-center">
        <v-btn
          color="primary"
          size="large"
          rounded="pill"
          block
          @click="logOut"
          >{{ $t('Logout') }}</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
