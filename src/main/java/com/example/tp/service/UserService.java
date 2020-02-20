package com.example.tp.service;

import com.example.tp.entity.User;
import com.example.tp.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Component
@Service
public class UserService {
    @Autowired
    UserMapper userMapper;
    public User getUserById(Integer id){
        return userMapper.getUserById(id);
    }
}
