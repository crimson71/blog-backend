<template>
  <v-md-editor
  :disabled-menus="[]"
  :include-level="[1,2,3,4,5,6]"
  @upload-image="handleUploadImage"
  @change="change"
  ></v-md-editor>
</template>

<script setup>
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import { reqUploadImg } from '@/api/getData.js'
import { baseUrl } from '@/api/request.js'
import { defineProps, defineEmits } from 'vue'

// highlightjs
import hljs from 'highlight.js'

VMdEditor.use(githubTheme, {
  Hljs: hljs
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 500
  }
})
console.log(props.modelValue)
const emit = defineEmits(['update:modelValue', 'htmlContent'])
const change = (markdownContent, htmlContent) => {
  emit('update:modelValue', markdownContent)
  emit('htmlContent', htmlContent)
}
// 文章图片上传
const handleUploadImage = async (event, insertImage, files) => {
  const formData = new FormData()
  formData.append('file', files[0])
  const { data } = await reqUploadImg(formData)
  insertImage({
    url: baseUrl + data,
    desc: '图片'
    // width: 'auto',
    // height: 'auto',
  })
}
</script>

<style>

</style>
