<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 用户数据
interface User {
  id: number
  username: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: '超级管理员',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: '普通用户',
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    role: '普通用户',
    status: 'inactive',
    createdAt: '2024-01-03',
  },
])

// 搜索表单
const searchForm = reactive({
  username: '',
  email: '',
  status: '',
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: users.value.length,
})

// 搜索用户
const handleSearch = () => {
  console.log('搜索用户:', searchForm)
}

// 重置搜索
const handleReset = () => {
  Object.assign(searchForm, {
    username: '',
    email: '',
    status: '',
  })
}

// 添加用户
const handleAdd = () => {
  console.log('添加用户')
}

// 编辑用户
const handleEdit = (user: User) => {
  console.log('编辑用户:', user)
}

// 删除用户
const handleDelete = (user: User) => {
  console.log('删除用户:', user)
}

// 切换用户状态
const handleToggleStatus = (user: User) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
}
</script>

<template>
  <div class="users-view">
    <div class="page-header">
      <h1 class="page-title">{{ t('menu.users') }}</h1>
      <p class="page-description">管理系统用户信息</p>
    </div>

    <!-- 搜索表单 -->
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>用户名</label>
          <input
            v-model="searchForm.username"
            type="text"
            placeholder="请输入用户名"
            class="form-input"
          />
        </div>
        <div class="form-item">
          <label>邮箱</label>
          <input
            v-model="searchForm.email"
            type="email"
            placeholder="请输入邮箱"
            class="form-input"
          />
        </div>
        <div class="form-item">
          <label>状态</label>
          <select v-model="searchForm.status" class="form-select">
            <option value="">全部</option>
            <option value="active">启用</option>
            <option value="inactive">禁用</option>
          </select>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" @click="handleSearch">
            <i class="i-carbon-search" />
            搜索
          </button>
          <button class="btn btn-secondary" @click="handleReset">
            <i class="i-carbon-reset" />
            重置
          </button>
        </div>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="toolbar">
      <button class="btn btn-primary" @click="handleAdd">
        <i class="i-carbon-add" />
        添加用户
      </button>
    </div>

    <!-- 用户表格 -->
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <span class="status-badge" :class="user.status" @click="handleToggleStatus(user)">
                {{ user.status === 'active' ? '启用' : '禁用' }}
              </span>
            </td>
            <td>{{ user.createdAt }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon btn-edit" @click="handleEdit(user)" title="编辑">
                  <i class="i-carbon-edit" />
                </button>
                <button class="btn-icon btn-delete" @click="handleDelete(user)" title="删除">
                  <i class="i-carbon-trash-can" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <span class="pagination-info"> 共 {{ pagination.total }} 条记录 </span>
      <div class="pagination-controls">
        <button class="btn btn-sm" :disabled="pagination.current === 1">上一页</button>
        <span class="pagination-current">
          {{ pagination.current }} / {{ Math.ceil(pagination.total / pagination.pageSize) }}
        </span>
        <button
          class="btn btn-sm"
          :disabled="pagination.current >= Math.ceil(pagination.total / pagination.pageSize)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 8px;
}

.page-description {
  font-size: 14px;
  color: var(--color-text-2);
  margin: 0;
}

.search-form {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  align-items: end;
  flex-wrap: wrap;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.form-item label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.form-input,
.form-select {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 14px;
  background: var(--color-background);
  color: var(--color-text);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-brand);
}

.form-actions {
  display: flex;
  gap: 8px;
}

.toolbar {
  margin-bottom: 16px;
}

.table-container {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.data-table th {
  background: var(--color-background-soft);
  font-weight: 600;
  color: var(--color-text);
}

.data-table tbody tr:hover {
  background: var(--color-background-soft);
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-badge.active {
  background: var(--color-success-light);
  color: var(--color-success);
}

.status-badge.inactive {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.btn-edit:hover {
  background: var(--color-brand);
  color: white;
}

.btn-delete {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.btn-delete:hover {
  background: var(--color-danger);
  color: white;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.pagination-info {
  font-size: 14px;
  color: var(--color-text-2);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-current {
  font-size: 14px;
  color: var(--color-text);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-brand);
  color: white;
}

.btn-primary:hover {
  background: var(--color-brand-dark);
}

.btn-secondary {
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-background-mute);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-item {
    min-width: auto;
  }

  .table-container {
    overflow-x: auto;
  }

  .data-table {
    min-width: 600px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
