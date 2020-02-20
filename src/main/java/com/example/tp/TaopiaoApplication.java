package com.example.tp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(basePackages = {"com.example.tp.mapper"})
//@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class})
@SpringBootApplication
public class TaopiaoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaopiaoApplication.class, args);
    }

}
