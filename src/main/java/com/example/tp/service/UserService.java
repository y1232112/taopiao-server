package com.example.tp.service;

import com.example.tp.entity.User;
import com.example.tp.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    /**
     *
     * @param id
     * @return
     */
    public User getUserById(Integer id){
        return userMapper.getUserById(id);
    }

    /**
     *
     * @return
     */
    public List<User> getAllUser() {
        return userMapper.getAllUser();
    }

    /**
     *map实现方式的查询
     * @param map
     * @return
     */
    public  List<User> getByName(Map<String,String> map){
        return userMapper.getByName(map);
    }

    /**
     * 根据手机号查询
     * @param map
     * @return
     */
   public List<User> getByPhone(Map<String,String> map){return userMapper.getByPhone(map);};

    /**
     * 插入用户注册信息
     * @param nickname
     * @param password
     * @param sex
     * @param phone
     * @param createtime
     * @return
     */
   public int insertRegist(String nickname, String password, String sex, String phone, String createtime,String salt){
        return userMapper.insertRegist(nickname,password,sex,phone,createtime,salt);
    };/*插入注册信息*/
   public int updateAvartar(String avatar,Integer u_id){
       return userMapper.updateAvartar(avatar,u_id);
   }
}
