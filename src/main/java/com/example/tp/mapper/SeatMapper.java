package com.example.tp.mapper;

import com.example.tp.entity.Seat;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatMapper {
    int addSeats(Object seatList);
    List<Seat> selectSeatByCinemaId(@Param("id")Integer id);
    List<Object> selectHallSeatsInfo(Integer cinema_id,Integer hall_id,Integer schedule_id);
    Integer selectSeattsBySeats(Integer seat_id,Integer schedule_id);
    int deleteSeats(Integer cinema_id,Integer hall_id);
}
