export interface ILoginForm {
  username: string
  password: string
}
interface dataTypes {
  token?: string
  message?: string
}
export interface ILoginResponseData {
  code: number
  data: dataTypes
}
interface userinfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userinfo
}
export interface IUserResponseData {
  code: number
  data: user
}
