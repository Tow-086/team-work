package org.example.newschool.entity;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "favorites")
@IdClass(Favorite.FavoriteKey.class)
public class Favorite {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Id
    @Column(name = "post_id", nullable = false)
    private Integer postId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    // 自定义联合主键类
    public static class FavoriteKey implements Serializable {
        private Integer userId;
        private Integer postId;
    }
}
