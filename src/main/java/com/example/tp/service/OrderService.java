package com.example.tp.service;

import com.example.tp.entity.Order;
import com.example.tp.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderMapper orderMapper;
    public int addOrder(Order order){
        return orderMapper.addOrder(order);
    }
    public List<Object> selectOrder(Order order){
        return orderMapper.selectOrder(order);
    };
    public List<Object> queryUserOrderFilm(Integer user_id){
        return orderMapper.queryUserOrderFilm(user_id);
    };
    public int updateOrderFilm(Order order){
        return orderMapper.updateOrderFilm(order);
    }
}
