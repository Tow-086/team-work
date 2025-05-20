<template>
  <!-- 页面头部的容器 -->
  <div class="header-container">
    <!-- 网站 Logo 的路由链接 -->
    <router-link to="/" class="logo">
      <img src="../../assets/images/logo.jpg" alt="logo" style="height: 60px">
    </router-link>

    <!-- Element Plus 的水平导航菜单组件 -->
    <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="nav-menu"
    >
      <!-- “学校概况”的二级菜单 -->
      <el-sub-menu index="1">
        <template #title>学校概况</template>
        <el-menu-item index="1-1" @click="handleMenuItemClick('/intro')">学校简介</el-menu-item>
        <el-menu-item index="1-2" @click="handleMenuItemClick('/history')">历史沿革</el-menu-item>
        <el-menu-item index="1-3" @click="handleMenuItemClick('/Pinyuan')">平原湖校区</el-menu-item>
      </el-sub-menu>

      <!-- 菜单项“软院风采” -->
      <el-menu-item index="2" @click="handleMenuItemClick('/fengcai')">软院风采</el-menu-item>

      <!-- 菜单项“社团建设” -->
      <el-menu-item index="3" @click="handleMenuItemClick('/Shetuan')">社团建设</el-menu-item>

      <!-- “新生答疑论坛”的二级菜单 -->
      <el-sub-menu index="4">
        <template #title>新生答疑论坛</template>
        <el-menu-item index="4-1" @click="handleMenuItemClick('/question')">入学答疑</el-menu-item>
        <el-menu-item index="4-2">常见问题</el-menu-item>
        <el-menu-item index="4-3" @click="handleMenuItemClick('/map')">校园地图</el-menu-item>
      </el-sub-menu>

      <!-- “校园论坛”的二级菜单 -->
      <el-sub-menu index="5">
        <template #title>校园论坛</template>
        <el-menu-item index="5-1">校园新鲜事</el-menu-item>
        <el-menu-item index="5-2">学习交流</el-menu-item>
        <el-menu-item index="5-3">生活互助</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <!-- 搜索栏的容器 -->
    <div class="search-wrapper">
      <!-- Element Plus 的输入框组件 -->
      <el-input
          v-model="searchKey"
          placeholder="搜索内容..."
          style="width: 300px"
          @keyup.enter="handleSearch"
      >
        <!-- 输入框的前缀插槽 -->
        <template #prefix>
          <el-icon class="search-icon" @click="handleSearch">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 登录/注册和用户信息相关的按钮容器 -->
    <div class="auth-buttons">
      <!-- 当用户未登录时显示登录/注册按钮 -->
      <div v-if="!userStore.isLoggedIn" class="login-register" @click="handleLogin">
        登录/注册
      </div>

      <!-- 当用户已登录时显示用户信息和下拉菜单 -->
      <el-dropdown v-else>
        <!-- 用户信息的展示区域 -->
        <span class="user-info">
          <el-avatar :size="30" :src="userStore.userInfo?.avatar" />
          {{ userStore.userInfo?.nickname }}
        </span>
        <!-- 下拉菜单的内容模板 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="userStore.logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
/* 导入 Vue 中的 ref 函数 */
import { ref } from 'vue'
/* 导入 Element Plus 中的 Search 图标组件 */
import { Search } from '@element-plus/icons-vue'
/* 导入 Vue Router 中的 useRouter 函数 */
import { useRouter } from 'vue-router'
/* 导入用户相关的存储模块 */
import { useUserStore } from "@/stores/user.ts";

/* 获取用户存储的实例 */
const userStore = useUserStore()
/* 获取路由的实例 */
const router = useRouter()
/* 定义一个响应式变量 activeIndex，用于控制导航菜单的默认激活项 */
const activeIndex = ref<string>('1')

/* 定义一个响应式变量 searchKey，用于存储搜索关键词 */
const searchKey = ref('')

/* 搜索功能的处理函数 */
const handleSearch = () => {
  if (searchKey.value.trim()) {
    console.log('执行搜索:', searchKey.value)
    // 实际搜索逻辑
  }
}

/* 登录/注册功能的处理函数 */
const handleLogin = () => {
  console.log('触发登录/注册功能')
  router.push('/login') // 跳转到登录页面
}

/* 菜单项点击处理函数，接收路由路径作为参数 */
const handleMenuItemClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  gap: 20px; /* 元素间距统一调整 */
}

.search-wrapper {
  margin-left: 150px;
  flex: none;
  width: 350px;
  transition: all 0.3s;
}

.logo {
  margin-right: 60px;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
}

.auth-buttons {
  display: flex;
  gap: 10px;
  position: relative;
}

.el-menu--horizontal > * {
  margin: 0 10px !important;
}

.login-register {
  position: relative;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-color-primary);
  background: linear-gradient(45deg, #f8f9fa, #ffffff);
  border-radius: 20px;
  border: 1px solid var(--el-color-primary-light-5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(28, 31, 35, 0.06);
  display: flex;
  align-items: center;
  gap: 6px;
}

.login-register::before {
  content: "👤";
  font-size: 16px;
}

.login-register:hover {
  background: linear-gradient(45deg, #f3f4f6, #f8f9fa);
  box-shadow: 0 4px 12px rgba(28, 31, 35, 0.12);
  transform: translateY(-1px);
  color: var(--el-color-primary-dark-2);
  border-color: var(--el-color-primary);
}

.login-register:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(28, 31, 35, 0.08);
}
</style>