<template>
  <div class="theme-toggle">
    <!-- 简单切换按钮 -->
    <el-button v-if="mode === 'simple'" circle @click="toggleTheme" :loading="isTransitioning">
      <el-icon>
        <Sunny v-if="!isDark" />
        <Moon v-else />
      </el-icon>
    </el-button>

    <!-- 下拉选择器 -->
    <el-dropdown v-else-if="mode === 'dropdown'" @command="handleCommand">
      <el-button circle>
        <el-icon>
          <component :is="getThemeIcon()" />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="light" :class="{ active: themeMode === 'light' }">
            <el-icon><Sunny /></el-icon>
            <span>浅色主题</span>
          </el-dropdown-item>
          <el-dropdown-item command="dark" :class="{ active: themeMode === 'dark' }">
            <el-icon><Moon /></el-icon>
            <span>深色主题</span>
          </el-dropdown-item>
          <el-dropdown-item command="auto" :class="{ active: themeMode === 'auto' }">
            <el-icon><Monitor /></el-icon>
            <span>跟随系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 开关模式 -->
    <div v-else-if="mode === 'switch'" class="theme-switch">
      <el-icon><Sunny /></el-icon>
      <el-switch v-model="isDark" @change="toggleTheme" :loading="isTransitioning" />
      <el-icon><Moon /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import type { ThemeMode } from '@/types/theme'
import { Sunny, Moon, Monitor } from '@element-plus/icons-vue'

interface Props {
  mode?: 'simple' | 'dropdown' | 'switch'
  size?: 'large' | 'default' | 'small'
}

withDefaults(defineProps<Props>(), {
  mode: 'simple',
  size: 'default',
})

const { isDark, themeMode, isTransitioning, toggleTheme, setThemeMode } = useTheme()

// 获取主题图标
const getThemeIcon = () => {
  switch (themeMode.value) {
    case 'light':
      return Sunny
    case 'dark':
      return Moon
    case 'auto':
      return Monitor
    default:
      return Sunny
  }
}

// 处理下拉菜单命令
const handleCommand = (command: ThemeMode) => {
  setThemeMode(command)
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;

  .theme-switch {
    display: flex;
    align-items: center;
    gap: 8px;

    .el-icon {
      color: var(--color-text-secondary);
      transition: color var(--transition-base);
    }
  }
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;

  &.active {
    color: var(--color-primary);
    background-color: var(--color-primary-light-9);
  }
}
</style>
