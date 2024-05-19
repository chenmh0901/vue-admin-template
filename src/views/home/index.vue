<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar">
      <div class="footer">
        <h3 class="title">
          {{ getTime() }}
          {{ userStore.username }}
        </h3>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <SvgIcon name="welcome" width="600px" height="300px" />
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .footer {
    margin-left: 20px;
    margin-top: 15px;
    .title {
      font-size: 35px;
      margin-bottom: 30px;
      font-weight: 900;
    }
  }
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>@/utils/time
