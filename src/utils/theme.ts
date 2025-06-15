import type { ThemeMode } from '@/types/theme'

// 主题相关常量
export const THEME_KEY = 'vue-admin-theme'
export const THEME_MODE_KEY = 'vue-admin-theme-mode'
export const FOLLOW_SYSTEM_KEY = 'vue-admin-follow-system'

// 获取系统主题
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// 应用主题到DOM
export function applyTheme(theme: 'light' | 'dark') {
  const html = document.documentElement

  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark')
    html.classList.add('dark')
  } else {
    html.setAttribute('data-theme', 'light')
    html.classList.remove('dark')
  }
}

// 获取存储的主题配置
export function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'

  const stored = localStorage.getItem(THEME_MODE_KEY)
  if (stored && ['light', 'dark', 'auto'].includes(stored)) {
    return stored as ThemeMode
  }
  return 'auto'
}

// 存储主题配置
export function setStoredThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return

  localStorage.setItem(THEME_MODE_KEY, mode)
}

// 获取是否跟随系统主题
export function getStoredFollowSystem(): boolean {
  if (typeof window === 'undefined') return true

  const stored = localStorage.getItem(FOLLOW_SYSTEM_KEY)
  return stored !== 'false'
}

// 存储是否跟随系统主题
export function setStoredFollowSystem(follow: boolean) {
  if (typeof window === 'undefined') return

  localStorage.setItem(FOLLOW_SYSTEM_KEY, follow.toString())
}

// 计算实际应该使用的主题
export function calculateActualTheme(
  mode: ThemeMode,
  systemTheme: 'light' | 'dark',
): 'light' | 'dark' {
  if (mode === 'auto') {
    return systemTheme
  }
  return mode
}

// 添加主题切换过渡效果
export function enableThemeTransition() {
  const css = document.createElement('style')
  css.textContent = `
    *,
    *::before,
    *::after {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
  `
  document.head.appendChild(css)

  // 300ms后移除过渡效果，避免影响其他动画
  setTimeout(() => {
    document.head.removeChild(css)
  }, 300)
}

// 禁用主题切换过渡效果
export function disableThemeTransition() {
  const css = document.createElement('style')
  css.textContent = `
    *,
    *::before,
    *::after {
      transition: none !important;
    }
  `
  document.head.appendChild(css)

  // 强制重绘
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  document.body.offsetHeight

  setTimeout(() => {
    document.head.removeChild(css)
  }, 0)
}
