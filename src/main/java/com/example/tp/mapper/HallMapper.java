package com.example.tp.mapper;

import com.example.tp.entity.Hall;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallMapper {
    int addHall(Hall hall);
    List<Hall> getAllHallByCinemaId(@Param("id")Integer id);
    List<Object> selectHall(Integer cinema_id,Integer hall_id);
    int deleteHall(Integer cinema_id,Integer hall_id);
}
