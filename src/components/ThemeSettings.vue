<template>
  <div class="theme-settings">
    <el-card header="主题设置">
      <!-- 主题模式选择 -->
      <div class="setting-item">
        <div class="setting-label">主题模式</div>
        <el-radio-group v-model="currentMode" @change="handleModeChange">
          <el-radio-button label="light">
            <el-icon><Sunny /></el-icon>
            浅色
          </el-radio-button>
          <el-radio-button label="dark">
            <el-icon><Moon /></el-icon>
            深色
          </el-radio-button>
          <el-radio-button label="auto">
            <el-icon><Monitor /></el-icon>
            自动
          </el-radio-button>
        </el-radio-group>
      </div>

      <!-- 跟随系统设置 -->
      <div class="setting-item">
        <div class="setting-label">跟随系统主题</div>
        <el-switch v-model="followSystem" @change="handleFollowSystemChange" />
      </div>

      <!-- 过渡动画设置 -->
      <div class="setting-item">
        <div class="setting-label">主题切换动画</div>
        <el-switch v-model="enableTransition" @change="handleTransitionChange" />
      </div>

      <!-- 当前状态显示 -->
      <div class="setting-item">
        <div class="setting-label">当前状态</div>
        <div class="status-info">
          <el-tag :type="isDark ? 'info' : 'warning'">
            {{ isDark ? '深色主题' : '浅色主题' }}
          </el-tag>
          <el-tag v-if="isAuto" type="success">
            跟随系统 ({{ systemTheme === 'dark' ? '深色' : '浅色' }})
          </el-tag>
        </div>
      </div>

      <!-- 预览区域 -->
      <div class="setting-item">
        <div class="setting-label">主题预览</div>
        <div class="theme-preview">
          <div class="preview-card">
            <div class="preview-header">
              <div class="preview-title">示例卡片</div>
              <div class="preview-actions">
                <el-button size="small" type="primary">主要按钮</el-button>
                <el-button size="small">次要按钮</el-button>
              </div>
            </div>
            <div class="preview-content">
              <p>这是一段示例文本，用于预览当前主题的效果。</p>
              <el-input placeholder="输入框示例" size="small" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import type { ThemeMode } from '@/types/theme'

const {
  isDark,
  isAuto,
  themeMode,
  systemTheme,
  isFollowingSystem,
  setThemeMode,
  setFollowSystem,
  setEnableTransition,
} = useTheme()

// 本地状态
const currentMode = ref<ThemeMode>(themeMode.value)
const followSystem = ref(isFollowingSystem.value)
const enableTransition = ref(true)

// 监听主题模式变化
watch(themeMode, (newMode) => {
  currentMode.value = newMode
})

// 监听跟随系统设置变化
watch(isFollowingSystem, (newValue) => {
  followSystem.value = newValue
})

// 处理模式变化
const handleModeChange = (mode: ThemeMode) => {
  setThemeMode(mode)
}

// 处理跟随系统变化
const handleFollowSystemChange = (value: boolean) => {
  setFollowSystem(value)
}

// 处理过渡动画变化
const handleTransitionChange = (value: boolean) => {
  setEnableTransition(value)
}
</script>

<style lang="scss" scoped>
.theme-settings {
  max-width: 500px;

  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      border-bottom: none;
    }

    .setting-label {
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .status-info {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
  }

  .theme-preview {
    width: 100%;
    margin-top: 8px;

    .preview-card {
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-base);
      background: var(--color-bg);
      overflow: hidden;

      .preview-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--color-bg-page);
        border-bottom: 1px solid var(--color-border);

        .preview-title {
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .preview-actions {
          display: flex;
          gap: 8px;
        }
      }

      .preview-content {
        padding: 16px;

        p {
          margin: 0 0 12px 0;
          color: var(--color-text-regular);
          line-height: 1.6;
        }
      }
    }
  }
}

:deep(.el-radio-button__inner) {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
