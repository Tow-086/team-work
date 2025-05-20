<template>
  <div class="container">
    <!-- el-page-header 的 @back 事件绑定到 goBack 方法 -->
    <el-page-header @back="goBack" content="社团介绍" style="margin-bottom: 20px;"></el-page-header>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(club, index) in clubs" :key="index">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ club.name }}</span>
            </div>
          </template>
          <p class="description">{{ club.description }}</p>
          <p class="contact">联系方式：{{ club.contact }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; // 导入 Vue Router 的 useRouter

export default {
  data() {
    return {
      clubs: [
        { name: "ACM算法协会", description: "致力于提升成员的算法能力与编程技巧。", contact: "acm@example.com" },
        { name: "网络安全协会", description: "关注网络安全领域的最新动态和技术。", contact: "security@example.com" },
        { name: "机器人协会", description: "研究机器人技术及其应用。", contact: "robotics@example.com" },
        { name: "体育协会", description: "组织各类体育活动，促进健康生活。", contact: "sports@example.com" },
        { name: "数字中原协会", description: "探索数字世界，推动数字化进程。", contact: "digital@example.com" },
        { name: "广播站", description: "负责校园内的新闻播报及文化传播。", contact: "broadcast@example.com" },
        { name: "艺术团", description: "提供平台给爱好艺术的学生展现自我。", contact: "art@example.com" }
      ]
    };
  },
  setup() {
    const router = useRouter(); // 获取路由实例

    // 定义返回方法
    const goBack = () => {
      router.back(); // 使用 Vue Router 的 back 方法返回上一页
    };

    return { goBack }; // 将 goBack 方法暴露给模板
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f7fa; /* 背景颜色偏白 */
  min-height: 100vh;
}

.el-page-header {
  font-size: 24px;
  color: #409eff; /* 主标题颜色偏蓝色 */
}

.el-card {
  margin-bottom: 20px;
  border: none;
  background-color: #ffffff; /* 卡片背景为白色 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加柔和阴影 */
}

.card-header span {
  font-size: 18px;
  font-weight: bold;
  color: #409eff; /* 卡片标题颜色偏蓝色 */
}

.description {
  font-size: 14px;
  color: #606266; /* 描述文字颜色稍暗 */
  line-height: 1.6;
}

.contact {
  font-size: 14px;
  color: #909399; /* 联系方式文字颜色更浅 */
  margin-top: 10px;
}

.el-row {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .el-col {
    width: 100%;
  }
}
</style>