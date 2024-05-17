import type {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from './type'

import request from '@/utlis/request'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLEURL = '/admin/acl/user/toAssign/',
  SETROLE_url = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export function reqUserInfo(page: number, limit: number, username: string) {
  return request.get<any, UserResponseData>(
    `${API.ALLUSER_URL}${page}/${limit}/?username=${username}`,
  )
}

export function reqAddOrUpdateUser(data: User) {
  if (data.id)
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  else
    return request.post<any, any>(API.ADDUSER_URL, data)
}

export function reqAllRole(userId: number) {
  return request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
}

export function reqSetUserRole(data: SetRoleData) {
  return request.post<any, any>(API.SETROLE_url, data)
}

export function reqRemoveUser(userId: number) {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}

export function reqSelectUser(idList: number[]) {
  return request.delete(API.DELETEALLUSER_URL, { data: idList })
}
