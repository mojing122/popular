<template>
  <div style="text-align: center;margin: 0 50px">
    <div style="margin-top: 20vh">
      <div style="font-size: 25px; font-weight: bold">新用户注册</div>
    </div>
    <div style="margin-top: 30px">
      <el-form :model="RegisterForm" :rules="rules"
               @validate="onValidate" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="RegisterForm.username" :maxlength="10"
                    type="text" placeholder="用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="RegisterForm.password" type="password"
                    show-password :maxlength="16"
                    placeholder="请设置密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="RegisterForm.password_repeat" type="password"
                    show-password :maxlength="16"
                    placeholder="重复密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="RegisterForm.email" type="email"
                    placeholder="邮箱地址">
            <template #prefix>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="RegisterForm.code" :maxlength="6"
                    placeholder="验证码" type="text">
            <template #append>
              <el-button @click="validateEmail"
                         style="font-size: 10px" size="small"
                         :disabled="!isEmailValid || coldTime > 0" class="get-code-button">
                {{ coldTime>0 ? coldTime+'秒后重试' : '获取验证码'}}
              </el-button>
            </template>
          </el-input>
        </el-form-item>

      </el-form>
    </div>
    <div style="margin-top: 30px">
      <el-button @click="register" type="warning" size="large" style="width: 100%" plain>立即注册</el-button>
    </div>
    <el-divider>
      <span style="color: gray; ">已有账号？</span>
    </el-divider>
    <el-button @click="router.push('/')" type="success" size="large" style="width: 100%" plain>返回登录</el-button>


  </div>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {post} from "@/http";
import router from "@/router/index.js";

const RegisterForm = ref({
  username: '',
  password: '',
  password_repeat: '',
  email: '',
  code: ''
})

const formRef = ref()
const isEmailValid = ref(false)
const coldTime = ref(0)
/**
 * 注册方法
 */
const register = () => {
  formRef.value.validate((isValid) => {
    if(isValid){
      post('api/auth/register', {
        username: RegisterForm.value.username,
        password: RegisterForm.value.password,
        email: RegisterForm.value.email,
        code: RegisterForm.value.code
      }, (message) => {
        ElMessage.success(message)
        router.push("/")
      })
    }else {
      ElMessage.warning('请完整填写信息')
    }
  })
}

/**
 * 发送邮件验证码
 */
const validateEmail = () => {
  coldTime.value = 60
  post('/api/auth/valid-register-email', {
    email: RegisterForm.value.email
  }, (message) => {
    ElMessage.success(message)
    setInterval(() => coldTime.value--, 1000)
  }, (message) => {
    ElMessage.warning(message)
    coldTime.value = 0
  }, (message) => {
    ElMessage.error("未知错误，请联系管理员")
    coldTime.value = 0
  })
}

/**
 * 用户名验证规则
 */
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value)) {
    callback(new Error("用户名不能包含特殊字符"))
  } else {
    callback()
  }
}

/**
 * 确认密码验证规则
 */
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== RegisterForm.value.password) {
    callback(new Error("两次输入的密码不一致!"))
  } else {
    callback()
  }
}

/**
 * 所有验证规则
 */
const rules = {
  username: [
    {validator: validateUsername, trigger: ['blur','change']},
    {min: 2, max: 10, message: '长度在2-10之间', trigger: ['blur','change']},
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {min: 6, max: 16, message: '长度在6-16之间', trigger: ['blur','change']},
  ],
  password_repeat: [
    {validator: validatePassword, trigger: ['blur','change']},
  ],
  email: [
    { required: true, message: '请输入邮件地址', trigger: 'blur' },
    {type: 'email', message: '请输入正确的邮件地址', trigger: ['blur', 'change'],},
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ]
}

/**
 * 判断邮箱地址是否合规并允许发送验证邮件
 */
const onValidate = (prop, isValid) => {
  if(prop === 'email')
    isEmailValid.value = isValid
}
</script>

<style scoped>
.get-code-button{
  color: black !important;
  font-weight: bold;
}
.get-code-button.is-disabled{
  color: #a1a1a1 !important;
  font-weight: normal;
}
</style>