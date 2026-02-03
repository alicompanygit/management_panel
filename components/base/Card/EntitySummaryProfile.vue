<template>
  <v-menu
    open-on-hover
    :close-on-content-click="false"
    offset="5"
    @update:modelValue="(val: boolean) => val && getEntityData()"
    open-delay="150"
    close-delay="150"
  >
    <template #activator="{ props: activatorProps }">
      <v-row v-bind="activatorProps" class="btn m-0 w-content">
        <NuxtLink
          :to="entityProfilePath"
          :class="[
            'd-flex align-center ga-2',
            { 'btn-link cursor-pointer': showContainer },
          ]"
          rel="noopener noreferrer"
        >
          <v-avatar
            :color="getLetterColor(entityName)"
            rounded="pill"
            size="24"
            class="btn--avatar"
          >
            <img v-if="avatarUrl" :src="avatarUrl" width="24" />
            <span v-else class="text-white text-size-10 white-space-pre-wrap">
              {{ entityName?.trim()[0] }}
            </span>
          </v-avatar>

          <div
            v-if="showName"
            class="btn--text text-body3-semibold"
            style="max-width: 130px"
          >
            <text-ellipsis :text="entityName" :clamp="1" white-space-pre />
          </div>
        </NuxtLink>
      </v-row>
    </template>

    <v-container
      v-if="showContainer"
      :class="[
        'entity-summary-profile-container pb-4 position-relative bg-white rounded-lg border border-primary2',
        loading ? 'border-grey2 bg-greyLightest' : 'border-primary2',
      ]"
      :style="{ width: width }"
      @mouseleave="showTooltip = false"
    >
      <v-row
        class="entity-summary-profile-container--grey-layout bg-grey2 position-absolute top-0 w-100"
      />

      <transition name="fade" mode="out-in" :duration="0">
        <template v-if="loading" key="loading">
          <v-row class="m-0 rounded-xl bg-grey5">
            <v-skeleton-loader
              class="w-100 rounded-lg rounded-b-0"
              type="ossein"
              height="54"
              color="greyLightest"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="w-50 rounded-0"
              type="avatar"
              color="greyLightest"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="w-50 rounded-0 d-flex justify-end"
              type="button"
              color="greyLightest"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="w-100 rounded-0 d-flex justify-end w-100"
              type="list-item-two-line"
              color="greyLightest"
            ></v-skeleton-loader>
          </v-row>
        </template>

        <template v-else key="content">
          <div>
            <v-row class="m-0 mt-4">
              <v-col class="padding-handle">
                <v-avatar
                  :color="getLetterColor(entityName)"
                  rounded="pill"
                  size="60"
                >
                  <img v-if="avatarUrl" :src="avatarUrl" width="60" />
                  <span v-else class="text-white">{{
                    entityName?.trim()[0]
                  }}</span>
                </v-avatar>
              </v-col>

              <v-col class="padding-handle d-flex justify-end align-end">
                <NuxtLink
                  v-if="!noLink"
                  :to="`contacts/${entityType}/${entityId}`"
                  class="profile-btn d-flex align-center text-subtitle-2 text-primary body3-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ $t('profile') }}
                  <v-icon
                    icon="iconamoon:arrow-left-2-bold"
                    color="primary"
                    class="profile-btn--icon ms-1"
                  />
                </NuxtLink>
              </v-col>
            </v-row>

            <v-row class="m-0">
              <v-col cols="12" class="padding-handle text-body2-Bold">
                <v-tooltip
                  v-model="showTooltip"
                  open-on-click
                  :open-on-hover="false"
                  close-on-back
                  text-color="grey2"
                >
                  <template #activator="{ props }">
                    <span
                      v-bind="props"
                      @click="copyName"
                      class="cursor-pointer"
                    >
                      <base-tooltip
                        v-if="activeTooltipName"
                        :title="entityName"
                      >
                        {{ entityNameValidation(entityName, 33) }}
                      </base-tooltip>
                      <span
                        v-else
                        v-text="entityNameValidation(entityName)"
                      ></span>
                    </span>
                  </template>
                  <span>کپی شد!</span>
                </v-tooltip>
              </v-col>

              <v-col
                v-if="jobTitle"
                cols="12"
                class="padding-handle text-subtitle-2 text-grey4"
              >
                {{ jobTitle }}
              </v-col>
              <v-col
                v-if="entityData?.phone_number"
                cols="12"
                class="padding-handle text-subtitle-2 text-grey4"
              >
                <v-btn
                  variant="text"
                  density="compact"
                  prepend-icon="solar:phone-linear"
                  icon-color="success"
                  class="call-btn px-0 text-body3-semibold text-grey6"
                  @click="
                    handlePhoneCellClick(
                      withApi ? entityData.phone_number : entityPhone
                    )
                  "
                >
                  <template #prepend>
                    <v-icon
                      color="success"
                      size="22"
                      class="call-btn--prepend-icon"
                    />
                  </template>
                  {{ entityData.phone_number }}
                </v-btn>
              </v-col>
              <v-col
                v-if="assignedTo"
                cols="12"
                class="padding-handle text-subtitle-2 text-grey4"
              >
                <v-row class="m-0 w-content ga-2 align-center">
                  <span>{{ $t('assignedTo') }}:</span>
                  <v-avatar
                    :color="getLetterColor(assignedTo.fullname?.slice(0, 1))"
                    rounded="pill"
                    size="24"
                  >
                    <span class="text-white">
                      {{
                        assignedTo.fullname
                          ? assignedTo.fullname?.slice(0, 1)
                          : assignedTo?.number[0]
                      }}
                    </span>
                  </v-avatar>
                  <span class="text-caption-Semibold text-grey6">
                    {{
                      assignedTo.fullname
                        ? assignedTo.fullname
                        : assignedTo?.number
                    }}
                  </span>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </template>
      </transition>
    </v-container>
  </v-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useContactStore } from '~/stores/contact';
