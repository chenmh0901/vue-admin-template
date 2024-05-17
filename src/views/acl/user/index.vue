<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqRemoveUser,
  reqSelectUser,
  reqSetUserRole,
  reqUserInfo,
} from '@/api/acl/user'
import type {
  AllRole,
  AllRoleResponseData,
  Records,
  SetRoleData,
  User,
  UserResponseData,
} from '@/api/acl/type'
import { useLayoutSettingStore } from '@/store/modules/setting'

const pageNo = ref<number>(1)

const pageSize = ref<number>(5)

const total = ref<number>(0)

const userArr = ref<Records>([])

const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)

const allRole = ref<AllRole>([])

const userRole = ref<AllRole>([])
const userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})

const selectIdArr = ref<User[]>([])
onMounted(() => {
  getHasUser()
})

const formRef = ref<any>()
const keyword = ref<string>('')

const settingStore = useLayoutSettingStore()
async function getHasUser(pager = 1) {
  pageNo.value = pager
  const res: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    userArr.value = res.data.records
  }
}

function handler() {
  getHasUser()
}

function addUser() {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

function updateUser(row: User) {
  drawer.value = true
  Object.assign(userParams, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

async function save() {
  formRef.value.validate()
  const res: any = await reqAddOrUpdateUser(userParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    window.location.reload()
  }
  else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}

function cancel() {
  drawer.value = false
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名至少五位', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 5, message: '用户昵称至少五位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 6, message: '用户密码至少六位', trigger: 'blur' },
  ],
}

async function setRole(row: User) {
  drawer1.value = true
  Object.assign(userParams, row)
  const res: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
    drawer1.value = true
  }
}

const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)

function handleCheckAllChange(val: boolean) {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

function handleCheckedUsersChange(value: string[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value
    = checkedCount > 0 && checkedCount < allRole.value.length
}

async function confirmClick() {
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    }),
  }
  const res: any = await reqSetUserRole(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配职务成功',
    })
    drawer1.value = false
    getHasUser(pageNo.value)
  }
}

async function deleteUser(userId: number) {
  const res: any = await reqRemoveUser(userId)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

function selectChange(value: any) {
  selectIdArr.value = value
}

async function deleteSelectUser() {
  const idList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  const res: any = await reqSelectUser(idList)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

function search() {
  getHasUser()
  keyword.value = ''
}

function reset() {
  settingStore.refresh = !settingStore.refresh
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input v-model="keyword" placeholder="请你输入搜索用户名" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword.length ? false : true"
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
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>
    <el-table
      style="margin: 10px 0"
      border
      :data="userArr"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="#" align="center" type="index" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      />
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      />
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      />
      <el-table-column label="操作" width="300px" align="center">
        <template #default="{ row }">
          <el-button size="small" icon="User" @click="setRole(row)">
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.username}`"
            width="260px"
            @confirm="deleteUser(row.id)"
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
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="getHasUser"
      @size-change="handler"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form ref="formRef" :model="userParams" :rules="rules">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            v-model="userParams.username"
            placeholder="请您输入用户姓名"
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            v-model="userParams.name"
            placeholder="请您输入用户昵称"
          />
        </el-form-item>
        <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
          <el-input
            v-model="userParams.password"
            placeholder="请您输入用户密码"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true" />
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedUsersChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">
          取消
        </el-button>
        <el-button type="primary" @click="confirmClick">
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
