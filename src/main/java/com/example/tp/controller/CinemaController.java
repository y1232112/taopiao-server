package com.example.tp.controller;

import com.example.tp.service.CinemaService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CinemaController {
    @Autowired
    private CinemaService cinemaService;
    @RequestMapping(value = "/CinemaList/",method = RequestMethod.GET)
    public String cinemalist() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        try {
            json=mapper.writeValueAsString(cinemaService.getAllCinema());

        } catch (JsonProcessingException e) {
            return JsonUtils.delFailure();
        }
        return  json;

    }
}
