<template>
  <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"

      >
        <el-menu-item index="1">
          <el-icon><TrendCharts /></el-icon>
          <router-link :to="{name:'visitcount'}" custom v-slot="{ navigate }" >
            <span @click="navigate" role="link">访问数据</span>
          </router-link>

        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Document /></el-icon>
          <router-link :to="{name:'article'}"  custom v-slot="{ navigate }">
            <span @click="navigate" role="link">文章管理</span>
          </router-link>

        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Wallet /></el-icon>
          <router-link :to="{name:'classify'}" custom v-slot="{ navigate }" >
            <span @click="navigate" role="link">分类管理</span>
          </router-link>

        </el-menu-item>
        <el-menu-item index="4" >
          <el-icon><ChatDotSquare /></el-icon>
          <router-link :to="{name:'comment'}" custom v-slot="{ navigate }">
            <span @click="navigate" role="link">评论管理</span>
          </router-link>

        </el-menu-item>

      </el-menu>
</template>

<script setup>
import {
  TrendCharts,
  Document,
  Wallet,
  ChatDotSquare
} from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
       .el-menu-item {
         height: 12%;
      }

</style>
