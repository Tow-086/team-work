package org.example.newschool.entity;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "follows")
@IdClass(Follow.FollowKey.class)
public class Follow {
    @Id
    @Column(name = "follower_id", nullable = false)
    private Integer followerId;

    @Id
    @Column(name = "followed_id", nullable = false)
    private Integer followedId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // 自定义联合主键类
    public static class FollowKey implements Serializable {
        private Integer followerId;
        private Integer followedId;
    }
}