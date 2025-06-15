import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ThemeMode, ThemeState } from '@/types/theme'
import {
  getSystemTheme,
  applyTheme,
  getStoredThemeMode,
  setStoredThemeMode,
  getStoredFollowSystem,
  setStoredFollowSystem,
  calculateActualTheme,
  enableThemeTransition,
} from '@/utils/theme'

// 全局主题状态
const themeState = ref<ThemeState>({
  currentTheme: 'light',
  config: {
    mode: 'auto',
    followSystem: true,
    enableTransition: true,
  },
  systemTheme: 'light',
  isTransitioning: false,
})

// 系统主题监听器
let mediaQueryList: MediaQueryList | null = null

export function useTheme() {
  // 初始化主题
  const initTheme = () => {
    if (typeof window === 'undefined') return

    // 获取系统主题
    themeState.value.systemTheme = getSystemTheme()

    // 获取存储的配置
    themeState.value.config.mode = getStoredThemeMode()
    themeState.value.config.followSystem = getStoredFollowSystem()

    // 计算当前主题
    const actualTheme = calculateActualTheme(
      themeState.value.config.mode,
      themeState.value.systemTheme,
    )

    // 应用主题
    themeState.value.currentTheme = actualTheme
    applyTheme(actualTheme)

    // 设置系统主题监听
    setupSystemThemeListener()
  }

  // 设置系统主题监听器
  const setupSystemThemeListener = () => {
    if (typeof window === 'undefined') return

    mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      themeState.value.systemTheme = e.matches ? 'dark' : 'light'

      // 如果当前是跟随系统模式，则更新主题
      if (themeState.value.config.mode === 'auto') {
        setTheme(themeState.value.systemTheme)
      }
    }

    // 添加监听器
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleSystemThemeChange)
    } else {
      // 兼容旧版本浏览器
      mediaQueryList.addListener(handleSystemThemeChange)
    }
  }

  // 移除系统主题监听器
  const removeSystemThemeListener = () => {
    if (!mediaQueryList) return

    const handleSystemThemeChange = () => {}

    if (mediaQueryList.removeEventListener) {
      mediaQueryList.removeEventListener('change', handleSystemThemeChange)
    } else {
      // 兼容旧版本浏览器
      mediaQueryList.removeListener(handleSystemThemeChange)
    }
  }

  // 设置主题
  const setTheme = (theme: 'light' | 'dark', withTransition = true) => {
    if (themeState.value.currentTheme === theme) return

    themeState.value.isTransitioning = true

    if (withTransition && themeState.value.config.enableTransition) {
      enableThemeTransition()
    }

    themeState.value.currentTheme = theme
    applyTheme(theme)

    setTimeout(() => {
      themeState.value.isTransitioning = false
    }, 300)
  }

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    themeState.value.config.mode = mode
    setStoredThemeMode(mode)

    const actualTheme = calculateActualTheme(mode, themeState.value.systemTheme)
    setTheme(actualTheme)
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = themeState.value.currentTheme === 'light' ? 'dark' : 'light'
    setThemeMode(newTheme)
  }

  // 设置是否跟随系统
  const setFollowSystem = (follow: boolean) => {
    themeState.value.config.followSystem = follow
    setStoredFollowSystem(follow)

    if (follow) {
      setThemeMode('auto')
    }
  }

  // 设置是否启用过渡动画
  const setEnableTransition = (enable: boolean) => {
    themeState.value.config.enableTransition = enable
  }

  // 计算属性
  const isDark = computed(() => themeState.value.currentTheme === 'dark')
  const isLight = computed(() => themeState.value.currentTheme === 'light')
  const isAuto = computed(() => themeState.value.config.mode === 'auto')
  const isFollowingSystem = computed(() => themeState.value.config.followSystem)

  // 生命周期
  onMounted(() => {
    initTheme()
  })

  onUnmounted(() => {
    removeSystemThemeListener()
  })

  return {
    // 状态
    themeState: readonly(themeState),

    // 计算属性
    isDark,
    isLight,
    isAuto,
    isFollowingSystem,
    currentTheme: computed(() => themeState.value.currentTheme),
    themeMode: computed(() => themeState.value.config.mode),
    systemTheme: computed(() => themeState.value.systemTheme),
    isTransitioning: computed(() => themeState.value.isTransitioning),

    // 方法
    setTheme,
    setThemeMode,
    toggleTheme,
    setFollowSystem,
    setEnableTransition,
    initTheme,
  }
}
