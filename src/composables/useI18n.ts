import { ref, computed, watch, readonly } from 'vue'
import { useI18n as useVueI18n } from 'vue-i18n'
import type { Locale, LocaleInfo, I18nState } from '@/types/i18n'
import { availableLocales, setStoredLocale } from '@/locales'
import { setDayjsLocale, getElementLocale } from '@/utils/i18n'

// 全局国际化状态
const i18nState = ref<I18nState>({
  currentLocale: 'zh-CN',
  config: {
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN',
    availableLocales: ['zh-CN', 'en-US'],
  },
  isLoading: false,
})

export function useI18n() {
  const { locale, t, te, tm, rt, d, n } = useVueI18n()

  // 初始化当前语言
  i18nState.value.currentLocale = locale.value as Locale

  // 监听语言变化
  watch(locale, (newLocale) => {
    i18nState.value.currentLocale = newLocale as Locale
  })

  // 设置语言
  const setLocale = async (newLocale: Locale) => {
    if (i18nState.value.currentLocale === newLocale) return

    i18nState.value.isLoading = true

    try {
      // 设置 Vue I18n 语言
      locale.value = newLocale

      // 设置 dayjs 语言
      setDayjsLocale(newLocale)

      // 动态加载 Element Plus 语言包
      const elementLocale = await getElementLocale(newLocale)

      // 存储语言设置
      setStoredLocale(newLocale)

      // 更新状态
      i18nState.value.currentLocale = newLocale
      i18nState.value.config.locale = newLocale

      // 设置 HTML lang 属性
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale
      }

      return elementLocale.default
    } catch (error) {
      console.error('Failed to set locale:', error)
      throw error
    } finally {
      i18nState.value.isLoading = false
    }
  }

  // 切换语言
  const toggleLocale = async () => {
    const currentIndex = availableLocales.findIndex(
      (item) => item.code === i18nState.value.currentLocale,
    )
    const nextIndex = (currentIndex + 1) % availableLocales.length
    const nextLocale = availableLocales[nextIndex].code

    return await setLocale(nextLocale)
  }

  // 获取语言信息
  const getLocaleInfo = (localeCode: Locale): LocaleInfo | undefined => {
    return availableLocales.find((item) => item.code === localeCode)
  }

  // 获取当前语言信息
  const currentLocaleInfo = computed(() => {
    return getLocaleInfo(i18nState.value.currentLocale)
  })

  // 检查翻译是否存在
  const hasTranslation = (key: string): boolean => {
    return te(key)
  }

  // 安全翻译（如果翻译不存在则返回key）
  const safeT = (key: string, defaultValue?: string): string => {
    if (te(key)) {
      return t(key)
    }
    return defaultValue ?? key
  }

  // 翻译并格式化
  const tf = (key: string, values?: Record<string, unknown>): string => {
    return t(key, values)
  }

  // 计算属性
  const isLoading = computed(() => i18nState.value.isLoading)
  const currentLocale = computed(() => i18nState.value.currentLocale)
  const isZhCN = computed(() => i18nState.value.currentLocale === 'zh-CN')
  const isEnUS = computed(() => i18nState.value.currentLocale === 'en-US')

  return {
    // 状态
    i18nState: readonly(i18nState),

    // 计算属性
    currentLocale,
    currentLocaleInfo,
    isLoading,
    isZhCN,
    isEnUS,
    availableLocales,

    // Vue I18n 原生方法
    t,
    te,
    tm,
    rt,
    d,
    n,

    // 自定义方法
    setLocale,
    toggleLocale,
    getLocaleInfo,
    hasTranslation,
    safeT,
    tf,
  }
}
