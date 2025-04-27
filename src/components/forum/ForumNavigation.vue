<!-- src/components/forum/ForumNavigation.vue -->
<template>
  <div class="forum-nav">
    <h3>≡ 论坛板块</h3>
    <el-menu>
      <el-menu-item index="fresh">校园新鲜事</el-menu-item>
      <el-menu-item index="study">学习交流</el-menu-item>
      <el-menu-item index="life">生活互助</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.forum-nav {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>