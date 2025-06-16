<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelloWorld from '../components/HelloWorld.vue'

const { t } = useI18n()
</script>

<template>
  <div class="home-view">
    <div class="welcome-section">
      <h1 class="page-title">{{ t('menu.dashboard') }}</h1>
      <p class="page-description">{{ t('app.description') }}</p>
    </div>

    <div class="content-section">
      <HelloWorld msg="Welcome to Vue Admin!" />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 20px;
}

.welcome-section {
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

.content-section {
  background: var(--color-background);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
