<template>
  <div class="empty-layout">
    <el-container>
<!--      <el-header height="60px">-->
<!--        <GlobalHeader /> &lt;!&ndash; 登录页也需要 Header &ndash;&gt;-->
<!--      </el-header>-->
      <el-main>
        <main class="main-content">
          <router-view />
        </main>
      </el-main>
<!--      <el-footer height="auto">-->
<!--        <GlobalFooter /> &lt;!&ndash; 登录页也需要 Footer &ndash;&gt;-->
<!--      </el-footer>-->
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
// 删除硬编码的 LoginView 导入
</script>

<style scoped>
.empty-layout {
  background: #f5f7fa;
  min-height: 100vh;
}
</style>