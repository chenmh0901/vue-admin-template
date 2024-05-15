import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import type { ILoginForm, ILoginResponseData } from '@/api/user/type'
import { reqlogin } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utlis/token'
import { routes } from '@/router/index'

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 保持持久化
      token: GET_TOKEN(),
      menuRoutes: routes,
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
  },
  getters: {},
})
