<template>
  <!-- 底部容器的最外层 div，用于包裹整个底部内容，通过 footer-container 类名设置样式 -->
  <div class="footer-container">
    <!-- 底部内容的容器，通过 footer-content 类名设置样式，用于集中管理底部的文本和链接等内容 -->
    <div class="footer-content">
      <!-- 包含项目相关信息和联系链接的段落，通过 footer-text 类名设置样式 -->
      <p class="footer-text">
        本项目由Agent制作，若想
        <!-- Element Plus 的链接组件，设置为主要样式，去掉下划线，点击后会打开邮件客户端发送邮件给指定邮箱，文本内容为“了解项目” -->
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">了解项目</el-link>、
        <!-- 同上，文本内容为“提出改进” -->
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">提出改进</el-link>、
        <!-- 同上，文本内容为“租广告栏” -->
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">租广告栏</el-link>或
        <!-- 同上，文本内容为“赞助合作” -->
        <el-link type="primary" :underline="false" href="mailto:3363009478@qq.com">赞助合作</el-link>
        请联系：
        <!-- 同样是链接组件，点击后打开邮件客户端发送邮件，文本内容为邮箱地址 -->
        <el-link type="primary" href="mailto:3363009478@qq.com">3363009478@qq.com</el-link>
      </p>
      <!-- 包含版权信息的段落，通过 footer-copyright 类名设置样式 -->
      <p class="footer-copyright">© 2025 Agent Studio. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此部分目前为空，后续若有与该组件交互或逻辑相关的功能，可在此添加 TypeScript 代码，
// 例如处理链接点击事件、动态更新版权信息等
</script>

<style scoped>
/* 底部容器的样式设置，scoped 表示样式只作用于当前组件 */
.footer-container {
  /* 背景颜色设置为浅灰色 */
  background: #d1dae1;
  /* 顶部边框为 1 像素的实线，颜色为稍浅的灰色 */
  border-top: 1px solid #e4e7ed;
  /* 上下内边距为 24 像素，左右内边距为 0 */
  padding: 24px 0;
}

/* 底部内容容器的样式设置 */
.footer-content {
  /* 最大宽度设置为 1900 像素，使内容在较宽屏幕上也不会过宽 */
  max-width: 1900px;
  /* 水平居中对齐 */
  margin: 0 auto;
  /* 内部文本水平居中 */
  text-align: center;
}

/* 包含项目信息和链接的段落的样式设置 */
.footer-text {
  /* 文本颜色设置为深蓝色 */
  color: #0d1e81;
  /* 字体大小为 14 像素 */
  font-size: 14px;
  /* 行高为 1.8 倍字体大小 */
  line-height: 1.8;
  /* 底部外边距为 8 像素 */
  margin-bottom: 8px;
  /* 使用 flex 布局 */
  display: flex;
  /* 允许子元素换行 */
  flex-wrap: wrap;
  /* 子元素在水平方向上居中排列 */
  justify-content: center;
  /* 子元素之间的间距为 4 像素 */
  gap: 4px;
}

/* 版权信息段落的样式设置 */
.footer-copyright {
  /* 文本颜色设置为橙红色 */
  color: #c43e1d;
  /* 字体大小为 12 像素 */
  font-size: 12px;
}
</style>