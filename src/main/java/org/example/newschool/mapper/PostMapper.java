// src/main/java/org/example/newschool/mapper/PostMapper.java
package org.example.newschool.mapper;

import io.lettuce.core.dynamic.annotation.Param;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.StringTypeHandler;
import org.example.newschool.dto.PostResponseDTO;
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


        @Update("UPDATE posts SET views = views + 1 WHERE id = #{id}")
        void incrementViews(Integer id);



    // PostMapper.java
    @Select("SELECT p.*, u.nickname AS nickname, u.avatar_url AS avatarUrl " +
            "FROM posts p " +
            "LEFT JOIN users u ON p.user_id = u.id " +
            "WHERE p.id = #{id}")
    @Results({
            @Result(property = "nickname", column = "nickname"),
            @Result(property = "avatarUrl", column = "avatarUrl"),
            @Result(property = "comments", column = "id",
                    many = @Many(select = "org.example.newschool.mapper.CommentMapper.findByPostId"))
    })
    PostResponseDTO findPostWithComments(Integer id);
}