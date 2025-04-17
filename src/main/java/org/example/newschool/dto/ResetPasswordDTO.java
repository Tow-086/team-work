package org.example.newschool.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "忘记密码用邮箱重置密码信息")
public class ResetPasswordDTO implements Serializable {
    private String email;
    private String password;
    private String code;
    // ResetPasswordDTO.java
    private String type = "reset"; // 默认标识密码重置场景
}
