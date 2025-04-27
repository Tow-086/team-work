<template>
  <div class="forum-layout">
    <el-container>
      <el-header height="60px">
        <GlobalHeader />
      </el-header>
      <el-main>
        <ForumView /> <!-- 确保正确渲染子组件 -->
      </el-main>
      <el-footer height="auto">
        <GlobalFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
import ForumView from "@/views/ForumView.vue";

</script>

<style scoped>
.forum-layout {
  background: #f5f7fa;
  min-height: 100vh;
}
</style>