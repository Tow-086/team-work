// src/main/java/org/example/newschool/service/PostService.java
package org.example.newschool.service;

import org.example.newschool.dto.CommentDTO;
import org.example.newschool.dto.PostCreateDTO;
import org.example.newschool.dto.PostResponseDTO;
import org.example.newschool.entity.Post;
import org.example.newschool.result.PageResult;

import java.util.List;

public interface PostService {
    Post createPost(PostCreateDTO postCreateDTO);

    PageResult<Post> getPosts(String section,int page, int size);

    PostResponseDTO getPostById(Integer id);
    void incrementViews(Integer id);

    void toggleLike(Integer postId, Integer userId);

    void createComment(Integer postId, Integer userId, String content);


    List<CommentDTO> getCommentsByPostId(Integer postId);
}