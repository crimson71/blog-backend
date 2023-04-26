<template>
  <div class="article-edit-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-row>
        <el-form-item label="文章标题" prop="title" span="16">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="文章分类" prop="classifition">
          <el-select v-model="ruleForm.classifition" placeholder="请选择分类">
            <el-option label="技术笔记" value="1" />
            <el-option label="成长感悟" value="3" />
            <el-option label="吐槽大会" value="2" />
          </el-select>
        </el-form-item>
      </el-row>

      <el-form-item label="修改时间" required>
        <el-form-item prop="create_time">
          <el-date-picker
            v-model="ruleForm.create_time"
            type="date"
            label="Pick a date"
            style="width: 100%"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form-item>
      <el-form-item label="封面" required>

          <cover-upload v-model="ruleForm.cover"></cover-upload>

      </el-form-item>

      <el-form-item label="内容" prop="content">
        <div :style="{width:'100%'}">
          <editor-html v-model="ruleForm.content"></editor-html>
      </div>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { reqArticleDetail, reqArticleUpdate } from '@/api/getData.js'
import CoverUpload from '@/components/CoverUpload.vue'
import EditorHtml from '@/components/EditorHtml.vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils'
import 'element-plus/dist/index.css'
const formSize = ref('default')
const route = useRoute()
const ruleFormRef = ref()
const ruleForm = ref({})
onBeforeMount(async () => {
  const { data } = await reqArticleDetail(route.params.id)
  data.create_time = formatDate(data.create_time)
  ruleForm.value = data
})
const rules = reactive({
  title: [
    { required: true, message: '文章标题必填', trigger: 'blur' },
    { min: 3, message: '最少三个字符', trigger: 'blur' }
  ],
  classifition: [{ required: true, message: '文章分类必填', trigger: 'blur' }],
  content: [{ required: true, message: '文章内容必填', trigger: 'blur' }]
})

const submitForm = async () => {
  const { message, code } = await reqArticleUpdate({
    id: route.params.id,
    title: ruleForm.value.title,
    create_time: ruleForm.value.create_time,
    cover: ruleForm.value.cover,
    content: ruleForm.value.content,
    classifition: ruleForm.value.classifition
  })
  console.log(message, code)
  if (code === 200) {
    return ElMessage({
      message: message,
      type: 'success'
    })
  }
}
</script>

<style></style>
