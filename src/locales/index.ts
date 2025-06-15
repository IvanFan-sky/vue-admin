import { createI18n } from 'vue-i18n'
import type { Locale, LocaleInfo } from '@/types/i18n'

// 导入语言包
import zhCN from './zh-CN'
import enUS from './en-US'

// 可用语言列表
export const availableLocales: LocaleInfo[] = [
  {
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳',
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸',
  },
]

// 语言包映射
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

// 获取浏览器语言
export function getBrowserLocale(): Locale {
  const browserLang = navigator.language || navigator.languages[0]

  // 匹配支持的语言
  for (const locale of availableLocales) {
    if (browserLang.startsWith(locale.code) || browserLang.startsWith(locale.code.split('-')[0])) {
      return locale.code
    }
  }

  // 默认返回中文
  return 'zh-CN'
}

// 获取存储的语言设置
export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-CN'

  const stored = localStorage.getItem('vue-admin-locale')
  if (stored && availableLocales.some((locale) => locale.code === stored)) {
    return stored as Locale
  }

  // 如果没有存储的语言，使用浏览器语言
  return getBrowserLocale()
}

// 存储语言设置
export function setStoredLocale(locale: Locale) {
  if (typeof window === 'undefined') return

  localStorage.setItem('vue-admin-locale', locale)
}

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: getStoredLocale(),
  fallbackLocale: 'zh-CN',
  messages,
  globalInjection: true, // 全局注入 $t 函数
  silentTranslationWarn: true, // 静默翻译警告
  silentFallbackWarn: true, // 静默回退警告
})

// 导出默认实例
export default i18n

// 导出类型
export type { Locale, LocaleInfo }
export { messages }
