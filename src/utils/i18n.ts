import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import type { Locale } from '@/types/i18n'

// 扩展dayjs插件
dayjs.extend(relativeTime)

// 类型别名
type DateInput = string | Date | dayjs.Dayjs

// dayjs 语言映射
const dayjsLocaleMap: Record<Locale, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
}

// 设置 dayjs 语言
export function setDayjsLocale(locale: Locale) {
  const dayjsLocale = dayjsLocaleMap[locale]
  if (dayjsLocale) {
    dayjs.locale(dayjsLocale)
  }
}

// 格式化日期
export function formatDate(date: DateInput, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

// 格式化日期时间
export function formatDateTime(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

// 相对时间
export function formatRelativeTime(date: DateInput) {
  return dayjs(date).fromNow()
}

// 格式化数字
export function formatNumber(num: number, locale: Locale = 'zh-CN') {
  return new Intl.NumberFormat(locale).format(num)
}

// 格式化货币
export function formatCurrency(amount: number, currency = 'CNY', locale: Locale = 'zh-CN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

// 格式化百分比
export function formatPercent(value: number, locale: Locale = 'zh-CN') {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

// 获取语言对应的Element Plus语言包
export function getElementLocale(locale: Locale) {
  switch (locale) {
    case 'zh-CN':
      return import('element-plus/es/locale/lang/zh-cn')
    case 'en-US':
      return import('element-plus/es/locale/lang/en')
    default:
      return import('element-plus/es/locale/lang/zh-cn')
  }
}

// 检查是否为RTL语言
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isRTL(_locale: Locale): boolean {
  // 目前支持的语言都是LTR，如果以后支持阿拉伯语等RTL语言，在这里添加
  return false
}

// 获取语言的文本方向
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr'
}
