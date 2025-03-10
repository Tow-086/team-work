// src/api/index.ts
import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// 创建 Axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 提供默认值
    timeout: 50000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error: AxiosError) => {
        // 对请求错误做些什么
        console.error('请求拦截器错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response; // 返回完整响应对象
    },
    (error: AxiosError) => {
        // 对响应错误做点什么
        console.error('响应拦截器错误:', error);

        // 根据错误状态码进行分类处理
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 401:
                    console.error('未授权，请重新登录');
                    break;
                case 403:
                    console.error('禁止访问');
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error(`HTTP 错误: ${status}`);
            }
        } else if (error.request) {
            console.error('请求未收到响应');
        } else {
            console.error('请求设置出错:', error.message);
        }

        return Promise.reject(error);
    }
);

export default service;
