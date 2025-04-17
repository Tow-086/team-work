package org.example.newschool.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "用户登录信息")
public class UserLoginDTO implements Serializable {
    private String email;
    private String password;
}
