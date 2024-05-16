import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import { reqLogOut, reqLogin, reqUserInfo } from '@/api/user'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utlis/token'
import { routes } from '@/router/routes'

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 保持持久化
      token: GET_TOKEN(),
      menuRoutes: routes,
      username: '',
      avatar: '',
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
      }
      else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})
