<template>
  <div class="login-container">
    <div class="login-card-container">
      <el-card class="login-card animate__animated animate__fadeIn">
        <h2 class="login-title">
          <span class="title-text">欢迎回来</span>
          <div class="title-decoration"></div>
        </h2>

        <el-form class="login-form">
          <el-form-item>
            <el-input
                v-model="loginForm.email"
                placeholder="请输入邮箱"
                :prefix-icon="Message"
                size="large"
                class="custom-input"
            />
          </el-form-item>

          <el-form-item>
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                size="large"
                show-password
                class="custom-input"
            />
          </el-form-item>

          <el-button
              type="primary"
              size="large"
              class="login-btn"
              @click.prevent="handleLogin"
          >
            <span class="btn-text">立即登录</span>
            <i class="el-icon-arrow-right btn-icon"></i>
          </el-button>

          <div v-if="loginError" class="error-message">
            <i class="el-icon-warning"></i>
            {{ loginError }}
          </div>

          <div class="login-footer">
            <el-link type="info" @click.prevent="gotoRegister">
              <i class="el-icon-user"></i>
              注册新账号
            </el-link>
            <el-link type="primary" class="forget-pwd" @click.prevent="gotoResetPassword">
              <i class="el-icon-key"></i>
              忘记密码
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Message } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { AuthAPI } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const gotoResetPassword = () => {
  router.push('/reset-password')
}

const loginForm = reactive({
  email: '',
  password: ''
})

const loginError = ref<string | null>(null)

const handleLogin = async () => {
  try {
    const response = await AuthAPI.login({
      email: loginForm.email,
      password: loginForm.password
    });

    console.log('Response:', response); // 添加日志以调试

    const backendData = response.data;
    if (!backendData?.data?.user) {
      throw new Error('用户信息缺失');
    }

    const { nickname, token } = backendData.data.user;
    if (!nickname || !token) {
      throw new Error('用户信息不完整');
    }

    userStore.login({
      nickname: nickname,
      token: token
    });

    router.push('/'); // 登录成功后跳转到首页
  } catch (error: any) {
    loginError.value = error.message || '登录失败，请检查输入';
    setTimeout(() => loginError.value = null, 3000);
  }
}

const gotoRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card-container {
  position: relative;
  z-index: 1;
}

.login-card {
  width: 480px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
}

.login-title {
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

.login-form {
  :deep(.el-form-item) {
    margin-bottom: 28px;
  }
}

.custom-input {
  :deep(.el-input__wrapper) {
    border-radius: 12px;
    padding: 14px 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.is-focus {
      box-shadow: 0 0 0 2px var(--el-color-primary-light-5);
    }
  }
}

.login-btn {
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
      transform: translateX(4px);
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

.login-footer {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;

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

  .shape {
    position: absolute;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    background: linear-gradient(45deg, var(--el-color-primary-light-8), var(--el-color-primary-light-5));
    opacity: 0.1;
  }

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(10px, 10px) rotate(5deg);
    }
    50% {
      transform: translate(-10px, 15px) rotate(-5deg);
    }
    75% {
      transform: translate(15px, -10px) rotate(3deg);
    }
  }

  @media (max-width: 768px) {
    .login-card {
      width: 90%;
      padding: 30px;
    }

    .login-title .title-text {
      font-size: 24px;
    }
  }
}
</style>
