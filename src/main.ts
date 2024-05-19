import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { pinia } from './store'
import { router } from './router'
import App from './App.vue'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import globalComponents from './components/index'
import './styles/index.scss'
import '@/permission'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { isHasButton } from './directive/has'

const app = createApp(App)
isHasButton(app)
app.use(ElementPlus)
  .use(globalComponents)
  .use(router)
  .use(pinia)
app.mount('#app')
