<template>
  <div class="article-container">
    <div class="create-btn">
      <el-button
        type="primary"
        plain
        @click="router.push({ name: 'addarticle' })"

        style="margin-bottom: 20px;">创建文章</el-button
      >
    </div>
  </div>
  <div class="article-list">
    <el-table :data="articleData" border style="width: 100%">
      <el-table-column label="封面" width="80" scope>
        <template #default="scope">
          <cover-com :cover="articleData[scope.$index].cover"></cover-com>
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in tableLabel"
        :key="item.prop"
        :width="item.width ? item.width : 200"
      />

      <el-table-column label="操作">
        <template #default="scope">
          <router-link
          :to="{name:'articledetail',params:{id:articleData[scope.$index].arti_id}}">
            <el-link
              type="primary"
              style="margin-right: 10px"
              @click="handleCheckDetail"
              >查看</el-link
            >
          </router-link>
          <router-link
          :to="{name:'articleedit',params:{id:articleData[scope.$index].arti_id}}">
            <el-link
              type="warning"
              style="margin-right: 10px"
              @click="handleEdit"
              >编辑</el-link
            >
          </router-link>
          <el-link type="danger" style="margin-right: 10px" @click="handleDel"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { reqArticleList } from '@/api/getData.js'
import { formatDate, classifyConvert } from '@/utils/index.js'
import { useRouter } from 'vue-router'
import CoverCom from '@/components/CoverCom.vue'
import 'element-plus/dist/index.css'

const router = useRouter()
const tableLabel = reactive([
  { prop: 'title', label: '文章标题', width: 400 },
  { prop: 'classifition', label: '分类' },
  { prop: 'comment_count', label: '评论数' },
  { prop: 'create_time', label: '创建时间' }
])

// 文章数据
const articleData = ref([])

// 获取文件列表
const getArticleList = async () => {
  const { data } = await reqArticleList()
  data.forEach(item => {
    item.classifition = classifyConvert(item.classifition)
  })

  articleData.value = data
  for (let i = 0; i < data.length; i++) {
    data[i].create_time = formatDate(data[i].create_time)
  }
  articleData.value = data
}
const handleCheckDetail = () => {
  console.log(11)
}
const handleEdit = () => {
  console.log(11)
}
const handleDel = () => {
  ElMessage.error('权限不足，无法进行操作')
}

onMounted(() => {
  getArticleList()
})
</script>

<style></style>
