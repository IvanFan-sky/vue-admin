<template>
  <div class="dashboard-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t('menu.dashboard') }}</h1>
      <p class="page-description">{{ $t('dashboard.welcome') }}</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon" :style="{ backgroundColor: stat.color + '20', color: stat.color }">
          <el-icon :size="24">
            <component :is="stat.icon" />
          </el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-change" :class="stat.trend">
            {{ stat.change }}
          </div>
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
        <div class="activity-item" v-for="activity in activities" :key="activity.id">
          <div
            class="activity-icon"
            :style="{ backgroundColor: activity.color + '20', color: activity.color }"
          >
            <el-icon :size="16">
              <component :is="activity.icon" />
            </el-icon>
          </div>
          <div class="activity-content">
            <div class="activity-message">{{ activity.message }}</div>
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
import { User, ShoppingCart, Money, TrendCharts, Setting } from '@element-plus/icons-vue'

const { t } = useI18n()

// 统计数据
const stats = ref([
  {
    label: t('dashboard.stats.users'),
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: User,
    color: '#409eff',
  },
  {
    label: t('dashboard.stats.orders'),
    value: '5,678',
    change: '+8%',
    trend: 'up',
    icon: ShoppingCart,
    color: '#67c23a',
  },
  {
    label: t('dashboard.stats.revenue'),
    value: '$12,345',
    change: '+15%',
    trend: 'up',
    icon: Money,
    color: '#e6a23c',
  },
  {
    label: t('dashboard.stats.conversion'),
    value: '3.2%',
    change: '-2%',
    trend: 'down',
    icon: TrendCharts,
    color: '#f56c6c',
  },
])

// 最近活动
const activities = ref([
  {
    id: 1,
    type: 'user',
    message: t('dashboard.activity.newUser'),
    time: '2 分钟前',
    icon: User,
    color: '#409eff',
  },
  {
    id: 2,
    type: 'order',
    message: t('dashboard.activity.newOrder'),
    time: '5 分钟前',
    icon: ShoppingCart,
    color: '#67c23a',
  },
  {
    id: 3,
    type: 'system',
    message: t('dashboard.activity.systemUpdate'),
    time: '10 分钟前',
    icon: Setting,
    color: '#e6a23c',
  },
  {
    id: 4,
    type: 'user',
    message: t('dashboard.activity.userLogin'),
    time: '15 分钟前',
    icon: User,
    color: '#409eff',
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-color-secondary);
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
}

.stat-change.up {
  color: #67c23a;
  background: rgba(103, 194, 58, 0.1);
}

.stat-change.down {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.1);
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-message {
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
