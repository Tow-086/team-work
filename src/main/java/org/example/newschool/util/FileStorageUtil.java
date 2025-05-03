// src/main/java/org/example/newschool/util/FileStorageUtil.java
package org.example.newschool.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileStorageUtil {
    @Value("${file.upload-dir}")
    private String uploadDir;

    // 初始化时创建目录
    @PostConstruct
    public void init() {
        try {
            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("无法创建上传目录: " + uploadDir);
        }
    }

    public List<String> storeFiles(List<MultipartFile> files) {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir, filename);
            try {
                Files.copy(file.getInputStream(), path);
                fileUrls.add("/uploads/" + filename);
            } catch (IOException e) {
                throw new RuntimeException("文件存储失败: " + e.getMessage());
            }
        }
        return fileUrls;
    }
}