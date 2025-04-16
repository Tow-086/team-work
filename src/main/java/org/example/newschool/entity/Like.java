package org.example.newschool.entity;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "likes")
@IdClass(Like.LikeKey.class)
public class Like {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Id
    @Column(name = "post_id", nullable = false)
    private Integer postId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // 自定义联合主键类
    public static class LikeKey implements Serializable {
        private Integer userId;
        private Integer postId;
    }
}
