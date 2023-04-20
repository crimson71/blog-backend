<template>
  <div class="visit-countainer">
    <div id="main" ></div>

  </div>
</template>

<script setup>

import * as echarts from 'echarts'
import { onMounted } from 'vue'

const visitDate = ['2023/04/1', '2023/04/2', '2023/04/3', '2023/04/4', '2023/04/5', '2023/04/6', '2023/04/7']
const echartsOption = {
  title: {
    text: '近七天访问数据'
  },
  xAxis: {
    data: visitDate
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ]
}
onMounted(() => {
  const myChart = echarts.init(document.getElementById('main'))
  myChart.setOption(echartsOption)
})

</script>

<style lang="less" scoped>
.visit-countainer{
  width: 100%;
  height: 100vh;
  #main {
    height: 100%;
    width:100%

  }
}

</style>
