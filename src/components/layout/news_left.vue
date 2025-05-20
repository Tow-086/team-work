<template>
  <!-- 整个组件的根元素，用于包裹左侧图片和文章相关的内容，类名为 image-with-articles，方便后续样式控制 -->
  <div class="image-with-articles">
    <!-- 用于包含左侧图片和文章链接的容器，类名为 left-content，采用垂直弹性布局 -->
    <div class="left-content">
      <!-- 展示左侧图片的 img 标签，:src 绑定响应式数据 leftImageSrc 以动态设置图片源，alt 提供图片的替代文本，class 用于指定样式 -->
      <img :src="leftImageSrc" alt="左侧图片" class="side-image">
      <!-- 包含左侧文章链接的容器，类名为 article-links 和 left-links，同样采用垂直弹性布局 -->
      <div class="article-links left-links">
        <!-- 使用 el-link 组件循环渲染左侧文章的链接，v-for 遍历 leftArticles 数组，:href 绑定链接地址，target="_blank" 使链接在新窗口打开，:key 为每个链接设置唯一标识 -->
        <el-link :href="article.link" target="_blank" v-for="(article, index) in leftArticles" :key="index">
          <!-- 显示每篇文章的标题 -->
          {{ article.title }}
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*从 Vue 库中导入 ref 函数，用于创建响应式数据*/
import { ref } from 'vue';
/*导入左侧图片，假设其路径为项目 src/assets/images 目录下的 main_left.jpg */
import leftImage from '@/assets/images/main_left01.jpg';
/* 创建响应式变量 leftImageSrc，用于存储左侧图片的路径，初始值为导入的 leftImage */
const leftImageSrc = ref(leftImage);
/* 创建响应式数组 leftArticles，用于存储左侧文章的相关数据，每个对象包含文章标题和链接 */
const leftArticles = ref([
  { title: '第62届运动会闭幕', link: 'https://www.htu.edu.cn/2025/0418/c21029a342818/page.htm' },
  { title: '文章标题 2', link: 'https://example.com/article2' },
  { title: '文章标题 3', link: 'https://example.com/article3' },
]);
</script>

<style scoped>
/* 为 image-with-articles 类设置样式，将其设为弹性布局，子元素在主轴上居中对齐，子元素间间距为 20px，外边距为 20px */
.image-with-articles {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px;
}
/* 为 left-content 类设置样式，采用垂直弹性布局，子元素在交叉轴上居中对齐，子元素间间距为 10px */
.left-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
/* 为 article-links 类设置样式，采用垂直弹性布局，子元素间间距为 15px */
.article-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
/* 为 side-image 类设置样式，限定图片最大宽度为 150px，高度自适应 */
.side-image {
  max-width: 250px;
  height: auto;
}
/* 设置 el-link 的文本颜色为蓝色 */
.el-link {
  color: #bd6d33;
  font-size: 20px;
  width: 200px; /* 设置宽度为 200px */
  display: inline-block; /* 需要将 el-link 转换为块级元素才能设置宽度 */
  overflow: hidden; /* 隐藏溢出的内容 */
  white-space: nowrap; /* 防止文字换行 */
  text-overflow: ellipsis; /* 溢出部分用省略号显示 */
  text-align: center; /* 新增：使文本在元素内居中 */
}
</style>