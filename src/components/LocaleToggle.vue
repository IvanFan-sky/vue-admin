<template>
  <div class="locale-toggle">
    <el-button @click="toggleLanguage">
      {{ currentLocale.flag }} {{ currentLocale.name }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const locales = [
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
]

const currentLocale = computed(() => locales.find((l) => l.code === locale.value) || locales[0])

const toggleLanguage = () => {
  const currentIndex = locales.findIndex((l) => l.code === locale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  locale.value = locales[nextIndex].code

  // 存储到localStorage
  localStorage.setItem('vue-admin-locale', locale.value)
}
</script>

<style lang="scss" scoped>
.locale-toggle {
  display: inline-flex;
  align-items: center;

  .locale-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .locale-flag {
      font-size: 16px;
    }

    .locale-name {
      font-size: 14px;
    }
  }
}

:deep(.el-dropdown-menu__item) {
  &.active {
    color: var(--color-primary);
    background-color: var(--color-primary-light-9);
  }
}

:deep(.el-select-dropdown__item) {
  .locale-item {
    width: 100%;
  }
}
</style>
