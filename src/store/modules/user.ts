import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import type { ILoginForm, ILoginResponseData } from '@/api/user/type'
import { reqUserInfo, reqlogin } from '@/api/user'
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
    async userLogin(data: ILoginForm) {
      const res: ILoginResponseData = await reqlogin(data)
      if (res.code === 200) {
        this.token = res.data.token as string
        SET_TOKEN(res.data.token as string)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    async getUserInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      }
      else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },
    userLoginout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
