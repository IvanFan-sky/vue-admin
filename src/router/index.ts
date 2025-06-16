import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

// 定义路由类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
  children?: AppRouteRecordRaw[]
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    requiresAuth?: boolean
    roles?: string[]
  }
}

// 路由配置
const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: 'menu.dashboard',
          icon: 'i-carbon-dashboard',
        },
      },
      {
        path: '/system',
        name: 'System',
        redirect: '/system/users',
        meta: {
          title: 'menu.system',
          icon: 'i-carbon-settings',
        },
        children: [
          {
            path: '/system/users',
            name: 'SystemUsers',
            component: () => import('../views/system/UsersView.vue'),
            meta: {
              title: 'menu.users',
              requiresAuth: true,
              roles: ['admin', 'super_admin'],
            },
          },
          {
            path: '/system/roles',
            name: 'SystemRoles',
            component: () => import('../views/system/RolesView.vue'),
            meta: {
              title: 'menu.roles',
              requiresAuth: true,
              roles: ['admin', 'super_admin'],
            },
          },
        ],
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: 'menu.about',
          icon: 'i-carbon-information',
        },
      },
    ],
  },
  {
    // 404 页面必须放在最后
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404View.vue'),
    meta: {
      title: 'error.pageNotFound',
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 路由守卫基础框架
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    // 这里可以根据需要设置页面标题
    // document.title = `${t(to.meta.title)} - Vue Admin`
  }

  // 权限验证逻辑（基础框架，后续可扩展）
  if (to.meta?.requiresAuth) {
    // 检查用户是否已登录
    const isAuthenticated = true // 这里应该从状态管理中获取登录状态

    if (!isAuthenticated) {
      // 未登录，跳转到登录页
      // next('/login')
      console.warn('需要登录才能访问此页面')
      next()
    } else {
      // 检查角色权限
      const userRoles = ['admin'] // 这里应该从状态管理中获取用户角色
      const requiredRoles = to.meta.roles || []

      if (requiredRoles.length > 0 && !requiredRoles.some((role) => userRoles.includes(role))) {
        // 权限不足
        console.warn('权限不足，无法访问此页面')
        next('/403') // 可以创建一个403页面
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 路由切换完成后的处理
  console.log(`路由从 ${from.path} 切换到 ${to.path}`)
})

export default router

// 导出路由配置供其他地方使用
export { routes }
