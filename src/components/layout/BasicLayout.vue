<!-- src/components/layout/BasicLayout.vue -->
<template>
  <!-- 最外层容器，使用 common-layout 类来设置整体布局样式 -->
  <div class="common-layout">
    <!-- ElementPlus 的容器组件，用于构建页面整体布局 -->
    <el-container>
      <!-- ElementPlus 的头部组件，高度固定为 60px -->
      <el-header height="60px">
        <!-- 引入自定义的全局头部组件 -->
        <GlobalHeader />
      </el-header>
      <!-- ElementPlus 的主体内容区域组件 -->
      <el-main>
        <!-- 路由出口，会根据当前路由路径动态渲染对应的组件，此处注释表明默认会显示 HomeView 组件 -->
        <router-view />
      </el-main>
      <!-- ElementPlus 的底部组件，高度自动适应内容 -->
      <el-footer height="auto">
        <!-- 引入自定义的全局底部组件 -->
        <GlobalFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<!-- 保持其他代码不变 -->
<script setup lang="ts">
// 从指定路径导入全局头部组件，以便在模板中使用
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
// 从指定路径导入全局底部组件，以便在模板中使用
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
</script>

<style scoped>
/* 设置最外层容器的样式 */
.common-layout {
  /* 最小高度为视口高度，确保内容至少占满一屏 */
  min-height: 100vh;
  /* 使用 Flexbox 布局 */
  display: flex;
  /* 子元素垂直排列 */
  flex-direction: column;
}

/* 设置主体内容区域的样式 */
.el-main {
  /* 自动填充剩余空间 */
  flex: 1;
  /* 内边距为 20px，增加内容与边界的间距 */
  padding: 20px;
}
</style>