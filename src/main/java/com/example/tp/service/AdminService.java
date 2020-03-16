package com.example.tp.service;

import com.example.tp.entity.Admin;
import com.example.tp.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {
  @Autowired
  AdminMapper adminMapper;
    /**
     * 根据id查询
     * @param id
     * @return
     */
    public Admin getAdminById(@Param("id") Integer id){
        return adminMapper.getAdminById(id);
    }

    /**
     * 根据管理员账号进行查询
     * @param map
     * @return
     */
    public List<Admin> getByAdmin(Map<String,String> map){
        return adminMapper.getByAdmin(map);
    }


}
