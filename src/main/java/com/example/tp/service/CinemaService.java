package com.example.tp.service;

import com.example.tp.entity.Cinema;
import com.example.tp.entity.CinemaAdmin;
import com.example.tp.mapper.CinemaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CinemaService {
    @Autowired
    CinemaMapper cinemaMapper;
    public List<Cinema> getAllCinema(){
        return cinemaMapper.getAllCinema();
    };

}
