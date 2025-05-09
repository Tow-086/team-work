<template>
  <div class="header-container">
    <!-- Logo -->
    <router-link to="/" class="logo">
      <img src="../../assets/images/logo.jpg" alt="logo" style="height: 60px">
    </router-link>

    <!-- 优化后的导航菜单 -->
    <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        class="nav-menu"
        router
        :ellipsis="false"
        style="flex-wrap: nowrap; min-width: 0"
    >
      <!-- 学校概况 -->
      <el-sub-menu
          index="1"
          style="min-width: 110px; --el-menu-horizontal-sub-item-height: 56px"
      >
        <template #title>学校概况</template>
        <el-menu-item index="1-1">学校简介</el-menu-item>
        <el-menu-item index="1-2">历史沿革</el-menu-item>
        <el-menu-item index="1-3">平原湖校区</el-menu-item>
      </el-sub-menu>

      <el-menu-item
          index="2"
          style="min-width: 90px; padding: 0 12px"
      >软院风采</el-menu-item>

      <el-menu-item
          index="3"
          style="min-width: 90px; padding: 0 12px"
      >社团建设</el-menu-item>

      <!-- 新生答疑 -->
      <el-sub-menu
          index="4"
          style="min-width: 110px; --el-menu-horizontal-sub-item-height: 56px"
      >
        <template #title>新生答疑</template>
        <el-menu-item index="4-1">入学答疑</el-menu-item>
        <el-menu-item index="4-2">常见问题</el-menu-item>
        <el-menu-item index="4-3">校园地图</el-menu-item>
      </el-sub-menu>

      <!-- 校园论坛 -->
      <el-menu-item
          index="talk"
          style="min-width: 90px; margin-right: 0; padding: 0 12px"
          @click="handleForumClick"
      >
        校园论坛
      </el-menu-item>
    </el-menu>

    <!-- 自适应搜索栏 -->
    <div class="search-wrapper">
      <el-input
          v-model="searchKey"
          placeholder="搜索内容..."
          style="width: 260px"
          @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon class="search-icon" @click="handleSearch">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 用户登录信息 -->
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
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore()
const router = useRouter()
const activeIndex = ref<string>('1')
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

const handleLogin = () => {
  router.push('/login')
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
  gap: 12px;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
}

.logo {
  margin-right: 30px;
  flex-shrink: 0;
}

.nav-menu {
  flex: 1;
  min-width: 0; /* 允许弹性收缩 */
  border-bottom: none;
  overflow: visible !important;
}

.search-wrapper {
  margin-left: auto;
  flex-shrink: 0;
  width: 260px;
  transition: all 0.3s;
}

.auth-buttons {
  flex-shrink: 0;
  margin-left: 12px;
}

/* 强制覆盖Element默认样式 */
:deep(.el-menu--horizontal) {
  border-bottom: none !important;
  display: flex !important;
  align-items: center;
}

:deep(.el-sub-menu__title),
:deep(.el-menu-item) {
  height: 56px !important;
  padding: 0 12px !important;
  margin: 0 4px !important;
  transition: none !important;
}

:deep(.el-menu--horizontal > .el-sub-menu),
:deep(.el-menu--horizontal > .el-menu-item) {
  --el-menu-horizontal-sub-item-height: 56px;
}

.login-register {
  /* 保持原有登录按钮样式 */
}
</style>

<!-- 全局溢出控制 -->
<style>
body {
  overflow-x: hidden;
}
</style>