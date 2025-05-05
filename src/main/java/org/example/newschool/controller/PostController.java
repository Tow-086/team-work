// src/main/java/org/example/newschool/controller/PostController.java
package org.example.newschool.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.newschool.dto.PostCreateDTO;
import org.example.newschool.dto.PostResponseDTO;
import org.example.newschool.entity.Post;
import org.example.newschool.result.PageResult;
import org.example.newschool.result.Result;
import org.example.newschool.service.PostService;
import org.example.newschool.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("")
    public Result<Post> createPost(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String section,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) List<MultipartFile> images
    ) {
        log.info("创建新帖子: title={}, content={}, section={}, tags={}, images={}", title, content, section, tags, images);
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        postCreateDTO.setTitle(title);
        postCreateDTO.setContent(content);
        postCreateDTO.setSection(section);
        postCreateDTO.setTags(tags);
        postCreateDTO.setImages(images);

        log.info("创建新帖子: {}", postCreateDTO);
        Post createdPost = postService.createPost(postCreateDTO);
        return Result.success(createdPost);
    }

    // PostController.java
    @GetMapping("")
    public PageResult<Post> getPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "100") int size
    ) {
        return postService.getPosts(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPost(@PathVariable Integer id) {
        postService.incrementViews(id);
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<String> toggleLike(@PathVariable Integer id) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Integer userId = JwtUtil.getUserIdFromToken(request.getHeader("Authorization"));

        postService.toggleLike(id, userId);
        return ResponseEntity.ok("操作成功");
    }

}