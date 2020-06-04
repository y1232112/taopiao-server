package com.example.tp.mapper;

import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.Role;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleMapper {
    int addRole(Role role);
    List<Object> selectRoleByFilm(@Param("id") Integer id);
}
