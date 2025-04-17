package org.example.newschool.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@ApiModel(description = "用户注册信息")
@Data
public class UserRegisterDTO implements Serializable {
    @ApiModelProperty(value = "邮箱地址")
    private String email;
    @ApiModelProperty(value = "密码")
    private String password;
    @ApiModelProperty(value = "昵称")
    private String nickname;
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime created_at = LocalDateTime.now();
    @ApiModelProperty(value = "验证码")
    private String code;
    @ApiModelProperty(value = "验证码过期时间")
    private Timestamp code_expires_at;
}
