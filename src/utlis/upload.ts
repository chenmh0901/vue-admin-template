import { ElMessage, type UploadProps } from 'element-plus'

export const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type === 'image/png'
    || rawFile.type === 'image/jpeg'
    || rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    }
    else {
      ElMessage({
        type: 'error',
        message: '上传的文件大小应小于4M',
      })
    }
  }
  else {
    ElMessage({
      type: 'error',
      message: '上传的文件类型必须是PNG|JPG|GIF',
    })
    return false
  }
}
