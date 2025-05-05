// src/main/java/org/example/newschool/dto/PostResponseDTO.java

package org.example.newschool.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class PostResponseDTO {
    private Integer id;
    private String title;
    private String content;
    private String section;
    private Integer views;
    private Integer likeCount;
    private Date createdAt;
    private Date updatedAt;
    private String nickname;       // 来自User实体
    private String avatarUrl; // 来自User实体
    private List<CommentDTO> comments;
}
