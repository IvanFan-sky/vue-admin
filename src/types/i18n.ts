// 国际化相关类型定义

export type Locale = 'zh-CN' | 'en-US'

export interface LocaleConfig {
  locale: Locale
  fallbackLocale: Locale
  availableLocales: Locale[]
}

export interface LocaleInfo {
  code: Locale
  name: string
  flag: string
  rtl?: boolean
}

export interface I18nState {
  currentLocale: Locale
  config: LocaleConfig
  isLoading: boolean
}

// 语言包结构类型
export interface MessageSchema {
  common: {
    confirm: string
    cancel: string
    save: string
    delete: string
    edit: string
    add: string
    search: string
    reset: string
    submit: string
    back: string
    next: string
    previous: string
    loading: string
    noData: string
    success: string
    error: string
    warning: string
    info: string
  }
  nav: {
    home: string
    about: string
    dashboard: string
    user: string
    system: string
    settings: string
  }
  theme: {
    light: string
    dark: string
    auto: string
    followSystem: string
    themeSettings: string
    enableTransition: string
    currentStatus: string
    preview: string
  }
  user: {
    login: string
    logout: string
    username: string
    password: string
    rememberMe: string
    forgotPassword: string
    profile: string
    settings: string
  }
  validation: {
    required: string
    email: string
    minLength: string
    maxLength: string
    pattern: string
  }
  message: {
    loginSuccess: string
    loginFailed: string
    logoutSuccess: string
    saveSuccess: string
    deleteSuccess: string
    operationFailed: string
    networkError: string
  }
}
