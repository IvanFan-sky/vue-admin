<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="about-view">
    <div class="page-header">
      <h1 class="page-title">{{ t('menu.about') }}</h1>
      <p class="page-description">{{ t('app.description') }}</p>
    </div>

    <div class="content-card">
      <h2>{{ t('app.title') }}</h2>
      <p>这是一个基于 Vue 3 + TypeScript + Vite 构建的现代化管理后台系统。</p>

      <div class="features">
        <h3>主要特性</h3>
        <ul>
          <li>🎨 现代化的 UI 设计</li>
          <li>🌙 支持亮色/暗色主题切换</li>
          <li>🌍 国际化支持（中英文）</li>
          <li>📱 响应式布局设计</li>
          <li>⚡ 基于 Vite 的快速开发体验</li>
          <li>🔧 完整的开发工具链配置</li>
        </ul>
      </div>

      <div class="tech-stack">
        <h3>技术栈</h3>
        <div class="tech-tags">
          <span class="tech-tag">Vue 3</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">Vue Router</span>
          <span class="tech-tag">Pinia</span>
          <span class="tech-tag">Vue I18n</span>
          <span class="tech-tag">UnoCSS</span>
          <span class="tech-tag">ESLint</span>
          <span class="tech-tag">Prettier</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 8px;
}

.page-description {
  font-size: 16px;
  color: var(--color-text-2);
  margin: 0;
}

.content-card {
  background: var(--color-background);
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-card h2 {
  color: var(--color-heading);
  margin-bottom: 16px;
}

.content-card p {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 24px;
}

.features,
.tech-stack {
  margin-bottom: 24px;
}

.features h3,
.tech-stack h3 {
  color: var(--color-heading);
  margin-bottom: 12px;
  font-size: 18px;
}

.features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features li {
  padding: 8px 0;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

.features li:last-child {
  border-bottom: none;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-brand-light);
  color: var(--color-brand);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>
