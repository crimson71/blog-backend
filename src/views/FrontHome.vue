<template>
   <div class="common-layout">
    <el-container>
      <el-header>
        <header-com />
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import HeaderCom from '@/components/HeaderCom.vue'

</script>

<style>

</style>
