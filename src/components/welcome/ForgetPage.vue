<template>
  <div>
    <div style="text-align: center;margin: 0 50px">
      <div style="margin-top: 20vh; margin-bottom: 50px">
        <div style="font-size: 25px; font-weight: bold">重置密码</div>
      </div>
      <div style="text-align: left; margin: 0 5px">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="验证电子邮件" />
          <el-step title="设置新密码" />
        </el-steps>
      </div>
      <transition name="el-fade-in-linear" mode="out-in">
        <div style="margin-top: 30px; height: 50vh" v-if="active === 0">
          <el-form :model="ForgetForm" :rules="rules"
                   @validate="onValidate" ref="formRef">
            <el-form-item prop="email">
              <el-input v-model="ForgetForm.email" type="email"
                        placeholder="邮箱地址" size="large">
                <template #prefix>
                  <el-icon><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="ForgetForm.code" :maxlength="6"
                        placeholder="验证码" type="text" size="large">
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
          <div style="margin-top: 50px">
            <el-button @click="startReset"
                       type="warning" size="large"
                       style="width: 100%" plain>
              验证邮箱
            </el-button>
          </div>
        </div>
      </transition>
      <transition name="el-fade-in-linear" mode="out-in">
        <div style="margin-top: 30px; height: 50vh" v-if="active === 1">
          <el-form :model="ForgetForm" :rules="rules"
                   @validate="onValidate" ref="formRef">
            <el-form-item prop="password">
              <el-input v-model="ForgetForm.password" type="password"
                        show-password :maxlength="16" size="large"
                        placeholder="请设置新密码">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password_repeat">
              <el-input v-model="ForgetForm.password_repeat" type="password"
                        show-password :maxlength="16" size="large"
                        placeholder="重复新密码">
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top: 50px">
            <el-button @click="doReset"
                       type="danger" size="large"
                       style="width: 100%" plain>
              重置密码
            </el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {post} from "@/http";
import router from "@/router/index.js";

const ForgetForm = ref({
  email: '',
  code: '',
  password: '',
  password_repeat: ''
})

const active = ref(0)
const formRef = ref()
const isEmailValid = ref(false)
const coldTime = ref(0)

/**
 * 发送邮件验证码
 */
const validateEmail = () => {
  coldTime.value = 60
  post('/api/auth/valid-reset-email', {
    email: ForgetForm.value.email
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
 * 重置前验证邮箱
 */
const startReset = () => {
  formRef.value.validate((isValid) => {
    if(isValid){
      post('/api/auth/start-reset', {
        email: ForgetForm.value.email,
        code: ForgetForm.value.code
      }, () => {
        active.value++
      })
    }else {
      ElMessage.warning('请正确填写电子邮件以及验证码')
    }
  })
}

const doReset = () => {
  formRef.value.validate((isValid) => {
    if(isValid){
      post('/api/auth/do-reset', {
        password: ForgetForm.value.password,
      }, (message) => {
        ElMessage.success(message)
        router.push('/')
      })
    }else {
      ElMessage.warning('请正确填写新的密码')
    }
  })
}

/**
 * 确认密码验证规则
 */
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ForgetForm.value.password) {
    callback(new Error("两次输入的密码不一致!"))
  } else {
    callback()
  }
}

/**
 * 所有验证规则
 */
const rules = {
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