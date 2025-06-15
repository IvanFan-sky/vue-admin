// 主题相关类型定义

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeConfig {
  mode: ThemeMode
  followSystem: boolean
  enableTransition: boolean
}

export interface ThemeColors {
  primary: string
  success: string
  warning: string
  danger: string
  info: string
  textPrimary: string
  textRegular: string
  textSecondary: string
  textPlaceholder: string
  bgColor: string
  bgPage: string
  borderColor: string
}

export interface ThemeState {
  currentTheme: 'light' | 'dark'
  config: ThemeConfig
  systemTheme: 'light' | 'dark'
  isTransitioning: boolean
}
