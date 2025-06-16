<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="app-main">
    <div class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>

<style scoped>
.app-main {
  flex: 1;
  overflow: auto;
  background: var(--color-background-mute);
}

.main-content {
  padding: 20px;
  min-height: 100%;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }
}
</style>
