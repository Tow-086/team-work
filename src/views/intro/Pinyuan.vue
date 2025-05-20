<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="平原湖校区介绍" class="custom-page-header"></el-page-header>

    <div class="header-and-content">
      <el-header class="header">
        <h1>河南师范大学平原湖校区</h1>
      </el-header>
      <div class="container">
        <div class="section">
          <h2>校园概况</h2>
          <p>河南师范大学平原湖校区位于河南省新乡市平原示范区，占地面积广阔，环境优美。校区内绿树成荫，湖泊环绕，是一个集学习、生活和休闲于一体的现代化教育园区。</p>
        </div>
        <div class="section">
          <h2>主要建筑</h2>
          <ul>
            <li><strong>教学楼：</strong> 提供先进的教室和实验室，满足各类教学需求。</li>
            <li><strong>图书馆：</strong> 拥有丰富的藏书和电子资源，为师生提供良好的阅读环境。</li>
            <li><strong>体育馆：</strong> 设有篮球场、羽毛球场等多种运动设施，促进学生身心健康。</li>
            <li><strong>宿舍区：</strong> 环境舒适，设施齐全，确保学生的住宿安全和便利。</li>
          </ul>
        </div>
        <div class="section">
          <h2>校园文化</h2>
          <p>平原湖校区注重校园文化建设，定期举办各类学术讲座、文艺演出和体育赛事，丰富学生的课余生活，培养学生的综合素质。</p>
        </div>
        <div class="section">
          <h2>地理位置</h2>
          <p>平原湖校区地处新乡市平原示范区，交通便利，周边配套设施完善，方便学生的学习和生活。</p>
        </div>
        <div class="section">
          <h2>详细信息</h2>
          <p><strong>建校时间：</strong> 2009年</p>
          <p><strong>占地面积：</strong> 约600亩</p>
          <p><strong>在校生人数：</strong> 约15,000人</p>
          <p><strong>教职工人数：</strong> 约1,800人</p>
          <p><strong>院系设置：</strong> 包括文学院、理学院、工学院、生命科学与农学学院等多个院系。</p>
          <p><strong>重点学科：</strong> 教育学、化学工程与技术、生物学等。</p>
          <p><strong>科研机构：</strong> 拥有多个省级重点实验室和研究中心。</p>
          <p><strong>国际合作：</strong> 与多所国外知名高校建立合作关系，开展联合研究和交流项目。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'; // 导入 Vue Router 的 useRouter 钩子
import { ElHeader, ElPageHeader } from 'element-plus';

export default defineComponent({
  name: 'PlainLake',
  components: {
    ElHeader,
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
  background-color: white; /* 白色背景 */
  padding-top: 48px; /* 较大的上边距 */
  overflow-y: auto; /* 添加垂直滚动条 */
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

.header-and-content {
  width: 100%;
  max-width: 800px;
  background-color: #e0f7fa; /* 浅蓝色背景 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 32px;
  position: relative;
  z-index: 1; /* 确保内容在标题下方 */
}

.header {
  width: 100%;
  background-color: inherit; /* 继承父容器背景色 */
  padding: 0;
  text-align: center;
  margin-bottom: 24px;
}

.container {
  width: 100%;
  background-color: white;
  box-shadow: none;
  border-radius: 12px;
  padding: 0;
  position: relative;
  z-index: 1; /* 确保内容在标题下方 */
}

.container:hover {
  transform: scale(1.05);
}

h1 {
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

ul {
  list-style-type: disc;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}
</style>