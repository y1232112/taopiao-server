package com.example.tp.service;

import com.example.tp.entity.Seat;
import com.example.tp.mapper.SeatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    SeatMapper seatMapper;
    public int addSeats(List<Object> seatList){
        return seatMapper.addSeats(seatList);
    }
    public  List<Seat> selectSeatByCinemaId(Integer id){
        return seatMapper.selectSeatByCinemaId(id);
    }
    public   List<Object> selectHallSeatsInfo(Integer cinema_id,Integer hall_id,Integer schedule_id){
        return seatMapper.selectHallSeatsInfo(cinema_id,hall_id,schedule_id);
    };
    public Integer selectSeattsBySeats(Integer seat_id,Integer schedule_id){
        return seatMapper.selectSeattsBySeats(seat_id,schedule_id);

    }
    public  int deleteSeats(Integer cinema_id,Integer hall_id){
        return seatMapper.deleteSeats(cinema_id,hall_id);
    };
}
