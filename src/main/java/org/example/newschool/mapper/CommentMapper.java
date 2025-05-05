package org.example.newschool.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.newschool.dto.CommentDTO;
import java.util.List;

@Mapper
public interface CommentMapper {
    // CommentMapper.java
    @Select("SELECT c.*, u.nickname AS nickname, u.avatar_url AS avatarUrl " +
            "FROM comments c " +
            "LEFT JOIN users u ON c.user_id = u.id " +
            "WHERE c.post_id = #{postId} " +
            "ORDER BY c.created_at DESC")
    List<CommentDTO> findByPostId(Integer postId);
}