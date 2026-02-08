<template>
  <v-btn
    :variant="variant"
    :color="color"
    :size="size"
    :loading="loading"
    :class="{ 'top-button': isTop }"
    :disabled="disabled"
    :density="density"
    flat
    :style="shadowStyle"
    :type
    :min-width="width ? width : '64px'"
    :width="width ? width : 'auto'"
  >
    <span>
      <v-icon
        v-if="
          (icon && iconLocation === 'right') ||
          (secondIcon && secondIconLocation === 'right')
        "
        :color="iconColor"
        :icon="secondIcon && secondIconLocation === 'right' ? secondIcon : icon"
        :size="
          secondIconSize && secondIconLocation === 'right'
            ? secondIconSize
            : iconSize
        "
        :class="`${disabled ? '' : 'cursor-pointer'} mr-${secondIconGap && secondIconLocation === 'right' ? secondIconGap : iconGap}`"
      ></v-icon>
      <span v-if="name" :class="[textSizeClass, textColor]">
        {{ $t(name) }}
      </span>
      <slot name="secondIcon" />
      <v-icon
        v-if="
          (icon && iconLocation === 'center') ||
          (secondIcon && secondIconLocation === 'center')
        "
        :icon="
          secondIcon && secondIconLocation === 'center' ? secondIcon : icon
        "
        :size="
          secondIconSize && secondIconLocation === 'center'
            ? secondIconSize
            : iconSize
        "
        class="cursor-pointer"
      >
      </v-icon>
      <v-icon
        v-if="
          (icon && iconLocation === 'left') ||
          (secondIcon && secondIconLocation === 'left')
        "
        :icon="secondIcon && secondIconLocation === 'left' ? secondIcon : icon"
        :size="
          secondIconSize && secondIconLocation === 'left'
            ? secondIconSize
            : iconSize
        "
        :class="`cursor-pointer ml-${secondIconGap && secondIconLocation === 'left' ? secondIconGap : iconGap}`"
      ></v-icon>
    </span>
    <slot />
  </v-btn>
</template>

<script setup>
import { useTheme } from 'vuetify';

const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },
  name: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  secondIcon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'elevated',
  },
  iconLocation: {
    type: String,
    default: 'right',
  },
  secondIconLocation: {
    type: String,
    default: 'left',
  },
  iconColor: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '24',
  },
  secondIconSize: {
    type: String,
  },
  iconGap: {
    type: String,
    default: '2',
  },
  secondIconGap: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  density: {
    type: String,
    default: 'default',
  },
  width: String,
  isTop: Boolean,
  type: {
    type: String,
    default: 'button',
  },
  enterKey: {
    type: Boolean,
    default: false,
  },
  textSizeClass: {
    type: String,
    default: 'text-body3',
  },
});

const theme = useTheme();
const shadowStyle = computed(() => {
  if (props.variant !== 'elevated') return {};
  const rgb = props.color || '#000000';

  if (!rgb) return {};

  return {
    boxShadow: `0px 10px 32px -4px rgba(${rgb}, 0.3), 0px 6px 14px -6px rgba(${rgb}, 0.12)`,
  };
});

const emit = defineEmits('handleEnter');

const handleClick = () => {
  emit('handleEnter');
};

const handleEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (props.enterKey) {
      const modalList = Array.from(
        document.querySelectorAll('.v-overlay--active')
      );
      const drawerList = Array.from(
        document.querySelectorAll('.v-navigation-drawer--active')
      )?.find((item) => {
        return item.offsetWidth > 350;
      });
      if (!drawerList && modalList.length == 0) handleClick();
    }
  }
};

onMounted(() => {
  if (props.enterKey) window.addEventListener('keydown', handleEnter);
});

onUnmounted(() => {
  if (props.enterKey) window.removeEventListener('keydown', handleEnter);
});
</script>

<style scoped>
.size-style {
  font-size: 13px;
  font-weight: 400;
}
.w-80 {
  width: 80px;
}
</style>
