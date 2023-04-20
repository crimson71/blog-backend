<template>
  <div class="login-container">

    <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="loginForm"
    style="max-width: 460px">

  <el-form-item>
    <h1 class="login-title">地瓜的开放后台</h1>
  </el-form-item>
    <el-form-item label="用户名" class="label-text" >
      <el-input v-model="loginForm.username" placeholder="admin" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginForm.password" placeholder="12345678"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">
        登陆
      </el-button>

    </el-form-item>

  </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { reqLogin } from '@/api/getData.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const labelPosition = ref('right')
const loginForm = reactive({
  username: '',
  password: ''
})
const login = async () => {
  const { code, message } = await reqLogin(loginForm)
  if (code === 200) {
    ElMessage({
      showClose: true,
      message: message,
      type: 'success'
    })
    router.replace({ name: 'backendhome' })
  } else {
    ElMessage({
      showClose: true,
      message: message,
      type: 'error'
    })
  }
}

</script>
<style lang="less" scoped>
@import '../assets/less/mixin.less';
.login-container{
position:relative;
width: 100%;
height: 100vh;
.el-form {
  .center();

  .login-title {
    font-size: 50px;
    color:@blue;
    margin-bottom: 50px;
  }
  :deep .el-form-item__label{
    color:@brown;
    font-size: 25px;

  }

}

}

</style>
