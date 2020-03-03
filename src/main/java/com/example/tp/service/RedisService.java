package com.example.tp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

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
}
