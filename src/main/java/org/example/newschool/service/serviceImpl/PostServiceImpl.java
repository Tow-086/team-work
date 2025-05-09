// src/main/java/org/example/newschool/service/serviceImpl/PostServiceImpl.java
package org.example.newschool.service.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.example.newschool.dto.CommentDTO;
import org.example.newschool.dto.PostCreateDTO;
import org.example.newschool.dto.PostResponseDTO;
import org.example.newschool.entity.Post;
import org.example.newschool.entity.User;
import org.example.newschool.exception.AccountException;
import org.example.newschool.mapper.CommentMapper;
import org.example.newschool.mapper.LikeMapper;
import org.example.newschool.mapper.PostMapper;
import org.example.newschool.result.PageResult;
import org.example.newschool.service.PostService;
import org.example.newschool.util.FileStorageUtil;
import org.example.newschool.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;
    @Autowired
    private FileStorageUtil fileStorageUtil;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private LikeMapper likeMapper;
    @Override
    public Post createPost(PostCreateDTO postCreateDTO) {
        // 1. 获取当前用户ID
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Integer userId = JwtUtil.getUserIdFromToken(request.getHeader("Authorization"));

        // 2. 处理图片上传
        List<String> imageUrls = null;
        if (postCreateDTO.getImages() != null && !postCreateDTO.getImages().isEmpty()) {
            imageUrls = fileStorageUtil.storeFiles(postCreateDTO.getImages());
        }

        // 3. 构建Post实体
        Post post = new Post();
        post.setTitle(postCreateDTO.getTitle());
        post.setContent(postCreateDTO.getContent());
        post.setSection(postCreateDTO.getSection());
        User user = new User();
        user.setId(userId);
        post.setUser(user);
        post.setCreatedAt(new Date());
        post.setUpdatedAt(new Date());

        // 4. 插入数据库
        postMapper.insertPost(post);

        // 5. 处理标签和图片关联（需实现关联表操作）
        return post;
    }


    @Override
    public PageResult<Post> getPosts(String section, int page, int size) {
        int offset = (page - 1) * size;
        List<Post> posts = postMapper.findPostsByPage(section, offset, size); // 修改传参
        int total = postMapper.countPosts(section); // 新增带参数的统计
        return new PageResult<>(total, page, size, posts);
    }

//    @Override
//    public Post getPostById(Integer id) {
//        return postMapper.findPostById(id);
//    }

    // PostServiceImpl.java
    @Override
    @Transactional
// PostServiceImpl.java
    public PostResponseDTO getPostById(Integer id) {
        PostResponseDTO post = postMapper.findPostWithComments(id);
        if (post == null) throw new AccountException("帖子不存在");

        // 处理空值
        if (post.getNickname() == null) {
            post.setNickname("匿名用户");
        }
        if (post.getAvatarUrl() == null) {
            post.setAvatarUrl("/default_avatar.png");
        }
        return post;
    }

    @Override
    public void incrementViews(Integer id) {
        postMapper.incrementViews(id);
    }

    @Override
    @Transactional
    public void toggleLike(Integer postId, Integer userId) {
        boolean isLiked = likeMapper.existsLike(userId, postId);

        if (isLiked) {
            likeMapper.deleteLike(userId, postId);
            postMapper.updateLikeCount(postId, -1); // 减少点赞数
        } else {
            likeMapper.insertLike(userId, postId);
            postMapper.updateLikeCount(postId, 1); // 增加点赞数
        }
    }
}