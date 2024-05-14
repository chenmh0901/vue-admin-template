import type { ILoginForm, ILoginResponseData, IUserResponseData } from './type'
import request from '@/utlis/request'

enum API {
  USER_LOGIN = '/user/login',
  USER_INFO = '/user/info',
}

export function reqlogin(data: ILoginForm) {
  return request.post<any, ILoginResponseData>(API.USER_LOGIN, data)
}

export function reqUserInfo() {
  return request.get<any, IUserResponseData>(API.USER_INFO)
}
