<template>
  <div class="footer-container">
    <div class="footer-content">
      <p class="footer-text">
        本项目由Agent制作，若想
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">了解项目</el-link>、
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">提出改进</el-link>、
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">租广告栏</el-link>或
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">赞助合作</el-link>
        请联系：<el-link type="primary" href="mailto:3363009478@qq.com">3363009478@qq.com</el-link>
      </p>
      <p class="footer-copyright">© 2025 Agent Studio. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-container {
  background: #f8f9fa;
  border-top: 1px solid #e4e7ed;
  padding: 24px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  color: #606266;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.footer-copyright {
  color: #909399;
  font-size: 12px;
}


</style>