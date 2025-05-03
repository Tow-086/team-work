// src/main/java/org/example/newschool/dto/PostCreateDTO.java
package org.example.newschool.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@ApiModel(description = "创建帖子请求参数")
public class PostCreateDTO {
    private String title;
    private String content;
    private String section;
    private List<String> tags;
    private List<MultipartFile> images; // 文件上传字段
}