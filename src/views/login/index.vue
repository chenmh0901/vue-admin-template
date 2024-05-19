<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { getTime } from '@/utils/time'

const useStore = useUserStore()

const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const loginFormRef = ref()

const loading = ref(false)
const router = useRouter()
const route = useRoute()

// validator
function validatorUsername(_rule: any, value: any, callback: any) {
  if (value.length >= 5)
    callback()
  else
    callback(new Error('用户名长度不能小于5位'))
}
function validatorPassword(_rule: any, value: any, callback: any) {
  if (value.length >= 6)
    callback()
  else
    callback(new Error('密码长度不能小于6位'))
}
const rules = {
  username: [
    { validator: validatorUsername, trigger: 'change' },
  ],
  password: [
    { validator: validatorPassword, trigger: 'change' },
  ],
}

// login
async function login() {
  loading.value = true
  try {
    await useStore.userLogin(loginForm)

    if (route.query.redirect)
      router.push(route.query.redirect as string)
    else
      router.push('/home')

    ElNotification({
      type: 'success',
      title: `Hi ${getTime()}`,
      message: '欢迎回来',
    })
    loading.value = false
  }
  catch (error) {
    loading.value = false

    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<template>
  <div class="login__container">
    <el-row>
      <el-col :span="12" :xs="0" />
      <el-col :span="12" :xs="24">
        <el-form ref="loginFormRef" :model="loginForm" class="login__form" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎来到本网站</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock" show-password />
          </el-form-item>
          <el-form-item>
            <el-button class="login__btn" type="primary" :loading="loading" @click="login">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style coped lang="scss">
.login__container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login__form{
    position: relative;
    top:30vh;
    width: 80%;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1{
      color: #fff;
      font-size: 40px
    }

    h2{
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }

    .login__btn{
      width: 100%;
    }
  }
}
</style>
@/utils/time
