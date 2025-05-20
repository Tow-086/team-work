<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="学校地图" class="custom-page-header"></el-page-header>

    <!-- 地图展示区域 -->
    <div class="map-container">
      <h1 class="map-title">河南师范大学校园地图</h1>
      <div class="image-grid">
        <!-- 第一张图片：平原湖校区的地图 -->
        <div class="image-wrapper">
          <img
              src="https://b0.bdstatic.com/fe6e3c791c94a4ae3217c94fc2923edc.jpg@h_1280"
              alt="平原湖校区地图"
              class="campus-map"
          />
          <p class="image-description">平原湖校区地图</p>
        </div>

        <!-- 第二张图片：东西区的地图 -->
        <div class="image-wrapper">
          <img
              src="http://img0.baidu.com/it/u=2189036851,3017880587&fm=253&app=138&f=JPEG?w=1017&h=552"
              alt="东西区地图"
              class="campus-map"
          />
          <p class="image-description">东西区地图</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 定义路由实例
const router = useRouter();

// 返回按钮逻辑
const goBack = () => {
  if (window.history.length > 1) {
    router.back(); // 如果有历史记录，返回上一页
  } else {
    router.push('/'); // 否则跳转到首页
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa; /* 浅灰色背景 */
  padding: 20px;
  min-height: 100vh;
}

.custom-page-header {
  width: 100%; /* 占据整个宽度 */
  background-color: white; /* 背景改为白色 */
  padding: 16px 24px; /* 增加内边距 */
  margin-bottom: 24px; /* 添加底部间距 */
}

.custom-page-header /deep/ .el-page-header__title {
  color: #409eff; /* 浅蓝色文字 */
  font-size: 16px;
  font-weight: bold;
}

.custom-page-header /deep/ .el-page-header__content {
  color: #409eff; /* 浅蓝色文字 */
  font-size: 16px;
  font-weight: bold;
}

.map-container {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.map-title {
  color: #0d47a1; /* 深蓝色标题 */
  margin-bottom: 24px;
  font-size: 24px;
}

.image-grid {
  display: flex;
  justify-content: space-around; /* 图片之间留有间距 */
  flex-wrap: wrap; /* 自动换行 */
}

.image-wrapper {
  width: 80%; /* 每个包裹器占据约一半宽度 */
  text-align: center;
}

.campus-map {
  width: 100%; /* 图片占据包裹器的全部宽度 */
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; /* 图片和描述之间的间距 */
  transition: transform 0.3s ease; /* 添加悬停放大效果 */
}

.campus-map:hover {
  transform: scale(1.05); /* 鼠标悬停时稍微放大 */
}

.image-description {
  color:#409eff;
  font-size: 20px;
}
</style>