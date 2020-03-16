package com.example.tp.service;

import com.example.tp.entity.Film;
import com.example.tp.mapper.FilmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmService {
    @Autowired
    FilmMapper filmMapper;

    public List<Film> getAllFilm(){
        return filmMapper.getAllFilm();
    }
}
