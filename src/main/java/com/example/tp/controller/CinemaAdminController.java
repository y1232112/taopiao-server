package com.example.tp.controller;

import com.example.tp.service.CinemaAdminService;
import com.example.tp.service.CinemaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class CinemaAdminController {
    @Autowired
    private CinemaAdminService cinemaAdminService;
    @RequestMapping(value = "/cinemaAdminList/{id}",method = RequestMethod.GET)
    public String getByadmin(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String jstr=mapper.writeValueAsString(cinemaAdminService.getCinemaAdminByid(id));
        return jstr;
    }
    @RequestMapping(value = "/cinemaAdminList/",method = RequestMethod.GET)
    public String getAllCinemaAdmin() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        json=mapper.writeValueAsString(cinemaAdminService.getAllCinemaAdmin());
        return json;
    }
}
