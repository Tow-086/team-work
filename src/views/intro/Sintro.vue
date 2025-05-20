<template>
  <!-- 页面的整体容器 -->
  <div class="school-intro-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="学校简介" style="margin-bottom: 20px;"></el-page-header>

    <!-- 使用 ElementPlus 的卡片组件展示学校简介 -->
    <el-card class="school-intro-card">
      <!-- 卡片的头部区域 -->
      <template #header>
        <div class="header-wrapper">
          <span>学校简介</span>
          <el-divider direction="vertical"></el-divider>
          <a href="https://www.htu.edu.cn/21000/list.htm" class="school-badge-button">
            历史悠久
          </a>
          <a href="https://www.htu.edu.cn/tjb/szdw/list.htm" class="school-badge-button">
            师资雄厚
          </a>
          <a href="https://www.htu.edu.cn/xjzx/yjhjjs/list.htm" class="school-badge-button">
            设施先进
          </a>
        </div>
      </template>
      <!-- 卡片的内容部分 -->
      <div class="content-wrapper">
        <div class="image-container">
          <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.nxXBimwN3Ke2aMMkYcfXiQHaEo?rs=1&pid=ImgDetMain" alt="学校图片" class="school-image">
        </div>
        <div class="text-container">
          <p class="intro-text">{{ schoolInfo.introduction }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 导入 Vue Router 的 useRouter 钩子
import { ElCard, ElPageHeader, ElDivider } from 'element-plus';

// 定义学校信息的响应式变量
const schoolInfo = ref({
  introduction: '河南师范大学（Henan Normal University），简称河南师大，位于河南省新乡市， [94]是国家中西部高等教育振兴计划支持高校、国家“111计划”实施高校、河南省人民政府与教育部共建高校、河南省特色骨干大学，河南省“双一流”创建高校。 [2]\n' +
      '学校前身是始建于1923年的中州大学（原国立河南大学前身）理科和创建于1951年的平原师范学院，先后历经河南师范学院二院、河南第二师范学院、新乡师范学院等阶段，1985年始称河南师范大学； [2]2023年9月22日，位于新乡市平原示范区的河南师范大学科技创新港校区揭牌 。 [62]\n' +
      '截至2024年10月，学校占地面积139.53万平方米，建筑面积110.02万平方米，馆藏中外文纸质图书343万余册，电子图书1046万余册；设有25个学院（部），4个书院，1个现代产业学院，79个本科招生专业；拥有30个硕士学位授权一级学科、26个硕士专业学位授权类别，13个博士学位授权一级学科、2个博士专业学位类别，9个博士后科研流动站；有在岗教职工3200余人，全日制在校生近5万人。 [2-3]'
});

// 获取路由实例
const router = useRouter();

// 返回按钮的逻辑
const goBack = () => {
  if (window.history.length > 1) {
    router.back(); // 如果有历史记录，返回上一页
  } else {
    router.push('/'); // 否则跳转到首页
  }
};
</script>

<style scoped>
.school-intro-container {
  padding: 20px;
  background-color: #f5f7fa; /* 背景颜色偏白 */
  min-height: 100vh;
}

.el-page-header {
  font-size: 24px;
  color: #409eff; /* 主标题颜色偏蓝色 */
}

.school-intro-card {
  margin-bottom: 20px;
  border: none;
  background-color: #ffffff; /* 卡片背景为白色 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加柔和阴影 */
}

.header-wrapper {
  display: flex;
  align-items: center;
  padding: 20px;
}

.header-wrapper span {
  font-size: 18px;
  font-weight: bold;
  color: #409eff; /* 卡片标题颜色偏蓝色 */
  margin-right: 20px;
}

.school-badge-button {
  padding: 6px 12px;
  border-radius: 5px;
  background-color:#409eff;
  color: white;
  font-size: 14px;
  margin-right: 10px;
  text-decoration: none; /* 去除默认下划线 */
  cursor: pointer; /* 鼠标指针样式改为指针 */
  transition: background-color 0.3s ease; /* 添加背景颜色过渡效果 */
}

.school-badge-button:hover {
  background-color: #5993d3; /* 鼠标悬停时的背景颜色 */
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.image-container {
  flex: 1 1 400px;
  margin-right: 20px;
}

.school-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.text-container {
  flex: 1 1 400px;
}

.intro-text {
  font-size: 25px;
  color: #606266; /* 描述文字颜色稍暗 */
  line-height: 1.6;
}

@media (max-width: 768px) {
  .el-col {
    width: 100%;
  }
}
</style>