<template>
  <editor-markdown v-model="markdownContent" :height="400"></editor-markdown>
  <editor-html></editor-html>
</template>

<script setup>
import { ref } from 'vue'
const markdownContent = ref('')
</script>

<style>

</style>
