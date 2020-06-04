package com.example.tp.common;

import com.example.tp.service.RedisService;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.Filter;

@Configuration
public class FilterConfig  {

    @Bean
    public FilterRegistrationBean myFilterRegistration(){
//        FilterRegistrationBean regist=new FilterRegistrationBean(myFilter());
////    过滤全部请求
//        regist.addUrlPatterns("/*");
//        return regist;

            FilterRegistrationBean registration = new FilterRegistrationBean<>();
        registration.setFilter(this.myFilter());
        registration.addUrlPatterns("/*");
        registration.setName("myFilter");
        registration.setOrder(1);
        return registration;
    }
    @Bean
    public Filter myFilter(){
        return  new MyFilter();
    }

}
