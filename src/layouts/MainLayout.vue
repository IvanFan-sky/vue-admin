<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppMain from './components/AppMain.vue'
import AppBreadcrumb from './components/AppBreadcrumb.vue'
import AppTabs from './components/AppTabs.vue'

// 侧边栏折叠状态
const isCollapsed = ref(false)

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="main-layout">
    <!-- 侧边栏 -->
    <AppSidebar :collapsed="isCollapsed" class="layout-sidebar" />

    <!-- 主内容区域 -->
    <div class="layout-content" :class="{ 'is-collapsed': isCollapsed }">
      <!-- 顶部导航 -->
      <AppHeader @toggle-sidebar="toggleSidebar" class="layout-header" />

      <!-- 面包屑导航 -->
      <AppBreadcrumb class="layout-breadcrumb" />

      <!-- 标签页导航 -->
      <AppTabs class="layout-tabs" />

      <!-- 主要内容 -->
      <AppMain class="layout-main" />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.layout-sidebar {
  flex-shrink: 0;
  transition: width 0.3s ease;
}

.layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.3s ease;
}

.layout-header {
  flex-shrink: 0;
  z-index: 100;
}

.layout-breadcrumb {
  flex-shrink: 0;
}

.layout-tabs {
  flex-shrink: 0;
}

.layout-main {
  flex: 1;
  overflow: auto;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .layout-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .layout-sidebar:not(.is-collapsed) {
    transform: translateX(0);
  }

  .layout-content {
    margin-left: 0 !important;
  }
}
</style>
