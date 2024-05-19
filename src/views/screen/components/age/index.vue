<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 引入echarts
import * as echarts from 'echarts'

const charts = ref()
// 组件挂载完毕初始化图形图标
onMounted(() => {
  const mychart = echarts.init(charts.value)
  // 设置配置项
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical', // 图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '60' },
          { value: 735, name: '50' },
          { value: 580, name: '40' },
          { value: 484, name: '30' },
          { value: 300, name: '20' },
        ],
      },
    ],
    // 调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  }
  mychart.setOption(option)
})
</script>

<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <!-- 图形图标的容器 -->
    <div ref="charts" class="charts" />
  </div>
</template>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
  }
}
</style>
