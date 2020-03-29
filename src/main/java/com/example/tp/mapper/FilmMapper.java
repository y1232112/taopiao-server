package com.example.tp.mapper;

import com.example.tp.entity.Film;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository
public interface FilmMapper {
    //获取所有的电影信息
    List<Film> getAllFilm();

    //添加电影

    /**
     *
     * @param film
     * @return
     */
    int addFilm(Film film) ;

    /**
     *
     * @param id
     * @return
     */
    int deleteFilmById(@Param("id") Integer id);

    /**
     * 根据id集合批量删除影片信息
     * @param ids
     * @return
     */
    int deleteFilmByIds(ArrayList<Integer> ids);
    int modifyFilm(Film film);
    int getFilmCount();
    List<Film> getFilmPage(Integer start,Integer pageSize);
    List<Film> searchFilm(String film_name,String director,String status,String product_area,String type);
}