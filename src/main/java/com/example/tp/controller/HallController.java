package com.example.tp.controller;

import com.example.tp.entity.Hall;
import com.example.tp.mapper.HallMapper;
import com.example.tp.service.HallService;
import com.example.tp.service.SeatService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class HallController {
    @Autowired
    private HallService hallService;
    @Autowired
    SeatService seatService;
    @RequestMapping(value = "/hall/addHall",method = RequestMethod.POST)
    @ResponseBody
    public String addHall(@RequestBody String receiveJson) throws JsonProcessingException {
//        System.out.println(receiveJson);
//        System.out.println(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"hall_id")));
//        System.out.println(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
//        System.out.println(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"row_count")));
//        System.out.println(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"column_count")));
        Hall hall=new Hall();
        hall.setHallId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"hall_id")));
        hall.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        hall.setHallType(JsonUtils.getFormJson(receiveJson,"hall_type"));
        hall.setHallName(JsonUtils.getFormJson(receiveJson,"hall_name"));
        hall.setRowCount(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"row_count")));
        hall.setColumnCount(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"column_count")));
        hall.setHallType(JsonUtils.getFormJson(receiveJson,"hall_type"));
        System.out.println(hall);
        int num=hallService.addHall(hall);
        if (num>0){
            return JsonUtils.delSuccess();
        }else {
            return JsonUtils.delSuccess();
        }
//        return "---";
    }
    @RequestMapping(value = "/hall/getHall/{id}",method = RequestMethod.GET)
    public String getAllHallByCinemaId(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        return mapper.writeValueAsString(hallService.getAllHallByCinemaId(id));
    }
    @RequestMapping(value = "/hall/delete.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteHall(@RequestBody String json) throws JsonProcessingException {

        Integer cinema_id=Integer.parseInt(JsonUtils.getFormJson(json,"cinema_id"));
        Integer hall_id=Integer.parseInt(JsonUtils.getFormJson(json,"hall_id"));
        int num= hallService.deleteHall(cinema_id,hall_id);
        int num1= seatService.deleteSeats(cinema_id,hall_id);
        if (num>0&&num1>0){
            return JsonUtils.delSuccess();
        }else {
            return JsonUtils.delFailure();
        }
    }
}
