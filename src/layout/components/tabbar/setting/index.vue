<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
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
</script>

<template>
  <el-button size="default" icon="Refresh" circle @click="refresh" />
  <el-button size="default" icon="FullScreen" circle @click="fullscreen" />
  <el-button size="default" icon="Setting" circle />
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
