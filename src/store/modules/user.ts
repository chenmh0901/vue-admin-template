import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import type { UserState } from './types/type'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { reqLogOut, reqLogin, reqUserInfo } from '@/api/user'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { anyRoutes, asyncRoutes, constantRoutes } from '@/router/routes'
import { router } from '@/router/index'

let dynamicRoutes: any[] = []

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0)
        item.children = filterAsyncRoute(item.children, routes)

      return true
    }
    return false
  })
}

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 保持持久化
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data as string
        SET_TOKEN(res.data as string)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data))
      }
    },
    async getUserInfo() {
      const res: userInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoutes),
          res.data.routes,
        )
        // 权限管理
        this.menuRoutes = [...constantRoutes, ...userAsyncRoute, anyRoutes]
        dynamicRoutes = [...userAsyncRoute, anyRoutes] // 记录动态添加的路由
        dynamicRoutes.forEach((route) => {
          router.addRoute(route) // 动态添加路由
        })
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout() {
      const res = await reqLogOut()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        dynamicRoutes.forEach((route) => {
          router.removeRoute(route.name)
        })
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})
