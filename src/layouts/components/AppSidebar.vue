<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 接收props
interface Props {
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

// 菜单数据
const menuItems = computed(() => [
  {
    key: 'dashboard',
    path: '/',
    icon: 'i-carbon-dashboard',
    title: t('menu.dashboard'),
    children: [],
  },
  {
    key: 'system',
    path: '/system',
    icon: 'i-carbon-settings',
    title: t('menu.system'),
    children: [
      {
        key: 'users',
        path: '/system/users',
        title: t('menu.users'),
      },
      {
        key: 'roles',
        path: '/system/roles',
        title: t('menu.roles'),
      },
    ],
  },
  {
    key: 'about',
    path: '/about',
    icon: 'i-carbon-information',
    title: t('menu.about'),
    children: [],
  },
])

// 当前激活的菜单
const activeKey = computed(() => {
  const path = route.path
  // 查找匹配的菜单项
  for (const item of menuItems.value) {
    if (item.path === path) return item.key
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) return child.key
      }
    }
  }
  return 'dashboard'
})

// 处理菜单点击
const handleMenuClick = (path: string) => {
  router.push(path)
}

// 侧边栏宽度
const sidebarWidth = computed(() => {
  return props.collapsed ? '64px' : '240px'
})
</script>

<template>
  <aside class="app-sidebar" :style="{ width: sidebarWidth }">
    <!-- 侧边栏内容 -->
    <div class="sidebar-content">
      <!-- 菜单列表 -->
      <nav class="sidebar-nav">
        <template v-for="item in menuItems" :key="item.key">
          <!-- 无子菜单的项目 -->
          <div
            v-if="!item.children || item.children.length === 0"
            class="nav-item"
            :class="{ 'is-active': activeKey === item.key }"
            @click="handleMenuClick(item.path)"
          >
            <i :class="item.icon" class="nav-icon" />
            <span v-if="!collapsed" class="nav-title">{{ item.title }}</span>
          </div>

          <!-- 有子菜单的项目 -->
          <div v-else class="nav-group">
            <div class="nav-group-title">
              <i :class="item.icon" class="nav-icon" />
              <span v-if="!collapsed" class="nav-title">{{ item.title }}</span>
            </div>
            <div v-if="!collapsed" class="nav-group-children">
              <div
                v-for="child in item.children"
                :key="child.key"
                class="nav-child"
                :class="{ 'is-active': activeKey === child.key }"
                @click="handleMenuClick(child.path)"
              >
                <span class="nav-child-title">{{ child.title }}</span>
              </div>
            </div>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  height: 100vh;
  background: var(--color-background);
  border-right: 1px solid var(--color-border);
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-nav {
  padding: 16px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text-2);
}

.nav-item:hover {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.nav-item.is-active {
  background: var(--color-brand);
  color: white;
}

.nav-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.nav-title {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
}

.nav-group {
  margin-bottom: 8px;
}

.nav-group-title {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--color-text-2);
  font-size: 14px;
  font-weight: 600;
}

.nav-group-children {
  padding-left: 16px;
}

.nav-child {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 2px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text-2);
}

.nav-child:hover {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.nav-child.is-active {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.nav-child-title {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
}

/* 折叠状态样式 */
.app-sidebar:has(.nav-item) {
  min-width: 64px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
