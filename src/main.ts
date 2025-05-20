/**
 * 从 'vue' 库中导入 createApp 函数，该函数用于创建一个 Vue 应用实例
 */
import { createApp } from 'vue'
/**
 * 导入根组件 App，该组件是 Vue 应用的入口组件，路径为 './App.vue'
 */
import App from './App.vue'
/**
 * 导入应用的路由实例 router，该实例在 './router/index.ts' 文件中创建和配置
 */
import router from './router/index.ts'
/**
 * 从 'pinia' 库中导入 createPinia 函数，用于创建 Pinia 状态管理实例
 */
import { createPinia } from 'pinia'
/**
 * 导入 Element Plus 组件库，用于在应用中使用 Element Plus 的组件
 */
import ElementPlus from 'element-plus'
/**
 * 导入 Element Plus 的样式文件，确保 Element Plus 组件能正确显示样式
 */
import 'element-plus/dist/index.css'

/**
 * 创建一个 Vue 应用实例，传入根组件 App
 */
const app = createApp(App)
/**
 * 在应用实例上使用 Pinia 状态管理，传入创建的 Pinia 实例
 */
app.use(createPinia())
/**
 * 在应用实例上使用路由实例，使应用具备路由功能
 */
app.use(router)
/**
 * 在应用实例上使用 Element Plus 组件库，使应用可以使用 Element Plus 的组件
 */
app.use(ElementPlus)
/**
 * 将 Vue 应用挂载到页面中 id 为 'app' 的元素上，使应用在页面中渲染显示
 */
app.mount('#app')
/**
 * 输出环境变量 VITE_API_BASE_URL 的值，根据注释预期输出为 http://localhost:8080
 * 这里使用 import.meta.env 来访问 Vite 中的环境变量
 */
console.log(import.meta.env.VITE_API_BASE_URL); 