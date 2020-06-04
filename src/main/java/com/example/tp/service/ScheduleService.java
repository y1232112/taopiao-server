package com.example.tp.service;

import com.example.tp.entity.Schedule;
import com.example.tp.mapper.ScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    @Autowired
    ScheduleMapper scheduleMapper;
    public int addScheduleInfo(Schedule schedule){
        return scheduleMapper.addScheduleInfo(schedule);
    }
    public List<Object> selectScheduleByCinemaId(Integer id,String date){
        return scheduleMapper.selectScheduleByCinemaId(id,date);
    }
   public     List<Object> selectAcinemaAfilmSchedule(Integer cinema_id,Integer film_id,String date){
        return scheduleMapper.selectAcinemaAfilmSchedule(cinema_id,film_id,date);
   };
   public  List<Object> selectScheduleById(Integer schedule_id){
       return scheduleMapper.selectScheduleById(schedule_id);
   }
   public int deleteSchedule(Integer schedule_id){
       return scheduleMapper.deleteSchedule(schedule_id);
   }
}
