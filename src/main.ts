// 样式导入
import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

// 国际化
import i18n, { getStoredLocale } from '@/locales'
import { setDayjsLocale } from '@/utils/i18n'

// 主题系统初始化
import { useTheme } from '@/composables/useTheme'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ElementPlus)

// 初始化主题
const { initTheme } = useTheme()
initTheme()

// 初始化国际化
const currentLocale = getStoredLocale()
setDayjsLocale(currentLocale)
document.documentElement.lang = currentLocale

app.mount('#app')
