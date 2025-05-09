<!-- src/components/forum/SideNavigation.vue -->
<template>
  <div class="side-navigation">
    <!-- 板块导航树 -->
<!--    <div class="section">-->
<!--      <h3 class="section-title">≡ 讨论板块</h3>-->
<!--      <div class="nav-item">○ 校园新鲜事</div>-->
<!--      <div class="nav-item">○ 学习交流</div>-->
<!--      <div class="nav-item">○ 生活互助</div>-->
<!--    </div>-->

    <!-- 过滤条件 -->
    <div class="section filter-section">
      <h3 class="section-title">▼ 筛选条件</h3>
      <div class="filter-item">✔ 最新排序</div>
      <div class="filter-item">○ 热门排序</div>
    </div>
  </div>
</template>

<style scoped>
.side-navigation {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.nav-item, .filter-item {
  padding: 8px 12px;
  margin: 6px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.nav-item:hover, .filter-item:hover {
  background: #f5f7fa;
}
</style>