<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="main-layout">
    <el-container>
      <el-header height="60px">
        <GlobalHeader /> <!-- 仅在此处保留 Header -->
      </el-header>
      <el-main>
        <div class="three-column-wrapper">
          <aside class="left-sidebar"><NoticeBoard /></aside>
          <main class="main-content">
            <router-view /> <!-- 确保正确渲染子组件 -->
<!--            <Carousel />-->
          </main>
          <aside class="right-sidebar"><AnimeSidebar /></aside>
        </div>
      </el-main>
      <el-footer height="auto">
        <GlobalFooter /> <!-- 仅在此处保留 Footer -->
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
import NoticeBoard from '@/components/layout/NoticeBoard.vue'
import AnimeSidebar from '@/components/layout/AnimeSidebar.vue'
import Carousel from "@/components/ui/Carousel.vue";
</script>

<style scoped>
.three-column-wrapper {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.left-sidebar {
  flex: 0 0 280px;
  position: sticky;
  top: 80px;
  height: fit-content;
}

.main-content {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.right-sidebar {
  flex: 0 0 300px;
  position: sticky;
  top: 80px;
  height: fit-content;
}

@media (max-width: 992px) {
  .three-column-wrapper {
    flex-wrap: wrap;
  }

  .left-sidebar,
  .right-sidebar {
    flex: 1 1 100%;
    position: static;
    margin-bottom: 20px;
  }
}
</style>