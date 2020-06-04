package com.example.tp.controller;

import com.example.tp.entity.Seat;
import com.example.tp.service.SeatService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class SeatController {
    @Autowired
    private SeatService seatService;
   @RequestMapping(value = "/seat/addSeats",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
   @ResponseBody
    public String addSeats(@RequestBody String receiveJson) throws JsonProcessingException {
       ObjectMapper mapper=new ObjectMapper();
       JsonNode node=mapper.readTree(receiveJson);
       JsonNode node1=node.path("params");
       JsonNode node2=node1.path("seats");
       String string=mapper.writeValueAsString(node2);
       ArrayList<Object> seats=mapper.readValue(string,ArrayList.class);
       System.out.println(seats);
       int num=seatService.addSeats(seats);
       if (num>0){
           return JsonUtils.delSuccess();
       }else {
           return JsonUtils.delFailure();
       }

   }
   @RequestMapping(value = "/seat/hallSeats/{id}",method = RequestMethod.GET)
    public String selectSeatByCinemaId(@PathVariable Integer id) throws JsonProcessingException {
       ObjectMapper mapper=new ObjectMapper();
       return mapper.writeValueAsString(seatService.selectSeatByCinemaId(id));
   }
}
