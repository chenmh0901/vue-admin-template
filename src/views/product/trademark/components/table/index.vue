<script setup lang="ts">
import type { Records, TradeMark } from '@/api/product/trademark/type'

interface IProps {
  trademarkArr: Records
  updateTrademark: (row: TradeMark) => void
  removeTradeMark: (id: number) => void
}
defineProps<IProps>()
</script>

<template>
  <el-table border :data="trademarkArr">
    <el-table-column label="序号" width="80px" align="center" type="index" />
    <el-table-column label="品牌名称" prop="tmName" />
    <el-table-column label="品牌LOGO">
      <template #default="{ row }">
        <img
          :src="row.logoUrl" alt="图片丢失"
          style="width: 100px; height: 100px"
        >
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          icon="Edit"
          class="table__column-btn"
          @click="updateTrademark(row)"
        />
        <el-popconfirm
          :title="`您确定删除${row.tmName}`"
          width="250px"
          icon="delete"
          @confirm="removeTradeMark(row.id)"
        >
          <template #reference>
            <el-button type="danger" icon="Delete" class="table__column-btn" />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style coped>
.table__column-btn{
    width: 50px;
  }
</style>
