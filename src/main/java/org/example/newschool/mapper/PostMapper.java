// src/main/java/org/example/newschool/mapper/PostMapper.java
package org.example.newschool.mapper;

import io.lettuce.core.dynamic.annotation.Param;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.example.newschool.entity.Post;

import java.util.List;

@Mapper
public interface PostMapper {
    @Insert("INSERT INTO posts (user_id, title, content, section, views, like_count, status, created_at, updated_at) " +
            "VALUES (#{user.id}, #{title}, #{content}, #{section}, #{views}, #{likeCount}, #{status}, #{createdAt}, #{updatedAt})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertPost(Post post);

    // PostMapper.java
    @Select("SELECT * FROM posts WHERE status = 1 ORDER BY created_at DESC LIMIT #{size} OFFSET #{offset}")
    List<Post> findPostsByPage(@Param("offset") int offset, @Param("size") int size);

    @Select("SELECT COUNT(*) FROM posts WHERE status = 1")
    int countPosts();
}