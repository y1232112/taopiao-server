package com.example.tp.mapper;

import com.example.tp.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AdminMapper {


    /**
     * 根据id查询管理员
     * @return
     */
    Admin getAdminById(@Param("id") Integer id);

    /**
     * 根据管理员账号查询
     * @param map
     * @return
     */
    List<Admin> getByAdmin(Map<String,String> map);

    List<Admin> getAllSysAdmin();//获得所用系统管理员


}
