import type { Attr, AttrResponseData, CategoryResponseData } from './type'
import request from '@/utils/request'

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export function reqC2(category1Id: number | string) {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
}

export function reqC3(category2Id: number | string) {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
}

export function reqAttr(category1Id: number | string, category2Id: number | string, category3Id: number | string) {
  return request.get<any, AttrResponseData>(
    `${API.ATTR_URL}${category1Id}/${category2Id}/${category3Id}`,
  )
}

export function reqAddOrUpdateAttr(data: Attr) {
  return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

export function reqRemoveAttr(attrId: number) {
  return request.delete<any, any>(API.DELETEATTR_URL + attrId)
}
