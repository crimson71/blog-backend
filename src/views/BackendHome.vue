<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <aside-com></aside-com>
      </el-aside>
      <el-container>
        <el-header>
          <backend-header></backend-header>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AsideCom from '@/components/AsideCom.vue'
import BackendHeader from '@/components/BackendHeader.vue'

</script>

<style lang="less" scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  .el-container {
    height: 100%;
    .el-menu {
      height: 100%;

    }

  }
}

</style>
