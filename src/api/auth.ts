// 从当前目录下的 index 文件中导入封装好的请求服务对象
import service from './index';

/**
 * 定义一个包含用户认证相关 API 请求方法的对象
 */
export const AuthAPI = {
    /**
     * 用户登录接口
     * @param data - 包含登录所需信息的对象
     * @param data.email - 用户的邮箱地址
     * @param data.password - 用户的密码
     * @returns 返回一个 Promise，该 Promise 会在请求完成后解析为响应数据
     */
    login: (data: {
        // 用户登录使用的邮箱，与后端 DTO 字段名保持一致
        email: string;
        // 用户登录使用的密码
        password: string;
    }) => service.request({
        // 请求的 URL 路径，指向后端的用户登录接口
        url: '/user/login',
        // 请求的 HTTP 方法，这里是 POST 请求
        method: 'post',
        // 设置请求头，明确指定请求体的内容类型为 JSON 格式
        headers: {
            'Content-Type': 'application/json'
        },
        // 将包含邮箱和密码的 data 对象作为请求体发送
        data
    }),

    /**
     * 用户注册接口
     * @param data - 包含注册所需信息的对象
     * @param data.email - 用户的邮箱地址
     * @param data.code - 注册所需的验证码
     * @param data.nickname - 用户的昵称
     * @param data.password - 用户设置的密码
     * @returns 返回一个 Promise，该 Promise 会在请求完成后解析为响应数据
     */
    register: (data: {
        // 用户注册使用的邮箱
        email: string;
        // 注册时需要的验证码
        code: string;
        // 用户注册时设置的昵称
        nickname: string;
        // 用户注册时设置的密码
        password: string;
    }) => service.request({
        // 请求的 URL 路径，指向后端的用户注册接口
        url: '/user/register',
        // 请求的 HTTP 方法，这里是 POST 请求
        method: 'post',
        // 将包含注册信息的 data 对象作为请求体发送
        data
    }),

    /**
     * 发送验证码接口
     * @param email - 用户的邮箱地址，用于接收验证码
     * @param type - 验证码的类型，可选参数
     * @returns 返回一个 Promise，该 Promise 会在请求完成后解析为响应数据
     */
    sendCode: (email: string, type?: string) => service.request({
        // 请求的 URL 路径，指向后端的发送验证码接口
        url: '/user/sendCode',
        // 请求的 HTTP 方法，这里是 GET 请求
        method: 'get',
        // 将邮箱和可选的验证码类型作为查询参数添加到 URL 中
        params: { email, type }
    }),

    /**
     * 重置密码接口
     * @param data - 包含重置密码所需信息的对象
     * @param data.email - 用户的邮箱地址
     * @param data.code - 重置密码所需的验证码
     * @param data.password - 用户新设置的密码
     * @returns 返回一个 Promise，该 Promise 会在请求完成后解析为响应数据
     */
    resetPassword: (data: {
        // 用户用于重置密码的邮箱
        email: string;
        // 重置密码时需要的验证码
        code: string;
        // 用户重置后的新密码
        password: string;
    }) => service.request({
        // 请求的 URL 路径，指向后端的重置密码接口
        url: '/user/resetPassword',
        // 请求的 HTTP 方法，这里是 POST 请求
        method: 'post',
        // 将包含重置密码信息的 data 对象作为请求体发送
        data
    })
};