package com.example.tp.service;

import com.example.tp.entity.Zan;
import com.example.tp.mapper.ZanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZanService {
    @Autowired
    ZanMapper zanMapper;
    public  int insertZan(Zan zan){
        return zanMapper.insertZan(zan);
    }
    public  int updateZan(Integer o_id,Integer type_id,Integer type,Integer status,Integer user_id){
        return zanMapper.updateZan(o_id,type_id,type,status,user_id);
    }
  public List<Zan> selectMyZan(Zan zan){
        return zanMapper.selectMyZan(zan);
  }

}
