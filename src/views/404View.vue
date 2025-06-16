<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-illustration">
        <div class="error-number">404</div>
        <div class="error-icon">
          <i class="i-carbon-warning-alt" />
        </div>
      </div>

      <div class="error-info">
        <h1 class="error-title">{{ t('error.pageNotFound') }}</h1>
        <p class="error-description">
          {{ t('error.pageNotFoundDesc') }}
        </p>

        <div class="error-actions">
          <button class="btn btn-primary" @click="goHome">
            <i class="i-carbon-home" />
            {{ t('common.backHome') }}
          </button>
          <button class="btn btn-secondary" @click="goBack">
            <i class="i-carbon-arrow-left" />
            {{ t('common.goBack') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--color-background);
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-illustration {
  position: relative;
  margin-bottom: 32px;
}

.error-number {
  font-size: 120px;
  font-weight: 700;
  color: var(--color-brand);
  line-height: 1;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--color-brand), var(--color-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-icon {
  font-size: 48px;
  color: var(--color-warning);
}

.error-icon i {
  font-size: inherit;
}

.error-info {
  margin-bottom: 32px;
}

.error-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 12px;
}

.error-description {
  font-size: 16px;
  color: var(--color-text-2);
  line-height: 1.6;
  margin-bottom: 32px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-brand);
  color: white;
}

.btn-primary:hover {
  background: var(--color-brand-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-background-mute);
  transform: translateY(-1px);
}

.btn i {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-number {
    font-size: 80px;
  }

  .error-title {
    font-size: 20px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
    justify-content: center;
  }
}
</style>
