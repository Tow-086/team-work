import service from './index';

export const AuthAPI = {
    // 用户登录接口修正
    login: (data: {
        email: string;  // 根据后端 DTO 字段名修改
        password: string;
    }) => service.request({
        url: '/user/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/json' // 明确指定请求头
        },
        data // 直接传递参数对象
    }),

    // 注册接口参数修正
    register: (data: {
        email: string;
        code: string;
        nickname: string;
        password: string;
    }) => service.request({
        url: '/user/register',
        method: 'post',
        data
    }),

    // 验证码接口参数修正
    sendCode: (email: string, type?: string) => service.request({
        url: '/user/sendCode',
        method: 'get',
        params: { email,type } // 参数名与后端@RequestParam一致
    }),

    // 找回密码
    resetPassword: (data: {
        email: string;
        code: string;
        password: string;
    }) => service.request({
        url: '/user/resetPassword',
        method: 'post',
        data
    })

};