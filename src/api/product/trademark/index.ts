import type { TradeMark, TradeMarkResponseData } from './type'
import request from '@/utlis/request'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export function reqHasTradeMark(page: number, limit: number) {
  return request.get<any, TradeMarkResponseData>(
    `${API.TRADEMARK_URL}${page}/${limit}`,
  )
}

export function reqAddOrUpdateTrademark(data: TradeMark) {
  if (data.id)
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  else
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
}

export function reqDeleteTrademark(id: number) {
  return request.delete<any, any>(API.DELETE_URL + id)
}
