package com.example.tp.controller;

import com.example.tp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/taopiao")
@SpringBootApplication
public class UserController {
    @Autowired
    private UserService userService;
    @RequestMapping(value = "/getUser/{id}")
    public String GetUser(@PathVariable Integer id){
        return userService.getUserById(id).toString();
    }
}
