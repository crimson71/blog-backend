<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>标题：{{article.title}}</h1>
      </div>
    </template>
    <div>内容：{{article.content}}</div>
  </el-card>
</template>

<script setup>
import { reqArticleDetail } from '@/api/getData.js'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const artiId = route.params.id
const article = ref({})
const getArticleDetail = async (id) => {
  const { data } = await reqArticleDetail(id)
  article.value = data[0]
}
onBeforeMount(() => {
  getArticleDetail(artiId)
})

</script>

<style>

</style>
