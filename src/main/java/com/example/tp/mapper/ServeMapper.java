package com.example.tp.mapper;

import com.example.tp.entity.Serve;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServeMapper {
    int addServe(Serve serve);
    List<Object> myServe(@Param("id") Integer id);
    int updateMyServe(Serve serve);
    int deleteMyServe(Serve serve);
}
