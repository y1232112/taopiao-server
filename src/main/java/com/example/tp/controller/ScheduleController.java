package com.example.tp.controller;

import com.example.tp.entity.Schedule;
import com.example.tp.service.ScheduleService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import netscape.javascript.JSUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;
    @RequestMapping(value = "/schedule/addSchedule.json",method = RequestMethod.POST)
    @ResponseBody
    public String addScheduleInfo(@RequestBody String receiveJson) throws JsonProcessingException {
        Schedule schedule=new Schedule();
//        System.out.println("parse:"+Integer.parseInt(JsonUtils.getFormJson(receiveJson,"schedule_id")));
//        schedule.setScheduleId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"schedule_id")));
        schedule.setFilmId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"film_id")));
        schedule.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        schedule.setHallId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"hall_id")));
        schedule.setShowDate(JsonUtils.getFormJson(receiveJson,"show_date"));
        schedule.setOriginPrice(Double.parseDouble(JsonUtils.getFormJson(receiveJson,"origin_price")));
        schedule.setDiscount(JsonUtils.getFormJson(receiveJson,"discount"));
        schedule.setDiscountPrice(Double.parseDouble(JsonUtils.getFormJson(receiveJson,"discount_price")));
        schedule.setStartTime(JsonUtils.getFormJson(receiveJson,"start_time"));
        schedule.setEndTime(JsonUtils.getFormJson(receiveJson,"end_time"));
        schedule.setLanguage(JsonUtils.getFormJson(receiveJson,"language"));
        int num=scheduleService.addScheduleInfo(schedule);
        if (num>0){
            return JsonUtils.delSuccess();
        }else {
            return JsonUtils.delFailure();
        }
    }
    @RequestMapping(value = "/schedule/{id}",method = RequestMethod.GET)
    public String selectScheduleByCinemaId(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        return mapper.writeValueAsString(scheduleService.selectScheduleByCinemaId(id,date));
    }

    @RequestMapping(value = "/schedule/deleteSchedule.json",method = RequestMethod.POST)
    @ResponseBody
    public String deleteSchedule(@RequestBody String receiveJson) throws JsonProcessingException {
       Integer schedule_id= Integer.parseInt(JsonUtils.getFormJson(receiveJson,"schedule_id"));

        int num=scheduleService.deleteSchedule(schedule_id);
        if (num>0){
            return JsonUtils.delSuccess();
        }else {
            return JsonUtils.delFailure();
        }
    }
}
