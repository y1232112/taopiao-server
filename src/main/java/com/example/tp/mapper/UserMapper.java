package com.example.tp.mapper;

import com.example.tp.entity.User;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


//@Mapper
@Repository
public interface UserMapper {
    User getUserById(@Param("id") Integer id);
}
