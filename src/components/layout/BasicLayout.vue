<!-- src/components/layout/BasicLayout.vue -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header height="60px">
        <GlobalHeader />
      </el-header>
      <el-main>
        <!-- 路由出口将显示HomeView -->
        <router-view />
      </el-main>
      <el-footer height="auto">
        <GlobalFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<!-- 保持其他代码不变 -->

<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-main {
  flex: 1;
  padding: 20px;
}
</style>