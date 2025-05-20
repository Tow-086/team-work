<template>
  <div class="reset-container">
    <div class="reset-card-container">
      <el-card class="reset-card animate__animated animate__fadeIn">
        <h2 class="reset-title">
          <span class="title-text">重置密码</span>
          <div class="title-decoration"></div>
        </h2>

        <el-form class="reset-form">
          <el-form-item>
            <el-input
                v-model="resetForm.email"
                placeholder="请输入注册邮箱"
                :prefix-icon="Message"
                size="large"
                class="custom-input"
            />
          </el-form-item>

          <el-form-item class="code-item">
            <el-input
                v-model="resetForm.code"
                placeholder="请输入验证码"
                :prefix-icon="Key"
                size="large"
                class="custom-input code-input"
            />
            <el-button
                type="primary"
                size="large"
                class="code-btn"
                @click.prevent="handleSendCode"
                :disabled="isSending"
            >
              {{ codeBtnText }}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-input
                v-model="resetForm.newPassword"
                type="password"
                placeholder="请输入新密码"
                :prefix-icon="Lock"
                size="large"
                show-password
                class="custom-input"
            />
          </el-form-item>

          <el-button
              type="primary"
              size="large"
              class="reset-btn"
              @click.prevent="handleReset"
          >
            <span class="btn-text">立即重置</span>
            <i class="el-icon-check btn-icon"></i>
          </el-button>

          <div v-if="resetError" class="error-message">
            <i class="el-icon-warning"></i>
            {{ resetError }}
          </div>

          <div class="reset-footer">
            <el-link type="info" @click.prevent="gotoLogin">
              <i class="el-icon-back"></i>
              返回登录
            </el-link>
          </div>
        </el-form>
      </el-card>
    </div>

    <div class="decorative-bg">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { Message, Lock, Key } from '@element-plus/icons-vue'
import { AuthAPI } from '@/api/auth'
import {ElMessage} from "element-plus";

const router = useRouter()

// 表单数据
const resetForm = reactive({
  email: '',
  code: '',
  newPassword: ''
})

// 错误提示
const resetError = ref<string | null>(null)

// 验证码发送状态
const isSending = ref(false)
const codeBtnText = ref('获取验证码')
let countdown = 60

// 发送验证码
const handleSendCode = async () => {
  if (!resetForm.email) {
    resetError.value = '请输入邮箱地址'
    setTimeout(() => resetError.value = null, 3000)
    return
  }

  try {
    isSending.value = true
    await AuthAPI.sendCode(resetForm.email, 'reset') // 传递reset类型
    startCountdown()
    resetError.value = null
  } catch (error: any) {
    resetError.value = error.message || '验证码发送失败'
    setTimeout(() => resetError.value = null, 3000)
  } finally {
    isSending.value = false
  }
}

// 倒计时逻辑
const startCountdown = () => {
  const timer = setInterval(() => {
    codeBtnText.value = `${countdown}秒后重试`
    countdown--
    if (countdown < 0) {
      clearInterval(timer)
      codeBtnText.value = '获取验证码'
      countdown = 60
    }
  }, 1000)
}

// 提交重置
const handleReset = async () => {
  if (!resetForm.email || !resetForm.code || !resetForm.newPassword) {
    resetError.value = '请填写完整信息'
    setTimeout(() => resetError.value = null, 3000)
    return
  }

  try {
    await AuthAPI.resetPassword({
      email: resetForm.email,
      code: resetForm.code,
      password: resetForm.newPassword
    })
    ElMessage.success('密码重置成功')
    router.push('/login')
  } catch (error: any) {
    resetError.value = error.message || '密码重置失败'
    setTimeout(() => resetError.value = null, 3000)
  }
}

const gotoLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.reset-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-card-container {
  position: relative;
  z-index: 1;
}

.reset-card {
  width: 480px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}

.reset-title {
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  .title-text {
    font-size: 28px;
    color: #2c3e50;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .title-decoration {
    width: 60px;
    height: 4px;
    background: var(--el-color-primary);
    margin: 12px auto;
    border-radius: 2px;
  }
}

.code-item {
  position: relative;

  .code-input {
    width: calc(100% - 130px);
    margin-right: 10px;
  }

  .code-btn {
    width: 120px;
    height: 40px;
  }
}

.reset-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .btn-text {
    margin-right: 8px;
  }

  .btn-icon {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    .btn-icon {
      transform: scale(1.1);
    }
  }
}

/* 复用登录页的装饰样式 */
.decorative-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .shape {
    position: absolute;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    background: linear-gradient(45deg, var(--el-color-primary-light-8), var(--el-color-primary-light-5));
    opacity: 0.1;
    animation: float 20s infinite;
  }

  .shape-1 {
    top: 20%;
    left: 10%;
    width: 200px;
    height: 200px;
  }

  .shape-2 {
    top: 60%;
    right: 15%;
    width: 150px;
    height: 150px;
    animation-delay: 5s;
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(5deg); }
  50% { transform: translate(-10px, 15px) rotate(-5deg); }
  75% { transform: translate(15px, -10px) rotate(3deg); }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fee;
  border-radius: 8px;
  color: #f56c6c; /* 关键修改：添加红色 */
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
    font-size: 18px;
  }
}
.reset-footer {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .reset-card {
    width: 90%;
    padding: 30px;
  }
}
</style>