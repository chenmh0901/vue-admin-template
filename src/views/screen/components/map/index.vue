<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 引入中国地图的JSON数据
import chinaJSON from './china.json'
// 获取DOM元素
const map = ref()
// 注册中国地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  const mychart = echarts.init(map.value)
  // 设置配置项
  mychart.setOption({
    // 地图组件
    geo: {
      map: 'china', // 中国地图
      roam: true, // 鼠标缩放的效果
      // 地图的位置调试
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      // 地图上的文字的设置
      label: {
        show: true, // 文字显示出来
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        // 每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#409eff', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      // 地图高亮的效果
      emphasis: {
        itemStyle: {
          color: '#fff',
        },
        label: {
          fontSize: 30,
          color: '#79bbff',
        },
      },
    },
    // 布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', // 航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#c6e2ff',
              width: 3,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#ecf5ff',
              width: 3,
            },
          },
        ],
        // 开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: '#a0cfff',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<template>
  <div ref="map" class="box4">
    我是地图组件
  </div>
</template>

<style scoped></style>
