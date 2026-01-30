<!-- layouts/default.vue -->
<template>
  <div>
    <header>
      <!-- هدر مشترک -->
    </header>

    <main>
      <slot />  <!-- محتوای هر صفحه اینجا رندر می‌شود -->
    </main>

    <footer>
      <!-- فوتر مشترک -->
    </footer>
  </div>
</template>

<script setup lang="ts">
// کدهای مشترک لایوت، مثل reactive یا composable ها
</script>
