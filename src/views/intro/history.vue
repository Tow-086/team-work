<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="历史沿革" class="custom-page-header"></el-page-header>

    <div class="container">
      <h1>河南师范大学历史沿革</h1>
      <div class="section">
        <h2>早期创立</h2>
        <p>河南师范大学始建于 1951 年，最初名为新乡师范专科学校，旨在培养中学教师和其他教育工作者。</p>
      </div>
      <div class="section">
        <h2>发展壮大</h2>
        <p>随着时代的发展，学校不断发展壮大。1984 年更名为新乡师范学院，1999 年正式更名为河南师范大学。学校逐步开设了更多的专业课程，并吸引了大批优秀的教师团队，涵盖了文学、理学、工学等多个学科领域。</p>
      </div>
      <div class="section">
        <h2>现代成就</h2>
        <p>如今，河南师范大学已经成为一所以教师教育为主要特色的高等学府，拥有先进的教学设施和优秀的师资力量。学校注重学生的综合素质培养，积极推动产学研合作，为社会培养了大量的优秀人才。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'; // 导入 Vue Router 的 useRouter 钩子
import { ElPageHeader } from 'element-plus';

export default defineComponent({
  name: 'SchoolHistory',
  components: {
    ElPageHeader,
  },
  setup() {
    const router = useRouter();

    // 返回按钮的逻辑
    const goBack = () => {
      if (window.history.length > 1) {
        router.back(); // 如果有历史记录，返回上一页
      } else {
        router.push('/'); // 否则跳转到首页
      }
    };

    return { goBack };
  },
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff; /* 白色背景 */
  padding-top: 70px; /* 增加上边距以避免内容被遮挡 */
}

/* 自定义 el-page-header 样式 */
.custom-page-header {
  position: relative; /* 修改为相对定位 */
  width: 100%; /* 占据整个宽度 */
  background-color: white; /* 背景改为白色 */
  padding: 16px 24px; /* 增加内边距 */
  margin-bottom: 24px; /* 添加底部间距，避免遮挡内容 */
}

.custom-page-header /deep/ .el-page-header__title {
  color:#409eff; /* 浅蓝色文字 */

  font-size: 16px;
  font-weight: bold;
}

.custom-page-header /deep/ .el-page-header__content {
  color: #409eff; /* 浅蓝色文字 */
  font-size: 16px;
  font-weight: bold;
}

.container {
  max-width: 800px;
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 32px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  margin-top: 70px; /* 确保与返回按钮不重叠 */
}

.container:hover {
  transform: scale(1.05);
}

h1 {
  text-align: center;
  color: #0d47a1; /* 深蓝色标题 */
  margin-bottom: 24px;
}

.section {
  background-color: #bbdefb; /* 蓝色卡片背景 */
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

h2 {
  color: #0d47a1; /* 深蓝色子标题 */
  margin-bottom: 12px;
}

p {
  color: #333;
  line-height: 1.6;
}
</style>