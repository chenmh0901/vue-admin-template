import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()

  if (userStore.token)
    config.headers.token = userStore.token

  return config
})

request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  let message = error.message
  const status = error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN失效,请重新登录'
      break
    case 403:
      message = '权限不足，无法访问'
      break
    case 404:
      message = '请求资源不存在'
      break
    default:
      message = '网络出现问题'
      break
  }
  ElMessage({
    type: 'error',
    message,
  })
  return Promise.reject(error)
})

export default request
