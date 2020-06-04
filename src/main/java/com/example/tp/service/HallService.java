package com.example.tp.service;

import com.example.tp.entity.Hall;
import com.example.tp.mapper.HallMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallService {
    @Autowired
    HallMapper hallMapper;
   public int addHall(Hall hall){
       return hallMapper.addHall(hall);
   }
   public List<Hall> getAllHallByCinemaId(Integer id){
       return hallMapper.getAllHallByCinemaId(id);
   }
   public     List<Object> selectHall(Integer cinema_id,Integer hall_id){
       return hallMapper.selectHall(cinema_id,hall_id);
   }
  public int deleteHall(Integer cinema_id,Integer hall_id){
       return hallMapper.deleteHall(cinema_id,hall_id);
   };
}
