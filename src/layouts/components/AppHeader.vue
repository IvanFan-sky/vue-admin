<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'

const { t } = useI18n()

// 定义事件
const emit = defineEmits<{
  toggleSidebar: []
}>()

// 切换侧边栏
const handleToggleSidebar = () => {
  emit('toggleSidebar')
}
</script>

<template>
  <header class="app-header">
    <!-- 左侧区域 -->
    <div class="header-left">
      <!-- 菜单切换按钮 -->
      <button
        class="sidebar-toggle"
        @click="handleToggleSidebar"
        :title="t('layout.toggleSidebar')"
      >
        <i class="i-carbon-menu" />
      </button>

      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Logo" class="logo-img" />
        <span class="logo-text">{{ t('app.title') }}</span>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="header-right">
      <!-- 控制按钮组 -->
      <div class="controls">
        <ThemeToggle mode="button" />
        <LocaleToggle mode="button" />
      </div>

      <!-- 用户信息 -->
      <div class="user-info">
        <div class="user-avatar">
          <i class="i-carbon-user-avatar" />
        </div>
        <span class="user-name">{{ t('user.admin') }}</span>
        <i class="i-carbon-chevron-down" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background: var(--color-background-soft);
}

.sidebar-toggle i {
  font-size: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-heading);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-info:hover {
  background: var(--color-background-soft);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-background-mute);
  color: var(--color-text-2);
}

.user-avatar i {
  font-size: 18px;
}

.user-name {
  font-size: 14px;
  color: var(--color-text);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }

  .logo-text {
    display: none;
  }

  .user-name {
    display: none;
  }

  .controls {
    gap: 4px;
  }
}
</style>
