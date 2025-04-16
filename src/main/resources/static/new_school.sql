-- ----------------------------
-- 1. 用户表（核心身份信息）
-- ----------------------------
CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户唯一ID',
                       email VARCHAR(255) UNIQUE NOT NULL COMMENT '登录邮箱(唯一)',
                       password VARCHAR(255) NOT NULL COMMENT 'BCrypt加密后的密码',
                       nickname VARCHAR(50) DEFAULT '新用户' COMMENT '用户昵称（显示用）',
                       avatar_url VARCHAR(512) DEFAULT '/default_avatar.png' COMMENT '头像URL地址',
                       points INT DEFAULT 0 COMMENT '虚拟货币余额（用于悬赏等场景）',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
                       updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '最后信息更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户主表';

-- 索引建议：邮箱作为登录凭证必须唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- ----------------------------
-- 2. 帖子表（核心内容）
-- ----------------------------
CREATE TABLE posts (
                       id INT PRIMARY KEY AUTO_INCREMENT COMMENT '帖子ID',
                       user_id INT NOT NULL COMMENT '发帖人ID（关联users.id）',
                       title VARCHAR(255) NOT NULL COMMENT '帖子标题（搜索关键字段）',
                       content LONGTEXT NOT NULL COMMENT '帖子内容（支持富文本）',
                       views INT DEFAULT 0 COMMENT '浏览次数（可做热门排序）',
                       like_count INT DEFAULT 0 COMMENT '点赞数（冗余字段避免频繁COUNT）',
                       status TINYINT DEFAULT 1 COMMENT '状态（1-正常 0-删除）',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发帖时间',
                       updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP COMMENT '最后编辑时间',
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- 用户删除时级联删除帖子
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子主表';

-- 优化索引：标题搜索、用户查询
CREATE INDEX idx_title ON posts(title); -- 支持LIKE模糊搜索
CREATE INDEX idx_user ON posts(user_id); -- 快速查用户发帖

-- ----------------------------
-- 3. 评论表（支持二级回复）
-- ----------------------------
CREATE TABLE comments (
                          id INT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID',
                          post_id INT NOT NULL COMMENT '所属帖子ID（关联posts.id）',
                          user_id INT NOT NULL COMMENT '评论人ID（关联users.id）',
                          content TEXT NOT NULL COMMENT '评论内容',
                          parent_id INT DEFAULT 0 COMMENT '父评论ID（0-顶级评论）',
                          like_count INT DEFAULT 0 COMMENT '点赞数',
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
                          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, -- 帖子删除时评论同步删除
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- ----------------------------
-- 4. 点赞表（去重设计）
-- ----------------------------
CREATE TABLE likes (
                       user_id INT NOT NULL COMMENT '点赞用户ID',
                       post_id INT NOT NULL COMMENT '被赞帖子ID',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
                       PRIMARY KEY (user_id, post_id), -- 联合主键防止重复点赞
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                       FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞记录';

-- ----------------------------
-- 5. 收藏表（与点赞类似结构）
-- ----------------------------
CREATE TABLE favorites (
                           user_id INT NOT NULL COMMENT '收藏用户ID',
                           post_id INT NOT NULL COMMENT '被收藏帖子ID',
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
                           PRIMARY KEY (user_id, post_id), -- 唯一收藏
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                           FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户收藏记录';

-- ----------------------------
-- 6. 关注表（社交关系）
-- ----------------------------
CREATE TABLE follows (
                         follower_id INT NOT NULL COMMENT '关注者ID',
                         followed_id INT NOT NULL COMMENT '被关注者ID',
                         created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
                         PRIMARY KEY (follower_id, followed_id), -- 唯一关注关系
                         FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系';

-- ----------------------------
-- 7. 浏览历史表（用户行为）
-- ----------------------------
CREATE TABLE browse_history (
                                user_id INT NOT NULL COMMENT '浏览用户ID',
                                post_id INT NOT NULL COMMENT '被浏览帖子ID',
                                viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '浏览时间',
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户浏览记录';

-- 索引建议：按用户查询历史记录
CREATE INDEX idx_user_history ON browse_history(user_id, viewed_at DESC);