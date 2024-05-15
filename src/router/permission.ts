import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { router } from './index'
import { useUserStore } from '@/store/modules/user'
import { store } from '@/store'
import setting from '@/setting'

nProgress.configure({ showSpinner: false })

// 获取组件内小仓库需要先获取大仓库
const userStore = useUserStore(store)
const username = userStore.username

router.beforeEach(async (to, _from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`
  nProgress.start()
  if (userStore.token) {
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
          userStore.userLoginout()
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
