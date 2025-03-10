<template>
  <div class="register-container">
    <div class="register-card-container">
      <el-card class="register-card animate__animated animate__fadeInUp">
        <h2 class="register-title">
          <span class="title-text">加入我们</span>
          <div class="title-decoration"></div>
        </h2>

        <el-form class="register-form">
          <el-form-item>
            <el-input
                v-model="registerForm.userEmail"
                placeholder="请输入邮箱"
                :prefix-icon="Message"
                size="large"
                class="custom-input"
            />
          </el-form-item>

          <el-form-item>
            <el-input
                v-model="registerForm.userName"
                placeholder="设置用户名"
                :prefix-icon="User"
                size="large"
                class="custom-input"
            />
          </el-form-item>

          <el-form-item>
            <el-input
                v-model="registerForm.userPassword"
                type="password"
                placeholder="设置密码"
                :prefix-icon="Lock"
                size="large"
                show-password
                class="custom-input"
            />
          </el-form-item>

          <div class="code-wrapper">
            <el-input
                v-model="registerForm.userCode"
                placeholder="验证码"
                :prefix-icon="Key"
                size="large"
                class="custom-input"
            />
            <el-button
                type="primary"
                plain
                size="large"
                class="code-btn"
                :disabled="isCounting"
                @click="sendCode"
            >
              {{ isCounting ? `${countdown}秒后重试` : '获取验证码' }}
            </el-button>
          </div>

          <el-button
              type="primary"
              size="large"
              class="register-btn"
              @click.prevent="handleRegister"
          >
            <span class="btn-text">立即注册</span>
            <i class="el-icon-success btn-icon"></i>
          </el-button>

          <div v-if="registerError" class="error-message">
            <i class="el-icon-warning"></i>
            {{ registerError }}
          </div>

          <div class="register-footer">
            <el-link type="info" @click.prevent="gotoLogin">
              <i class="el-icon-arrow-left"></i>
              已有账号？立即登录
            </el-link>
          </div>
        </el-form>
      </el-card>
    </div>

    <div class="decorative-bg">
      <div class="shape shape-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { useRouter } from 'vue-router'
import { Message, User, Lock, Key } from '@element-plus/icons-vue'
import { AuthAPI } from '@/api/auth'

const router = useRouter()

const registerForm = reactive({
  userEmail: '',
  userName: '',
  userPassword: '',
  userCode: ''
})

const registerError = ref<string | null>(null)
const isCounting = ref(false)
const countdown = ref(60)

// 验证码倒计时逻辑
const startCountdown = () => {
  isCounting.value = true
  const timer = setInterval(() => {
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
      countdown.value = 60
      return
    }
    countdown.value--
  }, 1000)
}

// 发送验证码
const sendCode = async () => {
  if (!registerForm.userEmail) {
    registerError.value = '请输入邮箱地址'
    return
  }

  try {
    await AuthAPI.sendCode(registerForm.userEmail)
    startCountdown()
  } catch (error: any) {
    registerError.value = error.message || '验证码发送失败'
    setTimeout(() => registerError.value = null, 3000)
  }
}

// 注册提交
const handleRegister = async () => {
  try {
    await AuthAPI.register({
      userEmail: registerForm.userEmail,
      userCode: registerForm.userCode,
      userName: registerForm.userName,
      userPassword: registerForm.userPassword
    })

    // 注册成功后跳转登录
    router.push('/login')
  } catch (error: any) {
    registerError.value = error.message || '注册失败，请检查输入'
    setTimeout(() => registerError.value = null, 3000)
  }
}

const gotoLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card-container {
  position: relative;
  z-index: 1;
}

.register-card {
  width: 480px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}

.register-title {
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

.code-wrapper {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  .code-btn {
    width: 140px;
    flex-shrink: 0;
    border-radius: 12px;
  }
}

.register-btn {
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
      transform: scale(1.2);
    }
  }
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fee;
  border-radius: 8px;
  color: #f56c6c;
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
    font-size: 18px;
  }
}

.register-footer {
  margin-top: 32px;

  .el-link {
    font-size: 14px;

    i {
      margin-right: 6px;
    }
  }
}

.decorative-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .shape-3 {
    width: 500px;
    height: 500px;
    position: absolute;
    right: -150px;
    bottom: -150px;
    background: linear-gradient(45deg, var(--el-color-primary-light-8), var(--el-color-primary-light-5));
    opacity: 0.1;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation: rotate 30s linear infinite;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .register-card {
    width: 90%;
    padding: 30px;
  }

  .code-wrapper {
    flex-direction: column;

    .code-btn {
      width: 100%;
    }
  }
}
</style>
