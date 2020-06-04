package com.example.tp.service;

import com.example.tp.entity.SnackOrder;
import com.example.tp.mapper.OrderSnackMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderSnackService {
    @Autowired
   OrderSnackMapper orderSnackMapper;
    public    int addOrderSnack(SnackOrder snackOrder){
        return orderSnackMapper.addOrderSnack(snackOrder);
    };
    public List<Object> selectOrderSnack(Integer user_id){
        return orderSnackMapper.selectOrderSnack(user_id);
    };
}
