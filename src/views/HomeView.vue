<!--&lt;!&ndash; src/views/HomeView.vue &ndash;&gt;-->
<template>
  <div class="home-container">
    <div class="carousel-section">
      <Carousel />
    </div>
    <div class="content-section">
      <!-- 确保此处没有 GlobalHeader/GlobalFooter -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/ui/Carousel.vue'
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-section {
  margin-bottom: 40px;
}

.content-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.extra-content {
  margin-top: 30px;
}
</style>