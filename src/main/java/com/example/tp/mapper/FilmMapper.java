package com.example.tp.mapper;

import com.example.tp.entity.Film;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FilmMapper {
//获取所有的电影信息
    List<Film> getAllFilm();
//
}
