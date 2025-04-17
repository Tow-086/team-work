package org.example.newschool.service;

import org.example.newschool.dto.ResetPasswordDTO;
import org.example.newschool.dto.UserLoginDTO;
import org.example.newschool.dto.UserRegisterDTO;
import org.example.newschool.entity.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public interface UserLoginService {
    User register(UserRegisterDTO userRegisterDTO);

    User login(UserLoginDTO userLoginDTO);

    void resetPassword(ResetPasswordDTO resetPasswordDTO);

    @Async
    void asyncSendVerificationCode(String email, String type);
}
