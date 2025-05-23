import service from '@/api'
import type { Post, ApiResponse, PostListData } from '@/types/forum'
import { fetchPosts as apiFetchPosts, createPost } from '@/api/forum'

export const fetchPosts = async (
    params: {section?:section; page: number; size: number }
): Promise<PostListData> => {
    const response = await service.get('/posts', {
        params:{
            section: params.section,
            page: params.page,
            size: params.size
        } })
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

export const createComment = async (
    postId: number,
    content: string
): Promise<ApiResponse<IComment>> => {
    try {
        const response = await service.post(`/posts/${postId}/createComment`, content, {
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error: any) {  // [!code focus]
        // 打印完整错误信息
        console.error('创建评论失败详情:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        })
        throw new Error(`发表评论失败: ${error.response?.data?.message || error.message}`)
    }
}

// 在fetchComments API处理中：
export const fetchComments = async (
    postId: number
): Promise<ApiResponse<IComment[]>> => {  // 确保返回IComment数组
    try {
        const response = await service.get(`/posts/${postId}/comments`);
        return {
            code: 200,
            message: 'success',
            data: response.data  // 确保返回数据结构正确
        };
    } catch (error) {
        throw new Error('获取评论失败: ' + (error as Error).message);
    }
}