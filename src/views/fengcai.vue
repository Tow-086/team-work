<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="软件学院风采" class="custom-page-header"></el-page-header>

    <!-- 学院简介 -->
    <section class="intro-section">
      <h2 class="section-title">学院简介</h2>
      <p class="section-content">
        河南师范大学软件学院成立于2004年，致力于培养具有创新精神和实践能力的高素质软件人才。学院以“厚德博学、笃行创新”为院训，注重理论与实践相结合，为学生提供优质的教育资源和广阔的发展平台。
      </p>
    </section>

    <!-- 学院特色 -->
    <section class="features-section">
      <h2 class="section-title">学院特色</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="(feature, index) in features" :key="index">
          <el-card class="feature-card">
            <template #header>
              <span class="feature-title">{{ feature.title }}</span>
            </template>
            <div class="feature-content">
              <p>{{ feature.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- 学生活动风采 -->
    <section class="activities-section">
      <h2 class="section-title">学生活动风采</h2>
      <el-carousel :interval="2500" type="card" height="300px" class="activity-carousel">
        <el-carousel-item v-for="(image, index) in activityImages" :key="index">
          <img :src="image.src" :alt="image.alt" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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

// 学院特色数据
const features = ref([
  {
    title: '优质师资',
    description: '学院拥有一支高水平的教学团队，教授、副教授占比超过60%。',
  },
  {
    title: '实践教学',
    description: '注重培养学生的实践能力，与多家知名企业合作建立实习基地。',
  },
  {
    title: '国际视野',
    description: '与多所国外高校开展合作交流项目，提供国际化学习机会。',
  },
]);

// 学生活动图片数据
const activityImages = ref([
  {
    src: 'https://www.htu.edu.cn/_upload/article/images/c3/d4/cc799b174b11b20434123a4b6f3d/1b55cab9-080a-445b-b5ac-2611bc877839.jpg',
    alt: '活动1',
  },
  {
    src: 'https://www.htu.edu.cn/_upload/article/images/c4/93/d68bf54d441db9fb078a3134bd6b/cefa7cf0-f349-47e8-b438-93196398a224.jpg',
    alt: '活动2',
  },
  {
    src: 'https://www.htu.edu.cn/_upload/article/images/e4/82/482c53d243d5a14d31f94ff9defe/bbd75e50-a16d-49a2-9507-e4b9dfcf5eca.jpg',
    alt: '活动3',
  },
  {
    src: 'https://www.htu.edu.cn/_upload/article/images/51/b8/e795d0bb46c2840b0cfd9f414453/c5c068d5-d813-417a-8400-fa3c1518ae00.jpg',
    alt: '活动4',
  },
  {
    src: 'https://www.htu.edu.cn/_upload/article/images/80/ca/0c807dc54efb831ecb6227a55cc8/939629b3-00ef-40b8-825c-30e058c32340.jpg',
    alt: '活动5',
  }

]);
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

.section-title {
  color: #0d47a1; /* 深蓝色标题 */
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.intro-section,
.features-section,
.activities-section {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
  text-align: center;
}

.section-content {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-card {
  background-color: #e0f7fa; /* 浅蓝色卡片背景 */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-title {
  color: #0d47a1; /* 深蓝色标题 */
  font-size: 18px;
  font-weight: bold;
}

.feature-content {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}

.activity-carousel {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}
</style>