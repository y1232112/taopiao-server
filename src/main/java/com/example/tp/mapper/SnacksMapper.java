package com.example.tp.mapper;

import com.example.tp.entity.Snacks;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnacksMapper {
    int addSnack(Snacks snacks);
    List<Object> mySnacks(@Param("id") Integer id);
    int deleteSnack(Integer c_id,Integer s_id);
    List<Object> getSnack(@Param("id") Integer id);

}
