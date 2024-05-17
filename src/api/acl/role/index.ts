import type { MenuResponseData, RoleData, RoleResponseData } from './type'
import request from '@/utlis/request'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL = '/admin/acl/role/save',
  UPDATEROLE_URL = '/admin/acl/role/update',
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
  SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}

export function reqAllRoleList(page: number, limit: number, roleName: string) {
  return request.get<any, RoleResponseData>(
    `${API.ALLROLE_URL}${page}/${limit}/?roleName=${roleName}`,
  )
}

export function reqAddOrUpdateRole(data: RoleData) {
  if (data.id)
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  else
    return request.post<any, any>(API.ADDROLE_URL, data)
}

export function reqAllMenuList(roleId: number) {
  return request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
}

export function reqSetPermission(roleId: number, permissionId: number[]) {
  return request.post(
    `${API.SETPERMISSION_URL}roleId=${roleId}&permissionId=${permissionId}`,
  )
}

export function reqRemoveRole(roleId: number) {
  return request.delete<any, any>(API.REMOVEROLE_URL + roleId)
}
