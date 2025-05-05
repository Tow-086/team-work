package org.example.newschool.mapper;

import org.apache.ibatis.annotations.*;

@Mapper
public interface LikeMapper {
    @Insert("INSERT INTO likes (user_id, post_id, created_at) VALUES (#{userId}, #{postId}, NOW())")
    void insertLike(@Param("userId") Integer userId, @Param("postId") Integer postId);

    @Delete("DELETE FROM likes WHERE user_id = #{userId} AND post_id = #{postId}")
    void deleteLike(@Param("userId") Integer userId, @Param("postId") Integer postId);

    @Select("SELECT COUNT(*) FROM likes WHERE user_id = #{userId} AND post_id = #{postId}")
    boolean existsLike(@Param("userId") Integer userId, @Param("postId") Integer postId);
}