<template>
  <v-chip :color="color" :size="size" :style="dynamicStyle" class="justify-center">
    <v-icon v-if="prependIcon" :icon="prependIcon"></v-icon>
    <span class="truncated-chip" :class="textClass">
      {{ text }}
    </span>
    <v-icon v-if="appendIcon" :icon="appendIcon" class="ms-1"></v-icon>
  </v-chip>
</template>

<script setup>
const props = defineProps({
  text: String,
  textClass: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: "lime6",
  },
  size: {
    type: String,
    default: "x-small",
  },
  appendIcon: String,
  prependIcon: String,
  borderColor: String,
});

const dynamicStyle = computed(() => {
  const targetColor = props.borderColor || props.color;
  return {
    border: `1px solid rgb(var(--v-theme-${targetColor}))`,
  };
});
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
