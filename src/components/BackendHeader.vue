<template>
 <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"

  >
    <el-menu-item index="0">地瓜的博客</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <a href="#" class="no-underline">前台入口</a>
     </el-menu-item>
    <el-sub-menu index="2">
      <template #title>{{ '大佬，你好' }}</template>
      <el-menu-item index="2-1">登出</el-menu-item>

    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
const activeIndex = ref('1')

</script>

<style>
.flex-grow {
  flex-grow: 1;
}

</style>
