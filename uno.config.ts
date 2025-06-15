import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      'text-primary': '#303133',
      'text-regular': '#606266',
      'text-secondary': '#909399',
      'text-placeholder': '#C0C4CC',
      'bg-color': '#FFFFFF',
      'bg-page': '#F2F3F5',
      'border-color': '#DCDFE6',
    },
    breakpoints: {
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1920px',
    },
  },
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',
    'absolute-center': 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    card: 'bg-white rounded-lg shadow-sm border border-gray-200',
    btn: 'px-4 py-2 rounded-md font-medium transition-colors duration-200',
    'btn-primary': 'btn bg-primary text-white hover:bg-blue-600',
    'btn-secondary': 'btn bg-gray-200 text-gray-700 hover:bg-gray-300',
  },
  rules: [
    // 自定义规则
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}px` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}px` })],
  ],
})
