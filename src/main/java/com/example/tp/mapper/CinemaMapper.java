package com.example.tp.mapper;

import com.example.tp.entity.Cinema;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaMapper {

  List<Cinema> getAllCinema();
}
