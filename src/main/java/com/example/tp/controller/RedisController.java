package com.example.tp.controller;

import com.example.tp.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/msg")
@RestController
public class RedisController {
    @Autowired
    private RedisService redisService;
   @RequestMapping("/set")
    public String setMsg(){
    return redisService.setMsg("myKey4","123455");
    }
//    @GetMapping("/get")
@RequestMapping("/get")
    public String getMsg(/*@RequestParam(value = "Key")*//*String key */){
        System.out.println("---------Redis------"+redisService.getMsg("myKey"));
        return redisService.getMsg("myKey");
    }

}
