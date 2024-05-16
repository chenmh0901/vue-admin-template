<!-- eslint-disable vue/valid-attribute-name -->
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import Table from './components/table/index.vue'
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHasTradeMark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'

const currentPage = ref<number>(1)
const total = ref<number>(0)
const limit = ref<number>(3)
const trademarkArr = ref<Records>([])

async function getHasTradeMark(pager = 1) {
  currentPage.value = pager
  const res: TradeMarkResponseData = await reqHasTradeMark(currentPage.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

onMounted(getHasTradeMark)

const dialogVisible = ref<boolean>(false)

const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
const formRef = ref()

function addTrademark() {
  dialogVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''

  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
function updateTrademark(row: TradeMark) {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogVisible.value = true
  Object.assign(trademarkParams, row)
}

function cancel() {
  dialogVisible.value = false
}

async function confirm() {
  await formRef.value.validate()

  const res = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTradeMark(trademarkParams.id ? currentPage.value : 1)
  }
  else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

function validatorTmName(value: any, callBack: any) {
  if (value.trim().length >= 2)
    callBack()
  else
    callBack(new Error('品牌名称位数大于等于两位'))
}

function validatorLogoUrl(value: any, callBack: any) {
  if (value)
    callBack()
  else
    callBack(new Error('Logo的图片务必上传'))
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorLogoUrl,
    },
  ],
}

async function removeTradeMark(id: number) {
  const res = await reqDeleteTrademark(id)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 再次获取已有的品牌数据
    getHasTradeMark(
      trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  }
  else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<template>
  <el-card class="box__card">
    <el-button icon="Plus" style="width: 90px;" @click="addTrademark">
      添加品牌
    </el-button>

    <Table :trademark-arr="trademarkArr" :update-trademark="updateTrademark" :remove-trade-mark="removeTradeMark" />

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :backgroud="true"
      layout="prev, pager, next, jumper , -> , sizes , total"
      :total="total"
      @size-change="getHasTradeMark"
      @current-change="getHasTradeMark"
    />
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      ref="formRef"
      style="width: 90%"
      :model="trademarkParams"
      :rules="rules"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          placeholder="请您输入品牌名称"
        />
      </el-form-item>
      <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          >
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="confirm">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style coped>
.box__card{
  .card__table{
    margin: 10px 0;
  }

  .table__column-btn{
    width: 50px;
  }
}
</style>
