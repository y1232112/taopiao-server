package com.example.tp.mapper;

import com.example.tp.entity.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMapper {
    int addOrder(Order order);
    List<Object> selectOrder(Order order);
   List<Object> queryUserOrderFilm(Integer user_id);
   int updateOrderFilm(Order order);
}
