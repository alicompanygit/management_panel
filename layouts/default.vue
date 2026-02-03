<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
import { usePermissionStore } from '@/stores/permission/index';
import { useUserStore } from '@/stores/user/index';
import { useRouter } from 'vue-router';
import { currentUser } from '~/composables/currentUser';
import { useContactFormStore } from '~/stores/contact/form';
import { parseJwtPayload } from '~/types/permission/Types';

import { useUsersOperatorStore } from '~/stores/users/operator';
const usersStore = useUsersOperatorStore();

const contactFormStore = useContactFormStore();
const permissionStore = usePermissionStore();
const userStore = useUserStore();

var { rolePermission } = permissionStore;

const router = useRouter();

router.afterEach(() => {
  setTimeout(() => {
    const container = document.getElementById('scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, 50);
});

const customizer = useCustomizerStore();

const userId = ref('');
const hasCiPermission = computed(
  () => rolePermission?.permission.get('root/contacts')?.visible ?? false
);
onMounted(async () => {
  await usersStore.getNNavaNumber();

  currentUser.setUserInfo();
  customizer.selectedMenu = null;
  customizer.selectedItem = [];
  customizer.inSidebar = false;
  customizer.activeChilds = false;
  customizer.inActiveChildBody = false;
  customizer.parentHovered = '';
  await contactFormStore.initializeForms();

  if (!hasCiPermission.value) return;

  const jwt = parseJwtPayload();
  userId.value = jwt.sub;
  userStore.getAvatar(userId.value);

  // const svgs = document.querySelectorAll('svg');
  // svgs.forEach((svg) => {
  //   if (svg.classList.contains('v-icon')) {
  //     svg.setAttribute('viewBox', '0 0 24px 24px');
  //     console.log(svg);
  //   }
  // });
});
</script>

<template>
  <!-----RTL LAYOUT------->
  <v-locale-provider v-if="customizer.setRTLLayout" rtl>
    <base-modal-alert />
    <BaseToast location="left" />
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.setBorderCard ? 'cardBordered' : '',
      ]"
    >
      <base-full-screen-loading />
      <v-navigation-drawer
        app
        temporary
        touchless
        elevation="10"
        location="left"
        v-model="customizer.Customizer_drawer"
        width="320"
        class="left-customizer"
      >
        <LcFullCustomizer />
      </v-navigation-drawer>
      <LcFullVerticalSidebar
        v-if="!customizer.setHorizontalLayout && !$vuetify.display.mobile"
      />
      <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
      <LcFullMobileSidebar v-if="customizer.mobileSidebar" />

      <v-main class="main-section">
        <LcFullVerticalSidebarChildren v-if="customizer.activeChilds" />
        <div id="scroll-container" class="rtl-lyt hr-layout">
          <v-container
            fluid
            class="page-wrapper bg-background rounded-xl"
            :class="{ 'mt-3': $vuetify.display.mobile }"
          >
            <div class="w-100">
              <NuxtPage />
              <CallPopupMain />
              <BaseVoiceBottomSheet />
            </div>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </v-locale-provider>

  <!-----LTR LAYOUT------->
  <v-locale-provider v-else>
    <base-modal-alert />
    <BaseToast location="left" />
    <v-app
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.setBorderCard ? 'cardBordered' : '',
      ]"
    >
      <base-full-screen-loading />
      <!---Customizer location right side--->
      <v-navigation-drawer
        app
        temporary
        elevation="10"
        location="right"
        v-model="customizer.Customizer_drawer"
        width="320"
      >
        <LcFullCustomizer />
      </v-navigation-drawer>
      <LcFullVerticalSidebar v-if="!customizer.setHorizontalLayout" />
      <div :class="customizer.boxed ? 'maxWidth' : 'full-header'">
        <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
      </div>
      <div :class="customizer.boxed ? 'maxWidth' : 'full-header'">
        <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
      </div>
      <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
      <v-main>
        <!-- <perfect-scrollbar style="height: calc(100vh - 96px)"> -->
        <div id="scroll-container" class="hr-layout">
          <v-container
            fluid
            class="page-wrapper bg-background px-sm-5 px-4 pt-8 pb-0 rounded-xl"
          >
            <div class="">
              <div :class="customizer.boxed ? 'maxWidth' : ''">
                <NuxtPage />
                <v-btn
                  class="customizer-btn"
                  size="large"
                  icon
                  variant="flat"
                  color="primary"
                  @click.stop="
                    customizer.SET_CUSTOMIZER_DRAWER(
                      !customizer.Customizer_drawer
                    )
                  "
                >
                  <SettingsIcon />
                </v-btn>
              </div>
            </div>
          </v-container>
        </div>
        <!-- </perfect-scrollbar> -->
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<style>
.main-section {
  overflow-y: scroll;
  height: 100dvh;
}

@media (max-width: 1280px) {
  .main-section {
    overflow-y: visible;
    height: auto;
  }
}
</style>
