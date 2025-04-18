package org.example.newschool.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.newschool.dto.ResetPasswordDTO;
import org.example.newschool.dto.UserLoginDTO;
import org.example.newschool.entity.User;
import org.example.newschool.result.Result;
import org.example.newschool.service.UserLoginService;
import org.example.newschool.util.JwtUtil;
import org.example.newschool.vo.UserRegisterV0;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.newschool.dto.UserRegisterDTO; // 导入UserRegisterDTO类

import java.util.HashMap;
import java.util.Map;

//TODO  看注释
/*
* user表中的验证码过期时间好像没什么用后续直接删掉吧
* */

@Slf4j
@RestController
@RequestMapping("/user")
public class UserLoginController {
    @Autowired
    private UserLoginService userLoginService;

    //用户qq注册
    @PostMapping("/register")
    public Result<UserRegisterV0> register(@RequestBody UserRegisterDTO userRegisterDTO) { // 修复@RequestBody注解位置
        //记录日志
        log.info("用户qq注册:  {}", userRegisterDTO);
        //调用服务层的注册方法
        User user = userLoginService.register(userRegisterDTO);
        //构建返回给前端的VO对象
        UserRegisterV0 userRegisterV0 = new UserRegisterV0();
        userRegisterV0.setNickname(user.getNickname());
        //返回结果
        return Result.success(userRegisterV0);
    }


    // 异步发送验证码（独立接口）
    @GetMapping("/sendCode")
    public ResponseEntity<String> sendCode(
            @RequestParam String email,
            @RequestParam(required = false, defaultValue = "register") String type
    ) {
        log.info("异步发送验证码: 邮箱={}, 类型={}", email, type);
        userLoginService.asyncSendVerificationCode(email, type);
        return ResponseEntity.ok("验证码发送请求已接收");
    }

    //用户登录
    //懒得写loginvo了就用registervo了
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody UserLoginDTO userLoginDTO) {
        log.info("用户登录:  {}", userLoginDTO);
        User user = userLoginService.login(userLoginDTO);
        UserRegisterV0 userRegisterV0 = new UserRegisterV0();
        userRegisterV0.setNickname(user.getNickname());

        //弄个Token
        //生成JWT token
        // 生成JWT Token
        String token = JwtUtil.generateToken(user.getId());
        //构建返回对象
        Map<String, Object> userData = new HashMap<>();
        userData.put("token", token);
        userData.put("nickname", userRegisterV0.getNickname());

        Map<String, Object> response = new HashMap<>();
        response.put("user", userData);

        return Result.success(response);
    }


    // 忘记密码-重置密码
    @PostMapping("/resetPassword")
    public Result<String> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        log.info("密码重置请求: {}", resetPasswordDTO.getEmail());
        userLoginService.resetPassword(resetPasswordDTO);
        return Result.success("密码重置成功");
    }

}
