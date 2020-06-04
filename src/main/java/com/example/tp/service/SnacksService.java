package com.example.tp.service;

import com.example.tp.entity.Snacks;
import com.example.tp.mapper.SnacksMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnacksService {
    @Autowired
    SnacksMapper snacksMapper;
    public int addSnack(Snacks snacks){
        return snacksMapper.addSnack(snacks);
    }
    public List<Object> mySnacks(Integer id){
        return snacksMapper.mySnacks(id);
    }
    public int deleteSnack(Integer c_id,Integer s_id){
        return snacksMapper.deleteSnack(c_id, s_id);
    }
    public  List<Object> getSnack(Integer id){
        return snacksMapper.getSnack(id);
    };
}
