<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 角色数据
interface Role {
  id: number
  name: string
  code: string
  description: string
  permissions: string[]
  userCount: number
  status: 'active' | 'inactive'
  createdAt: string
}

const roles = ref<Role[]>([
  {
    id: 1,
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    permissions: [
      'user:read',
      'user:write',
      'role:read',
      'role:write',
      'system:read',
      'system:write',
    ],
    userCount: 1,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: '管理员',
    code: 'admin',
    description: '拥有大部分管理权限',
    permissions: ['user:read', 'user:write', 'role:read', 'system:read'],
    userCount: 3,
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    name: '普通用户',
    code: 'user',
    description: '基础用户权限',
    permissions: ['user:read'],
    userCount: 15,
    status: 'active',
    createdAt: '2024-01-03',
  },
  {
    id: 4,
    name: '访客',
    code: 'guest',
    description: '只读权限',
    permissions: [],
    userCount: 0,
    status: 'inactive',
    createdAt: '2024-01-04',
  },
])

// 权限列表
const allPermissions = [
  { code: 'user:read', name: '用户查看' },
  { code: 'user:write', name: '用户管理' },
  { code: 'role:read', name: '角色查看' },
  { code: 'role:write', name: '角色管理' },
  { code: 'system:read', name: '系统查看' },
  { code: 'system:write', name: '系统管理' },
]

// 搜索表单
const searchForm = reactive({
  name: '',
  status: '',
})

// 分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: roles.value.length,
})

// 搜索角色
const handleSearch = () => {
  console.log('搜索角色:', searchForm)
}

// 重置搜索
const handleReset = () => {
  Object.assign(searchForm, {
    name: '',
    status: '',
  })
}

// 添加角色
const handleAdd = () => {
  console.log('添加角色')
}

// 编辑角色
const handleEdit = (role: Role) => {
  console.log('编辑角色:', role)
}

// 删除角色
const handleDelete = (role: Role) => {
  console.log('删除角色:', role)
}

// 切换角色状态
const handleToggleStatus = (role: Role) => {
  role.status = role.status === 'active' ? 'inactive' : 'active'
}

// 查看权限详情
const handleViewPermissions = (role: Role) => {
  console.log('查看权限:', role.permissions)
}

// 获取权限名称
const getPermissionName = (code: string) => {
  const permission = allPermissions.find((p) => p.code === code)
  return permission ? permission.name : code
}
</script>

<template>
  <div class="roles-view">
    <div class="page-header">
      <h1 class="page-title">{{ t('menu.roles') }}</h1>
      <p class="page-description">管理系统角色和权限</p>
    </div>

    <!-- 搜索表单 -->
    <div class="search-form">
      <div class="form-row">
        <div class="form-item">
          <label>角色名称</label>
          <input
            v-model="searchForm.name"
            type="text"
            placeholder="请输入角色名称"
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
        添加角色
      </button>
    </div>

    <!-- 角色表格 -->
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>角色名称</th>
            <th>角色代码</th>
            <th>描述</th>
            <th>权限</th>
            <th>用户数</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>
              <div class="role-name">
                <span class="name">{{ role.name }}</span>
                <span class="code">{{ role.code }}</span>
              </div>
            </td>
            <td>
              <code class="role-code">{{ role.code }}</code>
            </td>
            <td>
              <span class="description" :title="role.description">
                {{ role.description }}
              </span>
            </td>
            <td>
              <div class="permissions">
                <span
                  v-for="permission in role.permissions.slice(0, 2)"
                  :key="permission"
                  class="permission-tag"
                >
                  {{ getPermissionName(permission) }}
                </span>
                <span
                  v-if="role.permissions.length > 2"
                  class="permission-more"
                  @click="handleViewPermissions(role)"
                >
                  +{{ role.permissions.length - 2 }}
                </span>
              </div>
            </td>
            <td>
              <span class="user-count">{{ role.userCount }}</span>
            </td>
            <td>
              <span class="status-badge" :class="role.status" @click="handleToggleStatus(role)">
                {{ role.status === 'active' ? '启用' : '禁用' }}
              </span>
            </td>
            <td>{{ role.createdAt }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-icon btn-edit" @click="handleEdit(role)" title="编辑">
                  <i class="i-carbon-edit" />
                </button>
                <button
                  class="btn-icon btn-delete"
                  @click="handleDelete(role)"
                  title="删除"
                  :disabled="role.userCount > 0"
                >
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
.roles-view {
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

.role-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.role-name .name {
  font-weight: 500;
  color: var(--color-text);
}

.role-name .code {
  font-size: 12px;
  color: var(--color-text-2);
}

.role-code {
  background: var(--color-background-soft);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
}

.description {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: help;
}

.permissions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 200px;
}

.permission-tag {
  display: inline-block;
  padding: 2px 6px;
  background: var(--color-brand-light);
  color: var(--color-brand);
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.permission-more {
  display: inline-block;
  padding: 2px 6px;
  background: var(--color-background-mute);
  color: var(--color-text-2);
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.permission-more:hover {
  background: var(--color-brand-light);
  color: var(--color-brand);
}

.user-count {
  font-weight: 500;
  color: var(--color-text);
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

.btn-delete:hover:not(:disabled) {
  background: var(--color-danger);
  color: white;
}

.btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
    min-width: 800px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
