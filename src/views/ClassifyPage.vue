<template>
  <div class="classify-container">
    <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"

  >
  <el-form
    ref="ruleFormRef"
    :model="dialogForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
  <el-form-item label="分类名" prop="name">
      <el-input v-model="dialogForm.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
      {{buttonName}}
      </el-button>

    </el-form-item>
  </el-form>
  </el-dialog>
    <el-button style="margin-bottom: 20px;" type="primary" plain @click="handleAdd">增加分类</el-button>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="分类名称" width="500" />
    <el-table-column prop="class_id" label="分类id" width="400" />
    <el-table-column label="操作">
      <template #default="scope">

          <el-link type="warning" @click="handleEdit(scope.row)">编辑</el-link>

        &nbsp;&nbsp;
        <el-link type="danger" @click="deleteClassi">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
  </div>

</template>

<script setup>
import { onMounted, ref, reactive, getCurrentInstance } from 'vue'
import { reqClssifyList, reqAddClassify, reqUpdateClassify } from '../api/getData.js'
import { ElMessage } from 'element-plus'

// import { useRouter } from 'vue-router'
import 'element-plus/dist/index.css'
// const router = useRouter()
const { proxy } = getCurrentInstance()
const tableData = ref([])
const getClassifyList = async () => {
  const { data } = await reqClssifyList()
  tableData.value = data
}
onMounted(() => {
  getClassifyList()
})
const formSize = ref('default')
const ruleFormRef = ref()
const rules = reactive({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 3, message: '名字长度最少为3', trigger: 'blur' }
  ]
})
const dialogVisible = ref(false)
const dialogTitle = ref('')
const buttonName = ref('')

const deleteClassi = () => {
  ElMessage.error('权限受限，无法删除')
}
const dialogForm = ref({})

const handleAdd = () => {
  dialogTitle.value = '增加分类'
  dialogVisible.value = true
  buttonName.value = '增加'
}

const handleEdit = (row) => {
  dialogTitle.value = '修改分类'
  dialogVisible.value = true
  buttonName.value = '修改'
  proxy.$nextTick(() => {
    // dialogForm.value = JSON.parse(JSON.stringify(row))
    Object.assign(dialogForm.value, row)
  })
}
const submitForm = async () => {
  dialogVisible.value = false

  if (buttonName.value === '增加') {
    const { message } = await reqAddClassify(dialogForm.value)
    ElMessage({
      type: 'success',
      message: message
    })
  } else {
    const { message } = await reqUpdateClassify(dialogForm.value)
    ElMessage({
      type: 'success',
      message: message
    })
  }
  dialogForm.value = {}
  getClassifyList()
}
</script>

<style></style>
