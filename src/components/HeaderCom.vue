<template>
   <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">地瓜的博客</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">文章</el-menu-item>
    <el-menu-item index="2">留言</el-menu-item>
    <el-menu-item index="3">关于</el-menu-item>
    <el-menu-item index="4">访问统计</el-menu-item>
    <el-menu-item index="5">开放式后台</el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const activeIndex = ref('1')

const handleSelect = (activeIndex) => {
  switch (activeIndex) {
    case 1 :
      router.push({ name: 'article' })
      break
    case 2 :
      router.push({ name: 'comment' })
      break
    case 3 :
      router.push({ name: 'about' })
      break
    case 4 :
      router.push({ name: 'visitcount' })
      break
    case 5 :
      router.push({ name: 'backendhome' })
      break
  }
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
