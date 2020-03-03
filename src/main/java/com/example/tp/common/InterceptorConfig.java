package com.example.tp.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 注册拦截器
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
//        注册拦截器
        InterceptorRegistration ir=registry.addInterceptor(new ApplicationInterceptor());
//        添加拦截器
        ir.addPathPatterns("/*");
//        添加不拦截的请求
        ir.excludePathPatterns("/doLogin","/doRegist");
    }
}
