// 样式导入
import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 主题系统初始化
import { useTheme } from '@/composables/useTheme'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 初始化主题
const { initTheme } = useTheme()
initTheme()

app.mount('#app')
