package org.example.newschool.entity;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 65535, nullable = false)
    private String content;

    @Column(name = "parent_id", nullable = false)
    private Integer parentId = 0; // 0表示顶级评论

    private Integer likeCount = 0;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
}
