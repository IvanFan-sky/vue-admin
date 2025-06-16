<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 面包屑映射
const breadcrumbMap = computed(() => ({
  '/dashboard': { title: t('menu.dashboard'), icon: 'i-carbon-home' },
  '/about': { title: t('menu.about'), icon: 'i-carbon-information' },
  '/system': { title: t('menu.system'), icon: 'i-carbon-settings' },
  '/system/users': { title: t('menu.users'), icon: 'i-carbon-user' },
  '/system/roles': { title: t('menu.roles'), icon: 'i-carbon-user-role' },
}))

// 生成面包屑路径
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const items = []

  // 如果是仪表盘页面，只显示仪表盘
  if (route.path === '/dashboard' || route.path === '/') {
    items.push({
      path: '/dashboard',
      title: breadcrumbMap.value['/dashboard']?.title || t('menu.dashboard'),
      icon: breadcrumbMap.value['/dashboard']?.icon,
    })
  } else {
    // 其他页面根据路径层级生成面包屑，不包含仪表盘
    let currentPath = ''
    paths.forEach((path) => {
      currentPath += `/${path}`
      const breadcrumb = breadcrumbMap.value[currentPath]
      if (breadcrumb) {
        items.push({
          path: currentPath,
          title: breadcrumb.title,
          icon: breadcrumb.icon,
        })
      }
    })
  }

  return items
})

// 处理面包屑点击
const handleBreadcrumbClick = (path: string) => {
  if (path !== route.path) {
    router.push(path)
  }
}
</script>

<template>
  <div class="app-breadcrumb">
    <div class="breadcrumb-content">
      <template v-for="(item, _index) in breadcrumbs" :key="item.path">
        <!-- 分隔符 -->
        <i v-if="_index > 0" class="breadcrumb-separator i-carbon-chevron-right" />

        <!-- 面包屑项 -->
        <div
          class="breadcrumb-item"
          :class="{
            'is-current': _index === breadcrumbs.length - 1,
            'is-clickable': _index < breadcrumbs.length - 1,
          }"
          @click="handleBreadcrumbClick(item.path)"
        >
          <i v-if="item.icon" :class="item.icon" class="breadcrumb-icon" />
          <span class="breadcrumb-title">{{ item.title }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.app-breadcrumb {
  padding: 12px 20px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-separator {
  font-size: 12px;
  color: var(--color-text-3);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.breadcrumb-item.is-clickable {
  cursor: pointer;
  color: var(--color-text-2);
}

.breadcrumb-item.is-clickable:hover {
  background: var(--color-background-soft);
  color: var(--color-text);
}

.breadcrumb-item.is-current {
  color: var(--color-brand);
  font-weight: 500;
}

.breadcrumb-icon {
  font-size: 14px;
}

.breadcrumb-title {
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-breadcrumb {
    padding: 8px 16px;
  }

  .breadcrumb-item {
    font-size: 13px;
  }

  .breadcrumb-icon {
    font-size: 13px;
  }
}
</style>
