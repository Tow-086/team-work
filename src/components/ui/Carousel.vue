<template>
  <!-- 轮播图的容器，通过类名carousel-container定义样式 -->
  <div class="carousel-container">
    <!-- Element Plus的轮播图组件，设置高度为400px，开启运动模糊效果，切换间隔为5秒，指示器位置在外部 -->
    <el-carousel
        height="400px"
        motion-blur
        :interval="5000"
        indicator-position="outside"
    >
      <!-- 循环遍历carouselItems数组，为每个轮播项创建一个el-carousel-item，点击时触发handleCarouselClick方法并传递当前项的链接 -->
      <el-carousel-item
          v-for="(item, index) in carouselItems"
          :key="index"
          @click="handleCarouselClick(item.link)"
      >
        <!-- 轮播图中的图片，设置图片源为item.image，添加类名carousel-image，设置替代文本 -->
        <img
            :src="item.image"
            class="carousel-image"
            :alt="'Banner'+ (index + 1)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
/* 导入Vue的ref函数，用于创建响应式数据 */
import { ref } from 'vue'

/* 定义CarouselItem接口，用于描述轮播项的数据结构，包含图片地址image和链接地址link */
interface CarouselItem {
  image: string
  link: string
}

/* 创建一个响应式变量carouselItems，类型为CarouselItem数组，初始值为包含三个轮播项的数组，每个轮播项有图片和链接 */
const carouselItems = ref<CarouselItem[]>([
  {
    image: new URL('@/assets/images/test03.jpg', import.meta.url).href,
    link: 'https://www.baidu.com'
  },
  {
    image: new URL('@/assets/images/test01.jpeg', import.meta.url).href,
    link: 'https://www.quark.com'
  },
  {
    image: new URL('@/assets/images/test02.jpg', import.meta.url).href,
    link: 'https://www.sohu.com'
  }
])

/* 轮播图点击事件的处理函数，接受一个链接参数，通过window.open在新标签页中打开链接 */
const handleCarouselClick = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
/* 轮播图容器的样式，设置最大宽度、宽度、外边距、边框圆角、溢出隐藏和阴影效果 */
.carousel-container {
  max-width: 800px; /* 最大宽度限制 */
  width: 90%;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 轮播图中图片的样式，设置宽度、高度、对象适配方式、对象位置、鼠标指针样式和过渡效果 */
.carousel-image {
  width: 100%;
  height: 400px; /* 与carousel高度一致 */
  object-fit: cover; /* 保持比例填充容器 */
  object-position: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* 轮播图图片的悬停样式，鼠标悬停时图片放大 */
.carousel-image:hover {
  transform: scale(1.02);
}

/* 深度选择器，修改Element Plus轮播图指示器的样式，设置内边距，以及激活状态下按钮的背景颜色 */
:deep(.el-carousel__indicator) {
  padding: 12px 4px;

  &.is-active .el-carousel__button {
    background: var(--el-color-primary);
  }
}

/* 深度选择器，修改Element Plus轮播图指示器按钮的样式，设置宽度、高度、边框圆角和背景颜色 */
:deep(.el-carousel__button) {
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: var(--el-color-info-light-5);
}

/* 媒体查询，当屏幕宽度小于等于768px时，调整轮播图容器、图片和指示器按钮的样式以实现响应式布局 */
@media (max-width: 768px) {
  .carousel-container {
    width: 95%;
    margin: 10px auto;
  }

  .carousel-image {
    height: 300px;
    object-fit: contain;
  }

  :deep(.el-carousel__button) {
    width: 20px;
  }
}
</style>