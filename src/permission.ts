import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { router } from './router/index'
import { useUserStore } from '@/store/modules/user'
import { pinia } from '@/store'
import setting from '@/setting'

nProgress.configure({ showSpinner: false })

// 获取组件内小仓库需要先获取大仓库
const userStore = useUserStore(pinia)

router.beforeEach(async (to, _from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nProgress.start()

  const username = userStore.username
  const token = userStore.token

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      if (username) { next() }
      else {
        try {
          await userStore.getUserInfo()
          next({ ...to })
        }
        catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  }
  else {
    if (to.path === '/login')
      next()
    else
      next({ path: '/login', query: { redirect: to.path } })
  }
})

router.afterEach(() => {
  nProgress.done()
})
