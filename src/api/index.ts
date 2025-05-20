// 从 axios 库中导入 axios 实例以及 AxiosHeaders 类，AxiosHeaders 用于管理请求头
import axios, { AxiosHeaders } from 'axios';
// 从 axios 库中导入类型定义，用于类型注解，提高代码的可读性和可维护性
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 使用 axios.create 方法创建一个自定义的 Axios 实例，后续所有的请求操作将基于这个实例进行
const service: AxiosInstance = axios.create({
    // 设置请求的基础 URL，优先使用环境变量 VITE_API_BASE_URL 的值，如果该环境变量未定义，则使用默认值 '/api'
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    // 设置请求的超时时间为 50000 毫秒，即 50 秒，若请求在该时间内未完成则会触发超时错误
    timeout: 50000,
});

// 为创建的 Axios 实例添加请求拦截器，请求拦截器会在每个请求发送前执行
service.interceptors.request.use(
    // 请求成功时的处理函数，接收一个 InternalAxiosRequestConfig 类型的参数，代表请求的配置信息
    (config: InternalAxiosRequestConfig) => {
        // 从本地存储中获取名为 'token' 的值，通常这个值是用户登录后保存的身份验证令牌
        const token = localStorage.getItem('token');
        // 如果本地存储中存在 token
        if (token) {
            // 使用 AxiosHeaders 类创建一个新的请求头对象，传入原请求配置中的 headers 作为初始值
            const headers = new AxiosHeaders(config.headers);
            // 在请求头中设置 'Authorization' 字段，其值为 'Bearer ' 加上从本地存储获取的 token
            headers.set('Authorization', `Bearer ${token}`);
            // 将更新后的请求头赋值给请求配置的 headers 属性
            config.headers = headers;
        }
        // 返回修改后的请求配置，使请求可以继续发送
        return config;
    },
    // 请求出错时的处理函数，接收一个 AxiosError 类型的参数，代表请求过程中发生的错误
    (error: AxiosError) => {
        // 在控制台输出错误信息，提示这是请求拦截器中出现的错误
        console.error('请求拦截器错误:', error);
        // 将错误以 Promise 形式拒绝，以便后续代码可以捕获并处理该错误
        return Promise.reject(error);
    }
);

// 为创建的 Axios 实例添加响应拦截器，响应拦截器会在每个响应返回后执行
service.interceptors.response.use(
    // 响应成功时的处理函数，接收一个 AxiosResponse 类型的参数，代表服务器返回的响应信息
    (response: AxiosResponse) => {
        // 直接返回响应信息，让后续代码可以继续处理响应
        return response;
    },
    // 响应出错时的处理函数，接收一个 AxiosError 类型的参数，代表响应过程中发生的错误
    (error: AxiosError) => {
        // 在控制台输出错误信息，提示这是响应拦截器中出现的错误
        console.error('响应拦截器错误:', error);

        // 如果错误对象包含 response 属性，说明服务器返回了错误响应
        if (error.response) {
            // 获取响应的状态码
            const status = error.response.status;
            // 根据不同的状态码进行不同的错误处理
            switch (status) {
                // 状态码为 401 表示未授权，通常是因为 token 无效或过期，提示用户重新登录
                case 401:
                    console.error('未授权，请重新登录');
                    break;
                // 状态码为 403 表示禁止访问，提示用户没有权限访问该资源
                case 403:
                    console.error('禁止访问');
                    break;
                // 状态码为 500 表示服务器内部错误，提示服务器端出现了问题
                case 500:
                    console.error('服务器内部错误');
                    break;
                // 对于其他状态码，统一提示 HTTP 错误并显示具体的状态码
                default:
                    console.error(`HTTP 错误: ${status}`);
            }
            // 如果错误对象包含 request 属性但没有 response 属性，说明请求发送了但没有收到服务器的响应
        } else if (error.request) {
            console.error('请求未收到响应');
            // 如果错误既没有 response 属性也没有 request 属性，说明是请求设置过程中出现了问题
        } else {
            console.error('请求设置出错:', error.message);
        }

        // 将错误以 Promise 形式拒绝，以便后续代码可以捕获并处理该错误
        return Promise.reject(error);
    }
);

// 将创建并配置好的 Axios 实例导出，供其他模块使用
export default service;