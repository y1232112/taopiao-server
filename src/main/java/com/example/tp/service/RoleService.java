package com.example.tp.service;

import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.Role;
import com.example.tp.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleMapper roleMapper;
    public int addRole(Role role){
        return roleMapper.addRole(role);
    }
    public List<Object> selectRoleByFilm(Integer id){
        return roleMapper.selectRoleByFilm(id);
    }
}
