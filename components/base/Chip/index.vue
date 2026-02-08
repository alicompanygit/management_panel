<template>
  <v-chip
    :color="color"
    :size="size"
    :style="borderStyle"
    class="justify-center"
    :variant="variant"
  >
    <v-icon v-if="icon" :icon="icon" :class="iconClass" class="me-1"></v-icon>
    <v-avatar
      v-if="img || char"
      class="me-1"
      :color="variant === 'flat' ? 'secondary4' : color"
    >
      <v-img v-if="img" :src="img"></v-img>
      <span v-else :style="charStyle">{{ char }}</span>
    </v-avatar>
    <span v-text="text" :class="textClass" />
    <v-icon v-if="appendIcon" :icon="appendIcon" class="ms-1"></v-icon>
    <v-icon
      v-if="clearable"
      icon="solar:close-circle-bold"
      class="ms-1"
      @click.stop="clearItem"
    ></v-icon>
  </v-chip>
</template>

<script setup>
import { useTheme } from 'vuetify';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  textClass: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'small',
  },
  variant: {
    type: String,
    default: 'tonal',
  },
  icon: String,
  appendIcon: String,
  img: String,
  char: String,
  clearable: Boolean,
  maxWidth: String,
});

const emit = defineEmits(['click:clear']);

const theme = useTheme();
const borderStyle = computed(() => {
  if (props.variant !== 'tonal') return {};
  return {
    border: `1px solid rgba(${props.color}, .3)`,
  };
});

const charStyle = computed(() => {
  return {
    color:
      props.variant === 'flat' ? 'rgb(var(--v-theme-secondary7))' : 'white',
  };
});

const clearItem = () => {
  emit('click:clear');
};
</script>

<style scoped>
.truncated-chip {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  margin-top: 2px;
  max-width: 100%;
}
</style>
