<template>
  <div style="text-align: center;margin: 0 50px">
    <div style="margin-top: 20vh">
      <div style="font-size: 25px; font-weight: bold">登 录</div>
    </div>
    <div style="margin-top: 50px">
      <el-input v-model="loginForm.username" type="text" placeholder="用户名/邮箱" size="large">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
      <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码" size="large"
        style="margin-top: 20px">
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </div>
    <el-row style="margin-top: 10px">
      <el-col :span="12" style="text-align: left"><el-checkbox v-model="loginForm.remember" label="记住我"
          size="small" /></el-col>
      <el-col :span="12" style="text-align: right"><el-link @click="router.push('/forget')"
          style="font-size: 12px">忘记密码</el-link></el-col>
    </el-row>
    <div style="margin-top: 30px">
      <el-button @click="temp_login" type="success" size="large" style="width: 100%" plain>登录</el-button>
    </div>
    <el-divider>
      <span style="color: gray; ">没有账号？</span>
    </el-divider>
    <el-button @click="router.push('/register')" type="warning" size="large" style="width: 100%" plain>注册账号</el-button>

  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { get, post } from "@/http";
import router from "@/router/index.js";
import { useStore } from "@/stores/index.js";

const store = useStore()

const loginForm = ref({
  username: '',
  password: '',
  remember: ''
})

const login = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请填写用户名密码')
  } else {
    post('/api/auth/login', {
      username: loginForm.value.username,
      password: loginForm.value.password,
      remember: loginForm.value.remember
    }, (message) => {
      ElMessage.success(message)
      get("/api/user/get-user-info", (message) => {
        store.auth.user = message
        router.push("/index")
      }, () => {
        store.auth.user = null
      })
    })
  }
}

const temp_login = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请填写用户名密码')
  } else {
    if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin123') {
      store.auth.user = 'abc'
      router.push("/index")
    } else {
      ElMessage.warning('用户名或密码错误')
    }

  }
}
</script>

<style scoped></style>