package com.example.tp.common;

import org.apache.commons.logging.Log;
import org.apache.logging.log4j.Logger;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * 创建拦截器
 */

public class ApplicationInterceptor implements HandlerInterceptor {
//    存放鉴权信息header名称
    private String authHeader="Auth";
//    鉴权失败后返回的错误码
    private static final int unAuthErrCode=404;
//    鉴权失败后返回的错误信息
    private static final String unAuthErrMessage="401 unauthorized";
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    System.out.println("----------------------:我的拦截器");
        if(!(handler instanceof HandlerMethod)){

            return true;
        }
        HandlerMethod handlerMethod= (HandlerMethod) handler;
        Method method=handlerMethod.getMethod();
//        如果打上AuthToken则进行验证
        if(method.getAnnotation(AuthToken.class)!=null||handlerMethod.getBeanType().getAnnotation(AuthToken.class)!=null)
        {
            String token=request.getHeader("token");

        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
