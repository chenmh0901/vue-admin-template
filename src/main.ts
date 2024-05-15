import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { store } from './store'
import { router } from './router'
import App from './App.vue'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import globalComponents from './components/index'
import './styles/index.scss'
import '@/router/permission'

const app = createApp(App)

app.use(ElementPlus)
  .use(globalComponents)
  .use(router)
  .use(store)
app.mount('#app')
