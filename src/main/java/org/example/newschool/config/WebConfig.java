package org.example.newschool.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 允许 localhost:63342 的跨域请求
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // 允许的前端地址
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 允许的方法
                .allowedHeaders("*") // 允许的请求头
                .allowCredentials(true); // 是否允许凭证
    }
}