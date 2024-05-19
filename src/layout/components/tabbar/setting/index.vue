<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useLayoutSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()

function refresh() {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}
function fullscreen() {
  // 不同浏览器兼容不同
  if (document.fullscreenElement)
    document.exitFullscreen()
  else
    document.documentElement.requestFullscreen()
}

const router = useRouter()
const route = useRoute()
async function logout() {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}

const visible = ref(false)
const dark = ref<boolean>(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

function changeDark() {
  const html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

function setColor() {
  const html = document.documentElement

  html.style.setProperty('--el-color-primary', color.value)
  visible.value = false
}
</script>

<template>
  <el-button size="default" icon="Refresh" circle @click="refresh" />
  <el-button size="default" icon="FullScreen" circle @click="fullscreen" />
  <el-popover placement="bottom" title="主题设置" :width="200" :visible="visible">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          :predefine="predefineColors"
          size="small"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button circle icon="Setting" @click="visible = !visible" />
    </template>
  </el-popover>
  <img :src="userStore.avatar" alt="logo" style="width: 30px;height: 30px;margin:0 10px">
  <el-dropdown>
    <span>
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style coped>

</style>
