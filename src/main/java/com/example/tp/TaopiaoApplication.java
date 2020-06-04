package com.example.tp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;

//@MapperScan:
//指定要变成实现类的接口所在的包，然后包下面的所有接口在编译之后都会生成相应的实现类,可以指定多个包
//扫描到dao层的包
//添加位置：是在Springboot启动类上面添加
//@SpringBootApplication
//是一个组合注解，用于快捷配置启动类,可配置多个启动类，但启动时需选择以哪个类作为启动类来启动项目
@MapperScan(basePackages = {"com.example.tp.mapper"})
//@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class})
//@ServletComponentScan//扫描所有servlet
@SpringBootApplication
@ServletComponentScan(basePackages = "com.example.tp.utils")
public class TaopiaoApplication {

    public static void main(String[] args) {

        SpringApplication.run(TaopiaoApplication.class, args);

    }

}
