package org.example.newschool.exception;

// 自定义账户异常类
public class AccountException extends RuntimeException {
    // 构造函数，接受异常消息
    public AccountException(String message) {
        super(message);
    }
}
