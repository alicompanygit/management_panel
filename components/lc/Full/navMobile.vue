<template>
    <div 
        style="user-select: none;"
        class="d-flex px-3 py-2 mx-1 mt-3" 
        :class="{
            'active-bg': customizer.activeParent == item.title, 
            'active-clicked-bg': customizer.parentHovered == item.title
        }" 
        v-if="item.permission"
        @click.stop="(event) => handleClick(item, event)"
    >
        <Icon
            :icon="'solar:' + item.icon"
            height="24"
            width="24"
            :level="level"
            :class="
                'position-relative z-index-2 texthover-' + item.BgColor
            "
        />
        <span class="item px-1">{{ $t(item.title) }}</span>
    </div>
</template>

<script setup>
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();

import { Icon } from "@iconify/vue";

const emit = defineEmits(['clickOnNav']);

const handleClick = (item, event) => {
    customizer.selectedItem = []
    customizer.parentHovered = ""
    setTimeout(() => {
        emit("clickOnNav", {item: item, event: event});
    }, 0);
}

const props = defineProps({
    item: {
        type: Object,
        default: {},
    }
})
</script>

<style scoped>
.active-bg {
  background-color: rgba(var(--v-theme-primary),20%);
  border-radius: 12px;
}

.active-clicked-bg {
  background-color: rgba(var(--v-theme-secondary),20%);
  border-radius: 8px;
  padding: 0 10px;
  transition: 0.5s;
}
</style>