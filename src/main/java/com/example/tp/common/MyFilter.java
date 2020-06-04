package com.example.tp.common;


import com.example.tp.service.RedisService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.FilterConfig;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 创建过滤器
 */
//@WebFilter(urlPatterns = "/*")
//@Component
public class MyFilter implements Filter {
    @Autowired
    private RedisService redisService;





    @Override
    public void init(FilterConfig filterConfig) throws ServletException {


    }

    @Override
    public void destroy() {
        System.out.println("过滤器撤销");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("我的过滤器");
//app(客户端)验证token
//web端验证cookie
        HttpServletRequest request=(HttpServletRequest)servletRequest;
        HttpServletResponse response=(HttpServletResponse) servletResponse;
         HttpSession session=request.getSession();
        if (null ==redisService){
            BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
            redisService = (RedisService) factory.getBean("redisService");
        }

//         获取请求头信息+++++++++++++++++++++

//        获取path
       String path=request.getServletPath();
       System.out.println("path"+path);
//       如果路径包括 user 则是处理客户端请求
        if (path.indexOf("/user")!=-1){

            if ("/user/doRegister".equals(path)||"/user/doLogin".equals(path)){

                filterChain.doFilter(servletRequest, servletResponse);

            }else if (request.getHeader("token")==null||request.getHeader("user_id")==null){




            }else {
                String u_token=request.getHeader("token");
                String u_id=request.getHeader("user_id");

                System.out.println("用户请求头部分信息："+u_id+" "+u_token);
                String redis_token= redisService.getTokenInRedis(u_id);
                System.out.println("service:"+redisService+" "+redis_token);
                filterChain.doFilter(servletRequest, servletResponse);
            }




        }else {

//       路径为“/”直接通过，否则验证cookie

            if (path.equals("/")||path.equals("/cinemaAdmin/doLogin")||path.equals("/sysadmin/doLogin/")){
                  System.out.println("===========");
//
                filterChain.doFilter(servletRequest, servletResponse);

            }else{

                filterChain.doFilter(servletRequest,servletResponse);
            }
        }




    }



}
