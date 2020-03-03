package com.example.tp.common;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 自定义注解
 */
@Target({ElementType.METHOD,ElementType.TYPE})
//TYPE:用于描述类、接口(包括注解类型) 或enum声明
//METHOD:用于描述方法
@Retention(RetentionPolicy.RUNTIME)
//注解不仅被保存到class文件中，jvm加载class文件之后，仍然存在
public @interface AuthToken {
}
