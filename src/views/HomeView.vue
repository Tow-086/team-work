<template>
  <!-- 整个页面的容器，类名为 home-container，设置了内边距、最大宽度、居中对齐等样式，用于包裹页面的主要内容 -->
  <div class="home-container">
    <!-- 用于包含动态展示框和左右两侧新闻插件的容器，类名为 carousel-and-news，采用弹性布局 -->
    <div class="carousel-and-news">
      <!-- 左侧新闻插件的容器，类名为 news-plugin-section 和 left-news，通过 :style 绑定 flex 样式属性，展示 NewsLeft 组件 -->
      <div class="news-plugin-section left-news" :style="{ flex: leftNewsFlex }">
        <NewsLeft />
      </div>
      <!-- 动态展示框的容器，类名为 carousel-section，通过 :style 绑定 flex 样式属性，展示 Carousel 组件 -->
      <div class="carousel-section" :style="{ flex: carouselFlex }">
        <Carousel />
      </div>
      <!-- 右侧新闻插件的容器，类名为 news-plugin-section 和 right-news，通过 :style 绑定 flex 样式属性，展示 News_right 组件 -->
      <div class="news-plugin-section right-news" :style="{ flex: rightNewsFlex }">
        <News_right />
      </div>
    </div>
    <!-- 其他主页内容的容器，类名为 content-section，用于放置页面的其他信息，如标题等 -->
    <div class="content-section">
      <!-- 页面标题，显示欢迎信息 -->
      <h1>欢迎来到校园信息平台</h1>
      <!-- 预留区域，可以继续添加其他模块 -->
    </div>
  </div>
</template>

<script setup lang="ts">
/* 从 Vue 库中导入 ref、computed、onMounted、watch 函数，
   ref 用于创建响应式数据，computed 用于计算属性，onMounted 用于在组件挂载后执行代码，watch 用于监听数据变化 */
import { ref, computed, onMounted, watch } from 'vue';
/* 导入 Carousel 组件，该组件可能是用于实现动态展示功能的自定义组件 */
import Carousel from '@/components/ui/Carousel.vue';
/* 导入 NewsLeft 组件，该组件可能是用于展示左侧新闻内容的自定义组件 */
import NewsLeft from "@/components/layout/news_left.vue";
/* 导入 News_right 组件，该组件可能是用于展示右侧新闻内容的自定义组件 */
import News_right from "@/components/layout/news_right.vue";

// 创建一个响应式变量 windowWidth 用于存储窗口的宽度，初始值为当前窗口的内宽度
const windowWidth = ref(window.innerWidth);

// 计算属性 carouselFlex，根据窗口宽度计算动态展示框的 flex 值，以实现不同宽度下的布局调整
const carouselFlex = computed(() => {
  if (windowWidth.value >= 1400) {
    return 7;
  } else if (windowWidth.value >= 1200) {
    return 6;
  } else if (windowWidth.value >= 1024) {
    return 5;
  } else if (windowWidth.value >= 992) {
    return 4;
  } else if (windowWidth.value >= 768) {
    return 3;
  } else {
    return 3;
  }
});

// 计算属性 leftNewsFlex，根据窗口宽度计算左侧新闻插件的 flex 值，以实现不同宽度下的布局调整
const leftNewsFlex = computed(() => {
  if (windowWidth.value >= 1400) {
    return 2;
  } else if (windowWidth.value >= 1200) {
    return 2;
  } else if (windowWidth.value >= 1024) {
    return 2;
  } else if (windowWidth.value >= 992) {
    return 2;
  } else if (windowWidth.value >= 768) {
    return 2;
  } else {
    return 2;
  }
});

// 计算属性 rightNewsFlex，根据窗口宽度计算右侧新闻插件的 flex 值，其值与左侧新闻插件的 flex 值相同
const rightNewsFlex = computed(() => {
  return leftNewsFlex.value;
});

// 在组件挂载后，添加窗口 resize 事件监听器，当窗口大小改变时更新 windowWidth 的值
onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
});

// 监听 windowWidth 的变化，当窗口宽度改变时，可以在这里重新计算 flex 值等操作（目前只是预留注释部分）
watch(windowWidth, () => {
  // 重新计算flex值
});
</script>

<style scoped>
/* home-container 类的样式，设置了内边距、最大宽度为视口宽度的 90%、盒子模型为 border-box 以及居中对齐，使容器能自适应页面宽度并合理布局 */
.home-container {
  padding: 20px;
  max-width: 90%; /* 设置为100%，让容器随页面宽度变化 */
  box-sizing: border-box; /* 确保内边距不影响宽度 */
  margin: 0 auto;
}

/* carousel-and-news 类的样式，采用弹性布局，设置了元素的对齐方式、底部边距、换行属性以及内边距，使内部元素能合理排列并适应不同宽度 */
.carousel-and-news {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap; /* 允许内容换行，防止溢出 */
  padding: 0 5vw; /* 使用vw单位设置内边距，随页面宽度变化 */
}

/* carousel-section 类的样式，设置了左右边距和盒子模型为 border-box，用于调整动态展示框的布局 */
.carousel-section {
  margin: 0 4px;
  box-sizing: border-box;
}

/* news-plugin-section 类的样式，设置盒子模型为 border-box，用于新闻插件的布局调整 */
.news-plugin-section {
  box-sizing: border-box;
}

/* left-news 类的样式，设置文本左对齐，用于调整左侧新闻插件的文本显示方式 */
.left-news {
  text-align: left;
}

/* right-news 类的样式，设置文本右对齐，用于调整右侧新闻插件的文本显示方式 */
.right-news {
  text-align: right;
}

/* content-section 类的样式，设置了内边距、背景颜色、边框圆角、阴影以及盒子模型，还使用 vw 单位设置了内边距，使内容区域能自适应页面宽度并具有美观的样式 */
.content-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  box-sizing: border-box;
  padding: 20px 5vw; /* 使用vw单位设置内边距，随页面宽度变化 */
}

/* h1 标签的样式，设置了文本颜色、对齐方式、底部边距以及使用 vw 单位设置字体大小，使标题能自适应页面宽度并具有合适的显示效果 */
h1 {
  color: var(--el-color-primary);
  text-align: center;
  margin-bottom: 30px;
  font-size: 3vw; /* 使用vw单位设置字体大小，随页面宽度变化 */
}

/* 媒体查询，当屏幕宽度小于等于 768px 时，调整布局样式，使组件能更好地适应小屏幕设备 */
@media (max-width: 768px) {
  .carousel-and-news {
    flex-direction: column;
  }
  .carousel-section,
  .news-plugin-section {
    margin: 10px 0;
    flex: 1;
  }
  .left-news,
  .right-news {
    text-align: center;
  }
  .content-section {
    padding: 20px 3vw; /* 小屏幕时调整内边距 */
  }
  h1 {
    font-size: 4vw; /* 小屏幕时调整字体大小 */
  }
}
</style>