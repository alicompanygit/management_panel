<template>
  <div v-if="canTeleport">
    <Teleport to=".v-application">
      <div :class="customClass" ref="drawerContainerRef">
        <v-navigation-drawer
          app
          temporary
          elevation="10"
          :model-value="modelValue"
          :width="width"
          rounded="md"
          scrim
          class="custom-navigation"
          @update:modelValue="closeDrawer()"
          :location="$vuetify.display.mobile ? 'bottom' : 'left'"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
          :persistent="persistent"
        >
          <div class="mobile-line" v-if="$vuetify.display.mobile" />
          <div class="d-flex justify-space-between pa-4">
            <div class="d-flex align-center">
              <slot name="icon" />
              <span class="drawer-title ms-2">
                {{ $t(title) }}
              </span>
            </div>
            <div>
              <slot name="header-text" />
              <v-icon
                icon="material-symbols-light:close-small-outline-rounded"
                class="close-btn"
                size="28"
                bgColor="grey1"
                color="grey4"
                @click="emit('close')"
              />
            </div>
          </div>
          <v-divider />
          <slot name="fix-content" />
          <perfect-scrollbar
            style="height: calc(100vh - 200px)"
            @touchstart.stop
            @touchmove.stop
            @touchend.stop
          >
            <slot name="content" />
          </perfect-scrollbar>

          <template v-slot:append>
            <v-divider />
            <slot name="footer" />
          </template>
        </v-navigation-drawer>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'close']);

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: {
    type: String,
    default: '500',
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
  },
});

const drawerContainerRef = ref();
const navigationDrawerElement = ref();
const initialModalTop = ref(0);

function initDrawerElement() {
  if (!drawerContainerRef.value) return;

  navigationDrawerElement.value = drawerContainerRef.value.querySelector(
    '.v-navigation-drawer'
  );
  if (navigationDrawerElement.value)
    initialModalTop.value = parseInt(
      getComputedStyle(navigationDrawerElement.value).top
    );
}
const closeDrawer = () => {
  emit('update:modelValue', false);
  emit('close');
};

const dragStartY = ref(0);
const deltaY = ref(0);
const directionY = ref('stay'); // stay up down

// for closing the drawer on fast touch
const touchStartTime = ref(0);

function setDirectionY(direction) {
  directionY.value = direction;
}

watch(deltaY, (nVal, oVal) => {
  if (oVal >= nVal) setDirectionY('up');
  else setDirectionY('down');
});

const startDrag = (event) => {
  dragStartY.value = event.touches[0].clientY;
  touchStartTime.value = event.timeStamp;
};

const onDrag = async (event) => {
  // prevent refreshing the page
  event.preventDefault();

  const currentY = event.touches[0].clientY;
  deltaY.value = currentY - dragStartY.value;

  // if (deltaY.value > 0)
  //   navigationDrawerElement.value.style.top = initialModalTop.value + deltaY.value + 'px'

  if (deltaY.value > 0) {
    navigationDrawerElement.value.style.transform = `translateY(${((initialModalTop.value + deltaY.value) * 100) / window.innerHeight}%)`;
    navigationDrawerElement.value.style.transition = 'transform .1s linear';
  }
};

const endDrag = (event) => {
  if (!navigationDrawerElement.value) return;
  const duration = event.timeStamp - touchStartTime.value;

  if (directionY.value === 'down' && deltaY.value > 60) {
    emit('update:modelValue', false);
    emit('close');
    // navigationDrawerElement.value.style.top = '100%'
    directionY.value = 'stay';
    dragStartY.value = 0;
  } else {
    navigationDrawerElement.value.style.transform = 'translateY(0%)';
  }
  navigationDrawerElement.value.style.transition = 'transform .3s ease-in-out';
};

const getScrollableElement = () => {
  const scrollableElement = document.querySelector('#scroll-container');
  return scrollableElement;
};

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    const scrollableElement = getScrollableElement();
    if (newVal) {
      scrollableElement?.classList.add('no-scroll');
    } else {
      scrollableElement?.classList.remove('no-scroll');
    }
  },
  { deep: true }
);

const canTeleport = ref(false);
onMounted(() => {
  initDrawerElement();
  const target = document.querySelector('.v-application');
  if (target) {
    canTeleport.value = true;
  }
});
</script>

<style scoped lang="scss">
.custom-navigation {
  z-index: 1400 !important;
  left: 0 !important;
  top: 40px;
  border-radius: 22px 22px 0 0 !important;
  transition: transform 0.3s ease-in-out;

  @media screen and (min-width: 1279px) {
    top: 20px !important;
    height: 96vh !important;
    border-radius: 22px !important;

    &.v-navigation-drawer--active {
      margin-left: 2vh !important;
    }
  }
}

.v-navigation-drawer__scrim {
  position: fixed !important;
  z-index: 1300 !important;
}

.mobile-line {
  width: 48px;
  height: 4px;
  border-radius: 12px;
  margin: 15px auto 0 auto;
  background: rgb(var(--v-theme-grey3));
}

.drawer-title {
  color: rgb(var(--v-theme-grey6));
  font-size: 14px;
  font-weight: 600;
}
</style>
<style scoped lang="scss">
.custom-navigation ::v-deep(.v-navigation-drawer__content),
.custom-navigation ::v-deep(.v-navigation-drawer__append) {
  background-color: #26262c !important;
  color: #fff !important;
  border-color: #444 !important;
}

.custom-navigation ::v-deep(.v-navigation-drawer__content) {
  border-radius: 10px 10px 0 0;
}

.custom-navigation ::v-deep(.v-navigation-drawer__append) {
  border-radius: 0 0 10px 10px;
}
</style>