import { useContactCallStore } from '~/stores/contact/call';
import { useFileManagerStore } from '~/stores/fileManager';
import { useToastStore } from '~/stores/toast';
import { useUsersOperatorStore } from '~/stores/users/operator';
import TextEllipsis from '~/components/base/tools/TextEllipsis.vue';

const props = withDefaults(
  defineProps<{
    entityType: 'people' | 'company' | 'agent'; // use for path and apiBase
    entityName: string;
    entityId: string; // use for path and apiBase
    //apiBase
    withApi: boolean;
    //Not required or withApi === false
    entityAvatarUrl?: string;
    entityOperator?: string;
    entityPhone?: string;
    entityRole?: string;
    //options
    showContainer?: boolean;
    showAvatar?: boolean;
    showName?: boolean;
    noLink?: boolean;
    width?: string;
  }>(),
  {
    showContainer: true,
    showAvatar: true,
    showName: true,
    width: '354px',
    withApi: true,
  }
);

const usersOperatorStore = useUsersOperatorStore();
const contactCallStore = useContactCallStore();
const fileManagerStore = useFileManagerStore();
const contactStore = useContactStore();
const toastStore = useToastStore();

const { formData } = storeToRefs(contactStore);
const activeTooltipName = ref(false);
const entityData = ref<any>(null);
const showTooltip = ref(false);
const isSearched = ref(false);
const avatarUrl = ref(null);
const loading = ref(true);

const entityProfilePath = computed(() =>
  !props.noLink ? `/contacts/${props.entityType}/${props.entityId}` : ''
);

const jobTitle = computed(() => {
  const company = entityData.value?.company_name;
  const role = entityData.value?.role;
  if (!props.withApi) {
    return props.entityRole;
  } else if (role && company && props.entityType === 'people')
    return `${role} در ${company}`;
});

const assignedTo = computed(() => {
  if (props.entityType === 'agent') return null;
  const result = usersOperatorStore.getOperatorName(
    props.withApi ? entityData.value?.followUp_operator : props.entityOperator,
    true
  );
  return result
    ? result.fullname
      ? result
      : { number: result.number ? result.number : result }
    : false;
});

