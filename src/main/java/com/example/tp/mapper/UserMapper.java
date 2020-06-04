package com.example.tp.mapper;

import com.example.tp.entity.User;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;


@Repository
public interface UserMapper {
    User user=new User();
    Integer id=user.getUserId();
    /**
     *
     * @param id
     * @return
     */
    User getUserById(@Param("id") Integer id);

    /**
     *
     * @return
     */
    List<User> getAllUser();/*获得所有用户*/

    /**
     *map实现方式的以用户名查询
     * @param map
     * @return
     */

  List<User> getByName(Map<String,String> map);/*根据用户名查询*/

    /**
     * 根据手机号查询
     * @param map
     * @return
     */
    List<User> getByPhone(Map<String,String> map);/*手机号查询*/

    /**
     * 插入注册信息
     * @param nickname
     * @param password
     * @param sex
     * @param phone
     * @param createtime
     * @return
     */

   int insertRegist(String nickname, String password, String sex, String phone, String createtime,String salt);/*插入注册信息*/

   int updateAvartar(String avatar,Integer u_id);
}
