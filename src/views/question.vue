<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <el-page-header @back="goBack" content="新生答疑" class="custom-page-header"></el-page-header>

    <!-- 页面标题 -->
    <h1 class="page-title">新生常见问题解答</h1>

    <!-- 常见问题区域 -->
    <section class="faq-section">
      <el-collapse v-model="activeQuestion" accordion>
        <el-collapse-item
            v-for="(item, index) in faqList"
            :key="index"
            :name="index"
        >
          <template #title>
            <h3 class="question-title">{{ item.question }}</h3>
          </template>
          <div class="answer-content">
            <p>{{ item.answer }}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
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

// 常见问题列表数据
const faqList = ref([
  {
    question: '如何进行报到？',
    answer: '新生可以携带录取通知书和身份证在校内由负责接待你的学长学姐带领进行报道',
  },
  {
    question: '学校的宿舍条件怎么样？',
    answer: '学校提供四人间，空间宽敞，采光重组，所有宿舍均配备良好的生活设施。',
  },
  {
    question: '开学需要准备哪些材料？',
    answer: '新生入学时需携带身份证、录取通知书、个人照片若干张以及其他相关证明文件，请根据入学须知准备。',
  },
  {
    question: '吃饭咋弄？',
    answer: '可以使用手机支付宝完美校园进行刷卡，也可以用银行卡进行刷卡，但是小心丢失',
  },
  {
    question: '图书馆啥时候可以去，能借书吗？',
    answer: '图书馆除了每周周二下午12点-18点闭关，其他时候段上午9点-晚上22点均开放，可以凭借学生证或银行卡进行借书，不过要定期归还',
  },
  // 可以继续添加更多问题...
]);

// 当前展开的问题索引
const activeQuestion = ref(0);
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

.page-title {
  color: #548de6; /* 深蓝色标题 */
  font-size: 28px;
  margin-bottom: 24px;
  text-align: center;
}

.faq-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
}

.el-collapse {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.question-title {
  color: #5177b3; /* 深蓝色标题 */
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.answer-content {
  padding: 16px;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  background-color: #e0f7fa; /* 浅蓝色背景 */
  border-radius: 0 0 12px 12px;
}

/* 折叠面板样式调整 */
.el-collapse-item__header {
  font-size: 18px;
  color: #0d47a1;
  background-color: #e0f7fa; /* 浅蓝色背景 */
  border-radius: 12px;
  transition: all 0.3s ease;
}

.el-collapse-item__header:hover {
  background-color: #b2ebf2; /* 更深一点的浅蓝色背景 */
}

.el-collapse-item__wrap {
  background-color: white;
  border-radius: 0 0 12px 12px;
}
</style>