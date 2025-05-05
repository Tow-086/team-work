package org.example.newschool.dto;

import lombok.Data;

import java.util.Date;

// CommentDTO.java
@Data
public class CommentDTO {
    private Integer id;
    private String content;
    private Integer parentId;
    private Integer likeCount;
    private Date createdAt;
    private String nickname;       // 来自User实体
    private String avatarUrl; // 来自User实体
}