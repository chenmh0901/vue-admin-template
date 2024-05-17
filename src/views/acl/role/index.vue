<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermission,
} from '@/api/acl/role'
import type {
  MenuList,
  MenuResponseData,
  Records,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type'
import { useLayoutSettingStore } from '@/store/modules/setting'

const pageNo = ref<number>(1)

const pageSize = ref<number>(10)

const settingStore = useLayoutSettingStore()

const dialogVisible = ref<boolean>(false)

const RoleParams = reactive<RoleData>({
  roleName: '',
})

onMounted(() => {
  getHasRole()
})

const keyword = ref<string>('')

const allRole = ref<Records>([])

const total = ref<number>(0)
const form = ref<any>()

const drawer = ref<boolean>(false)

const menuArr = ref<MenuList>([])

const selectArr = ref<number[]>([])

const tree = ref<any>()
async function getHasRole(pager = 1) {
  pageNo.value = pager
  const res: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    allRole.value = res.data.records
  }
}

function sizeHandler() {
  getHasRole()
}

function search() {
  getHasRole()
  keyword.value = ''
}

function reset() {
  settingStore.refresh = !settingStore.refresh
}

function addRole() {
  dialogVisible.value = true
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

function updateRole(row: RoleData) {
  dialogVisible.value = true
  Object.assign(RoleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

function validateRoleName(_rule: any, value: any, callBack: any) {
  if (value.trim().length >= 2)
    callBack()
  else
    callBack(new Error('职位名称至少两位'))
}

const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }],
}

async function save() {
  await form.value.validate()
  const res: any = await reqAddOrUpdateRole(RoleParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    })
    dialogVisible.value = false
    getHasRole(RoleParams.id ? pageNo.value : 1)
  }
}

async function setPermission(row: RoleData) {
  drawer.value = true
  Object.assign(RoleParams, row)
  const res: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (res.code === 200) {
    menuArr.value = res.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

function filterSelectArr(allData: any, initArr: any) {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4)
      initArr.push(item.id)

    if (item.children && item.children.length > 0)
      filterSelectArr(item.children, initArr)
  })
  return initArr
}

async function handler() {
  const roleId = RoleParams.id as number
  const arr = tree.value.getCheckedKeys()
  const arr1 = tree.value.getHalfCheckedKeys()
  const permissionId = arr.concat(arr1)
  const res: any = await reqSetPermission(roleId, permissionId)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    window.location.reload()
  }
}

async function removeRole(id: number) {
  const res: any = await reqRemoveRole(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input
          v-model="keyword"
          placeholder="请你输入搜索职位的关键字"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button size="default" @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">
      添加职位
    </el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column type="index" align="center" label="#" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column
        label="职位名称"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      />
      <el-table-column
        label="创建时间"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      />
      <el-table-column
        label="更新时间"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      />
      <el-table-column label="操作" width="280px" align="center">
        <template #default="{ row }">
          <el-button size="small" icon="User" @click="setPermission(row)">
            分配权限
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.rowName}?`"
            width="260px"
            @confirm="removeRole(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper , ->, sizes, total, "
      :total="total"
      @current-change="getHasRole"
      @size-change="sizeHandler"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :title="RoleParams.id ? '更新职位' : '添加职位'"
  >
    <el-form ref="form" :model="RoleParams" :rules="rules">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          v-model="RoleParams.roleName"
          placeholder="请你输入职位名称"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="save">
        确定
      </el-button>
    </template>
  </el-dialog>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">
          取消
        </el-button>
        <el-button type="primary" @click="handler">
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
