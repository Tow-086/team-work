<template>
  <div class="post-create-container">
    <!-- 渐变标题栏 -->
    <div class="header-gradient">
      <h2>新建帖子</h2>
      <p class="subtitle">分享你的想法与见解</p>
    </div>

    <el-card class="post-form-card">
      <!-- 返回按钮 -->
      <el-button
          type="text"
          icon="ArrowLeftBold"
          @click="router.go(-1)"
          class="back-btn"
      >返回列表</el-button>

      <!-- 表单区域 -->
      <div class="form-wrapper">
        <el-form :model="form" :rules="rules" ref="formRef" label-position="top">

          <!-- 标题 + 板块组合 -->
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item label="标题" prop="title">
                <el-input
                    v-model="form.title"
                    placeholder="请输入标题（5-40字）"
                    size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属板块" prop="category">
                <el-select
                    v-model="form.category"
                    placeholder="请选择"
                    class="full-width"
                >
                  <el-option
                      v-for="item in categories"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 标签选择 -->
          <el-form-item label="添加标签" prop="tags">
            <el-select
                v-model="form.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请输入或选择标签"
                class="full-width"
            >
              <el-option
                  v-for="tag in tagOptions"
                  :key="tag"
                  :label="tag"
                  :value="tag"
              />
            </el-select>
          </el-form-item>

          <!-- 内容编辑区 -->
          <el-card class="content-editor-card">
            <div class="editor-header">
              <span class="editor-title">正文内容</span>
              <span class="word-count">{{ form.content.length }}/5000</span>
            </div>
            <RichEditor v-model="form.content" height="400px" />
            <div class="format-hint">
              支持 Markdown 语法，可使用快捷键 Ctrl+B/Ctrl+I/Ctrl+L 快速格式化
            </div>
          </el-card>

          <!-- 图片上传 -->
          <el-card class="media-card">
            <el-form-item label="媒体附件" class="no-margin-bottom">
              <ImageUploader
                  @upload="handleImageUpload"
                  :preview-limit="5"
                  :max-size="2 * 1024 * 1024"
              />
              <div class="image-preview">
                <el-image
                    v-for="(url, index) in form.images"
                    :key="index"
                    :src="url"
                    :preview-src-list="form.images"
                    class="preview-img"
                />
              </div>
            </el-form-item>
          </el-card>

          <!-- 底部操作 -->
          <div class="form-footer">
            <el-button-group>
              <el-button @click="saveDraft">保存草稿</el-button>
              <el-button type="primary" @click="handleSubmit" :loading="submitting">
                立即发布
              </el-button>
            </el-button-group>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {ElMessage, type FormRules} from 'element-plus'
import RichEditor from '@/components/forum/RichEditor.vue'
import ImageUploader from '@/components/forum/ImageUploader.vue'
import router from "@/router"
import {useForumStore} from "@/stores/forum.ts";
import axios from "axios";
const forumStore = useForumStore()

// 表单模型
const form = reactive({
  category: '',
  title: '',
  content: '',
  images: [] as string[],
  tags: [] as string[]
})

// 板块选项
const categories = [
  { value: 'fresh', label: '校园新鲜事' },
  { value: 'study', label: '学习交流' },
  { value: 'life', label: '生活互助' }
]

// 标签建议
const tagOptions = [
  '热门话题',
  '经验分享',
  '求助提问',
  '活动公告',
  '资源推荐',
  '校园趣事'
]

// 验证规则
const rules: FormRules<typeof form> = {
  category: [
    { required: true, message: '请选择板块', trigger: 'change' }
  ],
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 5, max: 40, message: '长度需在5-40个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ]
}

// 图片上传处理
const handleImageUpload = (urls: string[]) => {
  form.images = urls
}

// 加载状态
const submitting = ref(false)

// 保存草稿
const saveDraft = () => {
  // 实现保存草稿逻辑
  console.log('保存草稿:', form)
}

// 修改提交方法
// PostCreateView.vue 提交逻辑
const handleSubmit = async () => {
  console.log('提交表单:', form)
  submitting.value = true;
  try {
    const formData = new FormData();

    // 确保字段命名完全匹配
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('section', form.category); // 必须与Mock中的 parsedData.section 一致

    // 数组字段需要明确格式
    form.tags.forEach(tag => formData.append('tags[]', tag));
    form.images.forEach(url => formData.append('images[]', url));

    await forumStore.createNewPost(formData);
    router.push('/talk');
  } catch (error) {
    // 增强错误处理
    let message = '发布失败';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    }
    ElMessage.error(message);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped lang="less">
.post-create-container {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;

  .header-gradient {
    background: linear-gradient(135deg, #4e73df 0%, #3b5998 100%);
    color: white;
    padding: 25px 30px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .subtitle {
      margin-top: 8px;
      opacity: 0.9;
    }
  }

  .post-form-card {
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border: none;

    .back-btn {
      margin-bottom: 20px;
      font-weight: 500;

      &:hover {
        color: #4e73df;
      }
    }

    .form-wrapper {
      padding: 20px;

      .full-width {
        width: 100%;
      }

      .no-margin-bottom {
        margin-bottom: 0;
      }

      // 编辑器卡片样式
      .content-editor-card {
        margin: 20px 0;
        border-radius: 8px;

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;

          .editor-title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
          }

          .word-count {
            font-size: 13px;
            color: #999;
          }
        }

        .format-hint {
          margin-top: 15px;
          padding: 10px;
          background: #f8f8f8;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
        }
      }

      // 媒体卡片样式
      .media-card {
        margin: 20px 0;
        border-radius: 8px;
        padding: 20px;

        .image-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;

          .preview-img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 6px;
            transition: transform 0.3s;

            &:hover {
              transform: scale(1.05);
            }
          }
        }
      }

      // 底部操作区
      .form-footer {
        margin-top: 30px;
        text-align: right;
      }
    }
  }
}
</style>
