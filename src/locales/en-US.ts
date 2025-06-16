// import type { MessageSchema } from '../types/i18n'

export default {
  // 应用信息
  app: {
    title: 'Vue Admin',
    description: 'Modern admin dashboard built with Vue 3 + TypeScript + Vite',
  },

  // 导航菜单
  nav: {
    home: 'Home',
    about: 'About',
  },

  // 菜单
  menu: {
    dashboard: 'Dashboard',
    system: 'System',
    users: 'Users',
    roles: 'Roles',
    about: 'About',
  },

  // 布局相关
  layout: {
    toggleSidebar: 'Toggle Sidebar',
  },

  // 用户相关
  user: {
    admin: 'Admin',
    profile: 'Profile',
    logout: 'Logout',
  },

  // 标签页
  tabs: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All',
  },

  // 主题相关
  theme: {
    light: 'Light Theme',
    dark: 'Dark Theme',
    auto: 'Follow System',
    toggle: 'Toggle Theme',
  },

  // 语言相关
  language: {
    zh: '中文',
    en: 'English',
    toggle: 'Switch Language',
  },

  // 错误页面
  error: {
    pageNotFound: 'Page Not Found',
    pageNotFoundDesc: 'Sorry, the page you are looking for does not exist or has been removed.',
  },

  // 通用按钮
  common: {
    backHome: 'Back to Home',
    goBack: 'Go Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    close: 'Close',
    back: 'Back',
    loading: 'Loading...',
    noData: 'No Data',
    operation: 'Operation',
    status: 'Status',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    remark: 'Remark',
  },

  dashboard: {
    welcome: 'Welcome to Admin System',
    totalUsers: 'Total Users',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    growthRate: 'Growth Rate',
    salesTrend: 'Sales Trend',
    userActivity: 'User Activity',
    recentActivity: 'Recent Activity',
    chartPlaceholder: 'Chart data loading...',
    activity: {
      userLogin: 'User Login',
      orderCreated: 'Order Created',
      systemUpdate: 'System Update',
      dataBackup: 'Data Backup',
    },
  },

  // 时间格式
  datetime: {
    now: 'Just now',
    minutesAgo: '{n} minutes ago',
    hoursAgo: '{n} hours ago',
    daysAgo: '{n} days ago',
    monthsAgo: '{n} months ago',
    yearsAgo: '{n} years ago',
  },
}
