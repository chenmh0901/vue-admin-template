<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <div>
    {{ userStore.username }}
  </div>
</template>

<style coped>

</style>
