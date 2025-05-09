<!-- src/components/layout/AnimeSidebar.vue -->
<template>
  <div class="anime-sidebar">
    <!-- 头部添加霓虹光效 -->
    <div class="anime-header">
      <h3 class="neon-text">🎮 动漫空间</h3>
      <div class="decorative-line"></div>
    </div>

    <!-- 动漫角色展示 -->
    <div class="character-card glow-card">
      <div class="image-wrapper">
        <img
          src='@/assets/images/logo.jpg'
          alt="动漫角色"
          class="character-image"
        />
        <div class="overlay-light"></div>
      </div>
      <div class="character-info">
        <div class="character-name">校园守护精灵</div>
        <div class="character-desc">今日运势：大吉</div>
      </div>
    </div>

    <!-- 热门话题 -->
    <div class="hot-topics particle-bg">
      <div class="topic-item" v-for="topic in topics" :key="topic.id">
        <span class="topic-tag">🔥 {{ topic.tag }}</span>
        <span class="topic-title">{{ topic.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const topics = ref([
  { id: 1, tag: '新番', title: '四月新番导视' },
  { id: 2, tag: '活动', title: 'COSPLAY大赛报名' },
  { id: 3, tag: '讨论', title: '经典动漫回顾' },
  // 更多话题...
])
</script>

<style scoped>

/* 霓虹文字效果 */
.neon-text {
  text-shadow: 0 0 8px #ff6b6b, 0 0 10px #ff9f43;
}

/* 悬浮光效卡片 */
.glow-card {
  position: relative;
  transition: 0.3s;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(45deg, #ff9f43, #ff6b6b);
    z-index: -1;
    opacity: 0;
    transition: 0.3s;
  }
  &:hover::before {
    opacity: 0.3;
    filter: blur(12px);
  }
}

/* 粒子背景 */
.particle-bg {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml,...');
    opacity: 0.1;
    pointer-events: none;
  }
}

.anime-sidebar {
  position: relative;
  min-height: 600px;
}

.anime-header {
  position: relative;
  margin-bottom: 30px;
}

.anime-header h3 {
  font-size: 22px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.decorative-line {
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #ff9f43);
  margin-top: 8px;
}

.character-card {
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.character-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.character-name {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}

.character-desc {
  color: #666;
  font-size: 14px;
}

.hot-topics {
  background: rgba(255,255,255,0.85);
  border-radius: 12px;
  padding: 15px;
}

.topic-item {
  padding: 10px;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.topic-item:hover {
  transform: translateX(5px);
}

.topic-tag {
  font-size: 12px;
  color: #ff6b6b;
  margin-right: 8px;
}

.topic-title {
  font-size: 14px;
  color: #333;
  flex-grow: 1;
}
</style>