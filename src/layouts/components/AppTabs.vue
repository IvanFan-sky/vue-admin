<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  Monitor,
  Setting,
  InfoFilled,
  User,
  UserFilled,
  Close,
  ArrowDown,
} from '@element-plus/icons-vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 标签页数据
interface TabItem {
  path: string
  title: string
  closable: boolean
  icon?: Component
}

const tabs = ref<TabItem[]>([
  {
    path: '/dashboard',
    title: t('menu.dashboard'),
    closable: false, // 首页不可关闭
    icon: Monitor,
  },
])

// 当前激活的标签页
const activeTab = computed(() => route.path)

// 标签页标题和图标映射
const tabTitleMap = computed(() => ({
  '/dashboard': t('menu.dashboard'),
  '/about': t('menu.about'),
  '/system': t('menu.system'),
  '/system/users': t('menu.users'),
  '/system/roles': t('menu.roles'),
}))

const tabIconMap: Record<string, Component> = computed(() => ({
  '/dashboard': Monitor,
  '/about': InfoFilled,
  '/system': Setting,
  '/system/users': User,
  '/system/roles': UserFilled,
}))

// 添加标签页
const addTab = (path: string) => {
  // 检查是否已存在
  const existingTab = tabs.value.find((tab) => tab.path === path)
  if (existingTab) return

  // 获取标题和图标
  const title = tabTitleMap.value[path] || path
  const icon = tabIconMap.value[path]

  // 添加新标签页
  tabs.value.push({
    path,
    title,
    closable: path !== '/dashboard', // 首页不可关闭
    icon,
  })
}

// 监听路由变化，自动添加标签页
watch(
  () => route.path,
  (newPath) => {
    addTab(newPath)
  },
  { immediate: true },
)

// 切换标签页
const switchTab = (path: string) => {
  if (path !== route.path) {
    router.push(path)
  }
}

// 关闭标签页
const closeTab = (targetPath: string, event: Event) => {
  event.stopPropagation()

  const targetIndex = tabs.value.findIndex((tab) => tab.path === targetPath)
  if (targetIndex === -1) return

  // 不能关闭首页
  if (targetPath === '/dashboard') return

  // 移除标签页
  tabs.value.splice(targetIndex, 1)

  // 如果关闭的是当前页面，需要跳转到其他页面
  if (targetPath === route.path) {
    const newActiveTab = tabs.value[Math.max(0, targetIndex - 1)]
    router.push(newActiveTab.path)
  }
}

// 关闭其他标签页
const closeOtherTabs = (keepPath: string) => {
  tabs.value = tabs.value.filter((tab) => tab.path === '/dashboard' || tab.path === keepPath)
  if (route.path !== keepPath && keepPath !== '/dashboard') {
    router.push(keepPath)
  }
}

// 关闭所有标签页（除首页）
const closeAllTabs = () => {
  tabs.value = tabs.value.filter((tab) => tab.path === '/dashboard')
  if (route.path !== '/dashboard') {
    router.push('/dashboard')
  }
}

// 右键菜单
const showContextMenu = ref(false)
const contextMenuTab = ref('')
const contextMenuPosition = ref({ x: 0, y: 0 })

// 显示右键菜单
const handleContextMenu = (event: MouseEvent, path: string) => {
  event.preventDefault()
  contextMenuTab.value = path
  contextMenuPosition.value = { x: event.clientX, y: event.clientY }
  showContextMenu.value = true
}

// 隐藏右键菜单
const hideContextMenu = () => {
  showContextMenu.value = false
}
</script>

<template>
  <div class="app-tabs" @click="hideContextMenu">
    <div class="tabs-content">
      <div class="tabs-list">
        <div
          v-for="tab in tabs"
          :key="tab.path"
          class="tab-item"
          :class="{ 'is-active': tab.path === activeTab }"
          @click="switchTab(tab.path)"
          @contextmenu="handleContextMenu($event, tab.path)"
        >
          <el-icon v-if="tab.icon" class="tab-icon">
            <component :is="tab.icon" />
          </el-icon>
          <span class="tab-title">{{ tab.title }}</span>
          <button
            v-if="tab.closable"
            class="tab-close"
            @click="closeTab(tab.path, $event)"
            :title="t('tabs.close')"
          >
            <el-icon>
              <Close />
            </el-icon>
          </button>
        </div>
      </div>

      <!-- 标签页操作按钮 -->
      <div class="tabs-actions">
        <el-dropdown trigger="click" placement="bottom-end">
          <button class="action-btn" :title="t('tabs.actions')">
            <el-icon>
              <ArrowDown />
            </el-icon>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="closeOtherTabs(activeTab)">
                <el-icon><Close /></el-icon>
                {{ t('tabs.closeOthers') }}
              </el-dropdown-item>
              <el-dropdown-item @click="closeAllTabs">
                <el-icon><Close /></el-icon>
                {{ t('tabs.closeAll') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 右键菜单 -->
    <Teleport to="body">
      <div
        v-if="showContextMenu"
        class="context-menu"
        :style="{
          left: contextMenuPosition.x + 'px',
          top: contextMenuPosition.y + 'px',
        }"
        @click.stop
      >
        <div class="context-menu-item" @click="closeTab(contextMenuTab, $event)">
          <el-icon><Close /></el-icon>
          <span>{{ t('tabs.close') }}</span>
        </div>
        <div class="context-menu-item" @click="closeOtherTabs(contextMenuTab)">
          <el-icon><Close /></el-icon>
          <span>{{ t('tabs.closeOthers') }}</span>
        </div>
        <div class="context-menu-item" @click="closeAllTabs">
          <el-icon><Close /></el-icon>
          <span>{{ t('tabs.closeAll') }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.app-tabs {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.tabs-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.tabs-list {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
}

.tab-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-bottom: none;
  margin-bottom: -1px;
  white-space: nowrap;
}

.tab-item:hover {
  background: var(--color-background-mute);
}

.tab-item.is-active {
  background: var(--color-background);
  color: var(--color-brand);
  border-color: var(--color-brand);
  border-bottom: 1px solid var(--color-background);
}

.tab-title {
  font-size: 13px;
  font-weight: 500;
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  color: var(--color-text-3);
  transition: all 0.2s ease;
}

.tab-close:hover {
  background: var(--color-background-mute);
  color: var(--color-text);
}

.tab-close i {
  font-size: 12px;
}

.tabs-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-2);
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.action-btn i {
  font-size: 14px;
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  z-index: 9999;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  min-width: 120px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  color: var(--color-text);
  transition: background-color 0.2s ease;
}

.context-menu-item:hover {
  background: var(--color-background-soft);
}

.context-menu-item i {
  font-size: 14px;
  color: var(--color-text-2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tabs-content {
    padding: 0 16px;
  }

  .tabs-actions {
    margin-left: 8px;
  }

  .tab-item {
    padding: 6px 8px;
  }

  .tab-title {
    font-size: 12px;
  }
}
</style>
