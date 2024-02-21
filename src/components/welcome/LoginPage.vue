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
      <el-col :span="24" style="text-align: right"><el-link @click="router.push('/forget')"
          style="font-size: 12px">忘记密码</el-link></el-col>
    </el-row>
    <div style="margin-top: 30px">
      <el-button @click="login" type="success" size="large" style="width: 100%" plain>登录</el-button>
    </div>

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
})

/**
 * 登陆功能
 */
const login = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请填写用户名密码')
  } else {
    post('/user/login', {
      userName: loginForm.value.username,
      password: loginForm.value.password,
    },
      (message) => {
        ElMessage.success("登陆成功！")
        store.user = 'login'
        router.push("/index")
      },
      'application/x-www-form-urlencoded')
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