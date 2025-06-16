// import type { MessageSchema } from '../types/i18n'

export default {
  // 应用信息
  app: {
    title: 'Vue 管理后台',
    description: '基于 Vue 3 + TypeScript + Vite 的现代化管理后台系统',
  },

  // 导航菜单
  nav: {
    home: '首页',
    about: '关于',
  },

  // 菜单
  menu: {
    dashboard: '仪表盘',
    system: '系统管理',
    users: '用户管理',
    roles: '角色管理',
    about: '关于系统',
  },

  // 布局相关
  layout: {
    toggleSidebar: '切换侧边栏',
  },

  // 用户相关
  user: {
    admin: '管理员',
    profile: '个人资料',
    logout: '退出登录',
  },

  // 标签页
  tabs: {
    close: '关闭',
    closeOthers: '关闭其他',
    closeAll: '关闭所有',
  },

  // 主题相关
  theme: {
    light: '浅色主题',
    dark: '深色主题',
    auto: '跟随系统',
    toggle: '切换主题',
  },

  // 语言相关
  language: {
    zh: '中文',
    en: 'English',
    toggle: '切换语言',
  },

  // 错误页面
  error: {
    pageNotFound: '页面未找到',
    pageNotFoundDesc: '抱歉，您访问的页面不存在或已被移除。',
  },

  // 通用按钮
  common: {
    backHome: '返回首页',
    goBack: '返回上一页',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    add: '添加',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    close: '关闭',
    loading: '加载中...',
    noData: '暂无数据',
    operation: '操作',
    status: '状态',
    createTime: '创建时间',
    updateTime: '更新时间',
    remark: '备注',
  },
  dashboard: {
    welcome: '欢迎使用管理系统',
    totalUsers: '总用户数',
    totalOrders: '总订单数',
    totalRevenue: '总收入',
    growthRate: '增长率',
    salesTrend: '销售趋势',
    userActivity: '用户活动',
    recentActivity: '最近活动',
    chartPlaceholder: '图表数据加载中...',
    activity: {
      userLogin: '用户登录',
      orderCreated: '创建订单',
      systemUpdate: '系统更新',
      dataBackup: '数据备份',
    },
  },

  // 时间格式
  datetime: {
    now: '刚刚',
    minutesAgo: '{n} 分钟前',
    hoursAgo: '{n} 小时前',
    daysAgo: '{n} 天前',
    monthsAgo: '{n} 个月前',
    yearsAgo: '{n} 年前',
  },
}
