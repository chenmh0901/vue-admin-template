<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr'
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'

const categoryStore = useCategoryStore()

const attrArr = ref<Attr[]>([])
const scene = ref<number>(0)
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})

const inputArr = ref<any>([])

watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (!categoryStore.c3Id)
      return
    getAttr()
  },
)

async function getAttr() {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200)
    attrArr.value = res.data
}

function addAttr() {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

function updateAttr(row: Attr) {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

function cancel() {
  scene.value = 0
}

function addAttrValue() {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 获得聚焦 focus方法 ref获得组件实例inputArr.value[$index] = vc
  // nextTick 等待dom渲染完成立即更新视图
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

async function save() {
  const res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  }
  else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

function toLook(row: AttrValue, $index: number) {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row)
      return item.valueName === row.valueName
    return false
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}

function toEdit(row: AttrValue, $index: number) {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

async function deleteAttr(attrId: number) {
  const res: any = await reqRemoveAttr(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  }
  else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.c3Id"
        @click="addAttr"
      >
        添加平台属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        />
        <el-table-column label="属性名称" prop="attrName" />
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Edit"
              class="column__btn"
              @click="updateAttr(row)"
            />
            <el-popconfirm
              :title="`你确定删除${row.attrName}?`"
              width="200px"
              @confirm="deleteAttr(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" class="column__btn" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            v-model="attrParams.attrName"
            placeholder="请你输入属性名称"
          />
        </el-form-item>
      </el-form>
      <el-button
        :disabled="attrParams.attrName ? false : true"
        type="primary"
        size="default"
        icon="Plus"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button size="default" @click="cancel">
        取消
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        />
        <el-table-column label="属性值名称">
          <template #default="{ row, $index }">
            <el-input
              v-if="row.flag"
              :ref="(vc:any) => inputArr[$index] = vc"
              v-model="row.valueName"
              placeholder="请你输入属性值名称"
              @blur="toLook(row, $index)"
            />
            <div v-else @click="toEdit(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #default="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="attrParams.attrValueList.splice($index, 1)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        :disabled="attrParams.attrValueList.length > 0 ? false : true"
        @click="save"
      >
        保存
      </el-button>
      <el-button size="default" @click="cancel">
        取消
      </el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.column__btn{
  width:30px
}
</style>
