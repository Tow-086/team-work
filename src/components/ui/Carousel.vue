<template>
  <div class="carousel-container">
    <el-carousel
        height="400px"
        motion-blur
        :interval="5000"
        indicator-position="outside"
    >
      <el-carousel-item
          v-for="(item, index) in carouselItems"
          :key="index"
          @click="handleCarouselClick(item.link)"
      >
        <img
            :src="item.image"
            class="carousel-image"
            :alt="'Banner ' + (index + 1)"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface CarouselItem {
  image: string
  link: string
}

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

const handleCarouselClick = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped>
/* 容器样式调整 */
.carousel-container {
  max-width: 800px; /* 最大宽度限制 */
  width: 90%;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* 图片适配优化 */
.carousel-image {
  width: 100%;
  height: 400px; /* 与carousel高度一致 */
  object-fit: cover; /* 保持比例填充容器 */
  object-position: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* 悬停效果 */
.carousel-image:hover {
  transform: scale(1.02);
}

/* 指示器样式调整 */
:deep(.el-carousel__indicator) {
  padding: 12px 4px;

  &.is-active .el-carousel__button {
    background: var(--el-color-primary);
  }
}

:deep(.el-carousel__button) {
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: var(--el-color-info-light-5);
}

/* 响应式适配 */
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