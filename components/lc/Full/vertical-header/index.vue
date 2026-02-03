<script setup lang="ts">
import { getShamsiDate } from '@/utils/helpers/dateTimeFormatter';
import { useDateTimeManager } from '@/composables/useDateTimeManager';
import { onBeforeMount, ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useUserStore } from '@/stores/user/index';
import { storeToRefs } from 'pinia';

// Icon Imports
import { Icon } from '@iconify/vue';
import ReportPathIcon from '~/components/lc/Full/vertical-header/ReportPathIcon.vue';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

function searchbox() {
  showSearch.value = !showSearch.value;
}

watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});

//For on Scroll Effect on Header
onBeforeMount(() => {
  /*
  window.addEventListener("scroll", handleScroll);
  */
});
const stickyHeader = ref(false);

function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true;
  } else {
    stickyHeader.value = false;
  }
}

const userStore = useUserStore();
const { avatarUrl } = storeToRefs(userStore);

const { getDateWithAddedDays } = useDateTimeManager();

const getDaysSinceSaturday = computed(() => {
  const days = [
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
    'شنبه',
  ];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayName = days[dayOfWeek];

  const daysSinceSat = (dayOfWeek + 1) % 7;

  return {
    dayName: dayName,
    daysPassed: daysSinceSat,
  };
});
</script>

<template>
  <v-app-bar
    elevation="0"
    :priority="priority"
    :height="$vuetify.display.mobile ? 50 : 36"
    color=""
    id="top"
    :class="stickyHeader ? 'sticky' : ''"
  >
    <div
      class="custom-w-70 d-flex align-center"
      v-if="!$vuetify.display.mobile"
    >
      <div class="d-flex align-center mx-2">
        <Icon
          icon="solar:calendar-linear"
          height="24"
          width="24"
          class="cursor-pointer"
        />
      </div>
      <div class="date-style">
        {{ getDaysSinceSaturday.dayName }}
        {{ getShamsiDate(getDateWithAddedDays(0)) }}
      </div>
    </div>
    <div class="custom-w-70 d-flex align-center" v-if="$vuetify.display.mobile">
      <div class="w-50 d-flex align-center">
        <Icon
          icon="solar:hamburger-menu-line-duotone"
          height="24"
          width="24"
          class="cursor-pointer"
          @click.stop="customizer.mobileSidebar = !customizer.mobileSidebar"
        />
      </div>
      <div class="d-flex align-center justify-center w-50">
        <LcFullLogoDarkRtl width="90px" class="mt-2" />
      </div>
    </div>
    <!-- <v-btn
        class="hidden-md-and-down"
        icon
        variant="text"
        size="small"
        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      >
        <v-icon size="x-large">mdi-menu</v-icon>
      </v-btn>
      <v-btn
        class="hidden-lg-and-up"
        icon
        variant="text"
        @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small"
      >
        <v-icon size="large">mdi-menu</v-icon>
      </v-btn> -->

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->

    <!---/Search part -->
    <v-spacer class="hidden-sm-and-down" />

    <!-- <div class="hidden-md-and-up">
      <LcFullLogo />
    </div> -->

    <!-----Mobile header------>
    <div class="custom-w-30 d-flex justify-end align-center">
      <div class="mt-1 pe-1">
        <base-tooltip title="reports">
          <ReportPathIcon />
        </base-tooltip>
      </div>
      <div class="hidden-sm-and-down">
        <base-tooltip title="Settings">
          <div
            :class="[
              'd-flex align-center py-1 px-1 header-icon',
              { 'header-icon__selected': customizer?.Customizer_drawer },
            ]"
          >
            <Icon
              icon="solar:settings-line-duotone"
              width="24"
              class="cursor-pointer"
              @click.stop="
                customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)
              "
              :color="customizer?.Customizer_drawer ? 'primary' : ''"
            />
          </div>
        </base-tooltip>
      </div>
      <div class="hidden-sm-and-down">
        <base-tooltip title="Notifications">
          <LcFullVerticalHeaderNotificationDD />
        </base-tooltip>
      </div>
      <div class="hidden-sm-and-down pe-10">
        <LcFullVerticalHeaderProfileDD />
      </div>
      <v-menu :close-on-content-click="false" class="mobile_popup">
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            class="bg-lightprimary hidden-md-and-up"
            flat
            v-bind="props"
            size="32"
          >
            <v-avatar size="32">
              <img v-if="avatarUrl" :src="avatarUrl" class="w-100" />
              <v-icon v-else icon="solar:user-rounded-line-duotone" size="32" />
            </v-avatar>
          </v-btn>
        </template>
        <v-sheet rounded="lg" elevation="10" class="mt-5 dropdown-box py-6">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="d-flex w-50">
              <div
                class="d-flex align-center mx-2 cursor-pointer"
                @click="navigateTo('/notification')"
              >
                <Icon
                  icon="solar:bell-bing-line-duotone"
                  height="24"
                  width="24"
                />
              </div>
              <div
                class="d-flex align-center mx-2 cursor-pointer"
                @click.stop="
                  customizer.SET_CUSTOMIZER_DRAWER(
                    !customizer.Customizer_drawer
                  )
                "
              >
                <Icon
                  icon="solar:settings-line-duotone"
                  height="24"
                  width="24"
                />
              </div>
            </div>
            <div class="d-flex w-50 justify-end px-5">
              <LcFullVerticalHeaderProfileDD />
            </div>
          </div>
        </v-sheet>
      </v-menu>
    </div>
    <!-- <v-menu :close-on-content-click="false" class="mobile_popup">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="bg-lightprimary hidden-md-and-up"
          flat
          v-bind="props"
          size="small"
        >
          <DotsIcon stroke-width="2" size="24" class="text-primary" />
        </v-btn>
      </template>
      <v-sheet rounded="lg" elevation="10" class="mt-5 dropdown-box py-6">
        <div class="d-flex justify-space-between align-center w-100">
          <div class="d-flex w-50">
            <div class="d-flex align-center mx-2 cursor-pointer" @click="navigateTo('/notification')">
              <Icon icon="solar:bell-bing-line-duotone" height="24" width="24" />
            </div>
            <div class="d-flex align-center mx-2 cursor-pointer"
              @click.stop="
              customizer.SET_CUSTOMIZER_DRAWER(
                  !customizer.Customizer_drawer
                )
              "
            >
              <Icon icon="solar:settings-line-duotone" height="24" width="24"  />
            </div>
          </div>
          <div class="d-flex w-50 justify-end px-5">
            <LcFullVerticalHeaderProfileDD />
          </div>
        </div>
      </v-sheet>
    </v-menu> -->
  </v-app-bar>
</template>

<style scoped>
.date-style {
  font-size: 14px;
  font-weight: 500;
  color: #5a6a85;
}

.custom-w-30 {
  width: 30%;
}

.custom-w-70 {
  width: 70%;
}
</style>
