<template>
    <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    :http-request="uploadImg"
    list-type="picture"
    accept=".png,.PNG,.JPG,.jpe,.JPEG,.jpeg,.gif,.GIF,.BMP,.bmp"
  >
  <el-button type="primary">上传</el-button>
    <template #file="{ file }">
    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
  </template>

  </el-upload>
</template>
<script setup>
import { reqUploadImg } from '@/api/getData.js'
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})
console.log(props.modelValue)
const uploadImg = async (paramas) => {
  const { file } = paramas
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await reqUploadImg(formData)
  emit('update:modelValue', data)
}
</script>

<style>

</style>
