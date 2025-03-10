import service from './index';

export const AuthAPI = {
    // 用户登录接口修正
    login: (data: {
        userEmail: string;  // 根据后端 DTO 字段名修改
        userPassword: string;
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
        userEmail: string;
        userCode: string;
        userName: string;
        userPassword: string;
    }) => service.request({
        url: '/user/regist',
        method: 'post',
        data
    }),

    // 验证码接口参数修正
    sendCode: (userEmail: string) => service.request({
        url: '/user/sendVerificationCode',
        method: 'get',
        params: { email: userEmail } // 参数名与后端@RequestParam一致
    })

};