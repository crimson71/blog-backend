<template>
  <div class="cover-container">
    <img :src="baseImgUrl+props.cover" alt="" v-if="props.cover"/>
    <img src="@/assets/default.jpg" alt="" v-else/>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const baseImgUrl = 'http://127.0.0.1/'

const props = defineProps({
  cover: {
    type: String
  }
})

</script>

<style lang="less" scoped>
.cover-container {
  display: flex;
width: 60px;
height: 60px;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