const copyName = () => {
  navigator.clipboard.writeText(props.entityName).then(() => {
    showTooltip.value = true;
    setTimeout(() => (showTooltip.value = false), 600);
  });
};

const getEntityData = async () => {
  if (isSearched.value || !props.withApi) return;

  loading.value = true;
  if (props.entityType === 'people' || props.entityType === 'company') {
    await contactStore.getSubmitedDataById({
      ulid_list: [props.entityId],
    });
    entityData.value = formData.value;
  }

  isSearched.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 300);
};

const getLetterColor = (name?: string) => {
  if (!name) return 'primary';
  const charCode = name.trim().charCodeAt(0);
  return colors[charCode % colors.length];
};

const handlePhoneCellClick = (phoneNumber: string) => {
  toastStore.showAlert({
    title: 'Sure To Call',
    text: 'Sure To Call Text',
    item: phoneNumber,
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: 'Accept Call',
    icon: 'solar:outgoing-call-rounded-bold',
    onConfirm: () => contactCallStore.dial(phoneNumber),
  });
};

const entityNameValidation = (
  name: string,
  numberChrAllowed: number = 20
): string => {
  if (!name) return '';

  if (name.length > numberChrAllowed) {
    activeTooltipName.value = true;
    return name.slice(0, numberChrAllowed) + '...';
  }
  return name;
};

watch(
  () => props.entityAvatarUrl,
  async (newValue) => {
    if (!newValue) return;
    avatarUrl.value =
      (await fileManagerStore.downloadFile({ id: newValue }, false)) || null;
  },
  { immediate: true }
);

const colors = [
  'primary3',
  'success4',
  'info4',
  'warning4',
  'purple3',
  'amber4',
  'lime4',
  'teal4',
  'pink4',
  'primary3',
  'success5',
  'info5',
  'warning5',
  'purple3',
  'amber5',
  'lime5',
  'teal5',
  'pink5',
  'info6',
  'success6',
  'warning6',
  'purple3',
  'amber6',
  'lime6',
  'teal6',
];
</script>

<style lang="scss">
.entity-summary-profile-container {
  [class^='v-skeleton-loader']:not(:has([class^='v-skeleton-loader'])) {
    background-color: #dfe5ef !important;
  }

  & [class^='v-skeleton-loader']:not(:has([class^='v-skeleton-loader'])) {
    background-color: #dfe5ef !important;
  }
}

.entity-summary-profile-container {
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>

<style scoped lang="scss">
.text-size-10 {
  font-size: 10px;
}

.w-content {
  max-width: fit-content !important;
}

.m-0 {
  margin: 0;
}

.padding-handle {
  padding: 6px 24px;
}

.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.entity-summary-profile-container {
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    0 10px 36px 0 rgba(17, 28, 45, 0.12) !important;
  padding: 0;

  &--grey-layout {
    height: 54px;
    margin: 0;
    border-radius: 10px 10px 0 0;
  }
}

.btn {
  &-link:hover {
    .btn {
      &--avatar {
        border: 1px solid rgb(var(--v-theme-primary5));
      }
      &--text {
        color: rgb(var(--v-theme-primary5));
      }
    }
  }
}

.profile-btn {
  &--icon {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  &:hover .profile-btn--icon {
    transform: translateX(-4px) !important;
  }
}

.call-btn--prepend-icon {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.call-btn--prepend-icon {
  transform: translateX(0);
}

.call-btn:hover .call-btn--prepend-icon {
  animation: phone-ring 0.8s ease-in-out;
  transform-origin: center bottom;
}

@keyframes phone-ring {
  0% {
    transform: rotate(0deg);
  }
  16% {
    transform: rotate(-10deg);
  }
  32% {
    transform: rotate(10deg);
  }
  48% {
    transform: rotate(-5deg);
  }
  64% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
