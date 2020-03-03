package com.example.tp.common;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean myFilterRegistration(){
        FilterRegistrationBean regist=new FilterRegistrationBean(new MyFilter());
//    过滤全部请求
        regist.addUrlPatterns("/*");
        return regist;
    }

}
