package com.example.tp.mapper;

import com.example.tp.entity.Zan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZanMapper {
    int insertZan(Zan zan);
    int updateZan( Integer o_id, Integer type_id, Integer type,Integer status,Integer user_id);
    List<Zan> selectMyZan(Zan zan);
}
