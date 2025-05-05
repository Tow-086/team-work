<template>
  <div class="header-container">
    <!-- Logo -->
    <router-link to="/" class="logo">
      <img src="../../assets/images/logo.jpg" alt="logo" style="height: 60px">
    </router-link>

    <!-- 导航菜单 -->
    <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="nav-menu"
        router
    >
      <!-- 学校概况 -->
      <el-sub-menu index="1">
        <template #title>学校概况</template>
        <el-menu-item index="1-1">学校简介</el-menu-item>
        <el-menu-item index="1-2">历史沿革</el-menu-item>
        <el-menu-item index="1-3">平原湖校区</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="2">软院风采</el-menu-item>
      <el-menu-item index="3">社团建设</el-menu-item>

      <!-- 新生答疑论坛 -->
      <el-sub-menu index="4">
        <template #title>新生答疑论坛</template>
        <el-menu-item index="4-1">入学答疑</el-menu-item>
        <el-menu-item index="4-2">常见问题</el-menu-item>
        <el-menu-item index="4-3">校园地图</el-menu-item>
      </el-sub-menu>

      <!-- 校园论坛 -->
      <!-- 直接通过 index 属性指定路径 -->
      <el-menu-item
          index="talk"
          class="el-menu-item"
          @click="handleForumClick"
      >
        校园论坛
      </el-menu-item>


      <!--      <el-sub-menu index="5">-->
<!--        <template #title>校园论坛</template>-->
<!--        <el-menu-item index="5-1">校园新鲜事</el-menu-item>-->
<!--        <el-menu-item index="5-2">学习交流</el-menu-item>-->
<!--        <el-menu-item index="5-3">生活互助</el-menu-item>-->
<!--      </el-sub-menu>-->
    </el-menu>

    <!-- 搜索栏（向左调整后的样式） -->
    <div class="search-wrapper">
      <el-input
          v-model="searchKey"
          placeholder="搜索内容..."
          style="width: 300px"
          @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon class="search-icon" @click="handleSearch">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 修改后的登录注册按钮 -->
    <div class="auth-buttons">
      <div v-if="!userStore.isLoggedIn" class="login-register" @click="handleLogin">
        登录/注册
      </div>
      <el-dropdown v-else>
      <span class="user-info">
        <el-avatar :size="30" :src="userStore.userInfo?.nickname" />
        {{ userStore.userInfo?.nickname }}
      </span>
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
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {useUserStore} from "@/stores/user.ts";

const userStore = useUserStore()
const router = useRouter()
const activeIndex = ref<string>('1') // 明确类型为string

// 搜索相关
const searchKey = ref('')
const handleSearch = () => {
  if (searchKey.value.trim()) {
    console.log('执行搜索:', searchKey.value)
    // 实际搜索逻辑
  }
}

const handleForumClick = () => {
  router.push('/talk')
}


// 登录/注册相关
const handleLogin = () => {
  console.log('触发登录/注册功能')
  router.push('/login')
}

// const handleForumClick = () => {
//   router.push('/talk')
// }

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

/* 增强型搜索栏定位 */
.search-wrapper {
  margin-left: 150px;  /* 进一步左移 */
  flex: none;          /* 固定宽度 */
  width: 350px;        /* 明确宽度 */
  transition: all 0.3s; /* 添加过渡动画 */
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