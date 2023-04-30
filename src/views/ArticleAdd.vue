<template>
  <div class="article-add-container">
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
      <el-row>
        <el-form-item label="创建时间" required>
          <el-form-item prop="create_time">
            <el-date-picker
              v-model="ruleForm.create_time"
              type="date"
              label="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="简介" prop="summary" required>
          <el-input v-model="ruleForm.summary"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="封面" required>
        <cover-upload v-model="ruleForm.cover"></cover-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor-html v-model="ruleForm.content"></editor-html>
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
import { reactive, ref } from 'vue'
import { reqAddArticle } from '@/api/getData.js'
import CoverUpload from '@/components/CoverUpload.vue'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils/index.js'
const formSize = ref('default')
const ruleForm = reactive({
  title: '',
  classifition: '',
  create_time: new Date(),
  content: '',
  cover: '',
  summary: ''
})

const rules = reactive({
  title: [
    { required: true, message: '文章标题必填', trigger: 'blur' },
    { min: 3, message: '最少三个字符', trigger: 'blur' }
  ],
  summary: [
    { required: true, message: '文章简介必填', trigger: 'blur' },
    { min: 3, message: '最少三个字符', trigger: 'blur' }
  ],
  classifition: [{ required: true, message: '文章分类必填', trigger: 'blur' }],
  content: [{ required: true, message: '文章内容必填', trigger: 'blur' }]
})

const ruleFormRef = ref()
const submitForm = async (data) => {
  data.create_time = formatDate(data.create_time)
  ruleFormRef.value.validate(async (valid, field) => {
    if (valid) {
      const { message } = await reqAddArticle(data)
      ruleFormRef.value.resetFields()
      ruleForm.content = ''
      ElMessage({
        type: 'success',
        message: message
      })
    }
  })
}
</script>

<style lang="less" scoped></style>
