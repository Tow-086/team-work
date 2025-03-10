<!-- src/views/HomeView.vue -->
<template>
  <div class="home-container">
    <div class="carousel-section">
      <Carousel />
    </div>

    <!-- 其他主页内容 -->
    <div class="content-section">
      <h1>欢迎来到校园信息平台</h1>
      <!-- 可以继续添加其他模块 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/ui/Carousel.vue'
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-section {
  margin-bottom: 40px;
}

.content-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
  color: var(--el-color-primary);
  text-align: center;
  margin-bottom: 30px;
}
</style>