package com.example.tp.mapper;

import com.example.tp.entity.Schedule;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleMapper {
    int addScheduleInfo(Schedule schedule);
    List<Object> selectScheduleByCinemaId(@Param("id") Integer id,String date);
    List<Object> selectAcinemaAfilmSchedule(Integer cinema_id,Integer film_id,String date);
    List<Object> selectScheduleById(@Param("schedule_id")Integer schedule_id);
    int deleteSchedule(Integer schedule_id);
}
