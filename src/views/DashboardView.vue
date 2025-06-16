<template>
  <div class="dashboard-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t('menu.dashboard') }}</h1>
      <p class="page-description">{{ $t('dashboard.welcome') }}</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <div class="i-carbon-user text-blue-500"></div>
        </div>
        <div class="stat-content">
          <div class="stat-value">1,234</div>
          <div class="stat-label">{{ $t('dashboard.totalUsers') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <div class="i-carbon-document text-green-500"></div>
        </div>
        <div class="stat-content">
          <div class="stat-value">5,678</div>
          <div class="stat-label">{{ $t('dashboard.totalOrders') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <div class="i-carbon-currency-dollar text-yellow-500"></div>
        </div>
        <div class="stat-content">
          <div class="stat-value">¥123,456</div>
          <div class="stat-label">{{ $t('dashboard.totalRevenue') }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <div class="i-carbon-chart-line text-purple-500"></div>
        </div>
        <div class="stat-content">
          <div class="stat-value">89.5%</div>
          <div class="stat-label">{{ $t('dashboard.growthRate') }}</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">{{ $t('dashboard.salesTrend') }}</h3>
        </div>
        <div class="chart-content">
          <div class="chart-placeholder">
            <div class="i-carbon-chart-line text-4xl text-gray-400"></div>
            <p class="text-gray-500">{{ $t('dashboard.chartPlaceholder') }}</p>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">{{ $t('dashboard.userActivity') }}</h3>
        </div>
        <div class="chart-content">
          <div class="chart-placeholder">
            <div class="i-carbon-chart-pie text-4xl text-gray-400"></div>
            <p class="text-gray-500">{{ $t('dashboard.chartPlaceholder') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="activity-section">
      <div class="section-header">
        <h3 class="section-title">{{ $t('dashboard.recentActivity') }}</h3>
      </div>
      <div class="activity-list">
        <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
          <div class="activity-icon">
            <div :class="activity.icon"></div>
          </div>
          <div class="activity-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-time">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 最近活动数据
const recentActivities = ref([
  {
    id: 1,
    title: t('dashboard.activity.userLogin'),
    time: '2 分钟前',
    icon: 'i-carbon-user text-blue-500',
  },
  {
    id: 2,
    title: t('dashboard.activity.orderCreated'),
    time: '5 分钟前',
    icon: 'i-carbon-shopping-cart text-green-500',
  },
  {
    id: 3,
    title: t('dashboard.activity.systemUpdate'),
    time: '10 分钟前',
    icon: 'i-carbon-update-now text-orange-500',
  },
  {
    id: 4,
    title: t('dashboard.activity.dataBackup'),
    time: '1 小时前',
    icon: 'i-carbon-cloud-backup text-purple-500',
  },
])
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background-color: var(--bg-color);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 16px;
  color: var(--text-color-secondary);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-color-secondary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
}

.chart-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.chart-content {
  padding: 40px 24px;
  height: 300px;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
}

.activity-section {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
}

.section-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.activity-list {
  padding: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background-color: var(--hover-bg);
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: var(--text-color-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .charts-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .stat-card {
    padding: 16px;
  }

  .chart-content {
    height: 250px;
    padding: 20px 16px;
  }
}
</style>
