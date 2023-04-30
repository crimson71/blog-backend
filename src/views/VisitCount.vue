<template>
  <div class="visit-countainer">
    <div id="main"></div>
    <!-- 数据展示 -->
    <el-table :data="visitList" border style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.lable"
        :width="item.width ? item.width : '260'"
        v-for="item in listLable"
        :key="item.prop"
      />
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="totalPage"
      v-model:current-page="page"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, reactive } from 'vue'
import { reqGetVisitList, reqGetVisitData } from '@/api/getData.js'
import { formatDate } from '@/utils'
const page = ref(1)
const visitList = ref()
const listLable = reactive([
  { prop: 'ipaddr', lable: 'ip地址', width: 120 },
  { prop: 'operatetype', lable: '操作类型', width: 120 },
  { prop: 'operatecontent', lable: '操作内容' },
  { prop: 'location', lable: '访客定位', width: 120 },
  { prop: 'fromUrl', lable: '访客来源', width: 120 },
  { prop: 'browser', lable: '浏览器' },
  { prop: 'visit_time', lable: '访问时间' }
])
// 现在的时间,供获取前七的日期
const nowDate = formatDate(new Date())
const totalPage = ref()

// 获取访问数据
const getVisitData = async () => {
  const visitDate = []
  const visitIps = []
  const visitCount = []
  const { data } = await reqGetVisitData({ nowDate: nowDate })
  data.visitCountList.forEach(item => {
    visitDate.push(item.time)
    visitCount.push(item.count)
    visitIps.push(item.ipCount)
  })

  console.log(data)

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
        // 访问ip个数
        data: visitIps,
        type: 'line',
        stack: 'x',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12,
            color: 'black'
          }
        }
      },
      {
        // 访问人数
        data: visitCount,
        type: 'line',
        stack: 'x',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 12,
            color: 'black'
          }
        }
      }
    ]
  }
  const myChart = echarts.init(document.getElementById('main'))
  myChart.setOption(echartsOption)
}

// 折线图x轴的日期

// 获取访问列表

const getVisitList = async (page) => {
  const { data } = await reqGetVisitList(page)
  data.result.forEach(item => {
    item.visit_time = formatDate(item.visit_time)
  })
  visitList.value = data.result
  totalPage.value = data.total
}
// 翻页
const handleCurrentChange = (val) => {
  page.value = val
  getVisitList(page.value)
}
onMounted(() => {
  getVisitData()
  getVisitList(page.value)
})
</script>

<style lang="less" scoped>
.visit-countainer {
  width: 100%;
  height: 100vh;
  #main {
    height: 90%;
    width: 100%;
  }
}
</style>
