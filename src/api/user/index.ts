import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from './type'
import request from '@/utils/request'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export function reqLogin(data: LoginFormData) {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}

export function reqUserInfo() {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)
