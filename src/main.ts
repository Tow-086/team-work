import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
console.log(import.meta.env.VITE_API_BASE_URL); // 应该输出 http://localhost:8080
