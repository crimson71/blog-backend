<template>
  <div class="commetn-container">
    <!-- 修改对话框 -->
    <el-dialog v-model="dialogVisible" title="修改评论" width="30%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="评论人" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="评论内容" prop="comm_content">
          <el-input v-model="ruleForm.comm_content" />
        </el-form-item>
        <el-form-item>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
    </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 数据呈现表格 -->
    <el-table :data="tableData" height="550" style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 200"
        v-for="item in tableLable"
        :key="item.prop"
      />

      <el-table-column label="操作">
        <template #default="scope">
          <el-link type="warning" @click="handleModify(scope.row)">修改</el-link
          >&nbsp;&nbsp;
          <el-link type="danger" @click="handleDel">删除</el-link>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { reqCommentsList, reqCommentsUpdate } from '@/api/getData.js'
import { entitiesToUtf16, formatDate, utf16ToEntities } from '@/utils/index.js'
import { ElMessage } from 'element-plus'
// 控制对话框的显示
const dialogVisible = ref(false)
const tableLable = reactive([
  { prop: 'name', label: '评论人', width: '150' },
  { prop: 'comm_content', label: '评论内容', width: '300' },
  { prop: 'ip_address', label: '评论人定位', width: '150' },
  { prop: 'comm_time', label: '评论时间', width: '150' }
])
const tableData = ref()
const initCommentsList = async () => {
  const { data } = await reqCommentsList()
  data.forEach((item) => {
    item.comm_time = formatDate(item.comm_time)
    item.comm_content = entitiesToUtf16(item.comm_content)
  })
  tableData.value = data
}

const ruleForm = ref()
const rules = reactive({
  name: [
    { required: true, message: '评论人名不为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度3-5', trigger: 'blur' }
  ],
  comm_content: [
    { required: true, message: '评论内容不为空', trigger: 'blur' },
    { min: 3, max: 255, message: '长度3-255', trigger: 'blur' }
  ]
})
const handleModify = (row) => {
  dialogVisible.value = true
  ruleForm.value = row
  console.log(11)
}
const handleDel = () => {
  ElMessage.error('权限不足无法删除！')
}
const submitForm = async () => {
  ruleForm.value.comm_content = utf16ToEntities(ruleForm.value.comm_content)
  const { code, message } = await reqCommentsUpdate(ruleForm.value)
  if (code === 200) {
    ElMessage({
      type: 'success',
      message: message
    })
    ruleForm.value = ''
    dialogVisible.value = false
    initCommentsList()
  }
}
onMounted(() => {
  initCommentsList()
})
</script>

<style></style>
