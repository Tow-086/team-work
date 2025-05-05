import service from '@/api'
import type { Post, ApiResponse, PostListData } from '@/types/forum'
import { fetchPosts as apiFetchPosts, createPost } from '@/api/forum'

export const fetchPosts = async (
    params: { page: number; size: number }
): Promise<PostListData> => {
    const response = await service.get('/posts', { params })
    console.log('API原始数据:', response.data) // 先获取响应再打印
    return response.data
}

export const createPost = async (
    formData: FormData
): Promise<ApiResponse<Post>> => {
    try {
        const response = await service.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error('创建帖子失败: ' + (error as Error).message)
    }
}
// 获取单个帖子
export const fetchPostById = async (id: number): Promise<Post> => {
    try {
        const response = await service.get(`/posts/${id}`)
        return response.data
    } catch (error) {
        throw new Error('获取帖子详情失败: ' + (error as Error).message)
    }
}