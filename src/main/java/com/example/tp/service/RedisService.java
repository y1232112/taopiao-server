package com.example.tp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    @Autowired
    private RedisTemplate redisTemplate;

    public String setMsg(String key, String msg) {
        redisTemplate.opsForValue().set(key,msg);
        return "success";
    }

    public String getMsg(String key) {
        return (String)redisTemplate.opsForValue().get(key);
    }

    /**
     *
     * @param key
     * @param value
     */
    public void delToken(String key,String value){
        if(redisTemplate.opsForValue().get(key)==null){
            redisTemplate.opsForValue().set(key,value);//存储键值对
            redisTemplate.expire(key,3600, TimeUnit.SECONDS);//设置超时
        }
        else {
            redisTemplate.expire(key,3600, TimeUnit.SECONDS);//设置超时
        }

    }
}
